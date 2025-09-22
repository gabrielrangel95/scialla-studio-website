import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { ArrowLeft } from 'lucide-react'

export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Breadcrumbs Skeleton */}
      <div className="px-4 md:px-6 lg:px-12 xl:px-16 py-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          <span className="text-gray-400">/</span>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <span className="text-gray-400">/</span>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4 text-gray-400" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="relative z-10 px-4 md:px-6 lg:px-12 xl:px-16 py-12 w-full">
          <div className="max-w-4xl">
            <div className="h-12 md:h-16 lg:h-20 bg-white/20 rounded-lg mb-6 animate-pulse backdrop-blur-sm" />

            <div className="flex flex-wrap gap-6 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-6 w-24 bg-white/20 rounded-full animate-pulse backdrop-blur-sm" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="space-y-4 mb-12">
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-4/6" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>

            {/* Gallery Skeleton */}
            <div className="mb-12">
              <div className="h-8 w-48 bg-gray-200 rounded mb-8 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-8">
            {/* Project Info */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                    <div className="flex-1">
                      <div className="h-4 w-16 bg-gray-200 rounded mb-1 animate-pulse" />
                      <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Review Skeleton */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-6 w-28 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
              </div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* CTA Skeleton */}
            <div className="bg-gray-900 text-white p-6 rounded-lg">
              <div className="h-6 w-32 bg-gray-700 rounded mb-4 animate-pulse" />
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
              </div>
              <div className="h-10 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Skeleton */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-gray-200 rounded mb-4 mx-auto animate-pulse" />
            <div className="h-6 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
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