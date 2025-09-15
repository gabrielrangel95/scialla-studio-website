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
      href: "/services/residential-interior-design",
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
      href: "/services/commercial-interior-design",
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
      href: "/services/design-consultation",
    },
  ];

  return (
    <section 
      id="services"
      className="py-20 md:py-24 lg:py-32 bg-white px-4 md:px-6 lg:px-12 xl:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Full-Service Interior Design Solutions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From luxury residential spaces to sophisticated commercial environments, 
            we transform your vision into exceptional interior design experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              services={service.services}
              image={service.image}
              href={service.href}
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