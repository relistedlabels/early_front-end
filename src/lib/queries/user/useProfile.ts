// lib/queries/profile/useProfile.ts
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/profile";
import { FullProfile } from "@/types/profile";

export const useProfile = (profileId?: string) =>
  useQuery<FullProfile>({
    queryKey: ["profile", profileId],
    queryFn: () => getProfile(profileId!),
    enabled: !!profileId,
    retry: false, // important: 404 means "no profile"
  });
