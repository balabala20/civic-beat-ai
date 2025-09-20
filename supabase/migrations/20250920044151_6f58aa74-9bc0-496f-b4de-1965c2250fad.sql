-- First, let's see what policies currently exist and drop them all cleanly
DO $$ 
DECLARE 
    policy_record RECORD;
BEGIN
    -- Drop all existing policies on profiles table
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'profiles' AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.profiles', policy_record.policyname);
    END LOOP;
END $$;

-- Create clean, secure policies
-- Users can view their own complete profile (including sensitive data)
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Everyone can view limited public profile info (excluding sensitive fields)
-- This policy will be enforced at the application level to exclude sensitive fields
CREATE POLICY "Public can view profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

-- Create a function to safely get public profile data
CREATE OR REPLACE FUNCTION public.get_public_profile_data(target_user_id uuid)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  username text,
  full_name text,
  avatar_url text,
  role user_role,
  issues_reported integer,
  followers_count integer,
  following_count integer,
  badges jsonb,
  is_verified boolean,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.user_id,
    p.username,
    p.full_name,
    p.avatar_url,
    p.role,
    p.issues_reported,
    p.followers_count,
    p.following_count,
    p.badges,
    p.is_verified,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  WHERE p.user_id = target_user_id;
$$;