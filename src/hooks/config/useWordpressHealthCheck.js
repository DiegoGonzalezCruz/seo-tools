import { useQuery } from "@tanstack/react-query";

// interface UseWordpressHealthCheckProps {
//   userId?: string;
//   enabled?: boolean;
// }

export function useWordpressHealthCheck(
  { userId, enabled }
  // : UseWordpressHealthCheckProps
) {
  return useQuery({
    queryKey: ["wp-health-check", userId],
    queryFn: async () => {
      const response = await fetch("/api/health-check/wordpress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      return response.json();
    },
    enabled,
  });
}
