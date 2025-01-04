import { useQuery } from "@tanstack/react-query";
import { getUserWPInstances } from "@/lib/wordpress";

interface UseUserWPInstancesProps {
  userId?: string;
  enabled?: boolean;
}

export function useUserWPInstances({
  userId,
  enabled,
}: UseUserWPInstancesProps) {
  return useQuery({
    queryKey: ["wp-instance-data", userId],
    queryFn: () => getUserWPInstances(userId as string),
    enabled,
  });
}
