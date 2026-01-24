/**
 * Utility function to convert Attendance objects to IEvent objects for the calendar
 */

import { Attendance } from '../types'
import { IEvent, IUser } from '@/features/calendar/interfaces'
import { TEventColor } from '@/features/calendar/types'
import { parseISO } from 'date-fns'

// Default user for attendance (since attendance doesn't have individual users in calendar context)
export const DEFAULT_ATTENDANCE_USER: IUser = {
  id: 'attendance-system',
  name: 'Attendance System',
  picturePath: null,
}

/**
 * Maps attendance status to calendar event color
 */
function getStatusColor(status: Attendance['status']): TEventColor {
  switch (status) {
    case 'present':
      return 'green'
    case 'absent':
      return 'red'
    case 'late':
      return 'yellow'
    case 'half-day':
      return 'yellow'
    case 'on-leave':
      return 'blue'
    default:
      return 'blue'
  }
}

/**
 * Converts an Attendance to an IEvent for calendar display
 */
export function attendanceToEvent(attendance: Attendance, index: number): IEvent {
  const color: TEventColor = getStatusColor(attendance.status)
  
  // Parse the attendance date
  const attendanceDate = parseISO(attendance.date)
  
  // Create start and end datetime
  let startDateTime: Date
  let endDateTime: Date
  
  if (attendance.clockIn && attendance.clockOut) {
    const [startHour, startMinute] = attendance.clockIn.split(':').map(Number)
    const [endHour, endMinute] = attendance.clockOut.split(':').map(Number)
    
    startDateTime = new Date(attendanceDate)
    startDateTime.setHours(startHour, startMinute, 0, 0)
    
    endDateTime = new Date(attendanceDate)
    endDateTime.setHours(endHour, endMinute, 0, 0)
    
    // If end time is before start time, it means it's an overnight shift
    if (endDateTime <= startDateTime) {
      endDateTime.setDate(endDateTime.getDate() + 1)
    }
  } else {
    // If no clock in/out, use the full day
    startDateTime = new Date(attendanceDate)
    startDateTime.setHours(0, 0, 0, 0)
    endDateTime = new Date(attendanceDate)
    endDateTime.setHours(23, 59, 59, 999)
  }
  
  // Create title with employee name and status
  const statusLabels: Record<Attendance['status'], string> = {
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
    'half-day': 'Half Day',
    'on-leave': 'On Leave',
  }
  const title = `${attendance.employeeName} - ${statusLabels[attendance.status]}`
  
  // Create description with attendance details
  const details: string[] = []
  if (attendance.clockIn) details.push(`Clock In: ${attendance.clockIn}`)
  if (attendance.clockOut) details.push(`Clock Out: ${attendance.clockOut}`)
  if (attendance.totalHours > 0) details.push(`Total Hours: ${attendance.totalHours}h`)
  if (attendance.overtime > 0) details.push(`Overtime: ${attendance.overtime}h`)
  if (attendance.breaks.length > 0) {
    const totalBreakMinutes = attendance.breaks.reduce((sum, b) => sum + b.duration, 0)
    details.push(`Breaks: ${attendance.breaks.length} (${Math.round(totalBreakMinutes / 60 * 10) / 10}h)`)
  }
  if (attendance.reason) details.push(`Reason: ${attendance.reason}`)
  if (attendance.notes) details.push(`Notes: ${attendance.notes}`)
  
  const description = details.join('\n')
  
  return {
    id: index + 20000, // Use high ID to avoid conflicts
    startDate: startDateTime.toISOString(),
    endDate: endDateTime.toISOString(),
    title,
    color,
    description,
    user: DEFAULT_ATTENDANCE_USER,
  }
}

/**
 * Converts an array of Attendance records to IEvent array
 */
export function attendanceToEvents(attendance: Attendance[]): IEvent[] {
  return attendance.map((record, index) => attendanceToEvent(record, index))
}

