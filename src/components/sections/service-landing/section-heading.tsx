/**
 * Two heading treatments the landing pages alternate between:
 *
 * - `display` — the large light heading used across the rest of the site
 *   (interior design page, matching its mockup).
 * - `eyebrow` — a small tracked caps label, matching the architecture mockup
 *   and the existing /process page section headings.
 */
export type SectionHeadingStyle = "display" | "eyebrow";

interface SectionHeadingProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  style?: SectionHeadingStyle;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  description,
  style = "display",
  className = "",
}: SectionHeadingProps) {
  if (!eyebrow && !heading && !description) return null;

  return (
    <div className={`text-center ${className}`}>
      {eyebrow && (
        <p className="text-xs md:text-sm text-gray-600 uppercase tracking-[0.18em] mb-4">
          {eyebrow}
        </p>
      )}

      {heading &&
        (style === "eyebrow" ? (
          <h2 className="text-sm md:text-base font-medium text-gray-900 uppercase tracking-[0.18em]">
            {heading}
          </h2>
        ) : (
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight tracking-tight">
            {heading}
          </h2>
        ))}

      {description && (
        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mt-6">
          {description}
        </p>
      )}
    </div>
  );
}
