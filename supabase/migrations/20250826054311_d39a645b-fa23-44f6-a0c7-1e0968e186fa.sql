-- Fix security issue: Remove overly permissive SELECT policy on coupon_claims
-- This policy currently allows anyone to read all personal information from coupon claims

-- Drop the existing policy that allows unrestricted access
DROP POLICY IF EXISTS "Admin functions can access all claims" ON public.coupon_claims;

-- The table should only be accessible through the security definer function
-- get_coupon_claims_for_admin() which properly controls access
-- No direct SELECT access is needed for regular users