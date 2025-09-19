import { MetadataRoute } from 'next'
import { sanityService } from '@/lib/sanity-service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sciallastudioid.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // City-specific pages (critical for SEO)
  const cities = ['orlando', 'tampa', 'nyc', 'los-angeles']
  const cityPages = cities.map(city => ({
    url: `${baseUrl}/interior-design-${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Service pages by city (if they exist)
  const services = ['kitchen-design', 'bathroom-design', 'commercial-design']
  const servicePages = cities.flatMap(city =>
    services.map(service => ({
      url: `${baseUrl}/services/${service}-${city}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  // Get all projects for dynamic URLs
  const projects = await sanityService.getAllProjects()
  const projectPages = projects.map(project => ({
    url: `${baseUrl}/portfolio/${project.slug.current}`,
    lastModified: project.completionDate ? new Date(project.completionDate) : new Date(project._createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...cityPages,
    ...servicePages,
    ...projectPages,
  ]
}