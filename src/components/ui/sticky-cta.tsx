"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics/analytics";

export function StickyCTA() {
  const t = useTranslations("stickyCta");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get hero section height (approximate)
      const heroHeight = window.innerHeight * 0.8;
      const scrollY = window.scrollY;

      // Get contact section
      const contactSection = document.getElementById("contact");
      const contactTop = contactSection?.getBoundingClientRect().top ?? Infinity;

      // Show sticky CTA after scrolling past hero, hide when contact is visible
      const shouldShow = scrollY > heroHeight && contactTop > window.innerHeight;
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    trackCTAClick("sticky_cta", "mobile_bottom", "#contact");
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50 md:hidden
        transform transition-transform duration-300 ease-out
        ${isVisible ? "translate-y-0" : "translate-y-full"}
      `}
    >
      {/* Gradient fade effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white to-transparent -top-4 pointer-events-none" />

      {/* CTA Container */}
      <div className="relative bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <Button
          onClick={scrollToContact}
          size="lg"
          className="w-full bg-black text-white hover:bg-gray-800 py-4 text-base font-medium tracking-wide transition-all duration-300"
        >
          {t("buttonText")}
        </Button>
      </div>
    </div>
  );
}
