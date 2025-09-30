"use client";

import { AnalyticsButton } from "@/components/ui/analytics-button";

interface CityPageButtonsProps {
  city: string;
}

export function CityPageButtons({ city }: CityPageButtonsProps) {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <AnalyticsButton
        size="lg"
        className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-medium"
        buttonName="get_free_consultation"
        buttonLocation={`city_page_${city}`}
        destination="#contact"
        onClick={scrollToContact}
      >
        Get Free Consultation
      </AnalyticsButton>
      <AnalyticsButton
        variant="outline"
        size="lg"
        className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium bg-transparent"
        buttonName="view_portfolio"
        buttonLocation={`city_page_${city}`}
        destination="/portfolio"
      >
        View {city} Portfolio
      </AnalyticsButton>
    </div>
  );
}