-- Create table for neighborhood idea suggestions and volunteer interest
CREATE TABLE public.neighborhood_contributions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Contact information
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Contribution type: 'suggestion' for new ideas, 'volunteer' for helping with existing
  contribution_type TEXT NOT NULL CHECK (contribution_type IN ('suggestion', 'volunteer')),
  
  -- For suggestions: the new idea they're proposing
  suggested_idea TEXT,
  
  -- For volunteering: which existing idea they want to help with
  existing_idea TEXT,
  
  -- Additional details or comments
  message TEXT,
  
  -- Availability or specific skills they can offer
  availability TEXT
);

-- Enable RLS
ALTER TABLE public.neighborhood_contributions ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT for contributions
CREATE POLICY "Anyone can create neighborhood contributions" 
ON public.neighborhood_contributions 
FOR INSERT 
WITH CHECK (true);

-- Create secure function for admin access to contributions
CREATE OR REPLACE FUNCTION public.get_neighborhood_contributions_for_admin()
RETURNS TABLE(
  id UUID,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  name TEXT,
  email TEXT,
  phone TEXT,
  contribution_type TEXT,
  suggested_idea TEXT,
  existing_idea TEXT,
  message TEXT,
  availability TEXT
) 
LANGUAGE SQL 
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    id,
    created_at,
    updated_at,
    name,
    email,
    phone,
    contribution_type,
    suggested_idea,
    existing_idea,
    message,
    availability
  FROM public.neighborhood_contributions
  ORDER BY created_at DESC;
$$;

-- Function to get contribution counts for admin dashboard
CREATE OR REPLACE FUNCTION public.get_neighborhood_contributions_count()
RETURNS TABLE(
  total_contributions BIGINT,
  suggestions_count BIGINT,
  volunteer_count BIGINT
)
LANGUAGE SQL 
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    COUNT(*) as total_contributions,
    COUNT(*) FILTER (WHERE contribution_type = 'suggestion') as suggestions_count,
    COUNT(*) FILTER (WHERE contribution_type = 'volunteer') as volunteer_count
  FROM public.neighborhood_contributions;
$$;

-- Add trigger for updated_at
CREATE TRIGGER update_neighborhood_contributions_updated_at
BEFORE UPDATE ON public.neighborhood_contributions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();