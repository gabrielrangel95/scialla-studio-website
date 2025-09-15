import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}

export function resolveOpenGraphImage(image: Image, width = 1200, height = 627) {
  if (!image) return
  const url = urlForImage(image)?.width(width).height(height).fit('crop').url()
  if (!url) return
  return { url, alt: (image as Image & { alt?: string })?.alt || '', width, height }
}

// Helper function to get optimized image URLs for Next.js Image component
export function getImageProps(image: Image, width: number, height: number) {
  if (!image) return null
  
  const url = urlForImage(image)?.width(width).height(height).url()
  const blurUrl = urlForImage(image)?.width(20).height(20).blur(50).url()
  
  return {
    src: url || '',
    alt: (image as Image & { alt?: string })?.alt || '',
    width,
    height,
    placeholder: 'blur' as const,
    blurDataURL: blurUrl || '',
  }
}