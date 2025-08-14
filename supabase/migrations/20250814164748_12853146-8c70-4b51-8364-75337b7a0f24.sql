-- Fix security issue: Protect personal data in event_suggestions table
-- Remove the overly permissive ALL policy that exposes personal contact details
DROP POLICY IF EXISTS "Allow public access to event suggestions" ON public.event_suggestions;

-- Allow public INSERT for event suggestion submissions
CREATE POLICY "Anyone can create event suggestions" 
ON public.event_suggestions 
FOR INSERT 
WITH CHECK (true);

-- Create secure functions for admin operations without exposing personal data
-- Function to get event suggestion counts for admin dashboard
CREATE OR REPLACE FUNCTION public.get_event_suggestion_count()
RETURNS BIGINT
LANGUAGE SQL 
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT COUNT(*) FROM public.event_suggestions;
$$;

-- Function to get event suggestions with personal data for admin review
-- This is a security definer function that only admins should be able to call
CREATE OR REPLACE FUNCTION public.get_event_suggestions_for_admin()
RETURNS TABLE(
  id UUID,
  created_at TIMESTAMPTZ,
  event_title TEXT,
  event_description TEXT,
  suggested_date TEXT,
  suggested_location TEXT,
  name TEXT,
  email TEXT,
  contact_info TEXT
) 
LANGUAGE SQL 
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    id,
    created_at,
    event_title,
    event_description,
    suggested_date,
    suggested_location,
    name,
    email,
    contact_info
  FROM public.event_suggestions
  ORDER BY created_at DESC;
$$;