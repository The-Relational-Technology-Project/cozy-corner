-- Create table for new neighbor signups (WhatsApp group requests, etc.)
CREATE TABLE public.new_neighbor_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  wants_whatsapp BOOLEAN NOT NULL DEFAULT true,
  welcome_message TEXT,
  ideas TEXT
);

-- Enable RLS
ALTER TABLE public.new_neighbor_signups ENABLE ROW LEVEL SECURITY;

-- Anyone can sign up
CREATE POLICY "Anyone can create new neighbor signups" 
ON public.new_neighbor_signups 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view
CREATE POLICY "Only admins can view new neighbor signups" 
ON public.new_neighbor_signups 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create table for community service requests
CREATE TABLE public.community_service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  service_type TEXT NOT NULL, -- 'outer_mamas', 'outer_dadas', 'mutual_aid', 'suggest_new'
  suggested_service_name TEXT,
  suggested_service_url TEXT,
  message TEXT
);

-- Enable RLS
ALTER TABLE public.community_service_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit requests
CREATE POLICY "Anyone can create community service requests" 
ON public.community_service_requests 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view
CREATE POLICY "Only admins can view community service requests" 
ON public.community_service_requests 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));