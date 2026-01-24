/**
 * AttendanceCalendarView Component
 * Uses the big calendar component from features/calendar to display attendance
 */

import { useMemo } from 'react'
import { Attendance } from '../types'
import { CalendarProvider } from '@/features/calendar/contexts/calendar-context'
import { ClientContainer } from '@/features/calendar/components/client-container'
import { attendanceToEvents } from '../utils/attendanceToEvents'
import { DEFAULT_ATTENDANCE_USER } from '../utils/attendanceToEvents'

interface AttendanceCalendarViewProps {
  attendance: Attendance[]
}

export function AttendanceCalendarView({ attendance }: AttendanceCalendarViewProps) {
  // Convert attendance to calendar events
  const events = useMemo(() => {
    return attendanceToEvents(attendance)
  }, [attendance])

  // Use a single default user for all attendance records
  const users = useMemo(() => [DEFAULT_ATTENDANCE_USER], [])

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center gap-4 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-green-500"></div>
          <span>Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-red-500"></div>
          <span>Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-yellow-500"></div>
          <span>Late</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-yellow-500"></div>
          <span>Half Day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-blue-500"></div>
          <span>On Leave</span>
        </div>
      </div>

      {/* Big Calendar Component */}
      <CalendarProvider users={users} events={events}>
        <ClientContainer view="month" />
      </CalendarProvider>
    </div>
  )
}

