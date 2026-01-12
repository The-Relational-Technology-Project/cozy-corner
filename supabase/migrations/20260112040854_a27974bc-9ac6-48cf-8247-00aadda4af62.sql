-- Fix 1: Add RLS policies for upcoming_events table
-- Allow anyone to view upcoming events (they are public community events)
CREATE POLICY "Anyone can view upcoming events"
ON public.upcoming_events
FOR SELECT
USING (true);

-- Allow admins to insert events
CREATE POLICY "Admins can insert events"
ON public.upcoming_events
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update events
CREATE POLICY "Admins can update events"
ON public.upcoming_events
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete events
CREATE POLICY "Admins can delete events"
ON public.upcoming_events
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Fix 2: Secure the assign_admin_role function - require caller to be admin
CREATE OR REPLACE FUNCTION public.assign_admin_role(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id uuid;
  is_caller_admin boolean;
BEGIN
  -- Check if the caller is an admin
  SELECT public.has_role(auth.uid(), 'admin') INTO is_caller_admin;
  
  IF NOT is_caller_admin THEN
    RAISE EXCEPTION 'Only admins can assign admin roles';
  END IF;
  
  -- Get the user ID for the email
  SELECT id INTO target_user_id FROM auth.users WHERE email = user_email;
  
  IF target_user_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Insert the admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN TRUE;
END;
$$;