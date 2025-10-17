import { Metadata } from 'next'
import Link from 'next/link'
import { Filter, MapPin, Calendar, Tag } from 'lucide-react'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ProjectCard } from '@/components/ui/project-card'
import { sanityService, extractPortableTextContent } from '@/lib/sanity-service'
import { urlForImage } from '@/lib/sanity-image'
import type { LocationSlug } from '@/types/sanity'

interface PortfolioPageProps {
  searchParams?: Promise<{
    city?: LocationSlug
    category?: string
    serviceType?: string
    page?: string
  }>
}

async function getPortfolioData(searchParams?: PortfolioPageProps['searchParams']) {
  const params = await searchParams
  const { city, category, serviceType } = params || {}
  const page = parseInt(params?.page || '1')
  const projectsPerPage = 12
  const offset = (page - 1) * projectsPerPage

  const [projects, categories, stats] = await Promise.all([
    sanityService.getAllProjects({
      city,
      category,
      serviceType,
      limit: projectsPerPage,
      offset
    }),
    sanityService.getProjectCategories(),
    sanityService.getProjectStats()
  ])

  return {
    projects,
    categories,
    stats,
    currentPage: page,
    hasMore: projects.length === projectsPerPage
  }
}

export async function generateMetadata({ searchParams }: PortfolioPageProps): Promise<Metadata> {
  const stats = await sanityService.getProjectStats()
  const params = await searchParams
  const { city, category, serviceType } = params || {}

  let title = 'Architecture & Interior Design Portfolio | Scialla Studio'
  let description = `Explore our ${stats.total}+ architecture and interior design projects across Orlando, Tampa, NYC, and Los Angeles. New construction, modern homes, luxury renovations, and commercial spaces.`

  if (serviceType === 'architecture') {
    title = 'Architecture Portfolio | Scialla Studio'
    description = 'Browse our architectural design projects including new construction, additions, and renovations across the United States.'
  } else if (serviceType === 'interior-design') {
    title = 'Interior Design Portfolio | Scialla Studio'
    description = `Explore our ${stats.total}+ interior design projects across Orlando, Tampa, NYC, and Los Angeles. Modern homes, luxury kitchens, and commercial spaces.`
  }

  if (city) {
    const cityName = city === 'nyc' ? 'New York City' :
                    city === 'los-angeles' ? 'Los Angeles' :
                    city.charAt(0).toUpperCase() + city.slice(1)
    const serviceLabel = serviceType === 'architecture' ? 'Architecture' : serviceType === 'interior-design' ? 'Interior Design' : 'Architecture & Design'
    title = `${cityName} ${serviceLabel} Portfolio | Scialla Studio`
    description = `${stats.byCity[cityName] || 0} completed ${serviceLabel.toLowerCase()} projects in ${cityName}. Browse our portfolio of modern homes, luxury renovations, and commercial spaces.`
  }

  if (category) {
    const categoryName = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
    title = `${categoryName} Portfolio | Scialla Studio`
    description = `${stats.byCategory[category] || 0} ${categoryName.toLowerCase()} projects by Scialla Studio. Professional architecture and interior design services with stunning results.`
  }

  const keywords = [
    'architecture portfolio',
    'interior design portfolio',
    'luxury interior design',
    'new construction',
    'architectural design',
    'modern home design',
    'kitchen renovation',
    'bathroom remodel',
    'commercial interior design',
    ...(city ? [`${city} architecture`, `${city} interior design`] : []),
    ...(category ? [category.replace('-', ' ')] : []),
    ...(serviceType ? [serviceType.replace('-', ' ')] : [])
  ]

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: `https://sciallastudioid.com/portfolio${city ? `?city=${city}` : ''}${category ? `${city ? '&' : '?'}category=${category}` : ''}`,
    },
    openGraph: {
      title,
      description,
      url: `https://sciallastudioid.com/portfolio`,
      siteName: 'Scialla Studio',
      images: [
        {
          url: '/scialla-studio-portfolio-interior-design.jpg',
          width: 1200,
          height: 630,
          alt: 'Scialla Studio Interior Design Portfolio',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/scialla-studio-portfolio-interior-design.jpg'],
    },
  }
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const portfolioData = await getPortfolioData(searchParams)
  const { projects, categories, stats, currentPage, hasMore } = portfolioData
  const params = await searchParams
  const { city, category, serviceType } = params || {}

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Scialla Studio Interior Design Portfolio",
    "description": `Portfolio of ${stats.total} interior design projects by Scialla Studio`,
    "url": "https://sciallastudioid.com/portfolio",
    "numberOfItems": stats.total,
    "itemListElement": projects.map((project, index) => ({
      "@type": "CreativeWork",
      "@id": `https://sciallastudioid.com/portfolio/${project.slug.current}`,
      "name": project.title,
      "description": extractPortableTextContent(project.description) || `Interior design project in ${project.location.name}`,
      "image": project.featuredImage ? urlForImage(project.featuredImage)?.url() : null,
      "creator": {
        "@type": "Organization",
        "name": "Scialla Studio"
      },
      "position": index + 1
    }))
  }

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://sciallastudioid.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://sciallastudioid.com/portfolio"
      }
    ]
  }

  const cityDisplayName = city === 'nyc' ? 'New York City' :
                         city === 'los-angeles' ? 'Los Angeles' :
                         city ? city.charAt(0).toUpperCase() + city.slice(1) : null

  const categoryDisplayName = category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <div className="min-h-screen bg-white text-gray-900">
        <Header />

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[]}
          currentPage="Portfolio"
        />

        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
              {city && category ? `${categoryDisplayName} in ${cityDisplayName}` :
               city ? `${cityDisplayName} Portfolio` :
               category ? `${categoryDisplayName} Portfolio` :
               'Interior Design Portfolio'}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {city && category
                ? `${stats.byCategory[category] || 0} ${categoryDisplayName?.toLowerCase()} projects completed in ${cityDisplayName}`
                : city
                ? `${stats.byCity[cityDisplayName!] || 0} completed projects transforming homes and spaces in ${cityDisplayName}`
                : category
                ? `${stats.byCategory[category] || 0} ${categoryDisplayName?.toLowerCase()} projects showcasing our expertise and attention to detail`
                : `${stats.total}+ completed projects across Orlando, Tampa, NYC, and Los Angeles. Transforming spaces with sophisticated design.`
              }
            </p>

            {/* Filter Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{Object.keys(stats.byCity).length} Cities</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{Object.keys(stats.byCategory).length} Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{stats.total} Projects</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 px-4 md:px-6 lg:px-12 xl:px-16 bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Filter Projects:</span>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* Service Type Filter */}
                <div className="flex gap-2">
                  <Link
                    href="/portfolio"
                    className={`px-3 py-2 text-sm rounded-full transition-colors ${
                      !serviceType ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Services
                  </Link>
                  <Link
                    href={`/portfolio?serviceType=interior-design${city ? `&city=${city}` : ''}${category ? `&category=${category}` : ''}`}
                    className={`px-3 py-2 text-sm rounded-full transition-colors ${
                      serviceType === 'interior-design' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Interior Design
                  </Link>
                  <Link
                    href={`/portfolio?serviceType=architecture${city ? `&city=${city}` : ''}${category ? `&category=${category}` : ''}`}
                    className={`px-3 py-2 text-sm rounded-full transition-colors ${
                      serviceType === 'architecture' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Architecture
                  </Link>
                </div>

                {/* City Filter */}
                <div className="flex gap-2">
                  <Link
                    href="/portfolio"
                    className={`px-3 py-2 text-sm rounded-full transition-colors ${
                      !city ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Cities
                  </Link>
                  {['orlando', 'tampa', 'nyc', 'los-angeles'].map(citySlug => {
                    const displayName = citySlug === 'nyc' ? 'NYC' :
                                       citySlug === 'los-angeles' ? 'LA' :
                                       citySlug.charAt(0).toUpperCase() + citySlug.slice(1)
                    const href = `/portfolio?city=${citySlug}${serviceType ? `&serviceType=${serviceType}` : ''}${category ? `&category=${category}` : ''}`

                    return (
                      <Link
                        key={citySlug}
                        href={href}
                        className={`px-3 py-2 text-sm rounded-full transition-colors ${
                          city === citySlug ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {displayName}
                      </Link>
                    )
                  })}
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                  <Link
                    href={`/portfolio${city ? `?city=${city}` : ''}${serviceType && !city ? `?serviceType=${serviceType}` : ''}${serviceType && city ? `&serviceType=${serviceType}` : ''}`}
                    className={`px-3 py-2 text-sm rounded-full transition-colors ${
                      !category ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Categories
                  </Link>
                  {categories.slice(0, 5).map(cat => {
                    const displayName = cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
                    const href = `/portfolio?${city ? `city=${city}&` : ''}${serviceType ? `serviceType=${serviceType}&` : ''}category=${cat}`

                    return (
                      <Link
                        key={cat}
                        href={href}
                        className={`px-3 py-2 text-sm rounded-full transition-colors ${
                          category === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {displayName}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            {projects.length > 0 ? (
              <>
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

                {/* Pagination */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <Link
                      href={`/portfolio?${city ? `city=${city}&` : ''}${serviceType ? `serviceType=${serviceType}&` : ''}${category ? `category=${category}&` : ''}page=${currentPage + 1}`}
                      className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Load More Projects
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl font-light text-gray-900 mb-4">No Projects Found</h3>
                <p className="text-gray-600 mb-8">
                  {city || category
                    ? 'Try adjusting your filters or browse all projects.'
                    : 'Projects are being added to our portfolio. Check back soon!'
                  }
                </p>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  View All Projects
                </Link>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}