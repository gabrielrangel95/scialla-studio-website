/**
 * TypeScript declarations for Google Analytics gtag.js
 * This allows TypeScript to recognize the gtag global function and dataLayer
 */

export {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GtagDataLayer = any[];

interface GtagConfig {
  // Common parameters
  send_to?: string;
  event_callback?: () => void;
  event_timeout?: number;

  // Conversion parameters
  value?: number;
  currency?: string;
  transaction_id?: string;

  // Custom parameters
  [key: string]: string | number | boolean | undefined;
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
