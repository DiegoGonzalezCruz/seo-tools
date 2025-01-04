"use client";

import { Badge } from "@/components/ui/badge";
import { useOllamaRunning } from "@/hooks/config/useOllamaRunning";
import { useOpenAIHealthCheck } from "@/hooks/config/useOpenAIHealthCheck";
import { useUserWPInstances } from "@/hooks/config/useUserWPInstances";
import { AlertCircle } from "lucide-react";
import { Check } from "lucide-react";

import { useSession } from "next-auth/react";

const Status = () => {
  const { data, status } = useSession();

  const user = data?.user;
  // console.log(data, "user");

  const userId = user?.id;
  const {
    data: wpData,
    isLoading: wpLoading,
    isSuccess: wpIsSuccess,
  } = useUserWPInstances({
    userId,
    enabled: status === "authenticated" && !!user,
  });

  const {
    data: openAIData,
    isSuccess: openAIIsSuccess,
    isLoading: openAILoading,
  } = useOpenAIHealthCheck({
    userId,
    enabled: status === "authenticated" && !!user,
  });
  const { data: ollamaAvailable, isLoading, isError } = useOllamaRunning();

  console.log(openAIData, "openAIData");
  console.log(wpData, "wpData");
  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">LLM Integration Dashboard</h1>
        <div className="flex items-center space-x-2"></div>
        <Badge variant={ollamaAvailable && wpData ? "default" : "destructive"}>
          {ollamaAvailable && wpData ? (
            <>
              <Check className="mr-1 h-4 w-4" /> All Systems Operational
            </>
          ) : (
            <>
              <AlertCircle className="mr-1 h-4 w-4" /> Action Required
            </>
          )}
        </Badge>
      </header>
    </div>
  );
};

export default Status;
