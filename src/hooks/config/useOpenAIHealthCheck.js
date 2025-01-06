import { useQuery } from "@tanstack/react-query";

// interface UseOpenAIHealthCheckProps {
//   userId?: string;
//   enabled?: boolean;
// }

async function checkOpenAIHealth(apiKey) {
  try {
    const res = await fetch(`/api/health-check/openai?apiKey=${apiKey}`);

    if (!res.ok) {
      // Handle HTTP error
      return { valid: false, message: "Health check request failed" };
    }

    const data = await res.json();
    // data should look like: { valid: boolean, message?: string }
    return data;
  } catch (error) {
    // Handle network or parsing errors
    return { valid: false, message: error.message };
  }
}

export function useOpenAIHealthCheck(apiKey, isEnabled) {
  // Observe that we might log 'undefined' or empty string for apiKey initially.
  console.log(apiKey, "apiKey from HOOK");
  console.log(isEnabled, "isEnabled from HOOK");

  return useQuery({
    queryKey: ["openAIHealthCheck", apiKey],
    queryFn: () => checkOpenAIHealth(apiKey),
    enabled: isEnabled, // Only run if the API key is valid
    refetchOnWindowFocus: false,
  });
}
