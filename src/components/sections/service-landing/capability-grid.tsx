import type { ComponentType, SVGProps } from "react";
import {
  SectionHeading,
  type SectionHeadingStyle,
} from "./section-heading";

export interface Capability {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

interface CapabilityGridProps {
  eyebrow?: string;
  heading?: string;
  items: Capability[];
  /** Vertical rules between columns — the five-up interior layout uses them. */
  dividers?: boolean;
  headingStyle?: SectionHeadingStyle;
}

// Spelled out rather than interpolated so Tailwind's JIT can see the classes.
const COLUMN_CLASSES: Record<number, string> = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
  5: "md:grid-cols-3 lg:grid-cols-5",
};

/**
 * Band of icon + title + description capabilities.
 */
export function CapabilityGrid({
  eyebrow,
  heading,
  items,
  dividers = false,
  headingStyle = "display",
}: CapabilityGridProps) {
  const columns = COLUMN_CLASSES[items.length] ?? "md:grid-cols-3";

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow={eyebrow}
          heading={heading}
          style={headingStyle}
          className="mb-12 md:mb-16"
        />

        <div className={`grid grid-cols-1 gap-10 md:gap-0 ${columns}`}>
          {items.map(({ icon: IconComponent, title, description }, index) => (
            <div
              key={title}
              className={`text-center px-4 md:px-6 ${
                dividers && index > 0
                  ? "md:border-l md:border-gray-200"
                  : ""
              }`}
            >
              <IconComponent className="w-12 h-12 mx-auto mb-6 text-gray-800" />
              {/* Reserve two lines so descriptions share a baseline when only
                  some titles wrap across the row. 3rem = 2 × text-base's 24px
                  line-height, which Tailwind sets over the 1.2 in globals.css. */}
              <h3 className="text-sm md:text-base font-medium text-gray-900 uppercase tracking-[0.12em] mb-4 md:min-h-[3rem]">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
