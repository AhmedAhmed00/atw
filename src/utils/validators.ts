/**
 * Validator Utilities
 * Centralized validation functions
 */

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && phoneRegex.test(phone)
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate file type
 */
export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type)
}

/**
 * Validate file size
 */
export function isValidFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize
}

/**
 * Validate required field
 */
export function isRequired(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  if (Array.isArray(value)) {
    return value.length > 0
  }
  return value !== null && value !== undefined
}

/**
 * Validate minimum length
 */
export function hasMinLength(value: string, min: number): boolean {
  return value.length >= min
}

/**
 * Validate maximum length
 */
export function hasMaxLength(value: string, max: number): boolean {
  return value.length <= max
}

/**
 * Validate number range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Validate date is in the past
 */
export function isPastDate(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj < new Date()
}

/**
 * Validate date is in the future
 */
export function isFutureDate(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj > new Date()
}

