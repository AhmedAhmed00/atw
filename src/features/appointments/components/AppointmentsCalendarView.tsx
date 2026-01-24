import { lazy, Suspense } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import type { Appointment } from '../types'
import type { IEvent, IUser } from '@/features/calendar/interfaces'
import type { TEventColor, TCalendarView } from '@/features/calendar/types'

const CalendarProvider = lazy(() => 
  import('@/features/calendar/contexts/calendar-context').then(module => ({ 
    default: module.CalendarProvider 
  }))
)
const ClientContainer = lazy(() => 
  import('@/features/calendar/components/client-container').then(module => ({ 
    default: module.ClientContainer 
  }))
)

interface AppointmentsCalendarViewProps {
  appointments: Appointment[]
}

// Mock user for appointments
const APPOINTMENT_USER: IUser = {
  id: 'appointments-user',
  name: 'Healthcare Provider',
  picturePath: null,
}

// Convert appointments to calendar events
function appointmentsToEvents(appointments: Appointment[]): IEvent[] {
  return appointments.map((appointment, index) => {
    // Parse the date and time to create a full datetime
    const [hours, minutes] = appointment.time.split(':')
    const startDate = new Date(appointment.date)
    startDate.setHours(parseInt(hours), parseInt(minutes))
    
    // Assume 30-minute appointments by default
    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + 30)

    // Map status to color
    const colorMap: Record<string, TEventColor> = {
      pending: 'yellow',
      confirmed: 'blue',
      completed: 'green',
      cancelled: 'red',
    }

    return {
      id: index + 1,
      title: `${appointment.patientName} - ${appointment.service}`,
      description: `Doctor: ${appointment.doctor}\nPhone: ${appointment.patientPhone}${
        appointment.notes ? `\nNotes: ${appointment.notes}` : ''
      }`,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      color: colorMap[appointment.status] || 'blue',
      user: APPOINTMENT_USER,
    }
  })
}

function CalendarLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[500px] bg-card rounded-lg border">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground">Loading calendar...</p>
      </div>
    </div>
  )
}

export function AppointmentsCalendarView({ appointments }: AppointmentsCalendarViewProps) {
  const { view } = useParams<{ view: TCalendarView }>()
  const events = appointmentsToEvents(appointments)

  // Validate the view parameter
  const validViews: TCalendarView[] = ['day', 'week', 'month', 'year', 'agenda']
  if (!view || !validViews.includes(view as TCalendarView)) {
    return <Navigate to="/appointments/calendar/month" replace />
  }

  return (
    <div className="mt-6">
      <Suspense fallback={<CalendarLoadingFallback />}>
        <CalendarProvider users={[APPOINTMENT_USER]} events={events}>
          <ClientContainer view={view as TCalendarView} />
        </CalendarProvider>
      </Suspense>
    </div>
  )
}

