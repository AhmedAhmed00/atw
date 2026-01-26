/**
 * ScrollRestoration component
 * Automatically scrolls to top when route changes
 */

import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { scrollToTop } from '@/lib/scroll-utils'

interface ScrollRestorationProps {
  /**
   * Scroll behavior: 'instant' (default) or 'smooth'
   */
  behavior?: ScrollBehavior
  /**
   * Delay before scrolling (in milliseconds)
   */
  timeout?: number
}

export function ScrollRestoration({ behavior = 'instant', timeout = 0 }: ScrollRestorationProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top when pathname changes
    scrollToTop({ behavior, timeout })
  }, [pathname, behavior, timeout])

  return null
}

