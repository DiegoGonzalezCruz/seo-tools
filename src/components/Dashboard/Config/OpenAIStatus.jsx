"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Cpu } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivationButton } from "./ActivationButton";
import { useEffect, useState } from "react";
import useUserData from "@/hooks/useUserData";
import { useOpenAICredentials } from "@/hooks/config/useOpenAICredentials";
import { useOpenAIHealthCheck } from "@/hooks/config/useOpenAIHealthCheck";
import { activateLLM } from "@/app/api/LLM/config";

const OpenAIStatus = () => {
  const { data: user, refetch: refetchUserData } = useUserData();
  const [readyToCheck, setReadyToCheck] = useState(false);
  const { openAIAPIKey } = useOpenAICredentials();
  const {
    data: openaIData,
    isLoading,
    isError,
  } = useOpenAIHealthCheck(openAIAPIKey, readyToCheck);

  useEffect(() => {
    setReadyToCheck(!!openAIAPIKey?.trim());
  }, [openAIAPIKey]);

  const activateOpenAI = async () => {
    await activateLLM("openai", user);
    refetchUserData(); // Refresh user data to get updated activeLLM
  };

  const isConnected = openaIData?.valid;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">OpenAI API</CardTitle>
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
        <p className="text-xs text-muted-foreground">
          {isLoading
            ? "Loading..."
            : isConnected
              ? "Connected"
              : isError
                ? openaIData?.message || "Health check failed. Try again."
                : "Action required"}
        </p>
        <ActivationButton
          currentLLM={user?.activeLLM}
          targetLLM="openai"
          onActivate={activateOpenAI}
        />
      </CardContent>
    </Card>
  );
};

export default OpenAIStatus;
