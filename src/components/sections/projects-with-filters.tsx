"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";
import type { Project } from "@/types/sanity";
import { useTranslations } from "next-intl";
import { trackFilterChange } from "@/lib/analytics/analytics";

interface ProjectsWithFiltersProps {
  projects: Project[];
}

type FilterType = "all" | "architecture" | "interior";

export function ProjectsWithFilters({ projects }: ProjectsWithFiltersProps) {
  const t = useTranslations("projects");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: t("filters.all") },
    { key: "architecture", label: t("filters.architecture") },
    { key: "interior", label: t("filters.interior") },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;

    // Projects marked as "both" belong to Architecture and Interior alike
    if (activeFilter === "architecture") {
      return project.serviceType === "architecture" || project.serviceType === "both";
    }
    if (activeFilter === "interior") {
      return project.serviceType === "interior-design" || project.serviceType === "both";
    }
    return true;
  });

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
    trackFilterChange({
      filter_type: "project_category",
      filter_value: filter,
      page: "homepage",
    });
  };

  return (
    <section
      id="projects"
      className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-12 xl:px-16 bg-white"
    >
      {/* Section Header */}
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight tracking-tight">
          {t("title")}
          <span className="block mt-2">{t("titleLine2")}</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          {t("subtitle")}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-10 md:mb-12">
        <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-gray-100 rounded-full">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilterClick(filter.key)}
              className={`
                px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${activeFilter === filter.key
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.slice(0, 6).map((project) => {
              const displayLocation = project.customLocation
                ? project.location
                  ? `${project.customLocation}, ${project.location.name}`
                  : project.customLocation
                : project.location?.name || "Location TBD";

              return (
                <ProjectCard
                  key={project._id}
                  title={project.title}
                  slug={project.slug.current}
                  location={displayLocation}
                  locationSlug={project.location?.slug.current || ""}
                  serviceType={project.serviceType}
                  category={project.category}
                  featuredImage={project.featuredImage}
                  completionDate={project.completionDate}
                />
              );
            })}
          </div>

          {/* View All Link */}
          <div className="flex justify-center mt-10 md:mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 group"
            >
              {t("viewAll")}
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">
            {t("noProjectsInCategory")}
          </p>
          <button
            onClick={() => setActiveFilter("all")}
            className="text-gray-900 font-medium hover:underline"
          >
            {t("viewAllProjects")}
          </button>
        </div>
      )}
    </section>
  );
}
