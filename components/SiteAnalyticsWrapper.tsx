"use client";

import React from "react";
import { useSiteAnalyticsTracker } from "@/lib/siteAnalytics";

export default function SiteAnalyticsWrapper({ children }: { children: React.ReactNode }) {
  useSiteAnalyticsTracker();
  return <>{children}</>;
}
