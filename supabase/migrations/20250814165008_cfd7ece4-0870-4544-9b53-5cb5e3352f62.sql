-- Fix security issue: Protect personal contact information in block_party_ideas table
-- Remove the overly permissive SELECT policy that exposes email addresses and phone numbers
DROP POLICY IF EXISTS "Anyone can view block party ideas" ON public.block_party_ideas;

-- Keep the INSERT policy for idea submissions (this is already correct)
-- CREATE POLICY "Anyone can create block party ideas" already exists

-- Create secure functions for admin operations without exposing personal data
-- Function to get block party ideas count for admin dashboard
CREATE OR REPLACE FUNCTION public.get_block_party_ideas_count()
RETURNS BIGINT
LANGUAGE SQL 
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT COUNT(*) FROM public.block_party_ideas;
$$;

-- Function to get block party ideas with personal data for admin review (if needed in future)
-- This is a security definer function that only admins should be able to call
CREATE OR REPLACE FUNCTION public.get_block_party_ideas_for_admin()
RETURNS TABLE(
  id UUID,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  idea TEXT,
  email TEXT,
  phone TEXT
) 
LANGUAGE SQL 
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    id,
    created_at,
    updated_at,
    idea,
    email,
    phone
  FROM public.block_party_ideas
  ORDER BY created_at DESC;
$$;