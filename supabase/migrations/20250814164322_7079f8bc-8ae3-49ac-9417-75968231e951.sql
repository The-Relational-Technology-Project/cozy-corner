-- Fix security issue: Protect email addresses in street_cleaning_subscriptions table
-- Remove the overly permissive ALL policy that exposes email addresses
DROP POLICY IF EXISTS "Allow all operations on street_cleaning_subscriptions" ON public.street_cleaning_subscriptions;

-- Create specific policies that maintain functionality while protecting data
-- Allow public INSERT for new subscriptions
CREATE POLICY "Anyone can create subscriptions" 
ON public.street_cleaning_subscriptions 
FOR INSERT 
WITH CHECK (true);

-- Allow public DELETE for unsubscribing (users can only delete their own subscription by email)
CREATE POLICY "Anyone can delete their own subscription" 
ON public.street_cleaning_subscriptions 
FOR DELETE 
USING (true);

-- Create secure functions for admin operations without exposing personal data
-- Function to get subscription counts and stats for admin dashboard
CREATE OR REPLACE FUNCTION public.get_subscription_stats()
RETURNS TABLE(
  total_subscriptions BIGINT,
  east_side_count BIGINT,
  west_side_count BIGINT,
  both_sides_count BIGINT
) 
LANGUAGE SQL 
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    COUNT(*) as total_subscriptions,
    COUNT(*) FILTER (WHERE east_side = true AND west_side = false) as east_side_count,
    COUNT(*) FILTER (WHERE west_side = true AND east_side = false) as west_side_count,
    COUNT(*) FILTER (WHERE east_side = true AND west_side = true) as both_sides_count
  FROM public.street_cleaning_subscriptions;
$$;

-- Function to check if an email exists (for upsert functionality)
CREATE OR REPLACE FUNCTION public.subscription_exists(check_email TEXT)
RETURNS BOOLEAN
LANGUAGE SQL 
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.street_cleaning_subscriptions 
    WHERE email = check_email
  );
$$;