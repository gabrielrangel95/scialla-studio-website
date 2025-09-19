import { sanityClient } from '@/lib/sanity'
import {
  projectsQuery,
  projectQuery,
  projectsByCityQuery,
  latestProjectsQuery
} from '../../sanity/lib/queries'
import { Project, LocationSlug } from '@/types/sanity'
import type { PortableTextBlock } from 'sanity'

/**
 * Helper function to extract plain text from PortableText content
 */
export function extractPortableTextContent(blocks: PortableTextBlock[] | undefined | null): string {
  if (!blocks || !Array.isArray(blocks)) return ''

  return blocks
    .map(block => {
      if (block && typeof block === 'object' && 'children' in block && Array.isArray(block.children)) {
        return block.children
          .map((child: any) => {
            if (child && typeof child === 'object' && 'text' in child && typeof child.text === 'string') {
              return child.text
            }
            return ''
          })
          .join('')
      }
      return ''
    })
    .join(' ')
    .trim()
}

/**
 * Centralized Sanity service for project data fetching
 * Implements ISR caching and error handling
 */
export class SanityService {
  private static instance: SanityService

  private constructor() {}

  static getInstance(): SanityService {
    if (!SanityService.instance) {
      SanityService.instance = new SanityService()
    }
    return SanityService.instance
  }

  /**
   * Get all projects with optional filtering
   */
  async getAllProjects(options?: {
    limit?: number
    offset?: number
    category?: string
    city?: LocationSlug
  }): Promise<Project[]> {
    try {
      let query = projectsQuery

      // Add filtering if city is specified
      if (options?.city) {
        query = projectsByCityQuery
        return await sanityClient.fetch(query, { city: options.city }, {
          next: { revalidate: 3600 } // ISR with 1 hour revalidation
        })
      }

      const projects = await sanityClient.fetch(query, {}, {
        next: { revalidate: 3600 }
      })

      let filteredProjects = projects || []

      // Filter by category if specified
      if (options?.category) {
        filteredProjects = filteredProjects.filter((project: Project) =>
          project.category.includes(options.category!)
        )
      }

      // Apply pagination
      if (options?.offset || options?.limit) {
        const start = options.offset || 0
        const end = start + (options.limit || filteredProjects.length)
        filteredProjects = filteredProjects.slice(start, end)
      }

      return filteredProjects
    } catch (error) {
      console.error('Error fetching projects:', error)
      return []
    }
  }

  /**
   * Get single project by slug
   */
  async getProject(slug: string): Promise<Project | null> {
    try {
      const project = await sanityClient.fetch(projectQuery, { slug }, {
        next: { revalidate: 3600 }
      })
      return project || null
    } catch (error) {
      console.error('Error fetching project:', error)
      return null
    }
  }

  /**
   * Get latest projects for homepage
   */
  async getLatestProjects(limit: number = 6): Promise<Project[]> {
    try {
      const projects = await sanityClient.fetch(latestProjectsQuery, {}, {
        next: { revalidate: 3600 }
      })
      return projects?.slice(0, limit) || []
    } catch (error) {
      console.error('Error fetching latest projects:', error)
      return []
    }
  }

  /**
   * Get projects by category
   */
  async getProjectsByCategory(category: string, limit?: number): Promise<Project[]> {
    try {
      const projects = await this.getAllProjects({ category, limit })
      return projects
    } catch (error) {
      console.error('Error fetching projects by category:', error)
      return []
    }
  }

  /**
   * Get related projects (same city or category)
   */
  async getRelatedProjects(
    currentProject: Project,
    limit: number = 3
  ): Promise<Project[]> {
    try {
      const allProjects = await this.getAllProjects()

      const related = allProjects
        .filter(project => project._id !== currentProject._id)
        .filter(project =>
          // Same city or overlapping categories
          project.location.slug.current === currentProject.location.slug.current ||
          project.category.some(cat => currentProject.category.includes(cat))
        )
        .slice(0, limit)

      return related
    } catch (error) {
      console.error('Error fetching related projects:', error)
      return []
    }
  }

  /**
   * Get all project slugs for static generation
   */
  async getAllProjectSlugs(): Promise<string[]> {
    try {
      const projects = await sanityClient.fetch(`
        *[_type == "project"] {
          "slug": slug.current
        }
      `)
      return projects?.map((p: { slug: string }) => p.slug) || []
    } catch (error) {
      console.error('Error fetching project slugs:', error)
      return []
    }
  }

  /**
   * Get project categories for filtering
   */
  async getProjectCategories(): Promise<string[]> {
    try {
      const projects = await this.getAllProjects()
      const categories = new Set<string>()

      projects.forEach(project => {
        project.category.forEach(cat => categories.add(cat))
      })

      return Array.from(categories).sort()
    } catch (error) {
      console.error('Error fetching project categories:', error)
      return []
    }
  }

  /**
   * Get project stats for SEO and UI
   */
  async getProjectStats(): Promise<{
    total: number
    byCity: Record<string, number>
    byCategory: Record<string, number>
  }> {
    try {
      const projects = await this.getAllProjects()

      const stats = {
        total: projects.length,
        byCity: {} as Record<string, number>,
        byCategory: {} as Record<string, number>
      }

      projects.forEach(project => {
        // Count by city
        const cityName = project.location.name
        stats.byCity[cityName] = (stats.byCity[cityName] || 0) + 1

        // Count by category
        project.category.forEach(cat => {
          stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1
        })
      })

      return stats
    } catch (error) {
      console.error('Error fetching project stats:', error)
      return { total: 0, byCity: {}, byCategory: {} }
    }
  }
}

// Export singleton instance
export const sanityService = SanityService.getInstance()