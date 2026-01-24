/**
 * Utility function to convert Shift objects to IEvent objects for the calendar
 */

import { Shift } from '../types'
import { IEvent, IUser } from '@/features/calendar/interfaces'
import { TEventColor } from '@/features/calendar/types'
import { parseISO } from 'date-fns'

// Default user for shifts (since shifts don't have individual users)
export const DEFAULT_SHIFT_USER: IUser = {
  id: 'shift-system',
  name: 'Shift System',
  picturePath: null,
}

/**
 * Converts a Shift to an IEvent for calendar display
 */
export function shiftToEvent(shift: Shift, index: number): IEvent {
  // Map shift type to color
  const color: TEventColor = shift.shiftType === 'open' ? 'blue' : 'green'
  
  // Parse the shift date and times
  const shiftDate = parseISO(shift.shiftDate)
  const [startHour, startMinute] = shift.startTime.split(':').map(Number)
  const [endHour, endMinute] = shift.endTime.split(':').map(Number)
  
  // Create start and end datetime
  const startDateTime = new Date(shiftDate)
  startDateTime.setHours(startHour, startMinute, 0, 0)
  
  const endDateTime = new Date(shiftDate)
  endDateTime.setHours(endHour, endMinute, 0, 0)
  
  // If end time is before start time, it means it's an overnight shift
  if (endDateTime <= startDateTime) {
    endDateTime.setDate(endDateTime.getDate() + 1)
  }
  
  // Create title with shift type and location
  const title = `${shift.shiftType === 'open' ? 'Open' : 'Closed'} Shift - ${shift.workLocation}`
  
  // Create description with shift details
  const roleRequirements = shift.roleRequirements
    .map((req) => `${req.quantity}x ${req.role}`)
    .join(', ')
  const description = `Time: ${shift.startTime} - ${shift.endTime}\nLocation: ${shift.workLocation}\nRoles: ${roleRequirements}${shift.instructions ? `\n\n${shift.instructions}` : ''}`
  
  return {
    id: index + 10000, // Use high ID to avoid conflicts
    startDate: startDateTime.toISOString(),
    endDate: endDateTime.toISOString(),
    title,
    color,
    description,
    user: DEFAULT_SHIFT_USER,
  }
}

/**
 * Converts an array of Shifts to IEvent array
 */
export function shiftsToEvents(shifts: Shift[]): IEvent[] {
  return shifts.map((shift, index) => shiftToEvent(shift, index))
}

