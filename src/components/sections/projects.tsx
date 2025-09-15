import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { sanityClient } from '@/lib/sanity'
import { latestProjectsQuery } from '../../../sanity/lib/queries'
import { ProjectCard } from '@/components/ui/project-card'
import type { SanityImage } from '@/types/sanity'

interface ProjectData {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  location: string
  locationSlug: string
  category: string[]
  featuredImage: SanityImage
  completionDate?: string
}

async function getLatestProjects(): Promise<ProjectData[]> {
  try {
    const projects = await sanityClient.fetch(latestProjectsQuery)
    return projects || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function Projects() {
  const projects = await getLatestProjects()

  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 xl:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
            DESIGNING SPACES
            <br />
            <span className="block mt-2">THAT TELL YOUR STORY</span>
          </h2>
          <div className="flex justify-center">
            <Link 
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200 group"
            >
              VIEW ALL PROJECTS
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
                location={project.location}
                locationSlug={project.locationSlug}
                category={project.category}
                featuredImage={project.featuredImage}
                completionDate={project.completionDate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No projects found. Please add some projects in the Sanity Studio.
            </p>
            <Link 
              href="/studio"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200"
            >
              Go to Studio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}