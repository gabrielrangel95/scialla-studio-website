import Image from "next/image";
import { Link } from "@/i18n/routing";

interface IntroSplitProps {
  eyebrow: string;
  /** Optional display heading — the interior page uses one, architecture doesn't. */
  heading?: string;
  paragraphs: string[];
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
}

/**
 * Two-column introduction: copy on the left, image on the right.
 */
export function IntroSplit({
  eyebrow,
  heading,
  paragraphs,
  cta,
  image,
  imageAlt,
}: IntroSplitProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Copy */}
        <div className="max-w-xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="hidden md:block w-10 h-px bg-gray-400 shrink-0" />
            <p className="text-xs md:text-sm text-gray-900 uppercase tracking-[0.18em]">
              {eyebrow}
            </p>
          </div>

          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight tracking-tight mb-8">
              {heading}
            </h2>
          )}

          <div className="space-y-6 mb-10">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base md:text-lg text-gray-600 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Link
            href={cta.href}
            className="inline-flex items-center justify-center bg-black text-white px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
          >
            {cta.label}
          </Link>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
