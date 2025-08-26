-- Create the first admin user in the user_roles table
-- This will be used once an admin user signs up

-- Note: We can't insert into user_roles yet because we need the actual user_id
-- from auth.users after someone signs up. This is just the structure setup.

-- Let's make sure the admin role system is ready
-- The user will need to:
-- 1. Sign up through /admin/login 
-- 2. Then manually insert their user ID into user_roles table with admin role

-- For now, let's create a helper function to easily assign admin role
CREATE OR REPLACE FUNCTION public.assign_admin_role(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO public.user_roles (user_id, role)
  SELECT id, 'admin'::app_role
  FROM auth.users 
  WHERE email = user_email
  ON CONFLICT (user_id, role) DO NOTHING;
  
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN auth.users u ON ur.user_id = u.id
    WHERE u.email = user_email AND ur.role = 'admin'
  );
$$;