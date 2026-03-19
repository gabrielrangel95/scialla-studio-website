"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export function Process() {
  const t = useTranslations("process");

  const steps: ProcessStep[] = [
    {
      number: "01",
      title: t("steps.discovery.title"),
      description: t("steps.discovery.description"),
    },
    {
      number: "02",
      title: t("steps.design.title"),
      description: t("steps.design.description"),
    },
    {
      number: "03",
      title: t("steps.execution.title"),
      description: t("steps.execution.description"),
    },
    {
      number: "04",
      title: t("steps.reveal.title"),
      description: t("steps.reveal.description"),
    },
  ];

  return (
    <section
      id="process"
      className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-black"
    >
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight tracking-tight">
          {t("title")}
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Process Steps */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line - Desktop Only */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gray-700 -translate-y-1/2 z-0" />
              )}

              <div className="relative z-10 bg-black">
                {/* Step Number */}
                <div className="text-5xl font-light text-white mb-4 tracking-tighter">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-xl font-medium text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12 md:mt-16">
        <p className="text-gray-400 text-lg italic mb-6">
          {t("cta")}
        </p>
        <Link
          href="/process"
          className="inline-flex items-center gap-2 border border-white text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
        >
          {t("viewFullProcess")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
