import Image from "next/image";
import { Link } from "@/i18n/routing";
import { urlForImage } from "@/lib/sanity-image";
import type { Project } from "@/types/sanity";
import { SectionHeading, type SectionHeadingStyle } from "./section-heading";

interface ProjectShowcaseProps {
  eyebrow?: string;
  heading?: string;
  projects: Project[];
  cta?: { label: string; href: string };
  headingStyle?: SectionHeadingStyle;
}

const GRID_CLASSES: Record<number, string> = {
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function ProjectShowcase({
  eyebrow,
  heading,
  projects,
  cta,
  headingStyle = "display",
}: ProjectShowcaseProps) {
  // Sanity is the source of truth here — if it returns nothing, skip the band
  // entirely rather than rendering an empty grid.
  if (projects.length === 0) return null;

  const columns = GRID_CLASSES[projects.length] ?? "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow={eyebrow}
          heading={heading}
          style={headingStyle}
          className="mb-12 md:mb-16"
        />

        <div className={`grid grid-cols-1 gap-6 md:gap-8 ${columns}`}>
          {projects.map((project) => {
            const imageUrl = urlForImage(project.featuredImage)
              ?.width(900)
              .height(900)
              .url();
            const blurDataURL = urlForImage(project.featuredImage)
              ?.width(20)
              .height(20)
              .blur(50)
              .url();
            const location =
              project.location?.name || project.customLocation || "";

            return (
              <Link
                key={project._id}
                href={`/projects/${project.slug.current}`}
                className="group block"
              >
                <div className="relative w-full overflow-hidden bg-gray-100 aspect-square">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={project.featuredImage?.alt || project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      placeholder={blurDataURL ? "blur" : "empty"}
                      blurDataURL={blurDataURL}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="text-base md:text-lg font-light text-white leading-snug mb-1.5">
                      {project.title.trim()}
                    </h3>
                    {location && (
                      <p className="text-xs text-white/80 uppercase tracking-[0.14em]">
                        {location}
                      </p>
                    )}
                  </div>
                </div>

              </Link>
            );
          })}
        </div>

        {cta && (
          <div className="text-center mt-12 md:mt-16">
            <Link
              href={cta.href}
              className="inline-flex items-center justify-center border border-gray-900 text-gray-900 px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors duration-300"
            >
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
