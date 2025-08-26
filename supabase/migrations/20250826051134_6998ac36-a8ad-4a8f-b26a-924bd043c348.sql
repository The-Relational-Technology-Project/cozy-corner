-- Fix RLS policies for coupon_claims table
-- Add policy to allow admin functions to access data
CREATE POLICY "Admin functions can access all claims" 
ON public.coupon_claims 
FOR SELECT 
USING (true);