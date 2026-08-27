import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  HAS_GOOGLE_ADS,
} from "@/lib/analytics/config";

/**
 * Defines window.gtag synchronously in <head>, before hydration, so no event
 * fired during the first paint is dropped.
 *
 * GA4 page_view is disabled here on purpose: PageViewTracker owns it, so the
 * initial load and every client-side route change are each reported exactly
 * once. The Google Ads tag keeps its automatic page_view — remarketing
 * audiences depend on it.
 */
export function GoogleTagBootstrap({
  sendPageView = false,
}: {
  /**
   * Report this page's page_view from the inline script itself. For pages
   * rendered outside AnalyticsProvider — the root 404 — where waiting on React
   * to hydrate would mean never reporting at all. page_title is left out on
   * purpose: gtag fills it in when it processes the queue, by which point
   * <title> has been parsed.
   */
  sendPageView?: boolean;
} = {}) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: [
          "window.dataLayer = window.dataLayer || [];",
          "function gtag(){dataLayer.push(arguments);}",
          "gtag('js', new Date());",
          `gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`,
          // allow_enhanced_conversions lets the tag accept the hashed
          // identifiers trackFormSubmitSuccess sets before a conversion.
          HAS_GOOGLE_ADS
            ? `gtag('config', '${GOOGLE_ADS_ID}', { allow_enhanced_conversions: true });`
            : "",
          sendPageView
            ? `gtag('event', 'page_view', { send_to: '${GA_MEASUREMENT_ID}', page_path: location.pathname, page_location: location.href });`
            : "",
        ]
          .filter(Boolean)
          .join("\n"),
      }}
    />
  );
}

/** Loads gtag.js. Queued dataLayer calls are flushed once it arrives. */
export function GoogleTagScript() {
  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
  );
}
