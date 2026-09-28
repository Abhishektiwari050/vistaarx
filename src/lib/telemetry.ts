/**
 * VISTAR TELEMETRY ENGINE — Layer 03 (GROW) Primitive
 * 
 * First-party, privacy-preserving event telemetry.
 * Zero 3rd-party ad trackers, zero cookies, zero bloat (< 1KB).
 * Strictly complies with GDPR, CCPA, and "Do Not Track" signals.
 */

export type TelemetryEventType =
  | "page_view"
  | "diagnostic_step_view"
  | "diagnostic_option_select"
  | "diagnostic_submit"
  | "fast_track_submit"
  | "escape_hatch_click"
  | "cta_click"
  | "case_study_view"
  | "web_vitals";

export interface TelemetryPayload {
  event: TelemetryEventType;
  path?: string;
  referrer?: string;
  step?: number;
  stepTitle?: string;
  category?: string;
  value?: string | number;
  referenceId?: string;
  channel?: "whatsapp" | "calendly" | "email";
  label?: string;
  destination?: string;
  metricName?: string;
  metricValue?: number;
  metricRating?: "good" | "needs-improvement" | "poor";
  timestamp?: number;
  [key: string]: unknown;
}

/**
 * Dispatches an event to the first-party telemetry sink asynchronously.
 * Uses Beacon API for non-blocking execution during navigation.
 */
export function trackEvent(
  event: TelemetryEventType,
  data: Omit<TelemetryPayload, "event" | "timestamp" | "path"> = {}
): void {
  if (typeof window === "undefined") return;

  // Respect user's Do Not Track preference
  if (navigator.doNotTrack === "1" || (window as unknown as { doNotTrack?: string }).doNotTrack === "1") {
    return;
  }

  const payload: TelemetryPayload = {
    event,
    path: window.location.pathname,
    referrer: document.referrer || undefined,
    timestamp: Date.now(),
    ...data,
  };

  const endpoint = "/api/telemetry";
  const body = JSON.stringify(payload);

  try {
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(endpoint, blob);
    } else {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {
        // Silently swallow telemetry transport errors to prevent UI impact
      });
    }
  } catch {
    // Fail silently in restricted sandbox environments
  }
}
