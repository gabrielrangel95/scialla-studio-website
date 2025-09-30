import { MetadataRoute } from 'next'
import { sanityService } from '@/lib/sanity-service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sciallastudioid.com'
  const locales = ['en', 'es', 'it'] as const

  const sitemap: MetadataRoute.Sitemap = []

  // Helper function to create URL for each locale
  const createLocalizedUrl = (path: string) => {
    return locales.map(locale => ({
      url: locale === 'en' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' || path === '/' ? 1.0 : 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}${path}`,
          es: `${baseUrl}/es${path}`,
          it: `${baseUrl}/it${path}`,
        },
      },
    }))
  }

  // Homepage
  sitemap.push(...createLocalizedUrl(''))

  // City pages (critical for SEO)
  const cities = ['orlando', 'tampa', 'nyc', 'los-angeles']
  cities.forEach(city => {
    sitemap.push(...createLocalizedUrl(`/interior-design-${city}`))
  })

  // Portfolio page
  sitemap.push(...createLocalizedUrl('/portfolio'))

  // Get all projects for dynamic URLs
  try {
    const projects = await sanityService.getAllProjects()

    projects.forEach(project => {
      locales.forEach(locale => {
        sitemap.push({
          url: locale === 'en'
            ? `${baseUrl}/portfolio/${project.slug.current}`
            : `${baseUrl}/${locale}/portfolio/${project.slug.current}`,
          lastModified: project.completionDate
            ? new Date(project.completionDate)
            : new Date(project._createdAt),
          changeFrequency: 'monthly',
          priority: 0.8,
          alternates: {
            languages: {
              en: `${baseUrl}/portfolio/${project.slug.current}`,
              es: `${baseUrl}/es/portfolio/${project.slug.current}`,
              it: `${baseUrl}/it/portfolio/${project.slug.current}`,
            },
          },
        })
      })
    })
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
  }

  return sitemap
}
