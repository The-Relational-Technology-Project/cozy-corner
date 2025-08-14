-- Fix function search path issue only
CREATE OR REPLACE FUNCTION public.get_signup_counts()
RETURNS TABLE(role_name TEXT, role_category TEXT, signup_count BIGINT) 
LANGUAGE SQL 
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    bps.role_name,
    bps.role_category,
    COUNT(*) as signup_count
  FROM public.block_party_signups bps
  GROUP BY bps.role_name, bps.role_category;
$$;