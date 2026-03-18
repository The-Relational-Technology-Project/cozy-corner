-- Add phone number and SMS preference to street cleaning subscriptions
ALTER TABLE public.street_cleaning_subscriptions 
  ADD COLUMN phone TEXT,
  ADD COLUMN sms_enabled BOOLEAN NOT NULL DEFAULT false;