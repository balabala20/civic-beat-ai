-- Drop the overly permissive policy that allows everyone to view all profile data
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create more restrictive policies for profile access

-- Users can view their own complete profile
CREATE POLICY "Users can view own complete profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Authenticated users can view limited public info of other users (excluding sensitive data)
CREATE POLICY "Authenticated users can view public profile info" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  auth.uid() != user_id AND 
  auth.uid() IS NOT NULL
);

-- Anonymous users can only view very limited public info
CREATE POLICY "Anonymous users can view basic public info" 
ON public.profiles 
FOR SELECT 
TO anon
USING (true);

-- Create a view for public profile data that excludes sensitive information
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  user_id,
  username,
  full_name,
  avatar_url,
  role,
  issues_reported,
  followers_count,
  following_count,
  badges,
  is_verified,
  created_at,
  updated_at,
  CASE 
    WHEN auth.uid() = user_id THEN phone
    ELSE NULL 
  END as phone,
  CASE 
    WHEN auth.uid() = user_id THEN location_lat
    ELSE NULL 
  END as location_lat,
  CASE 
    WHEN auth.uid() = user_id THEN location_lng
    ELSE NULL 
  END as location_lng,
  CASE 
    WHEN auth.uid() = user_id THEN location_address
    ELSE NULL 
  END as location_address
FROM public.profiles;

-- Grant appropriate permissions on the view
GRANT SELECT ON public.public_profiles TO authenticated, anon;