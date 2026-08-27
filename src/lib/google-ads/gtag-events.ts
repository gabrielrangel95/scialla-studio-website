/**
 * Google Ads Conversion Tracking via gtag.js
 * These functions track conversion events for Google Ads campaigns
 */

/**
 * Normalises a phone number to the E.164 form Google requires for enhanced
 * conversions. Anything it cannot confidently convert is dropped rather than
 * sent in a shape that would never match.
 */
function toE164(phone: string): string | undefined {
  const trimmed = phone.trim();

  if (trimmed.startsWith("+")) {
    const digits = trimmed.slice(1).replace(/\D/g, "");
    return digits.length >= 8 ? `+${digits}` : undefined;
  }

  const digits = trimmed.replace(/\D/g, "");

  // The form is US/CA-facing, so a bare 10-digit number means +1.
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;

  return undefined;
}

/**
 * Splits the single name field into the first/last pair Google matches on.
 * A one-word name is sent as a first name only.
 */
function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return undefined;

  return {
    first_name: parts[0],
    ...(parts.length > 1 && { last_name: parts.slice(1).join(" ") }),
  };
}

/**
 * Track contact form submission (Primary Conversion Event)
 *
 * Sends the Google Ads conversion only; the matching GA4 generate_lead event is
 * sent by trackFormSubmit() so each submission is counted exactly once per tag.
 *
 * Identifiers from the form are attached as enhanced conversion data first.
 * gtag normalises and SHA-256 hashes `user_data` in the browser before it
 * leaves the page, so no raw identifier is transmitted; it recovers the
 * attribution that cookie restrictions (Safari/ITP in particular) otherwise
 * drop. This still has to be switched on for the conversion action under
 * Google Ads → Goals → Conversions → Settings before it takes effect.
 *
 * @param location - Optional location identifier (e.g., "orlando", "tampa")
 * @param projectType - Optional project type (e.g., "kitchen", "bathroom")
 * @param transactionId - Unique per submission; lets Ads discard a conversion
 *   it has already recorded rather than counting a repeat send twice
 * @param userData - Identifiers for enhanced conversions
 */
export function trackFormSubmitSuccess(params?: {
  location?: string;
  projectType?: string;
  transactionId?: string;
  userData?: {
    name?: string;
    email?: string;
    phone?: string;
  };
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

      // Enhanced conversion identifiers must be set *before* the conversion
      // event, so gtag picks them up when it builds the request.
      const email = params?.userData?.email?.trim().toLowerCase();
      const phoneNumber = params?.userData?.phone
        ? toE164(params.userData.phone)
        : undefined;
      const address = params?.userData?.name
        ? splitName(params.userData.name)
        : undefined;

      if (email || phoneNumber || address) {
        window.gtag("set", "user_data", {
          ...(email && { email }),
          ...(phoneNumber && { phone_number: phoneNumber }),
          ...(address && { address }),
        });
      }

      window.gtag("event", "conversion", {
        send_to: sendTo,
        ...(params?.transactionId && { transaction_id: params.transactionId }),
        // Include location and project type as conversion data
        ...(params?.location && { location: params.location }),
        ...(params?.projectType && { project_type: params.projectType }),
      });

      // Deliberately not logging params: it carries the raw identifiers.
      console.log("✅ Google Ads: Conversion event sent", {
        sendTo,
        transactionId: params?.transactionId,
        enhanced: Boolean(email || phoneNumber || address),
      });
    } else {
      console.warn("⚠️ Google Ads conversion not configured. Add NEXT_PUBLIC_GOOGLE_ADS_ID and NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL to .env.local");
    }

    // GA4's generate_lead is owned by trackFormSubmit() in lib/analytics.
    // Firing it here too sent the event twice per submission — once to GA4 and,
    // because it carried no send_to, a second time to the Ads tag, which would
    // double-count the lead wherever generate_lead is also a conversion action.
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
