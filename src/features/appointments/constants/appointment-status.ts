/**
 * Appointment status configuration
 * Uses CSS variables for theming
 */

import type { AppointmentStatus } from '../types'

export interface StatusConfig {
  label: string
  color: string
  bgColor: string
  borderColor: string
  icon: string
}

export const APPOINTMENT_STATUS_CONFIG: Record<AppointmentStatus, StatusConfig> = {
  pending: {
    label: 'Pending',
    color: 'text-[rgb(var(--status-warning))] dark:text-[rgb(var(--status-warning))]',
    bgColor: 'bg-[rgb(var(--status-warning))]/10 dark:bg-[rgb(var(--status-warning))]/20',
    borderColor: 'border-[rgb(var(--status-warning))]/30 dark:border-[rgb(var(--status-warning))]/40',
    icon: '⏳',
  },
  confirmed: {
    label: 'Confirmed',
    color: 'text-[rgb(var(--brand-primary))] dark:text-[rgb(var(--brand-primary))]',
    bgColor: 'bg-[rgb(var(--brand-primary))]/10 dark:bg-[rgb(var(--brand-primary))]/20',
    borderColor: 'border-[rgb(var(--brand-primary))]/30 dark:border-[rgb(var(--brand-primary))]/40',
    icon: '✓',
  },
  completed: {
    label: 'Completed',
    color: 'text-[rgb(var(--status-success))] dark:text-[rgb(var(--status-success))]',
    bgColor: 'bg-[rgb(var(--status-success))]/10 dark:bg-[rgb(var(--status-success))]/20',
    borderColor: 'border-[rgb(var(--status-success))]/30 dark:border-[rgb(var(--status-success))]/40',
    icon: '✓',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-[rgb(var(--status-danger))] dark:text-[rgb(var(--status-danger))]',
    bgColor: 'bg-[rgb(var(--status-danger))]/10 dark:bg-[rgb(var(--status-danger))]/20',
    borderColor: 'border-[rgb(var(--status-danger))]/30 dark:border-[rgb(var(--status-danger))]/40',
    icon: '✕',
  },
}

export const TAB_CONFIGS = [
  { value: 'all', label: 'All Appointments' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
] as const

export function getStatusConfig(status: AppointmentStatus): StatusConfig {
  return APPOINTMENT_STATUS_CONFIG[status]
}

