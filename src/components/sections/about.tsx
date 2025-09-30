"use client";

import Image from "next/image";
import Link from "next/link";
import { ADPROBadge } from "@/components/ui/adpro-badge";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("about");
  return (
    <section
      id="about"
      className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-12 xl:px-16 bg-gray-50"
    >
      {/* Section Header */}
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
          {t("title")}
          <br />
          <span className="block mt-2">{t("titleLine2")}</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-16 xl:gap-20 items-start">
        {/* Left: Text Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              {t("paragraph1")}
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              {t("paragraph2")}
            </p>
          </div>

          {/* Credentials */}
          <div className="py-2">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="text-gray-900 mr-3">✓</span>
                {t("credentials.phd")}
              </li>
              <li className="flex items-center">
                <span className="text-gray-900 mr-3">✓</span>
                {t("credentials.fullService")}
              </li>
              <li className="flex items-center">
                <span className="text-gray-900 mr-3">✓</span>
                {t("credentials.engineering")}
              </li>
              <li className="flex items-center">
                <span className="text-gray-900 mr-3">✓</span>
                {t("credentials.published")}
              </li>
              <li className="flex items-center">
                <span className="text-gray-900 mr-3">✓</span>
                {t("credentials.experience")}
              </li>
              <li className="flex items-center">
                <span className="text-gray-900 mr-3">✓</span>
                {t("credentials.cities")}
              </li>
              <li className="flex items-center">
                <span className="text-gray-900 mr-3">✓</span>
                <Link
                  href="https://www.architecturaldigest.com/adpro/directory/profile/scialla-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors duration-200"
                >
                  {t("credentials.featured")}
                </Link>
              </li>
            </ul>

            {/* AD Badge */}
            <div className="mt-6">
              <ADPROBadge size="md" />
            </div>
          </div>
        </div>

        {/* Right: Image Grid */}
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/scialla-studio-about-us.avif"
                  alt="Francesco Scialla - Co-Founder and Lead Architect at Scialla Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="text-center">
                <h3 className="text-gray-900">{t("team.francesco.name")}</h3>
                <p className="text-sm text-gray-600">{t("team.francesco.title")}</p>
              </div>
            </div>

            <div className="space-y-6 mt-8">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/scialla-studio-interior-designer-tampa-fl.avif"
                  alt="Valentina Pollio - Co-Founder and Creative Director at Scialla Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="text-center">
                <h3 className="text-gray-900">{t("team.valentina.name")}</h3>
                <p className="text-sm text-gray-600">{t("team.valentina.title")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="mt-4 md:mt-6 pt-8 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-3xl md:text-4xl font-light text-gray-900 block">
              {t("stats.yearsExperience")}
            </span>
            <p className="text-sm text-gray-600 mt-2">{t("stats.yearsExperienceLabel")}</p>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-light text-gray-900 block">
              {t("stats.citiesServed")}
            </span>
            <p className="text-sm text-gray-600 mt-2">{t("stats.citiesServedLabel")}</p>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-light text-gray-900 block">
              {t("stats.projectsCompleted")}
            </span>
            <p className="text-sm text-gray-600 mt-2">{t("stats.projectsCompletedLabel")}</p>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-light text-gray-900 block">
              {t("stats.countriesWorked")}
            </span>
            <p className="text-sm text-gray-600 mt-2">{t("stats.countriesWorkedLabel")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
