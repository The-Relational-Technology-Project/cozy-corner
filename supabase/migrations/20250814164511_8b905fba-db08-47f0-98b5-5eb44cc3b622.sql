-- Add UPDATE policy for subscription modifications
CREATE POLICY "Anyone can update existing subscriptions" 
ON public.street_cleaning_subscriptions 
FOR UPDATE 
USING (true)
WITH CHECK (true);