'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * ScrollToTop component that scrolls to the top of the page when the route changes.
 * This ensures a better user experience by starting at the top of each new page.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top when pathname changes
    // Using setTimeout to ensure the scroll happens after the route change
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use 'instant' for immediate scroll, 'smooth' for animated
      })
    }

    // Small delay to ensure DOM has updated
    setTimeout(scrollToTop, 0)
  }, [pathname])

  // This component doesn't render anything
  return null
}