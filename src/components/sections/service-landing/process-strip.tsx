import { Fragment } from "react";
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
 * Horizontal numbered process row with connecting rules between steps.
 * Collapses to a stacked list below `md`, where the rules would read as noise.
 */
export function ProcessStrip({ heading, steps, cta }: ProcessStripProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-sm md:text-base font-medium text-gray-900 uppercase tracking-[0.18em] mb-12 md:mb-16">
          {heading}
        </h2>

        <div className="flex flex-col md:flex-row md:items-start">
          {steps.map((step, index) => (
            <Fragment key={step.number}>
              {index > 0 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block w-8 lg:w-12 h-px bg-gray-300 shrink-0 mt-[4.5rem]"
                />
              )}

              <div
                className={`flex-1 text-center px-2 py-8 md:py-0 md:border-t-0 ${
                  index > 0 ? "border-t border-gray-200" : ""
                }`}
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
            </Fragment>
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
