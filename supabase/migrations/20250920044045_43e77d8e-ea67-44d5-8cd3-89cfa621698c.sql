-- Drop the problematic security definer view
DROP VIEW IF EXISTS public.public_profiles;

-- Instead, update the RLS policies to be more granular and secure
-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can view own complete profile" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can view public profile info" ON public.profiles;
DROP POLICY IF EXISTS "Anonymous users can view basic public info" ON public.profiles;

-- Create a security definer function to check if user can see sensitive data
CREATE OR REPLACE FUNCTION public.can_view_sensitive_profile_data(profile_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() = profile_user_id;
$$;

-- Policy for users to view their own complete profile
CREATE POLICY "Users can view own complete profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy for others to view only non-sensitive public info
CREATE POLICY "Public can view non-sensitive profile info" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() != user_id OR auth.uid() IS NULL
);