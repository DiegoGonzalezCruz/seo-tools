"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOpenAICredentials } from "@/hooks/config/useOpenAICredentials";

import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const OpenAIConfig = ({}) => {
  // console.log(openAIAPIKey, "openAIAPIKey");
  const { openAIAPIKey, setOpenAIAPIKey } = useOpenAICredentials();

  const { data: session } = useSession();
  const user = session?.user;

  const saveCredentialsMutation = useMutation({
    mutationFn: async () => {
      if (!user || !user.id) {
        return toast.error("User is not authenticated");
      }
      // Perform the health check directly here
      const healthCheckResponse = await fetch(
        `/api/health-check/openai?apiKey=${openAIAPIKey}`,
        {
          method: "GET",
        }
      );

      const healthCheck = await healthCheckResponse.json();

      if (!healthCheck.valid) {
        throw new Error(healthCheck.message || "Invalid OpenAI API Key");
      }

      const response = await fetch("/api/instances/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          openAIAPIKey,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save configuration");
      }
      const data = await response.json();
      // console.log(data, "Saved Data");
      return data;
    },
    onSuccess: () => {
      toast.success("Configuration saved successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Card className="w-full md:w-1/2 h-full ">
      <CardHeader>
        <CardTitle>Open AI Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="url">Open AI API Key</Label>
          <input
            id="openai-key"
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="sk-proj-...."
            value={openAIAPIKey}
            onChange={(e) => setOpenAIAPIKey(e.target.value)}
          />
        </div>

        <Button onClick={() => saveCredentialsMutation.mutate()}>
          Save OpenAI Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default OpenAIConfig;
