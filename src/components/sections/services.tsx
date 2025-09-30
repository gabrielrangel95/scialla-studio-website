"use client";

import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ui/service-card";

export function Services() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const servicesData = [
    {
      title: "Residential Interior Design",
      services: [
        "Complete Home Renovation",
        "Kitchen Design & Remodeling",
        "Luxury Bathroom Design",
        "Living Room & Bedroom Design",
      ],
      image: "/scialla-studio-interior-design.jpg",
    },
    {
      title: "Architectural Design & New Construction",
      services: [
        "New Home Construction Design",
        "Architectural Renovations & Additions",
        "Site Planning & Development",
        "Structural Design & Engineering",
      ],
      image: "/scialla-studio-architectural-services.jpg",
    },
    {
      title: "Commercial Interior Design",
      services: [
        "Office Space Planning",
        "Restaurant & Hospitality Design",
        "Retail Store Design",
        "Medical Office Interiors",
      ],
      image: "/scialla-studio-commercial-interior-design.jpg",
    },
    {
      title: "Design Consultation Services",
      services: [
        "Virtual Design Consultations",
        "Space Planning & Layout",
        "Color & Material Selection",
        "Furniture & Décor Sourcing",
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
            Full-Service Architecture & Interior Design Solutions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From new construction and architectural design to luxury residential
            interiors and sophisticated commercial environments, we transform
            your vision into exceptional spaces from the ground up.
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
            Schedule Your Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
