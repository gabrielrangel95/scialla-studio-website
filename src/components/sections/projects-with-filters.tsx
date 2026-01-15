"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";
import type { Project } from "@/types/sanity";
import { useTranslations } from "next-intl";
import { trackFilterChange } from "@/lib/firebase/analytics";

interface ProjectsWithFiltersProps {
  projects: Project[];
}

type FilterType = "all" | "residential" | "commercial" | "kitchen";

export function ProjectsWithFilters({ projects }: ProjectsWithFiltersProps) {
  const t = useTranslations("projects");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: t("filters.all") },
    { key: "residential", label: t("filters.residential") },
    { key: "commercial", label: t("filters.commercial") },
    { key: "kitchen", label: t("filters.kitchen") },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;

    // Filter based on serviceType or category
    if (activeFilter === "residential") {
      return project.serviceType === "interior-design" ||
             project.category?.some(cat =>
               cat.toLowerCase().includes("residential") ||
               cat.toLowerCase().includes("home")
             );
    }
    if (activeFilter === "commercial") {
      return project.category?.some(cat =>
        cat.toLowerCase().includes("commercial") ||
        cat.toLowerCase().includes("office") ||
        cat.toLowerCase().includes("restaurant") ||
        cat.toLowerCase().includes("retail")
      );
    }
    if (activeFilter === "kitchen") {
      return project.category?.some(cat =>
        cat.toLowerCase().includes("kitchen") ||
        cat.toLowerCase().includes("bathroom") ||
        cat.toLowerCase().includes("bath")
      );
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
      id="portfolio"
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
                  ? "bg-gray-900 text-white shadow-md"
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
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 group"
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
