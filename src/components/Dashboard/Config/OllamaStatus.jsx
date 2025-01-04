"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Cpu } from "lucide-react";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useWordpressCredentials } from "@/hooks/config/useWordpressCredentials";
import { useOllamaRunning } from "@/hooks/config/useOllamaRunning";

const OllamaStatus = ({}) => {
  const { data, isSuccess, isLoading } = useOllamaRunning();
  // console.log(data, "data");
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Local AI (Ollama)</CardTitle>
        <Cpu className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        ) : (
          <div className="text-2xl font-bold">
            {data ? "Connected" : "Disconnected"}
          </div>
        )}

        {/* <p className="text-xs text-muted-foreground">
          {isLoading
            ? "Loading..."
            : ollamaAvailable
              ? "Resource usage: 100%"
              : "Action required"}
        </p> */}
        {/* <Progress value={ollamaAvailable ? 100 : 0} className="mt-2" /> */}
      </CardContent>
    </Card>
  );
};

export default OllamaStatus;
