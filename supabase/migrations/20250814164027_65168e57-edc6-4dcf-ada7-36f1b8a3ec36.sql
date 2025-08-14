-- Fix security issue: Protect personal data in block_party_signups table
-- Remove the overly permissive SELECT policy that exposes personal data
DROP POLICY IF EXISTS "Anyone can view block party signups" ON public.block_party_signups;

-- Create a restricted SELECT policy that only allows reading non-personal columns
-- This allows the app to count signups by role without exposing names, emails, or messages
CREATE POLICY "Anyone can view signup counts only" 
ON public.block_party_signups 
FOR SELECT 
USING (true);

-- However, we need to implement column-level security since Postgres RLS doesn't support column-level restrictions directly
-- The safest approach is to remove public SELECT access entirely and create a function for getting counts

-- Actually, let's remove the SELECT policy entirely for better security
DROP POLICY IF EXISTS "Anyone can view signup counts only" ON public.block_party_signups;

-- Create a secure function to get signup counts without exposing personal data
CREATE OR REPLACE FUNCTION public.get_signup_counts()
RETURNS TABLE(role_name TEXT, role_category TEXT, signup_count BIGINT) 
LANGUAGE SQL 
SECURITY DEFINER
AS $$
  SELECT 
    bps.role_name,
    bps.role_category,
    COUNT(*) as signup_count
  FROM public.block_party_signups bps
  GROUP BY bps.role_name, bps.role_category;
$$;