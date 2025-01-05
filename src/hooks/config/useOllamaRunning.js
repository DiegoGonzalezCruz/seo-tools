"use client";
// hooks/useOllamaRunning.ts
import { isOllamaRunning } from "@/lib/ollama";
import { useQuery } from "@tanstack/react-query";

export function useOllamaRunning() {
  return useQuery({
    queryKey: ["ollama-running"],
    queryFn: isOllamaRunning,
    // Optional: refetch every minute, etc.
    refetchInterval: 60000,
  });
}
