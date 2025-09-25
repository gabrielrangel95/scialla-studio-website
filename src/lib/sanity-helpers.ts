import { sanityClient } from './sanity'
import { cityQuery } from '../../sanity/lib/queries'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Initialize image URL builder
const builder = imageUrlBuilder(sanityClient)

// Helper function to build image URLs
export function urlForImage(source: SanityImageSource) {
  if (!source) {
    return null
  }
  return builder.image(source).url()
}

// Helper function to build optimized image URLs
export function urlForImageWithOptions(source: SanityImageSource, options?: { width?: number; height?: number; quality?: number }) {
  if (!source) {
    return null
  }

  let imageBuilder = builder.image(source)

  if (options?.width) {
    imageBuilder = imageBuilder.width(options.width)
  }

  if (options?.height) {
    imageBuilder = imageBuilder.height(options.height)
  }

  if (options?.quality) {
    imageBuilder = imageBuilder.quality(options.quality)
  }

  return imageBuilder.url()
}

// Fetch city data by slug
export async function getCityBySlug(slug: string) {
  try {
    const city = await sanityClient.fetch(cityQuery, { slug })
    return city
  } catch (error) {
    console.error('Error fetching city data from Sanity:', error)
    return null
  }
}

// City type based on Sanity schema
export interface SanityCity {
  _id: string
  name: string
  slug: {
    current: string
  }
  heroImage?: SanityImageSource
  description?: string
  testimonials?: Array<{
    clientName: string
    quote: string
    rating: number
  }>
  projects?: Array<{
    _id: string
    title: string
    slug: {
      current: string
    }
    featuredImage?: SanityImageSource
    category: string[]
  }>
}