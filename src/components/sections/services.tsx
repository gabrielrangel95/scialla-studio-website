"use client";

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ui/service-card";

export function Services() {
  const t = useTranslations('services');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const servicesData = [
    {
      title: t('residential.title'),
      services: [
        t('residential.services.renovation'),
        t('residential.services.kitchen'),
        t('residential.services.bathroom'),
        t('residential.services.living'),
      ],
      image: "/scialla-studio-interior-design.jpg",
    },
    {
      title: t('architectural.title'),
      services: [
        t('architectural.services.newHome'),
        t('architectural.services.renovations'),
        t('architectural.services.sitePlanning'),
        t('architectural.services.structural'),
      ],
      image: "/scialla-studio-architectural-services.jpg",
    },
    {
      title: t('commercial.title'),
      services: [
        t('commercial.services.office'),
        t('commercial.services.restaurant'),
        t('commercial.services.retail'),
        t('commercial.services.medical'),
      ],
      image: "/scialla-studio-commercial-interior-design.jpg",
    },
    {
      title: t('consultation.title'),
      services: [
        t('consultation.services.virtual'),
        t('consultation.services.spacePlanning'),
        t('consultation.services.materials'),
        t('consultation.services.sourcing'),
      ],
      image: "/scialla-studio-interior-design-consultation.jpg",
    },
  ];

  return (
    <section
      id="services"
      className="py-8 md:py-12 lg:py-16 bg-gray-50 px-4 md:px-6 lg:px-12 xl:px-16"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              services={service.services}
              image={service.image}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            onClick={() => scrollToSection("contact")}
            size="lg"
            className="bg-black text-white hover:bg-gray-800 px-12 py-4 text-lg font-medium tracking-wide transition-all duration-300 hover:scale-105"
          >
            {t('cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}
