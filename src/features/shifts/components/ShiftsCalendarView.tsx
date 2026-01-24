/**
 * ShiftsCalendarView Component
 * Uses the big calendar component from features/calendar to display shifts
 */

import { useMemo } from 'react'
import { Shift } from '../types'
import { CalendarProvider } from '@/features/calendar/contexts/calendar-context'
import { ClientContainer } from '@/features/calendar/components/client-container'
import { shiftsToEvents } from '../utils/shiftsToEvents'
import { DEFAULT_SHIFT_USER } from '../utils/shiftsToEvents'

interface ShiftsCalendarViewProps {
  shifts: Shift[]
}

export function ShiftsCalendarView({ shifts }: ShiftsCalendarViewProps) {
  // Convert shifts to calendar events
  const events = useMemo(() => {
    return shiftsToEvents(shifts)
  }, [shifts])

  // Use a single default user for all shifts
  const users = useMemo(() => [DEFAULT_SHIFT_USER], [])

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-blue-500"></div>
          <span>Open Shift</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-green-500"></div>
          <span>Closed Shift</span>
        </div>
      </div>

      {/* Big Calendar Component */}
      <CalendarProvider users={users} events={events}>
        <ClientContainer view="month" />
      </CalendarProvider>
    </div>
  )
}

