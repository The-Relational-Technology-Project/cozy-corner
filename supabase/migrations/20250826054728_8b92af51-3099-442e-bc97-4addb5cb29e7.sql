-- Fix security issue: Hide contributor email addresses from public view
-- Create a public view that excludes sensitive contributor information

-- First, update RLS policies to restrict direct table access to admins only
DROP POLICY IF EXISTS "Anyone can view active coupons" ON public.neighbor_coupons;

-- Only admins can directly access the neighbor_coupons table
CREATE POLICY "Only admins can view all coupon data" 
ON public.neighbor_coupons 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create a public view that excludes sensitive contributor information
CREATE OR REPLACE VIEW public.public_coupons AS
SELECT 
    id,
    created_at,
    updated_at,
    is_active,
    title,
    description,
    icon,
    availability,
    contributor_name  -- Keep name but hide email
FROM public.neighbor_coupons
WHERE is_active = true;

-- Grant public access to the view
GRANT SELECT ON public.public_coupons TO anon;
GRANT SELECT ON public.public_coupons TO authenticated;