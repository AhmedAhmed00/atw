/**
 * Date Utility Functions
 * Shared date manipulation and filtering utilities
 */

export type DateFilterType = 'all' | 'today' | 'yesterday' | 'this-week' | 'last-week' | 'this-month' | 'last-month' | 'custom'

/**
 * Get today's date at midnight
 */
export function getToday(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

/**
 * Get start of week (Sunday)
 */
export function getStartOfWeek(date: Date = getToday()): Date {
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - date.getDay())
  return startOfWeek
}

/**
 * Get end of week (Saturday)
 */
export function getEndOfWeek(date: Date = getToday()): Date {
  const startOfWeek = getStartOfWeek(date)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  return endOfWeek
}

/**
 * Get start of month
 */
export function getStartOfMonth(date: Date = getToday()): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * Get end of month
 */
export function getEndOfMonth(date: Date = getToday()): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/**
 * Get start of last month
 */
export function getStartOfLastMonth(): Date {
  const today = getToday()
  return new Date(today.getFullYear(), today.getMonth() - 1, 1)
}

/**
 * Get end of last month
 */
export function getEndOfLastMonth(): Date {
  const today = getToday()
  return new Date(today.getFullYear(), today.getMonth(), 0)
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = getToday()
  return dateObj.toISOString().split('T')[0] === today.toISOString().split('T')[0]
}

/**
 * Check if date is yesterday
 */
export function isYesterday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const yesterday = new Date(getToday())
  yesterday.setDate(yesterday.getDate() - 1)
  return dateObj.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]
}

/**
 * Check if date is in date range (inclusive)
 */
export function isDateInRange(date: Date | string, start: Date, end: Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj >= start && dateObj <= end
}

/**
 * Generic date filter function
 */
export function filterByDateRange<T>(
  items: T[],
  dateField: (item: T) => Date | string,
  filter: DateFilterType
): T[] {
  const now = new Date()
  const today = getToday()

  switch (filter) {
    case 'today': {
      const todayStr = today.toISOString().split('T')[0]
      return items.filter(item => {
        const itemDate = new Date(dateField(item)).toISOString().split('T')[0]
        return itemDate === todayStr
      })
    }

    case 'yesterday': {
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]
      return items.filter(item => {
        const itemDate = new Date(dateField(item)).toISOString().split('T')[0]
        return itemDate === yesterdayStr
      })
    }

    case 'this-week': {
      const startOfWeek = getStartOfWeek()
      return items.filter(item => {
        const itemDate = new Date(dateField(item))
        return itemDate >= startOfWeek && itemDate <= now
      })
    }

    case 'last-week': {
      const startOfLastWeek = new Date(today)
      startOfLastWeek.setDate(today.getDate() - today.getDay() - 7)
      const endOfLastWeek = new Date(startOfLastWeek)
      endOfLastWeek.setDate(startOfLastWeek.getDate() + 6)
      return items.filter(item => {
        const itemDate = new Date(dateField(item))
        return itemDate >= startOfLastWeek && itemDate <= endOfLastWeek
      })
    }

    case 'this-month': {
      const startOfMonth = getStartOfMonth()
      return items.filter(item => {
        const itemDate = new Date(dateField(item))
        return itemDate >= startOfMonth && itemDate <= now
      })
    }

    case 'last-month': {
      const startOfLastMonth = getStartOfLastMonth()
      const endOfLastMonth = getEndOfLastMonth()
      return items.filter(item => {
        const itemDate = new Date(dateField(item))
        return itemDate >= startOfLastMonth && itemDate <= endOfLastMonth
      })
    }

    case 'custom':
      // For custom, return all - would need date picker implementation
      return items

    case 'all':
    default:
      return items
  }
}

