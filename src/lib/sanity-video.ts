import type { SanityFile } from '@/types/sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

/**
 * Get video URL from Sanity file asset
 */
export function getVideoUrl(video: SanityFile | null | undefined): string | null {
  if (!video || !video.asset) return null

  // Return the URL from the dereferenced asset
  return video.asset.url || null
}

/**
 * Get video thumbnail URL (poster image)
 */
export function getVideoThumbnail(video: SanityFile | null | undefined): string | null {
  if (!video?.thumbnail) return null

  // Import urlForImage dynamically to avoid circular dependencies
  const { urlForImage } = require('./sanity-image')
  return urlForImage(video.thumbnail)?.width(1200).height(675).url() || null
}

/**
 * Get video metadata
 */
export function getVideoMetadata(video: SanityFile | null | undefined) {
  if (!video) return null

  return {
    url: getVideoUrl(video),
    mimeType: video.asset?.mimeType || 'video/mp4',
    size: video.asset?.size,
    filename: video.asset?.originalFilename,
    caption: video.caption,
    thumbnail: getVideoThumbnail(video),
  }
}
