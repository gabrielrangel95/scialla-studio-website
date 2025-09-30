"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Phone, Mail } from "lucide-react";
import { ADPROBadge } from "@/components/ui/adpro-badge";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const serviceKeys = ["residential", "commercial", "kitchen", "consultation", "spacePlanning", "sourcing"];

  const locationKeys = ["orlando", "tampa", "nyc", "losAngeles", "nationwide"];
  const locationSlugs: Record<string, string | null> = {
    orlando: "orlando",
    tampa: "tampa",
    nyc: "nyc",
    losAngeles: "los-angeles",
    nationwide: null,
  };

  const socialKeys = ["facebook", "instagram", "houzz", "pinterest"];
  const socialUrls: Record<string, string> = {
    facebook: "https://www.facebook.com/profile.php?id=61554601536191",
    instagram: "https://www.instagram.com/sciallastudio_/",
    houzz: "https://www.houzz.com/pro/francescosciallaarchitect/scialla-studio",
    pinterest: "https://www.pinterest.com/Sciallastudio_/",
  };

  return (
    <footer className="bg-black text-gray-300">
      <div className="px-4 md:px-6 lg:px-12 xl:px-16 py-16 md:py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <Image
                src="/scialla-studio-full-logo.avif"
                alt="Scialla Studio - Interior Design"
                width={200}
                height={60}
                className="h-12 w-auto mb-6"
                priority
              />
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {t("tagline")}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <a
                  href="tel:+17275044138"
                  className="hover:text-white transition-colors duration-200"
                >
                  +1 727 504 4138
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a
                  href="mailto:info@sciallastudioid.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  info@sciallastudioid.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Recognition */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-6">
              {t("recognition")}
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col items-start">
                <p className="text-gray-400 text-xs mb-3">{t("featuredIn")}</p>
                <ADPROBadge size="sm" variant="white" />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t("recognitionDescription")}
              </p>
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-6">
              {t("services")}
            </h3>
            <ul className="space-y-3">
              {serviceKeys.map((key, index) => (
                <li key={index}>
                  <span className="text-gray-300 text-sm hover:text-white transition-colors duration-200 cursor-pointer">
                    {t(`servicesList.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Locations */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-6">
              {t("locations")}
            </h3>
            <ul className="space-y-3">
              {locationKeys.map((key, index) => (
                <li key={index}>
                  {locationSlugs[key] ? (
                    <Link
                      href={`/interior-design-${locationSlugs[key]}`}
                      className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                    >
                      {t(`locationsList.${key}`)}
                    </Link>
                  ) : (
                    <span className="text-gray-300 text-sm font-medium">
                      {t(`locationsList.${key}`)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
              {t("locationsNote")}
            </p>
          </div>

          {/* Column 5: Connect */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-6">
              {t("connect")}
            </h3>
            <div className="space-y-3">
              {socialKeys.map((key, index) => (
                <a
                  key={index}
                  href={socialUrls[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-white transition-colors duration-200 block"
                >
                  {t(`socialLinks.${key}`)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center">
            <div className="text-sm text-gray-400">
              © {currentYear} {t("copyright")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
