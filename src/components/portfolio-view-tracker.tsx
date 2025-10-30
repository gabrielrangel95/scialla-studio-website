"use client";

import { useEffect } from "react";
import { trackPortfolioView } from "@/lib/google-ads/gtag-events";

interface PortfolioViewTrackerProps {
  projectSlug: string;
  projectTitle: string;
  category?: string[];
  location?: string;
}

/**
 * Client component to track portfolio project views for Google Ads
 * This component should be added to portfolio project pages
 */
export function PortfolioViewTracker({
  projectSlug,
  projectTitle,
  category,
  location,
}: PortfolioViewTrackerProps) {
  useEffect(() => {
    // Track the portfolio view when the component mounts
    trackPortfolioView({
      projectSlug,
      projectTitle,
      category: category?.join(", "),
      location,
    });
  }, [projectSlug, projectTitle, category, location]);

  // This component doesn't render anything
  return null;
}
