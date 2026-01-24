import { AppointmentCard } from './AppointmentCard'
import type { AppointmentListProps } from '../types'

export function AppointmentList({
  appointments,
  emptyMessage = 'No appointments found',
}: AppointmentListProps) {
  return appointments.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <svg
          className="w-10 h-10 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
        {emptyMessage}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
        There are no appointments matching your current filters.
      </p>
    </div>
  ) : (
    <div className="space-y-4 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-1">
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  )
}

