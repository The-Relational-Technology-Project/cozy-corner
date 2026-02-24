
-- Fix 1: Add UPDATE and DELETE policies for admins on coupon_claims
CREATE POLICY "Admins can update coupon claims"
ON public.coupon_claims
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete coupon claims"
ON public.coupon_claims
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix 3: Secure get_coupon_claims_for_admin with admin check
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
SET search_path = 'public'
AS $$
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
  WHERE public.has_role(auth.uid(), 'admin')
  ORDER BY cc.created_at DESC;
$$;
