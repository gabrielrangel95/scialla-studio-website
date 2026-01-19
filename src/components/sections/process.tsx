"use client";

import { useTranslations } from "next-intl";
import { MessageSquare, Palette, Hammer, Sparkles } from "lucide-react";

interface ProcessStep {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
}

export function Process() {
  const t = useTranslations("process");

  const steps: ProcessStep[] = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      number: "01",
      title: t("steps.discovery.title"),
      description: t("steps.discovery.description"),
    },
    {
      icon: <Palette className="w-6 h-6" />,
      number: "02",
      title: t("steps.design.title"),
      description: t("steps.design.description"),
    },
    {
      icon: <Hammer className="w-6 h-6" />,
      number: "03",
      title: t("steps.execution.title"),
      description: t("steps.execution.description"),
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
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
                <div className="text-5xl font-light text-gray-700 mb-4 tracking-tighter">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">
                  {step.icon}
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
        <p className="text-gray-400 text-lg italic">
          {t("cta")}
        </p>
      </div>
    </section>
  );
}
