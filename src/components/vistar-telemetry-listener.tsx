"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/telemetry";

export function VistarTelemetryListener() {
  const pathname = usePathname();

  // 1. Automatic route-change page view telemetry
  useEffect(() => {
    trackEvent("page_view", {
      path: pathname,
      title: document.title,
    });
  }, [pathname]);

  // 2. Real-User Monitoring (RUM) for Core Web Vitals (LCP, CLS, INP)
  useEffect(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;

    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const lcpValue = Math.round(lastEntry.startTime);
          const rating =
            lcpValue <= 2500 ? "good" : lcpValue <= 4000 ? "needs-improvement" : "poor";
          trackEvent("web_vitals", {
            metricName: "LCP",
            metricValue: lcpValue,
            metricRating: rating,
          });
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as unknown as { hadRecentInput?: boolean }).hadRecentInput) {
            clsValue += (entry as unknown as { value?: number }).value || 0;
          }
        }
        const roundedCls = Math.round(clsValue * 1000) / 1000;
        const rating =
          roundedCls <= 0.1 ? "good" : roundedCls <= 0.25 ? "needs-improvement" : "poor";
        trackEvent("web_vitals", {
          metricName: "CLS",
          metricValue: roundedCls,
          metricRating: rating,
        });
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });

      return () => {
        lcpObserver.disconnect();
        clsObserver.disconnect();
      };
    } catch {
      // PerformanceObserver unsupported or restricted
    }
  }, [pathname]);

  return null;
}
