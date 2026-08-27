/**
 * TypeScript declarations for Google Analytics gtag.js
 * This allows TypeScript to recognize the gtag global function and dataLayer
 */

export {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GtagDataLayer = any[];

/**
 * Enhanced conversion identifiers passed via gtag("set", "user_data", ...).
 * gtag normalises and hashes these in the browser before sending them.
 */
interface GtagUserData {
  email?: string;
  /** E.164, e.g. +14155551234 */
  phone_number?: string;
  address?: {
    first_name?: string;
    last_name?: string;
    street?: string;
    city?: string;
    region?: string;
    postal_code?: string;
    country?: string;
  };
}

interface GtagConfig {
  // Common parameters
  send_to?: string;
  event_callback?: () => void;
  event_timeout?: number;

  // Conversion parameters
  value?: number;
  currency?: string;
  transaction_id?: string;

  // Enhanced conversions
  address?: GtagUserData["address"];

  // Custom parameters
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | (() => void)
    | GtagUserData["address"];
}

declare global {
  interface Window {
    dataLayer: GtagDataLayer;
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetIdOrEventName: string | Date,
      config?: GtagConfig
    ) => void;
  }
}
