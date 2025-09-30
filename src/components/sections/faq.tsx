"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export function FAQ() {
  const t = useTranslations("faq");

  const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6"];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqKeys.map((key) => ({
      "@type": "Question",
      name: t(`questions.${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`questions.${key}.answer`),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <section
        id="faq"
        className="py-8 md:py-12 lg:py-16 bg-gray-50 px-4 md:px-6 lg:px-12 xl:px-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
              {t("title")}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqKeys.map((key, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white mb-4 rounded-lg shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-medium text-gray-900 hover:text-gray-700">
                  {t(`questions.${key}.question`)}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-700 leading-relaxed">
                  {t(`questions.${key}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
