import { sanityService } from "@/lib/sanity-service";
import type { Project } from "@/types/sanity";
import { ProjectsWithFilters } from "./projects-with-filters";

async function getLatestProjects(): Promise<Project[]> {
  // Fetch more projects to allow filtering
  return await sanityService.getLatestProjects(12);
}

export async function Projects() {
  const projects = await getLatestProjects();

  return <ProjectsWithFilters projects={projects} />;
}
