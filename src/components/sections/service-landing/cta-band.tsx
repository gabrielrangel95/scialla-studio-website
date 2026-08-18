import Image from "next/image";
import { Link } from "@/i18n/routing";

interface CtaBandProps {
  title: string;
  description: string;
  cta: { label: string; href: string };
  /** Optional full-bleed backdrop; without it the band is solid near-black. */
  backgroundImage?: string;
  backgroundAlt?: string;
  /** The band is short, so the crop usually needs steering onto the subject. */
  objectPosition?: string;
  /**
   * `stacked` runs title → description → button down the left (architecture);
   * `split` sets the title against the copy and button in a second column.
   */
  layout?: "stacked" | "split";
}

export function CtaBand({
  title,
  description,
  cta,
  backgroundImage,
  backgroundAlt = "",
  objectPosition = "center",
  layout = "stacked",
}: CtaBandProps) {
  const button = (
    <Link
      href={cta.href}
      className="inline-flex items-center justify-center bg-white text-black px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-white/90 transition-colors duration-300"
    >
      {cta.label}
    </Link>
  );

  return (
    <section className="relative overflow-hidden bg-neutral-900">
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt={backgroundAlt}
            fill
            className="object-cover"
            style={{ objectPosition }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        </>
      )}

      <div className="relative z-10 px-4 md:px-6 lg:px-12 xl:px-16 py-20 md:py-28">
        {layout === "split" ? (
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex gap-6">
              <span
                aria-hidden="true"
                className="hidden md:block w-px self-stretch bg-white/40 shrink-0"
              />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight">
                {title}
              </h2>
            </div>

            <div className="max-w-md">
              <p className="text-base md:text-lg text-white/75 leading-relaxed mb-8">
                {description}
              </p>
              {button}
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight mb-6">
                {title}
              </h2>
              <p className="text-base md:text-lg text-white/75 leading-relaxed mb-10">
                {description}
              </p>
              {button}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
