-- Fix security linter warnings

-- 1. Fix the function search path issue
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

-- 2. Ensure INSERT policy still exists for signups (in case it was affected)
-- Check if the INSERT policy exists and recreate if needed
CREATE POLICY "Anyone can create block party signups" 
ON public.block_party_signups 
FOR INSERT 
WITH CHECK (true);