"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";

const OpenAIConfig = ({}) => {
  const [openAIAPIKey, setOpenAIAPIKey] = useState("");
  console.log(openAIAPIKey, "openAIAPIKey");
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
