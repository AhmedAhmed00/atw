/**
 * Sort Utility Functions
 * Shared sorting utilities for common patterns
 */

/**
 * Priority order mapping
 */
export const PRIORITY_ORDER: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
}

/**
 * Common status order mapping
 */
export const STATUS_ORDER: Record<string, number> = {
  'in-progress': 0,
  pending: 1,
  overdue: 2,
  completed: 3,
  cancelled: 4,
  open: 0,
  'in_progress': 1,
  resolved: 2,
  closed: 3,
}

/**
 * Sort by priority
 */
export function sortByPriority<T>(
  items: T[],
  getPriority: (item: T) => string
): T[] {
  return [...items].sort((a, b) => {
    const priorityA = PRIORITY_ORDER[getPriority(a)] ?? 999
    const priorityB = PRIORITY_ORDER[getPriority(b)] ?? 999
    return priorityA - priorityB
  })
}

/**
 * Sort by status
 */
export function sortByStatus<T>(
  items: T[],
  getStatus: (item: T) => string,
  customOrder?: Record<string, number>
): T[] {
  const order = customOrder ?? STATUS_ORDER
  return [...items].sort((a, b) => {
    const statusA = order[getStatus(a)] ?? 999
    const statusB = order[getStatus(b)] ?? 999
    return statusA - statusB
  })
}

/**
 * Sort by date
 */
export function sortByDate<T>(
  items: T[],
  getDate: (item: T) => Date | string,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(getDate(a)).getTime()
    const dateB = new Date(getDate(b)).getTime()
    return order === 'asc' ? dateA - dateB : dateB - dateA
  })
}

/**
 * Sort by priority then date
 */
export function sortByPriorityThenDate<T>(
  items: T[],
  getPriority: (item: T) => string,
  getDate: (item: T) => Date | string
): T[] {
  return [...items].sort((a, b) => {
    const priorityA = PRIORITY_ORDER[getPriority(a)] ?? 999
    const priorityB = PRIORITY_ORDER[getPriority(b)] ?? 999
    const priorityDiff = priorityA - priorityB
    if (priorityDiff !== 0) return priorityDiff
    
    const dateA = new Date(getDate(a)).getTime()
    const dateB = new Date(getDate(b)).getTime()
    return dateA - dateB
  })
}

