"use client";

import { createContext, useContext, useState } from "react";
import type { ContactFormData } from "@/lib/validations/contact";

/**
 * The submission details the thank-you page reads back to the visitor.
 *
 * These used to travel to /thank-you in the query string, which put the
 * visitor's name and free-text location into `page_location` on the GA4
 * page_view — personally identifiable data that Google's policy forbids and
 * that gets reports purged when it is detected.
 *
 * A client-side router.push keeps the React tree mounted, so a context held in
 * the locale layout carries the details across the navigation with nothing in
 * the URL. Storage APIs are deliberately not used here (see CLAUDE.md), and a
 * cold visit or refresh of /thank-you simply falls back to the generic copy.
 */
export type LeadSubmission = Pick<
  ContactFormData,
  "name" | "location" | "projectType" | "budget" | "timeline" | "message"
>;

type LeadSubmissionContextValue = {
  submission: LeadSubmission | null;
  setSubmission: (submission: LeadSubmission) => void;
};

const LeadSubmissionContext = createContext<LeadSubmissionContextValue | null>(
  null
);

export function LeadSubmissionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [submission, setSubmission] = useState<LeadSubmission | null>(null);

  return (
    <LeadSubmissionContext.Provider value={{ submission, setSubmission }}>
      {children}
    </LeadSubmissionContext.Provider>
  );
}

export function useLeadSubmission() {
  const context = useContext(LeadSubmissionContext);

  if (!context) {
    throw new Error(
      "useLeadSubmission must be used inside <LeadSubmissionProvider>"
    );
  }

  return context;
}
