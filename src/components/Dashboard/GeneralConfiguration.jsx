"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Check,
  Cloud,
  Cpu,
  Database,
  Gauge,
  Settings,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

import { useSession } from "next-auth/react";
import {
  getActiveWordPressInstance,
  getUserWPInstances,
  getWPInstance,
  validateWordPressCredentials,
} from "@/lib/wordpress";
import prisma from "@/lib/prisma";

export default function GeneralConfiguration() {
  const [wpSiteURL, setWpSiteURL] = useState("");
  const [wpUsername, setWpUsername] = useState("");
  const [wpPassword, setWpPassword] = useState("");

  const { data, status } = useSession();
  const user = data?.user;
  // console.log(user, "user");
  const {
    data: healthCheckData,
    isLoading: healthCheckLoading,
    isSuccess: ollamaSuccess,
  } = useQuery({
    queryKey: ["ollama-health-check"],
    queryFn: async () => {
      const response = await fetch("/api/health-check/ollama");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchInterval: 60 * 1000 * 1,
    enabled: status === "authenticated" && !!user,
  });

  const {
    data: wordpressCheckData,
    isLoading: wordpressCheckLoading,
    isSuccess: wordpressSuccess,
  } = useQuery({
    queryKey: ["wp-health-check"],
    queryFn: async () => {
      const response = await fetch("/api/health-check/wordpress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });
      return response.json();
    },
    enabled: status === "authenticated" && !!user,
  });

  const saveCredentialsMutation = useMutation({
    mutationFn: async () => {
      const isValid = await validateWordPressCredentials(
        wpSiteURL,
        wpUsername,
        wpPassword
      );
      if (!isValid) {
        throw new Error("Invalid WordPress credentials");
      }

      const response = await fetch("/api/wordpressInstances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wpSiteURL,
          wpUsername,
          wpPassword,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save configuration");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate queries or show success message
      toast.success("Configuration saved successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data: wpData } = useQuery({
    queryKey: ["wp-instance-data", user],
    queryFn: () => getUserWPInstances(user.id),
    enabled: status === "authenticated" && !!user,
  });
  console.log(wpData, "wpData");

  const wpActiveInstance = wpData?.filter((wp) => wp.isActive)[0];
  // console.log(wpActiveInstance, "wpActiveInstance");

  // console.log(wordpressCheckData, "wordpressCheckData");
  // Populate fields with wpData when it's loaded
  useEffect(() => {
    if (wpData && wpData.length > 0) {
      const activeInstance = wpData.find((wp) => wp.isActive);
      if (activeInstance) {
        setWpSiteURL(activeInstance.url);
        setWpUsername(activeInstance.appUsername);
        setWpPassword(activeInstance.appPassword);
      }
    }
  }, [wpData]);

  return (
    <div className="container mx-auto p-4 space-y-4  h-full">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">LLM Integration Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Badge
            variant={
              healthCheckData && wordpressCheckData ? "default" : "destructive"
            }
          >
            {healthCheckData && wordpressCheckData ? (
              <>
                <Check className="mr-1 h-4 w-4" /> All Systems Operational
              </>
            ) : (
              <>
                <AlertCircle className="mr-1 h-4 w-4" /> Action Required
              </>
            )}
          </Badge>
        </div>
      </header>

      <Tabs defaultValue="health" className="space-y-4">
        <TabsList>
          <TabsTrigger value="health">Health Check</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          {/* <TabsTrigger value="workflow">Workflow Automation</TabsTrigger> */}
        </TabsList>

        <TabsContent value="health" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Local AI (Ollama)
                </CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {healthCheckLoading ? (
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                ) : (
                  <div className="text-2xl font-bold">
                    {healthCheckData ? "Connected" : "Disconnected"}
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  {healthCheckLoading
                    ? "Loading..."
                    : healthCheckData
                      ? "Resource usage: 100%"
                      : "Action required"}
                </p>
                <Progress value={healthCheckData ? 100 : 0} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  WordPress API
                </CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {wordpressCheckLoading ? (
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                ) : (
                  <div className="text-2xl font-bold">
                    {wordpressCheckData ? "Connected" : "Disconnected"}
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  {wordpressCheckLoading
                    ? "Loading..."
                    : wordpressCheckData
                      ? "Resource usage: 100%"
                      : "Action required"}
                </p>
                <Progress
                  value={wordpressCheckData ? 100 : 0}
                  className="mt-2"
                />
              </CardContent>
            </Card>
          </div>

          {/* <Card>
            <CardHeader>
              <CardTitle>Error Logs</CardTitle>
              <CardDescription>
                Recent issues and troubleshooting tips
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">No recent errors to display.</p>
                <Button variant="outline">View Full Logs</Button>
              </div>
            </CardContent>
          </Card> */}
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>WordPress API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="url">WordPress URL</Label>
                <input
                  id="url"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="https://your-wordpress-site.com"
                  value={wpSiteURL}
                  onChange={(e) => setWpSiteURL(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="wp-user">WordPress User</Label>
                <input
                  id="wp-user"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Username"
                  value={wpUsername}
                  onChange={(e) => setWpUsername(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="wp-key">WordPress Application Password</Label>
                <input
                  id="wp-key"
                  type="password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your WordPress API key"
                  value={wpPassword}
                  onChange={(e) => setWpPassword(e.target.value)}
                />
              </div>
              <Button onClick={() => saveCredentialsMutation.mutate()}>
                Save WordPress Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
