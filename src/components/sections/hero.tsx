"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { ADPROBadge } from "@/components/ui/adpro-badge";
import { Label } from "../ui/label";

export function Hero() {
  const t = useTranslations('hero');

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
            alt={t('imageAlt')}
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
            {/* Architectural Digest Badge - Above Headline */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Label className="text-white text-sm">
                  {t('featuredIn')}
                </Label>
                <ADPROBadge size="sm" variant="white" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 leading-tight tracking-tight">
              {t('mainTitle')}
            </h1>

            {/* Location Line */}
            <p className="text-lg md:text-xl text-white/80 mb-4 tracking-wide">
              {t('location')}
            </p>

            {/* Luxury Qualifier */}
            <p className="text-base md:text-lg text-white/70 mb-6 italic">
              {t('luxuryQualifier')}
            </p>

            {/* Subheading */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 leading-relaxed font-light max-w-3xl mx-auto">
              {t('subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium tracking-wide w-[240px] sm:w-[280px] transition-all duration-300 hover:scale-105"
              >
                {t('ctaPrimary')}
              </Button>

              <Button
                onClick={() => scrollToSection("portfolio")}
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium tracking-wide w-[240px] sm:w-[280px] bg-transparent transition-all duration-300 hover:scale-105"
              >
                {t('ctaSecondary')}
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Indicator - Bottom */}
        <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <p className="text-white/60 text-sm tracking-wider">
            {t('trustIndicator')}
          </p>
        </div>
      </div>
    </section>
  );
}
