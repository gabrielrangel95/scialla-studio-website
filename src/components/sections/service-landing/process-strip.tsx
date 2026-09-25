import { Link } from "@/i18n/routing";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessStripProps {
  heading: string;
  steps: ProcessStep[];
  cta?: { label: string; href: string };
}

/**
 * Horizontal numbered process row. Collapses to a stacked list below `md`.
 */
export function ProcessStrip({ heading, steps, cta }: ProcessStripProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-sm md:text-base font-medium text-gray-900 uppercase tracking-[0.18em] mb-12 md:mb-16">
          {heading}
        </h2>

        <div className="flex flex-col md:flex-row md:items-start md:gap-8 lg:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex-1 text-center px-2 py-8 md:py-0"
            >
              <span className="block text-sm text-gray-400 tracking-[0.14em] mb-4">
                {step.number}
              </span>
              <h3 className="text-xs md:text-sm font-medium text-gray-900 uppercase tracking-[0.12em] mb-4 md:min-h-[2.5rem]">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-[15rem] mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {cta && (
          <div className="text-center mt-12 md:mt-16">
            <Link
              href={cta.href}
              className="inline-flex items-center justify-center bg-black text-white px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
            >
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
