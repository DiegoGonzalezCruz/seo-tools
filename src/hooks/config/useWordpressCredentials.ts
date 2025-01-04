"use client";
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
