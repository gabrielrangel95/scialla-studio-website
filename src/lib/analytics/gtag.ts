"use client";

import { GA_MEASUREMENT_ID } from "./config";

export type EventParams = Record<
  string,
  string | number | boolean | undefined | null
>;

/** GA4 records empty params as empty strings, so drop them instead. */
function compact(params: EventParams) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null
    )
  ) as Record<string, string | number | boolean>;
}

/**
 * Sends an event to GA4 through gtag.
 *
 * window.gtag is defined by GoogleTagBootstrap in <head>, so it is available
 * from the very first paint. Calls made before gtag.js finishes downloading
 * queue on window.dataLayer and flush automatically once it loads — nothing is
 * dropped, which is why tracking must never be gated behind an SDK that
 * initialises asynchronously.
 */
export function sendEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  try {
    window.gtag("event", eventName, {
      send_to: GA_MEASUREMENT_ID,
      ...compact(params || {}),
    });
  } catch (error) {
    console.error(`Failed to send analytics event "${eventName}":`, error);
  }
}

/** Reports a page view. Owned solely by PageViewTracker. */
export function sendPageView(path: string) {
  sendEvent("page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
