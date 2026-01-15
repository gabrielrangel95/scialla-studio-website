"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  projectType: string;
  rating: number;
}

export function Testimonials() {
  const t = useTranslations("testimonials");

  const testimonials: Testimonial[] = [
    {
      id: "1",
      quote: t("items.1.quote"),
      author: t("items.1.author"),
      location: t("items.1.location"),
      projectType: t("items.1.projectType"),
      rating: 5,
    },
    {
      id: "2",
      quote: t("items.2.quote"),
      author: t("items.2.author"),
      location: t("items.2.location"),
      projectType: t("items.2.projectType"),
      rating: 5,
    },
    {
      id: "3",
      quote: t("items.3.quote"),
      author: t("items.3.author"),
      location: t("items.3.location"),
      projectType: t("items.3.projectType"),
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-white"
    >
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight tracking-tight">
          {t("title")}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gray-50 rounded-sm p-8 flex flex-col h-full border border-gray-100 hover:border-gray-200 transition-colors duration-300"
          >
            {/* Rating Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 flex-grow">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Author Info */}
            <div className="pt-6 border-t border-gray-200">
              <p className="font-medium text-gray-900">{testimonial.author}</p>
              <p className="text-sm text-gray-500">
                {testimonial.projectType} · {testimonial.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicator */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          {t("trustText")}
        </p>
      </div>
    </section>
  );
}
