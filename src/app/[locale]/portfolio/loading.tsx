import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

export default function PortfolioLoading() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[]}
        currentPage="Portfolio"
      />

      {/* Hero Section Skeleton */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-12 md:h-16 lg:h-20 bg-gray-200 rounded-lg mb-6 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-lg mb-4 max-w-3xl mx-auto animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-lg mb-8 max-w-2xl mx-auto animate-pulse" />

          <div className="flex flex-wrap justify-center gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* Filters Skeleton */}
      <section className="py-8 px-4 md:px-6 lg:px-12 xl:px-16 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid Skeleton */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="group cursor-pointer animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
                <div className="flex gap-2">
                  <div className="h-4 bg-gray-200 rounded w-16" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}