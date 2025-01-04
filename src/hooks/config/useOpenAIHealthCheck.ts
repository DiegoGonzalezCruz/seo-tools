import { useQuery } from "@tanstack/react-query";

interface UseOpenAIHealthCheckProps {
  userId?: string;
  enabled?: boolean;
}

export function useOpenAIHealthCheck({
  userId,
  enabled,
}: UseOpenAIHealthCheckProps) {
  return useQuery({
    queryKey: ["openai-health-check", userId],
    queryFn: async () => {
      const response = await fetch("/api/health-check/openai", {
        method: "GET",
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
