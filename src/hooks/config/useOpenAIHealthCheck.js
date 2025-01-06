import { useQuery } from "@tanstack/react-query";

// interface UseOpenAIHealthCheckProps {
//   userId?: string;
//   enabled?: boolean;
// }

export function useOpenAIHealthCheck({ apiKey, enabled }) {
  console.log(apiKey, "apiKey from HOOK");
  console.log(enabled, "is enabled from HOOK");
  return useQuery({
    queryKey: ["openai-health-check", apiKey],
    queryFn: async () => {
      const response = await fetch(
        `/api/health-check/openai?apiKey=${apiKey}`,
        {
          method: "GET",
        }
      );
      return response.json();
    },
    enabled,
  });
}
