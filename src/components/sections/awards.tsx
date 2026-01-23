"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Badge {
  src: string;
  alt: string;
  href: string;
}

const badges: Badge[] = [
  {
    src: "/scialla-studio-architect-interior-designer-tampa-best-of-houzz-2023.png",
    alt: "Best of Houzz 2023 - Scialla Studio",
    href: "https://www.houzz.com/pro/francescosciallaarchitect/scialla-studio",
  },
  {
    src: "/scialla-studio-architect-interior-designer-tampa-ADPD-award-2024.png",
    alt: "Architectural Digest ADPRO Directory 2024 - Scialla Studio",
    href: "https://www.architecturaldigest.com/adpro/directory/profile/scialla-studio",
  },
  {
    src: "/scialla-studio-architect-interior-designer-tampa-best-of-houzz-2024.png",
    alt: "Best of Houzz 2024 - Scialla Studio",
    href: "https://www.houzz.com/pro/francescosciallaarchitect/scialla-studio",
  },
  {
    src: "/scialla-studio-ADPRO_Directory_MemberBadge2025_Black.png",
    alt: "Architectural Digest ADPRO Directory 2025 - Scialla Studio",
    href: "https://www.architecturaldigest.com/adpro/directory/profile/scialla-studio",
  },
  {
    src: "/scialla-studio-architect-interior-designer-tampa-best-of-houzz-2025.png",
    alt: "Best of Houzz 2025 - Scialla Studio",
    href: "https://www.houzz.com/pro/francescosciallaarchitect/scialla-studio",
  },
  {
    src: "/scialla-studio-architect-interior-designer-tampa-ADPD-award-2026.png",
    alt: "Architectural Digest ADPRO Directory 2026 - Scialla Studio",
    href: "https://www.architecturaldigest.com/adpro/directory/profile/scialla-studio",
  },
];

export function Awards() {
  const t = useTranslations("awards");

  return (
    <section
      id="awards"
      className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-white"
    >
      {/* Divider */}
      <div className="w-24 h-px bg-gray-300 mx-auto mb-12 md:mb-16" />

      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight tracking-tight">
          {t("title")}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Awards Carousel */}
      <div className="overflow-hidden">
        <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
          {/* First set of badges */}
          {badges.map((badge, index) => (
            <Link
              key={`badge-1-${index}`}
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-6 md:mx-8 lg:mx-12 transition-transform duration-200 hover:scale-105"
              aria-label={badge.alt}
            >
              <div className="h-20 md:h-24 lg:h-28 w-auto flex items-center justify-center">
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={112}
                  height={112}
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
          ))}
          {/* Duplicate set for seamless loop */}
          {badges.map((badge, index) => (
            <Link
              key={`badge-2-${index}`}
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-6 md:mx-8 lg:mx-12 transition-transform duration-200 hover:scale-105"
              aria-label={badge.alt}
            >
              <div className="h-20 md:h-24 lg:h-28 w-auto flex items-center justify-center">
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={112}
                  height={112}
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
