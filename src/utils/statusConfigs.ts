/**
 * Status Configuration Utilities
 * Centralized status badge configurations for consistency
 */

import { StatusConfig } from '@/components/shared/StatusBadge'

/**
 * Patient status configuration
 */
export const PATIENT_STATUS_CONFIG: Record<string, StatusConfig> = {
  'Good Standing': {
    label: 'Good Standing',
    variant: 'default',
    className: 'bg-green-500 hover:bg-green-600 text-white',
  },
  'Active': {
    label: 'Active',
    variant: 'default',
    className: 'bg-blue-500 hover:bg-blue-600 text-white',
  },
  'Suspended': {
    label: 'Suspended',
    variant: 'secondary',
    className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  },
  'Outstanding Debt': {
    label: 'Outstanding Debt',
    variant: 'destructive',
  },
}

/**
 * Institution status configuration
 */
export const INSTITUTION_STATUS_CONFIG: Record<string, StatusConfig> = {
  ...PATIENT_STATUS_CONFIG,
}

/**
 * Trip status configuration
 */
export const TRIP_STATUS_CONFIG: Record<string, StatusConfig> = {
  'Completed': {
    label: 'Completed',
    variant: 'default',
    className: 'bg-green-500 hover:bg-green-600 text-white',
  },
  'Scheduled': {
    label: 'Scheduled',
    variant: 'default',
    className: 'bg-blue-500 hover:bg-blue-600 text-white',
  },
  'In Progress': {
    label: 'In Progress',
    variant: 'default',
    className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  },
  'Cancelled': {
    label: 'Cancelled',
    variant: 'destructive',
  },
}

/**
 * Employee status configuration
 */
export const EMPLOYEE_STATUS_CONFIG: Record<string, StatusConfig> = {
  'active': {
    label: 'Active',
    variant: 'default',
    className: 'bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white',
  },
  'on-leave': {
    label: 'On Leave',
    variant: 'secondary',
    className: 'bg-[#63A7D8]/20 text-[#266BAC] dark:bg-[#63A7D8]/30 dark:text-[#AADCF7] border-[#63A7D8]/40 dark:border-[#63A7D8]/50',
  },
  'pending': {
    label: 'Pending',
    variant: 'outline',
    className: 'border-[#09B0B6] text-[#05647A]',
  },
}

/**
 * Invoice status configuration
 */
export const INVOICE_STATUS_CONFIG: Record<string, StatusConfig> = {
  'Paid': {
    label: 'Paid',
    variant: 'default',
    className: 'bg-green-500 hover:bg-green-600 text-white',
  },
  'Pending': {
    label: 'Pending',
    variant: 'default',
    className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  },
  'Overdue': {
    label: 'Overdue',
    variant: 'destructive',
  },
  'Cancelled': {
    label: 'Cancelled',
    variant: 'destructive',
  },
}

