"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section px-4 md:px-6 lg:px-12 xl:px-16">
      <div className="hero-image-container">
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
              Award-Winning Interior Designer
              <span className="block mt-2">Orlando | Tampa | NYC | Los Angeles</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 leading-relaxed font-light">
              Award-winning interior design studio transforming luxury homes and
              commercial spaces since 2010
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-medium tracking-wide min-w-[200px] transition-all duration-300 hover:scale-105"
              >
                Get a Consultation
              </Button>

              <Button
                onClick={() => scrollToSection("portfolio")}
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium tracking-wide min-w-[200px] bg-transparent transition-all duration-300 hover:scale-105"
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
