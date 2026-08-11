-- Create neighbor_coupons table for available coupons
CREATE TABLE public.neighbor_coupons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Ã°ÂÂÂÃ¯Â¸Â',
  availability TEXT,
  contributor_name TEXT,
  contributor_email TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create coupon_claims table for tracking claims
CREATE TABLE public.coupon_claims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  coupon_id UUID NOT NULL REFERENCES public.neighbor_coupons(id),
  claimer_name TEXT,
  claimer_email TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT
);

-- Enable Row Level Security
ALTER TABLE public.neighbor_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_claims ENABLE ROW LEVEL SECURITY;

-- Create policies for neighbor_coupons
CREATE POLICY "Anyone can view active coupons" 
ON public.neighbor_coupons 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Anyone can create coupons" 
ON public.neighbor_coupons 
FOR INSERT 
WITH CHECK (true);

-- Create policies for coupon_claims
CREATE POLICY "Anyone can create claims" 
ON public.coupon_claims 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE TRIGGER update_neighbor_coupons_updated_at
BEFORE UPDATE ON public.neighbor_coupons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_coupon_claims_updated_at
BEFORE UPDATE ON public.coupon_claims
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert example coupons
INSERT INTO public.neighbor_coupons (title, description, icon, contributor_name, contributor_email) VALUES
('Best Bike Route Buddy', 'Ride along safe local paths', 'Ã°ÂÂÂ²', 'Cozy Corner', 'steward@cozycorner.place'),
('Grocery Tour', 'Get shown around the local store or farmers market', 'Ã°ÂÂÂ', 'Cozy Corner', 'steward@cozycorner.place'),
('Neighborhood History Chat', 'Coffee and stories about 48th Ave''s past', 'Ã°ÂÂÂ¡', 'Cozy Corner', 'steward@cozycorner.place'),
('Hike Connector', 'Discover nearby trails with a neighbor', 'Ã°ÂÂÂ³', 'Cozy Corner', 'steward@cozycorner.place'),
('Walk & Wave', 'Meet neighbors up and down the block', 'Ã°ÂÂÂ', 'Cozy Corner', 'steward@cozycorner.place'),
('Dog Walk Together', 'Join a morning walk at Ocean Beach', 'Ã°ÂÂÂ', 'Cozy Corner', 'steward@cozycorner.place'),
('Donut Run', 'Sample the best donuts within a mile', 'Ã°ÂÂÂ©', 'Cozy Corner', 'steward@cozycorner.place'),
('Art & Murals Walk', 'See hidden murals and street art', 'Ã°ÂÂÂ¨', 'Cozy Corner', 'steward@cozycorner.place'),
('Book Swap', 'Bring a favorite book to exchange', 'Ã°ÂÂÂ', 'Cozy Corner', 'steward@cozycorner.place'),
('Kids Playdate', 'Meetup at the playground for families', 'Ã°ÂÂªÂ', 'Cozy Corner', 'steward@cozycorner.place'),
('Handy Neighbor', 'Basic home fix tips or tool borrowing intro', 'Ã°ÂÂÂ ', 'Cozy Corner', 'steward@cozycorner.place'),
('Sunset Tunes', 'Hang out for live music or jam session', 'Ã°ÂÂÂ¶', 'Cozy Corner', 'steward@cozycorner.place');

-- Create admin functions
CREATE OR REPLACE FUNCTION public.get_coupon_claims_for_admin()
RETURNS TABLE(
  id uuid,
  created_at timestamp with time zone,
  coupon_title text,
  coupon_description text,
  contributor_name text,
  contributor_email text,
  claimer_name text,
  claimer_email text,
  status text,
  admin_notes text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO ''
AS $function$
  SELECT 
    cc.id,
    cc.created_at,
    nc.title as coupon_title,
    nc.description as coupon_description,
    nc.contributor_name,
    nc.contributor_email,
    cc.claimer_name,
    cc.claimer_email,
    cc.status,
    cc.admin_notes
  FROM public.coupon_claims cc
  JOIN public.neighbor_coupons nc ON cc.coupon_id = nc.id
  ORDER BY cc.created_at DESC;
$function$;