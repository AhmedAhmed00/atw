/**
 * Utility functions specific to the working hours feature
 */

/**
 * Determines if a day index represents a weekday or weekend
 * @param dayIndex - Index of the day (0 = Monday, 6 = Sunday)
 * @returns True if weekday (Mon-Fri), false if weekend
 */
export function isWeekday(dayIndex: number): boolean {
  return dayIndex < 5
}

/**
 * Gets the appropriate icon type for a day
 * @param dayIndex - Index of the day
 * @returns 'sun' for weekdays, 'moon' for weekends
 */
export function getDayIconType(dayIndex: number): 'sun' | 'moon' {
  return isWeekday(dayIndex) ? 'sun' : 'moon'
}

/**
 * Gets the day status label
 * @param enabled - Whether the day is enabled
 * @returns Status label string
 */
export function getDayStatusLabel(enabled: boolean): string {
  return enabled ? 'Working Day' : 'Day Off'
}

