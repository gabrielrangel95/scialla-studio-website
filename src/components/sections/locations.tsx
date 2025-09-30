"use client";

import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function Locations() {
  const t = useTranslations("locations");

  const locationsData = [
    {
      key: "orlando",
      slug: "orlando",
    },
    {
      key: "tampa",
      slug: "tampa",
    },
    {
      key: "nyc",
      slug: "nyc",
    },
    {
      key: "losAngeles",
      slug: "los-angeles",
    },
  ];

  return (
    <section id="locations" className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="grid lg:grid-cols-2 gap-0 items-start">
        {/* Left Side - Title and Content */}
        <div className="px-4 md:px-6 lg:px-12 xl:px-16">
          <div className="max-w-xl space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight tracking-tight mb-8">
                {t("title")}
                <br />
                <span className="block mt-2">
                  {t("titleLine2")}
                </span>
              </h2>

              <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-lg">
                {t("description")}
              </p>
            </div>

            <div className="pt-4 space-y-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200 group"
              >
                {t("viewLocations")}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <p className="text-sm text-gray-600 max-w-lg leading-relaxed">
                {t("servingNote")}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Locations List */}
        <div className="px-4 md:px-6 lg:pl-0 lg:pr-12 xl:pr-16">
          <div className="space-y-12">
            {locationsData.map((location, index) => (
              <div key={index} className="group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-normal text-gray-900 mb-5 tracking-wide">
                      {t(`cities.${location.key}.name`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed pr-8">
                      {t(`cities.${location.key}.description`)}
                    </p>
                  </div>
                  <Link
                    href={`/interior-design-${location.slug}`}
                    className="flex-shrink-0 p-2 hover:bg-gray-50 transition-colors duration-200 rounded"
                  >
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors duration-200" />
                  </Link>
                </div>
                {index < locationsData.length - 1 && (
                  <div className="mt-12 border-b border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
