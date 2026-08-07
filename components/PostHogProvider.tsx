"use client";

import React, { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const phKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || "phc_up8aZnJND2NhikqznudWKJUN2XfQN4VYqKDJN2pkEdEd";
    const phHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    if (typeof window !== "undefined") {
      posthog.init(phKey, {
        api_host: phHost,
        person_profiles: "identified_only",
        capture_pageview: true,
        capture_pageleave: true,
      });
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
