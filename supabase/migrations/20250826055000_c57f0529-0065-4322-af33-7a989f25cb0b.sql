-- Fix security issue: Protect admin functions that expose personal information
-- Add proper admin access controls to all functions returning sensitive data

-- First, let's secure the functions that return personal information
-- These functions should only be accessible to authenticated admin users

-- Update get_neighborhood_contributions_for_admin to require admin access
CREATE OR REPLACE FUNCTION public.get_neighborhood_contributions_for_admin()
RETURNS TABLE(id uuid, created_at timestamp with time zone, updated_at timestamp with time zone, name text, email text, phone text, contribution_type text, suggested_idea text, existing_idea text, message text, availability text)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  -- Only return data if the current user is an admin
  SELECT 
    nc.id,
    nc.created_at,
    nc.updated_at,
    nc.name,
    nc.email,
    nc.phone,
    nc.contribution_type,
    nc.suggested_idea,
    nc.existing_idea,
    nc.message,
    nc.availability
  FROM public.neighborhood_contributions nc
  WHERE public.has_role(auth.uid(), 'admin')
  ORDER BY nc.created_at DESC;
$$;

-- Update get_block_party_ideas_for_admin to require admin access
CREATE OR REPLACE FUNCTION public.get_block_party_ideas_for_admin()
RETURNS TABLE(id uuid, created_at timestamp with time zone, updated_at timestamp with time zone, idea text, email text, phone text)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    bpi.id,
    bpi.created_at,
    bpi.updated_at,
    bpi.idea,
    bpi.email,
    bpi.phone
  FROM public.block_party_ideas bpi
  WHERE public.has_role(auth.uid(), 'admin')
  ORDER BY bpi.created_at DESC;
$$;

-- Update get_event_suggestions_for_admin to require admin access
CREATE OR REPLACE FUNCTION public.get_event_suggestions_for_admin()
RETURNS TABLE(id uuid, created_at timestamp with time zone, event_title text, event_description text, suggested_date text, suggested_location text, name text, email text, contact_info text)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    es.id,
    es.created_at,
    es.event_title,
    es.event_description,
    es.suggested_date,
    es.suggested_location,
    es.name,
    es.email,
    es.contact_info
  FROM public.event_suggestions es
  WHERE public.has_role(auth.uid(), 'admin')
  ORDER BY es.created_at DESC;
$$;