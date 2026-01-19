"use client";

import { useTranslations } from "next-intl";
import { ADPROBadge } from "@/components/ui/adpro-badge";

export function SocialProofBar() {
  const t = useTranslations("socialProof");

  const stats = [
    { value: t("stats.projects.value"), label: t("stats.projects.label") },
    { value: t("stats.years.value"), label: t("stats.years.label") },
    { value: t("stats.cities.value"), label: t("stats.cities.label") },
    { value: t("stats.satisfaction.value"), label: t("stats.satisfaction.label") },
  ];

  return (
    <section className="bg-black py-6 md:py-8 px-4 md:px-6 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-8">
          {/* Featured Badge */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              {t("featuredIn")}
            </span>
            <ADPROBadge size="sm" variant="white" />
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-700" />

          {/* Stats */}
          <div className="flex items-center gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-white text-xl lg:text-2xl font-light tracking-tight">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-700" />

          {/* Tagline */}
          <p className="text-gray-300 text-sm italic flex-shrink-0">
            {t("tagline")}
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Featured Badge - Centered */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              {t("featuredIn")}
            </span>
            <ADPROBadge size="sm" variant="white" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-white text-lg font-light">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
