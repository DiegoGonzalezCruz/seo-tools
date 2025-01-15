"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Cpu } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivationButton } from "./ActivationButton";
import useUserData from "@/hooks/useUserData";
import { useOllamaRunning } from "@/hooks/config/useOllamaRunning";
import { activateLLM } from "@/app/api/LLM/config";

const OllamaStatus = () => {
  const { data: user, refetch: refetchUserData } = useUserData();
  const { data: ollamaData, isLoading } = useOllamaRunning();

  const activateOllama = async () => {
    await activateLLM("ollama", user);
    refetchUserData(); // Refresh user data to get updated activeLLM
  };

  const isConnected = ollamaData;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Local AI (Ollama)</CardTitle>
        <Cpu className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {isLoading ? (
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        ) : (
          <div className="text-2xl font-bold">
            {isConnected ? "Connected" : "Disconnected"}
          </div>
        )}
        <ActivationButton
          currentLLM={user?.activeLLM}
          targetLLM="ollama"
          onActivate={activateOllama}
        />
      </CardContent>
    </Card>
  );
};

export default OllamaStatus;
