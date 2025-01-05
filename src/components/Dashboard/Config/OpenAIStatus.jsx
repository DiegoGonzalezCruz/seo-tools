"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "lucide-react";
import { useSession } from "next-auth/react";
import { useOpenAIHealthCheck } from "@/hooks/config/useOpenAIHealthCheck";
import { useOpenAICredentials } from "@/hooks/config/useOpenAICredentials";
import { useState, useEffect } from "react";

const OpenAIStatus = () => {
  const { data, status } = useSession();
  const user = data?.user;

  const { openAIAPIKey } = useOpenAICredentials();
  const [readyToCheck, setReadyToCheck] = useState(false);

  // Trigger health check only when the API key is valid
  useEffect(() => {
    if (openAIAPIKey && openAIAPIKey.trim() !== "") {
      setReadyToCheck(true);
    } else {
      setReadyToCheck(false);
    }
  }, [openAIAPIKey]);

  const isEnabled = status === "authenticated" && readyToCheck;

  const {
    data: openaIData,
    isLoading,
    isFetching,
    isError,
  } = useOpenAIHealthCheck(openAIAPIKey, isEnabled);

  console.log(openAIAPIKey, "openAIAPIKey");
  console.log(openaIData, "openaIData");

  const isComponentLoading = isLoading || isFetching || !readyToCheck;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">OpenAI API</CardTitle>
        <Database className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isComponentLoading ? (
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        ) : (
          <div className="text-2xl font-bold">
            {openaIData && openaIData.valid ? "Connected" : "Disconnected"}
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {isComponentLoading
            ? "Loading..."
            : openaIData && openaIData.valid
              ? "Resource usage: 100%"
              : isError
                ? openaIData?.message || "Health check failed. Try again."
                : "Action required"}
        </p>
      </CardContent>
    </Card>
  );
};

export default OpenAIStatus;
