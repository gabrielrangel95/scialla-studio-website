"use client";

import { useEffect } from "react";
import { trackFilterChange, trackPortfolioBrowsing } from "@/lib/firebase/analytics";

interface PortfolioAnalyticsProps {
  city?: string;
  category?: string;
}

export function usePortfolioAnalytics({ city, category }: PortfolioAnalyticsProps) {
  // Track filter changes
  useEffect(() => {
    if (city) {
      trackFilterChange({
        filter_type: "city",
        filter_value: city,
        page: "portfolio",
      });
    }
  }, [city]);

  useEffect(() => {
    if (category) {
      trackFilterChange({
        filter_type: "category",
        filter_value: category,
        page: "portfolio",
      });
    }
  }, [category]);

  const trackProjectClick = (projectSlug: string, projectLocation?: string, projectCategory?: string) => {
    trackPortfolioBrowsing("project_click", {
      project_slug: projectSlug,
      location: projectLocation,
      category: projectCategory,
    });
  };

  const trackLoadMore = (currentPage: number) => {
    trackPortfolioBrowsing("load_more", {
      page_number: currentPage,
    });
  };

  return {
    trackProjectClick,
    trackLoadMore,
  };
}