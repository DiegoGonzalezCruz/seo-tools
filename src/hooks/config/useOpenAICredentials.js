"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

// Fetch OpenAI instances from the database
export const getUserOpenAIInstances = async (userId) => {
  try {
    const res = await fetch(`/api/instances/openai?userId=${userId}`);

    if (!res.ok) {
      console.error("Failed to fetch OpenAI instances:", res.statusText);
    }

    const data = await res.json();
    if (data.status !== 200) {
      return null;
    }

    return data.openAIInstances;
  } catch (e) {
    console.error("Failed to fetch OpenAI instances:", e);
    return null;
  }
};

export function useOpenAICredentials() {
  const [openAIAPIKey, setOpenAIAPIKey] = useState("");
  const { data: session, status } = useSession();

  const { data: openAIData } = useQuery({
    queryKey: ["openai-instance-data", session?.user],
    queryFn: () => getUserOpenAIInstances(session?.user?.id),
    enabled: status === "authenticated" && !!session?.user,
  });

  useEffect(() => {
    if (openAIData && openAIData.length > 0) {
      const activeInstance = openAIData.find((api) => api.isActive);
      if (activeInstance) {
        setOpenAIAPIKey(activeInstance.apiKey);
      }
    }
  }, [openAIData]);

  return {
    openAIAPIKey,
    setOpenAIAPIKey,
  };
}
