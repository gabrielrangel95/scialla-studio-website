/**
 * Google tag configuration.
 *
 * The GA4 property is the same one Firebase reported to, so the historical
 * measurement ID stays the default and existing reports keep their continuity.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
  "G-W9E7CRVYQ2";

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export const HAS_GOOGLE_ADS =
  Boolean(GOOGLE_ADS_ID) && GOOGLE_ADS_ID !== "AW-XXXXXXXXXX";
