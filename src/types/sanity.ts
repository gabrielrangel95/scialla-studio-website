import type { Image, PortableTextBlock } from 'sanity'

export interface SanityImage extends Image {
  alt?: string
  caption?: string
}

export interface SanityFile {
  _type?: 'file'
  asset: {
    _id: string
    url: string
    mimeType: string
    size: number
    originalFilename: string
  }
  caption?: string
  thumbnail?: SanityImage
}

export interface City {
  _id: string
  name: string
  slug: {
    current: string
  }
  heroImage: SanityImage
  description: string
  testimonials: {
    clientName: string
    quote: string
    rating: number
  }[]
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: SanityImage
  }
}

export interface Project {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  location: {
    name: string
    slug: {
      current: string
    }
  }
  sublocation?: string
  promoVideo?: SanityFile
  serviceType: 'interior-design' | 'architecture' | 'both'
  category: string[]
  featuredImage: SanityImage
  gallery?: SanityImage[]
  description: PortableTextBlock[]
  completionDate?: string
  client?: {
    name?: string
    testimonial?: string
    rating?: number
  }
  projectDetails?: {
    duration?: string
    budget?: string
    squareFootage?: number
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: SanityImage
  }
}

export type LocationSlug = 'orlando' | 'tampa' | 'nyc' | 'los-angeles'