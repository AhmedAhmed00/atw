/**
 * Appointment utility functions
 */

import type { Appointment, AppointmentFilters, AppointmentStatus } from '../types'

/**
 * Filters appointments based on provided criteria
 */
export function filterAppointments(
  appointments: Appointment[],
  filters: AppointmentFilters
): Appointment[] {
  return appointments.filter((appointment) => {
    // Status filter
    if (filters.status && filters.status !== 'all' && appointment.status !== filters.status) {
      return false
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch =
        appointment.patientName.toLowerCase().includes(searchLower) ||
        appointment.patientEmail.toLowerCase().includes(searchLower) ||
        appointment.service.toLowerCase().includes(searchLower) ||
        appointment.doctor.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false
    }

    return true
  })
}

/**
 * Sorts appointments by date and time
 */
export function sortAppointmentsByDate(
  appointments: Appointment[],
  order: 'asc' | 'desc' = 'asc'
): Appointment[] {
  return [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`)
    const dateB = new Date(`${b.date}T${b.time}`)
    return order === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
  })
}

/**
 * Groups appointments by status
 */
export function groupAppointmentsByStatus(
  appointments: Appointment[]
): Record<AppointmentStatus | 'all', Appointment[]> {
  return {
    all: appointments,
    pending: appointments.filter((a) => a.status === 'pending'),
    confirmed: appointments.filter((a) => a.status === 'confirmed'),
    completed: appointments.filter((a) => a.status === 'completed'),
    cancelled: appointments.filter((a) => a.status === 'cancelled'),
  }
}

/**
 * Counts appointments by status
 */
export function countAppointmentsByStatus(
  appointments: Appointment[]
): Record<AppointmentStatus | 'all', number> {
  const grouped = groupAppointmentsByStatus(appointments)
  return {
    all: grouped.all.length,
    pending: grouped.pending.length,
    confirmed: grouped.confirmed.length,
    completed: grouped.completed.length,
    cancelled: grouped.cancelled.length,
  }
}
