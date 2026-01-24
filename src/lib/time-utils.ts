/**
 * Time utility functions for working with time strings and durations
 */

export interface TimeDuration {
  hours: number
  minutes: number
  totalMinutes: number
}

/**
 * Calculates the duration between two time strings in HH:MM format
 * @param startTime - Start time in HH:MM format (e.g., "09:00")
 * @param endTime - End time in HH:MM format (e.g., "17:30")
 * @returns Object containing hours, minutes, and total minutes
 */
export function calculateTimeDuration(
  startTime: string,
  endTime: string
): TimeDuration {
  const [startH, startM] = startTime.split(':').map(Number)
  const [endH, endM] = endTime.split(':').map(Number)
  
  const totalMinutes = (endH * 60 + endM) - (startH * 60 + startM)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  
  return {
    hours,
    minutes,
    totalMinutes,
  }
}

/**
 * Formats a duration object into a human-readable string
 * @param duration - Duration object with hours and minutes
 * @returns Formatted string (e.g., "8h 30m")
 */
export function formatDuration(duration: TimeDuration): string {
  return `${duration.hours}h ${duration.minutes}m`
}

/**
 * Formats a duration from time strings directly
 * @param startTime - Start time in HH:MM format
 * @param endTime - End time in HH:MM format
 * @returns Formatted duration string (e.g., "8h 30m")
 */
export function formatTimeDuration(startTime: string, endTime: string): string {
  const duration = calculateTimeDuration(startTime, endTime)
  return formatDuration(duration)
}

/**
 * Validates if a time string is in valid HH:MM format
 * @param time - Time string to validate
 * @returns True if valid, false otherwise
 */
export function isValidTimeFormat(time: string): boolean {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  return timeRegex.test(time)
}

/**
 * Converts minutes to hours and minutes
 * @param totalMinutes - Total minutes
 * @returns Object containing hours and minutes
 */
export function minutesToHoursAndMinutes(totalMinutes: number): Pick<TimeDuration, 'hours' | 'minutes'> {
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  }
}

