-- Fix the search_path for the existing function
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';