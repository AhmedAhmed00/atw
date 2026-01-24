/**
 * Scroll utility functions
 */

export interface ScrollToTopOptions {
  behavior?: ScrollBehavior
  timeout?: number
}

/**
 * Scrolls to the top of the page
 * @param options - Scroll options
 */
export function scrollToTop(options: ScrollToTopOptions = {}) {
  const { behavior = 'instant', timeout = 0 } = options

  if (timeout > 0) {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior,
      })
    }, timeout)
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    })
  }
}

/**
 * Scrolls to a specific element
 * @param elementId - ID of the element to scroll to
 * @param options - Scroll options
 */
export function scrollToElement(
  elementId: string,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
) {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView(options)
  }
}

/**
 * Gets the current scroll position
 */
export function getScrollPosition() {
  return {
    x: window.scrollX || window.pageXOffset,
    y: window.scrollY || window.pageYOffset,
  }
}

/**
 * Saves scroll position to session storage
 * @param key - Storage key
 */
export function saveScrollPosition(key: string) {
  const position = getScrollPosition()
  sessionStorage.setItem(key, JSON.stringify(position))
}

/**
 * Restores scroll position from session storage
 * @param key - Storage key
 */
export function restoreScrollPosition(key: string) {
  const saved = sessionStorage.getItem(key)
  if (saved) {
    const position = JSON.parse(saved)
    window.scrollTo(position.x, position.y)
  }
}

