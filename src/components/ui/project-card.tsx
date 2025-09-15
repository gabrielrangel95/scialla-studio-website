import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity-image'
import type { SanityImage } from '@/types/sanity'

interface ProjectCardProps {
  title: string
  slug: string
  location: string
  locationSlug: string
  category: string[]
  featuredImage: SanityImage
  completionDate?: string
}

export function ProjectCard({
  title,
  slug,
  location,
  locationSlug,
  category,
  featuredImage,
  completionDate,
}: ProjectCardProps) {
  const imageUrl = urlForImage(featuredImage)?.width(800).height(600).url()
  const blurDataURL = urlForImage(featuredImage)?.width(20).height(15).blur(50).url()

  // Format category for display
  const primaryCategory = category[0]?.replace('-', ' ') || 'Interior Design'
  
  return (
    <Link 
      href={`/portfolio/${slug}`}
      className="group block relative overflow-hidden bg-gray-100 aspect-[4/3] rounded-sm"
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={featuredImage.alt || title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-black/20 backdrop-blur-sm rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {primaryCategory}
          </span>
        </div>
        
        {/* Project Info */}
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
          <h3 className="text-lg font-semibold text-white mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
            {title}
          </h3>
          <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
            {location}
          </p>
        </div>
      </div>
      
      {/* Static overlay with minimal info (always visible) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent group-hover:opacity-0 transition-opacity duration-300">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium text-white/90 uppercase tracking-wide">
              {primaryCategory}
            </p>
            <p className="text-xs text-white/70 mt-1">
              {location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}