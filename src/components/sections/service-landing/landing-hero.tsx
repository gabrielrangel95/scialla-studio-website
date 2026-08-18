import Image from "next/image";
import { Link } from "@/i18n/routing";

export interface LandingCta {
  label: string;
  href: string;
  /** `solid` is the white-filled primary; `outline` is the bordered secondary. */
  variant?: "solid" | "outline";
}

interface LandingHeroProps {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctas: LandingCta[];
  /** Architecture sets its headline in caps, matching /process; interiors doesn't. */
  uppercaseTitle?: boolean;
  /** `object-position` override for heroes whose subject sits off-centre. */
  objectPosition?: string;
}

/**
 * Full-bleed image hero with a left-aligned copy block, shared by the
 * architecture and interior design landing pages.
 */
export function LandingHero({
  image,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  ctas,
  uppercaseTitle = false,
  objectPosition = "center",
}: LandingHeroProps) {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition }}
      />

      {/* Left-weighted scrim keeps the copy legible without flattening the image.
          A second flat wash covers heroes with bright glazing behind the text. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 w-full px-4 md:px-6 lg:px-12 xl:px-16 py-24 md:py-32">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-xs md:text-sm text-white/80 uppercase tracking-[0.2em] mb-6">
              {eyebrow}
            </p>
          )}

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6 ${
              uppercaseTitle ? "uppercase tracking-wider" : "tracking-tight"
            }`}
          >
            {title}
          </h1>

          <p className="text-base md:text-lg text-white/85 font-light leading-relaxed max-w-xl mb-10">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {ctas.map((cta) => (
              <Link
                key={cta.href + cta.label}
                href={cta.href}
                className={`inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  cta.variant === "outline"
                    ? "border border-white text-white hover:bg-white hover:text-black"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
