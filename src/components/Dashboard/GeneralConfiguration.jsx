"use client";

import { useState } from "react";
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

export default function GeneralConfiguration() {
  const [localAIEnabled, setLocalAIEnabled] = useState(true);
  const [cloudAIEnabled, setCloudAIEnabled] = useState(true);

  return (
    <div className="container mx-auto p-4 space-y-4 debug1 h-full">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">LLM Integration Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Badge
            variant={
              localAIEnabled && cloudAIEnabled ? "default" : "destructive"
            }
          >
            {localAIEnabled && cloudAIEnabled ? (
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
          <TabsTrigger value="workflow">Workflow Automation</TabsTrigger>
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
                <div className="text-2xl font-bold">
                  {localAIEnabled ? "Connected" : "Disconnected"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Resource usage: 60%
                </p>
                <Progress value={60} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cloud AI (ChatGPT)
                </CardTitle>
                <Cloud className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {cloudAIEnabled ? "Connected" : "Disconnected"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tokens used: 10,234 / 100,000
                </p>
                <Progress value={10} className="mt-2" />
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
                <div className="text-2xl font-bold">Connected</div>
                <p className="text-xs text-muted-foreground">
                  Last sync: 5 minutes ago
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Performance
                </CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Excellent</div>
                <p className="text-xs text-muted-foreground">
                  Avg. response time: 200ms
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
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
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Provider Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="local-ai">Local AI (Ollama)</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable local AI processing
                  </p>
                </div>
                <Switch
                  id="local-ai"
                  checked={localAIEnabled}
                  onCheckedChange={setLocalAIEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cloud-ai">Cloud AI (ChatGPT)</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable cloud AI processing
                  </p>
                </div>
                <Switch
                  id="cloud-ai"
                  checked={cloudAIEnabled}
                  onCheckedChange={setCloudAIEnabled}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>WordPress API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="wp-url">WordPress URL</Label>
                <input
                  id="wp-url"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="https://your-wordpress-site.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="wp-key">API Key</Label>
                <input
                  id="wp-key"
                  type="password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your WordPress API key"
                />
              </div>
              <Button>Save WordPress Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Tools Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="seo-title">Optimize Page Titles</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically generate SEO-friendly page titles
                  </p>
                </div>
                <Switch id="seo-title" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="seo-description">
                    Generate Meta Descriptions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Create compelling meta descriptions for pages
                  </p>
                </div>
                <Switch id="seo-description" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Image Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="image-format">Preferred Image Format</Label>
                <Select>
                  <SelectTrigger id="image-format">
                    <SelectValue placeholder="Select image format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webp">WebP</SelectItem>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="image-alt">Generate Alt Text</Label>
                  <p className="text-sm text-muted-foreground">
                    Use AI to create descriptive alt text for images
                  </p>
                </div>
                <Switch id="image-alt" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="health-check-interval">
                  Health Check Interval
                </Label>
                <Select>
                  <SelectTrigger id="health-check-interval">
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">Every 15 minutes</SelectItem>
                    <SelectItem value="30">Every 30 minutes</SelectItem>
                    <SelectItem value="60">Every hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">
                <Zap className="mr-2 h-4 w-4" /> Run Health Check Now
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
