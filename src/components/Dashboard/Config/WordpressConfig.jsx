"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWordpressCredentials } from "@/hooks/config/useWordpressCredentials";
import { validateWordPressCredentials } from "@/lib/wordpress";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const WordpressConfig = ({}) => {
  const {
    data: { user },
    status,
  } = useSession();

  // console.log("user *****", user);
  const {
    wpPassword,
    wpSiteURL,
    wpUsername,
    setWpPassword,
    setWpSiteURL,
    setWpUsername,
  } = useWordpressCredentials();
  // console.log("wpSiteURL", wpSiteURL);
  // console.log("wpUsername", wpUsername);
  // console.log("wpPassword", wpPassword);

  const saveCredentialsMutation = useMutation({
    mutationFn: async () => {
      const isValid = await validateWordPressCredentials(
        wpSiteURL,
        wpUsername,
        wpPassword
      );
      if (!isValid) {
        return toast.error("Invalid WordPress credentials");
      }

      const response = await fetch("/api/instances/wordpress", {
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
  return (
    <Card className="md:w-1/2 h-full ">
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
  );
};

export default WordpressConfig;
