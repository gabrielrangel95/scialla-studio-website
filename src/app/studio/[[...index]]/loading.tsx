'use client'

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
        <p className="text-sm text-gray-600">Loading Sanity Studio...</p>
      </div>
    </div>
  )
}