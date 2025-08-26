-- Fix security issue: Explicitly restrict SELECT access on tables containing personal information
-- Add admin-only SELECT policies to tables with sensitive personal data

-- Secure block_party_ideas table - only admins can view personal data
CREATE POLICY "Only admins can view block party ideas" 
ON public.block_party_ideas 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Secure event_suggestions table - only admins can view personal data  
CREATE POLICY "Only admins can view event suggestions" 
ON public.event_suggestions 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Secure neighborhood_contributions table - only admins can view personal data
CREATE POLICY "Only admins can view neighborhood contributions" 
ON public.neighborhood_contributions 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Secure block_party_signups table - only admins can view personal data
CREATE POLICY "Only admins can view block party signups" 
ON public.block_party_signups 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Secure street_cleaning_subscriptions table - only admins can view personal data
CREATE POLICY "Only admins can view street cleaning subscriptions" 
ON public.street_cleaning_subscriptions 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Secure street_cleaning_unsubscribes table - only admins can view personal data
CREATE POLICY "Only admins can view unsubscribe records" 
ON public.street_cleaning_unsubscribes 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));