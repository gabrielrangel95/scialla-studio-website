import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";
import { sanityService } from "@/lib/sanity-service";
import type { Project } from "@/types/sanity";
import { getTranslations } from "next-intl/server";

async function getLatestProjects(): Promise<Project[]> {
  return await sanityService.getLatestProjects(6);
}

export async function Projects() {
  const t = await getTranslations("projects");
  const projects = await getLatestProjects();

  return (
    <section
      id="portfolio"
      className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-12 xl:px-16 bg-white"
    >
      {/* Section Header */}
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
          {t("title")}
          <br />
          <span className="block mt-2">{t("titleLine2")}</span>
        </h2>
        <div className="flex justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200 group"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              slug={project.slug.current}
              location={project.location.name}
              locationSlug={project.location.slug.current}
              serviceType={project.serviceType}
              category={project.category}
              featuredImage={project.featuredImage}
              completionDate={project.completionDate}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            {t("emptyState")}
          </p>
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200"
          >
            {t("goToStudio")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
