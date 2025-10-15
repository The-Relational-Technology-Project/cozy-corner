-- Create table for disaster check-in requests
CREATE TABLE public.disaster_check_ins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT,
  address TEXT NOT NULL,
  contact_info TEXT,
  vulnerable_count INTEGER NOT NULL DEFAULT 1,
  specific_needs TEXT,
  language_preference TEXT DEFAULT 'english'
);

-- Enable Row Level Security
ALTER TABLE public.disaster_check_ins ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public sign-ups)
CREATE POLICY "Anyone can sign up for check-ins"
ON public.disaster_check_ins
FOR INSERT
WITH CHECK (true);

-- Only admins can view
CREATE POLICY "Admins can view check-ins"
ON public.disaster_check_ins
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_disaster_check_ins_updated_at
BEFORE UPDATE ON public.disaster_check_ins
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create admin function to get check-in requests
CREATE OR REPLACE FUNCTION public.get_disaster_check_ins_for_admin()
RETURNS TABLE(
  id UUID,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  name TEXT,
  address TEXT,
  contact_info TEXT,
  vulnerable_count INTEGER,
  specific_needs TEXT,
  language_preference TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT 
    id,
    created_at,
    updated_at,
    name,
    address,
    contact_info,
    vulnerable_count,
    specific_needs,
    language_preference
  FROM public.disaster_check_ins
  WHERE public.has_role(auth.uid(), 'admin')
  ORDER BY created_at DESC;
$$;