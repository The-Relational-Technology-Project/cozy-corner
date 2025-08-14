-- Fix the overly permissive policy on street_cleaning_unsubscribes
-- Remove the existing "Allow all operations" policy
DROP POLICY IF EXISTS "Allow all operations on street_cleaning_unsubscribes" ON public.street_cleaning_unsubscribes;

-- Add secure policies that only allow INSERT (for unsubscribing) and admin access via functions
CREATE POLICY "Anyone can unsubscribe (insert only)" 
ON public.street_cleaning_unsubscribes 
FOR INSERT 
WITH CHECK (true);

-- Note: SELECT access should only be available through admin functions, not direct public access