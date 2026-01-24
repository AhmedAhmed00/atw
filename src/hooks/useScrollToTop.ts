/**
 * Hook for programmatic scroll control
 */

import { useCallback } from 'react'
import { scrollToTop, type ScrollToTopOptions } from '@/lib/scroll-utils'

/**
 * Hook that provides a function to scroll to top
 * Useful for manual scroll control (e.g., "Back to Top" buttons)
 */
export function useScrollToTop() {
  const scrollTo = useCallback((options?: ScrollToTopOptions) => {
    scrollToTop(options)
  }, [])

  return scrollTo
}

/**
 * Example usage:
 * 
 * const scrollToTop = useScrollToTop()
 * 
 * <Button onClick={() => scrollToTop({ behavior: 'smooth' })}>
 *   Back to Top
 * </Button>
 */

