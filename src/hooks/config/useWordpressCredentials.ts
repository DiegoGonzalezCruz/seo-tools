"use client";
import { getUserWPInstances } from "@/lib/wordpress";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
// hooks/useWordpressCredentials.ts
import { useState, useEffect } from "react";

interface WPInstance {
  url: string;
  appUsername: string;
  appPassword: string;
  isActive: boolean;
}

export function useWordpressCredentials(wpData?: WPInstance[]) {
  const [wpSiteURL, setWpSiteURL] = useState("");
  const [wpUsername, setWpUsername] = useState("");
  const [wpPassword, setWpPassword] = useState("");

  const {
    data: { user },
    status,
  } = useSession();
  console.log(user, "userData");

  const { data } = useQuery({
    queryKey: ["wp-instance-data", user],
    queryFn: () => getUserWPInstances(user.id),
    enabled: status === "authenticated" && !!user,
  });
  console.log(data, "wpData");

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

  return {
    wpSiteURL,
    setWpSiteURL,
    wpUsername,
    setWpUsername,
    wpPassword,
    setWpPassword,
  };
}
