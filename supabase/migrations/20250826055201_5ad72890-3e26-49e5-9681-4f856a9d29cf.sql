-- Complete the security fix by protecting subscription-related admin functions
-- These functions also need admin access controls

-- Update get_subscription_stats to require admin access
CREATE OR REPLACE FUNCTION public.get_subscription_stats()
RETURNS TABLE(total_subscriptions bigint, east_side_count bigint, west_side_count bigint, both_sides_count bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COUNT(*) as total_subscriptions,
    COUNT(*) FILTER (WHERE east_side = true AND west_side = false) as east_side_count,
    COUNT(*) FILTER (WHERE west_side = true AND east_side = false) as west_side_count,
    COUNT(*) FILTER (WHERE east_side = true AND west_side = true) as both_sides_count
  FROM public.street_cleaning_subscriptions
  WHERE public.has_role(auth.uid(), 'admin');
$$;

-- Note: get_coupon_claims_for_admin is already properly secured with admin access
-- Note: get_signup_counts, get_event_suggestion_count, get_neighborhood_contributions_count, 
--       and get_block_party_ideas_count return only aggregate data without personal info, 
--       but let's secure them too for consistency

CREATE OR REPLACE FUNCTION public.get_signup_counts()
RETURNS TABLE(role_name text, role_category text, signup_count bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    bps.role_name,
    bps.role_category,
    COUNT(*) as signup_count
  FROM public.block_party_signups bps
  WHERE public.has_role(auth.uid(), 'admin')
  GROUP BY bps.role_name, bps.role_category;
$$;