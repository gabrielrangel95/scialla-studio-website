import { MetadataRoute } from 'next'
import { sanityService } from '@/lib/sanity-service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.sciallastudioid.com'
  const sitemap: MetadataRoute.Sitemap = []

  // Helper function to create a sitemap entry
  const createUrl = (path: string) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' || path === '/' ? 1.0 : 0.9,
  })

  // Homepage
  sitemap.push(createUrl(''))

  // Service landing pages — /interior-design is the hub for the city pages below
  sitemap.push(createUrl('/architecture'))
  sitemap.push(createUrl('/interior-design'))

  // City pages (critical for SEO)
  const cities = ['orlando', 'tampa', 'nyc', 'los-angeles']
  cities.forEach(city => {
    sitemap.push(createUrl(`/interior-design-${city}`))
  })

  // Projects page
  sitemap.push(createUrl('/projects'))

  // Process page
  sitemap.push(createUrl('/process'))

  // Get all projects for dynamic URLs
  try {
    const projects = await sanityService.getAllProjects()

    projects.forEach(project => {
      sitemap.push({
        url: `${baseUrl}/projects/${project.slug.current}`,
        lastModified: project.completionDate
          ? new Date(project.completionDate)
          : new Date(project._createdAt),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
  }

  return sitemap
}
