"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ADPROBadge } from "@/components/ui/adpro-badge";
import { Label } from "../ui/label";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section px-4 md:px-6 lg:px-12 xl:px-16">
      <div className="hero-image-container pt-16 md:pt-0">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/scialla-home-background.avif"
            alt="Luxury interior design by Scialla Studio"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 85vw"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content - Absolutely centered */}
        <div className="hero-content">
          <div className="hero-inner">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl  text-white mb-6 leading-tight tracking-tight">
              Premier Interior Design & Architecture Studio
              <span className="block mt-2">
                Serving All 50 States | Studios in Orlando, Tampa, NYC & LA
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 leading-relaxed font-light">
              Award-winning architecture and interior design studio creating exceptional homes,
              new construction, and commercial spaces nationwide since 2010
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium tracking-wide w-[240px] sm:w-[280px] transition-all duration-300 hover:scale-105"
              >
                Schedule a Consultation
              </Button>

              <Button
                onClick={() => scrollToSection("portfolio")}
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium tracking-wide w-[240px] sm:w-[280px] bg-transparent transition-all duration-300 hover:scale-105"
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* Architectural Digest Badge - Desktop */}
        <div className="hidden md:flex absolute bottom-6 right-6 lg:bottom-8 lg:right-8 z-20 flex-col items-center">
          <Label className="text-white text-sm text-center mb-2">
            Featured in
          </Label>
          <ADPROBadge size="lg" variant="white" />
        </div>

        {/* Mobile Badge - Bottom Center */}
        <div className="flex md:hidden absolute bottom-4 right-4 z-20 flex-col items-center">
          <Label className="text-white text-sm text-center mb-2">
            Featured in
          </Label>
          <ADPROBadge size="md" variant="white" />
        </div>
      </div>
    </section>
  );
}
