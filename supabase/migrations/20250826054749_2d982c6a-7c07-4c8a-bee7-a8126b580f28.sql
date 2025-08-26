-- Fix the security definer view issue
-- Replace the view with a security definer function approach

-- Drop the problematic view
DROP VIEW IF EXISTS public.public_coupons;

-- Create a security definer function to get public coupon data
CREATE OR REPLACE FUNCTION public.get_public_coupons()
RETURNS TABLE(
    id UUID,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN,
    title TEXT,
    description TEXT,
    icon TEXT,
    availability TEXT,
    contributor_name TEXT
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT 
        nc.id,
        nc.created_at,
        nc.updated_at,
        nc.is_active,
        nc.title,
        nc.description,
        nc.icon,
        nc.availability,
        nc.contributor_name
    FROM public.neighbor_coupons nc
    WHERE nc.is_active = true;
$$;