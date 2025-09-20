import { supabase } from '@/integrations/supabase/client';

/**
 * Safely fetch public profile data without sensitive information like phone numbers
 */
export const fetchPublicProfile = async (userId: string) => {
  const { data, error } = await supabase
    .rpc('get_public_profile_data', { target_user_id: userId });
  
  return { data: data?.[0] || null, error };
};

/**
 * Fetch multiple public profiles safely
 */
export const fetchPublicProfiles = async (userIds: string[]) => {
  const profiles = await Promise.all(
    userIds.map(userId => fetchPublicProfile(userId))
  );
  
  return profiles
    .filter(result => !result.error && result.data)
    .map(result => result.data);
};