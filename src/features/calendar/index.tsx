import { useParams, Navigate } from 'react-router-dom'

import { CalendarProvider } from '@/features/calendar/contexts/calendar-context'
import { ClientContainer } from '@/features/calendar/components/client-container'

import { USERS_MOCK, CALENDAR_ITEMS_MOCK } from '@/features/calendar/mocks'

import type { TCalendarView } from '@/features/calendar/types'

export default function CalendarPage() {
  const { view } = useParams<{ view: TCalendarView }>()

  // If no view is specified, default to month view
  if (!view) {
    return <Navigate to="/calendar/month" replace />
  }

  // Validate the view parameter
  const validViews: TCalendarView[] = ['day', 'week', 'month', 'year', 'agenda']
  if (!validViews.includes(view as TCalendarView)) {
    return <Navigate to="/calendar/month" replace />
  }

  return (
    <div className="p-6">
      <CalendarProvider users={USERS_MOCK} events={CALENDAR_ITEMS_MOCK}>
        <ClientContainer view={view as TCalendarView} />
      </CalendarProvider>
    </div>
  )
}

