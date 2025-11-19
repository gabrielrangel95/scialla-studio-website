/**
 * Google Ads Conversion Tracking via gtag.js
 * These functions track conversion events for Google Ads campaigns
 */

/**
 * Track contact form submission (Primary Conversion Event)
 * This sends a conversion event to Google Ads for lead generation tracking
 *
 * @param location - Optional location identifier (e.g., "orlando", "tampa")
 * @param projectType - Optional project type (e.g., "kitchen", "bathroom")
 */
export function trackFormSubmitSuccess(params?: {
  location?: string;
  projectType?: string;
}) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

  try {
    // Send Google Ads conversion event if configured
    if (googleAdsId && conversionLabel && googleAdsId !== 'AW-XXXXXXXXXX' && conversionLabel !== 'your-label-here') {
      const sendTo = `${googleAdsId}/${conversionLabel}`;

      window.gtag("event", "conversion", {
        send_to: sendTo,
        // Include location and project type as conversion data
        ...(params?.location && { location: params.location }),
        ...(params?.projectType && { project_type: params.projectType }),
      });

      console.log("✅ Google Ads: Conversion event sent", { sendTo, params });
    } else {
      console.warn("⚠️ Google Ads conversion not configured. Add NEXT_PUBLIC_GOOGLE_ADS_ID and NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL to .env.local");
    }

    // Also send custom event for Google Analytics tracking
    window.gtag("event", "generate_lead", {
      event_category: "engagement",
      ...(params?.location && { location: params.location }),
      ...(params?.projectType && { project_type: params.projectType }),
    });

    console.log("✅ Google Analytics: generate_lead event tracked", params);
  } catch (error) {
    console.error("❌ Failed to track conversion:", error);
  }
}

/**
 * Track phone number click
 *
 * @param ctaLocation - Where the phone CTA was clicked (e.g., "header", "contact_section", "footer")
 */
export function trackPhoneClick(ctaLocation?: string) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  try {
    window.gtag("event", "phone_click", {
      event_category: "engagement",
      event_label: ctaLocation || "unknown",
      cta_location: ctaLocation,
    });

    console.log("✅ Google Ads: phone_click event tracked", { ctaLocation });
  } catch (error) {
    console.error("❌ Failed to track phone_click:", error);
  }
}

/**
 * Track email link click
 *
 * @param ctaLocation - Where the email CTA was clicked (e.g., "header", "contact_section", "footer")
 */
export function trackEmailClick(ctaLocation?: string) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  try {
    window.gtag("event", "email_click", {
      event_category: "engagement",
      event_label: ctaLocation || "unknown",
      cta_location: ctaLocation,
    });

    console.log("✅ Google Ads: email_click event tracked", { ctaLocation });
  } catch (error) {
    console.error("❌ Failed to track email_click:", error);
  }
}

/**
 * Track portfolio project view
 *
 * @param projectSlug - The project identifier/slug
 * @param projectTitle - Optional project title
 * @param category - Optional project category
 * @param location - Optional project location
 */
export function trackPortfolioView(params: {
  projectSlug: string;
  projectTitle?: string;
  category?: string;
  location?: string;
}) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  try {
    window.gtag("event", "view_portfolio_project", {
      event_category: "engagement",
      project_slug: params.projectSlug,
      ...(params.projectTitle && { project_title: params.projectTitle }),
      ...(params.category && { category: params.category }),
      ...(params.location && { location: params.location }),
    });

    console.log("✅ Google Ads: view_portfolio_project event tracked", params);
  } catch (error) {
    console.error("❌ Failed to track view_portfolio_project:", error);
  }
}

/**
 * Generic event tracker for custom conversion events
 *
 * @param eventName - The name of the conversion event
 * @param params - Optional event parameters
 */
export function trackCustomEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  try {
    window.gtag("event", eventName, params);
    console.log(`✅ Google Ads: ${eventName} event tracked`, params);
  } catch (error) {
    console.error(`❌ Failed to track ${eventName}:`, error);
  }
}
