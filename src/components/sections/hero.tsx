"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";

export function Hero() {
  const t = useTranslations('hero');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/scialla-home-background.avif"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/scialla-studio-home-page-background-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/10" />

      {/* Content */}
      <div className="hero-content">
        <div className="hero-inner">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 leading-tight tracking-tight">
            {t('mainTitle')}
          </h1>

          {/* Brief descriptor */}
          <p className="text-base md:text-lg text-white/70 mb-10 font-light tracking-wide max-w-2xl mx-auto">
            {t('heroDescription')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="bg-white text-black hover:bg-white/90 px-8 py-3 text-sm font-medium tracking-widest uppercase transition-all duration-300"
            >
              {t('ctaPrimary')}
            </Button>

            <Button
              onClick={() => scrollToSection("projects")}
              variant="outline"
              size="lg"
              className="border border-white text-white hover:bg-white/10 px-8 py-3 text-sm font-medium tracking-widest uppercase bg-transparent transition-all duration-300"
            >
              {t('ctaSecondary')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
