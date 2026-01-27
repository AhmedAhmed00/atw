/**
 * Status Constants
 * Centralized status definitions for the application
 */

export const PATIENT_STATUSES = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  SUSPENDED: 'Suspended',
  OUTSTANDING_DEBT: 'Outstanding Debt',
  GOOD_STANDING: 'Good Standing',
} as const

export const INSTITUTION_STATUSES = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  SUSPENDED: 'Suspended',
  OUTSTANDING_DEBT: 'Outstanding Debt',
  GOOD_STANDING: 'Good Standing',
} as const

export const TRIP_STATUSES = {
  PENDING: 'Pending',
  SCHEDULED: 'Scheduled',
  EN_ROUTE: 'En Route',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  DELAYED: 'Delayed',
} as const

export const EMPLOYEE_STATUSES = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  ON_LEAVE: 'On Leave',
  SUSPENDED: 'Suspended',
  TERMINATED: 'Terminated',
} as const

export const VEHICLE_STATUSES = {
  ACTIVE: 'Active',
  MAINTENANCE: 'Maintenance',
  OUT_OF_SERVICE: 'Out of Service',
  ON_THE_MOVE: 'On the Move',
} as const

export const INVOICE_STATUSES = {
  PENDING: 'Pending',
  PAID: 'Paid',
  OVERDUE: 'Overdue',
  CANCELLED: 'Cancelled',
} as const

export const TASK_STATUSES = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const

export const SHIFT_STATUSES = {
  SCHEDULED: 'Scheduled',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const

export const CERTIFICATION_STATUSES = {
  VALID: 'Valid',
  EXPIRED: 'Expired',
  EXPIRING_SOON: 'Expiring Soon',
  PENDING: 'Pending',
} as const

export const APPROVAL_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const

export type PatientStatus = typeof PATIENT_STATUSES[keyof typeof PATIENT_STATUSES]
export type InstitutionStatus = typeof INSTITUTION_STATUSES[keyof typeof INSTITUTION_STATUSES]
export type TripStatus = typeof TRIP_STATUSES[keyof typeof TRIP_STATUSES]
export type EmployeeStatus = typeof EMPLOYEE_STATUSES[keyof typeof EMPLOYEE_STATUSES]
export type VehicleStatus = typeof VEHICLE_STATUSES[keyof typeof VEHICLE_STATUSES]
export type InvoiceStatus = typeof INVOICE_STATUSES[keyof typeof INVOICE_STATUSES]
export type TaskStatus = typeof TASK_STATUSES[keyof typeof TASK_STATUSES]
export type ShiftStatus = typeof SHIFT_STATUSES[keyof typeof SHIFT_STATUSES]
export type CertificationStatus = typeof CERTIFICATION_STATUSES[keyof typeof CERTIFICATION_STATUSES]
export type ApprovalStatus = typeof APPROVAL_STATUSES[keyof typeof APPROVAL_STATUSES]

