import { useState, useMemo } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import {
  AppointmentsHeader,
  AppointmentsTabs,
  AppointmentList,
  AppointmentDetails,
} from './components'
import { AppointmentsCalendarView } from './components/AppointmentsCalendarView'
import { mockAppointments } from './data/mockAppointments'
import { filterAppointments, sortAppointmentsByDate, countAppointmentsByStatus } from './utils'
import type { AppointmentStatus } from './types'

type ViewMode = 'grid' | 'calendar'

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<AppointmentStatus | 'all'>('all')
  const navigate = useNavigate()
  const location = useLocation()

  // Determine view mode based on current route
  const viewMode: ViewMode = location.pathname.includes('/calendar') ? 'calendar' : 'grid'
  const isDetailsPage = location.pathname.includes('/details/')

  const handleViewModeChange = (mode: ViewMode) => {
    if (mode === 'calendar') {
      navigate('/appointments/calendar/month')
    } else {
      navigate('/appointments')
    }
  }

  // Filter and sort appointments
  const filteredAppointments = useMemo(() => {
    const filtered = filterAppointments(mockAppointments, {
      status: activeTab,
      search: searchQuery,
    })
    return sortAppointmentsByDate(filtered, 'asc')
  }, [searchQuery, activeTab])

  // Count appointments by status
  const counts = useMemo(() => {
    return countAppointmentsByStatus(mockAppointments)
  }, [])

  return (
    <div>
      {!isDetailsPage && (
        <AppointmentsHeader viewMode={viewMode} onViewModeChange={handleViewModeChange} />
      )}

      <Routes>
        <Route
          index
          element={
            <AppointmentsTabs
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              counts={counts}
            >
              <AppointmentList
                appointments={filteredAppointments}
                emptyMessage={
                  searchQuery
                    ? 'No appointments match your search'
                    : `No ${activeTab === 'all' ? '' : activeTab} appointments found`
                }
              />
            </AppointmentsTabs>
          }
        />
        <Route
          path="calendar/:view"
          element={<AppointmentsCalendarView appointments={mockAppointments} />}
        />
        <Route path="details/:id" element={<AppointmentDetails />} />
      </Routes>
    </div>
  )
}

