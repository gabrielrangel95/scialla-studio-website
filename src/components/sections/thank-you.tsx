"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  projectTypeLabels,
  budgetLabels,
  timelineLabels,
} from "@/lib/validations/contact";

export function ThankYou() {
  const t = useTranslations("thankYou");
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const location = searchParams.get("location");
  const projectType = searchParams.get("projectType");
  const budget = searchParams.get("budget");
  const timeline = searchParams.get("timeline");
  const message = searchParams.get("message");

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {name ? `${name}, ` : ""}
            {t("subtitle")}
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100">
          {/* What's Next */}
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 border-b border-gray-100 pb-4">
              {t("whatNext.title")}
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium mr-4">
                  1
                </div>
                <p className="text-gray-600 pt-1">{t("whatNext.step1")}</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center text-sm font-medium mr-4">
                  2
                </div>
                <p className="text-gray-600 pt-1">{t("whatNext.step2")}</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center text-sm font-medium mr-4">
                  3
                </div>
                <p className="text-gray-600 pt-1">{t("whatNext.step3")}</p>
              </div>
            </div>
          </div>

          {/* Project Details */}
          {(projectType || location || budget || timeline) && (
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                {t("projectDetails.title")}
              </h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {projectType && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      {t("projectDetails.projectType")}
                    </dt>
                    <dd className="text-gray-900">
                      {projectTypeLabels[projectType as keyof typeof projectTypeLabels] || projectType}
                    </dd>
                  </div>
                )}
                {location && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      {t("projectDetails.location")}
                    </dt>
                    <dd className="text-gray-900">{location}</dd>
                  </div>
                )}
                {budget && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      {t("projectDetails.budget")}
                    </dt>
                    <dd className="text-gray-900">
                      {budgetLabels[budget as keyof typeof budgetLabels] || budget}
                    </dd>
                  </div>
                )}
                {timeline && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      {t("projectDetails.timeline")}
                    </dt>
                    <dd className="text-gray-900">
                      {timelineLabels[timeline as keyof typeof timelineLabels] || timeline}
                    </dd>
                  </div>
                )}
                {message && (
                  <div className="md:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      {t("projectDetails.message")}
                    </dt>
                    <dd className="text-gray-900 italic">"{message}"</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button
              variant="outline"
              className="px-8 py-6 text-base font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
            >
              {t("backToHome")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
