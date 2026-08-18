import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "./section-heading";

export interface CityLink {
  name: string;
  /** Anchor text for the city page — descriptive, e.g. "Interior Design in Tampa". */
  label: string;
  href: string;
}

interface CityLinksProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  cities: CityLink[];
}

/**
 * Links down to the per-city interior design pages, making this page the hub of
 * the /interior-design-{city} silo rather than a competitor to it.
 *
 * Deliberately typographic: the only city imagery on hand is near-black night
 * photography that reads as flat black boxes at card size.
 */
export function CityLinks({
  eyebrow,
  heading,
  description,
  cities,
}: CityLinksProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow={eyebrow}
          heading={heading}
          description={description}
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
          {cities.map((city) => (
            <Link
              key={city.href}
              href={city.href}
              className="group flex flex-col justify-between gap-8 bg-white p-8 transition-colors duration-300 hover:bg-gray-900"
            >
              <span className="flex items-start justify-between gap-4">
                <span className="text-xl md:text-2xl font-light text-gray-900 leading-snug transition-colors duration-300 group-hover:text-white">
                  {city.name}
                </span>
                <ArrowUpRight className="w-5 h-5 shrink-0 text-gray-400 transition-all duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>

              <span className="text-xs text-gray-500 uppercase tracking-[0.14em] leading-relaxed transition-colors duration-300 group-hover:text-white/70">
                {city.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
