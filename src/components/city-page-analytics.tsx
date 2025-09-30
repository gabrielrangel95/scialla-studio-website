"use client";

import { trackButtonClick, trackCityPageInteraction } from "@/lib/firebase/analytics";

export function useCityPageAnalytics(city: string) {
  const trackCTAClick = (ctaType: "consultation" | "portfolio", destination?: string) => {
    trackButtonClick({
      button_name: ctaType === "consultation" ? "Get Free Consultation" : "View Portfolio",
      button_location: `city_page_${city}`,
      destination: destination || "#contact",
    });
  };

  const trackServiceClick = (serviceName: string) => {
    trackCityPageInteraction(city, "service_click", serviceName);
  };

  const trackNeighborhoodView = (neighborhood: string) => {
    trackCityPageInteraction(city, "neighborhood_view", neighborhood);
  };

  return {
    trackCTAClick,
    trackServiceClick,
    trackNeighborhoodView,
  };
}