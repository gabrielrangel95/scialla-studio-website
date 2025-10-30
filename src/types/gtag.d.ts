/**
 * TypeScript declarations for Google Analytics gtag.js
 * This allows TypeScript to recognize the gtag global function and dataLayer
 */

export {};

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetIdOrEventName: string | Date,
      config?: {
        // Common parameters
        send_to?: string;
        event_callback?: () => void;
        event_timeout?: number;

        // Conversion parameters
        value?: number;
        currency?: string;
        transaction_id?: string;

        // Custom parameters
        [key: string]: any;
      }
    ) => void;
  }
}
