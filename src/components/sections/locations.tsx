"use client";

import { LocationCard } from "@/components/ui/location-card";

export function Locations() {
  const locationsData = [
    {
      city: "Orlando",
      slug: "orlando",
      title: "Interior Designer Orlando",
      description: "Transforming Orlando homes with sophisticated design solutions that reflect the vibrant culture and modern lifestyle of Central Florida.",
      projectCount: "25+ Projects",
      areas: ["Winter Park", "Lake Nona", "Downtown Orlando", "Windermere", "Dr. Phillips"]
    },
    {
      city: "Tampa",
      slug: "tampa",
      title: "Interior Designer Tampa",
      description: "Creating stunning interiors throughout Tampa Bay with designs that capture the coastal elegance and urban sophistication of the region.",
      projectCount: "30+ Projects",
      areas: ["South Tampa", "Westchase", "Hyde Park", "Channelside", "Harbour Island"]
    },
    {
      city: "New York City",
      slug: "nyc",
      title: "Interior Designer New York City",
      description: "Delivering luxury interior design services across NYC's most prestigious neighborhoods with unparalleled attention to detail.",
      projectCount: "45+ Projects",
      areas: ["Manhattan", "Brooklyn", "Queens", "Upper East Side", "SoHo"]
    },
    {
      city: "Los Angeles",
      slug: "los-angeles",
      title: "Interior Designer Los Angeles",
      description: "Bringing Hollywood glamour and California cool to luxury residences throughout the greater Los Angeles area.",
      projectCount: "40+ Projects",
      areas: ["Beverly Hills", "Santa Monica", "West Hollywood", "Malibu", "Venice"]
    }
  ];

  return (
    <section 
      id="locations"
      className="py-16 md:py-20 lg:py-24 bg-white px-4 md:px-6 lg:px-12 xl:px-16"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Interior Design Services Across Four Major Cities
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From the vibrant neighborhoods of Orlando and Tampa to the luxury markets of New York City and Los Angeles, 
            Scialla Studio delivers exceptional interior design services tailored to each city's unique character.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locationsData.map((location, index) => (
            <LocationCard
              key={index}
              city={location.city}
              slug={location.slug}
              title={location.title}
              description={location.description}
              projectCount={location.projectCount}
              areas={location.areas}
            />
          ))}
        </div>

        {/* Additional SEO Content */}
        <div className="text-center mt-12">
          <p className="text-gray-600 max-w-3xl mx-auto">
            Each location receives personalized design services that honor local architectural styles while incorporating 
            Scialla Studio's signature aesthetic of modern luxury and timeless elegance.
          </p>
        </div>
      </div>
    </section>
  );
}