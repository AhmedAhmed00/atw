/**
 * Application Routes
 * Centralized route definitions
 */

export const ROUTES = {
  // Public routes
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_OTP: '/verify-otp',

  // Dashboard
  DASHBOARD: '/',

  // Employees
  EMPLOYEES: '/employees',
  EMPLOYEES_NEW: '/employees/new',
  EMPLOYEES_QUICK_ADD: '/employees/new/quick',
  EMPLOYEES_FULL_REGISTRATION: '/employees/new/full',
  EMPLOYEE_DETAIL: (id: string) => `/employees/${id}`,
  EMPLOYEE_PENDING_APPROVAL: (approvalId: string) => `/employees/pending-approvals/${approvalId}/review`,
  EMPLOYEE_TASK_NEW: (employeeId: string) => `/employees/${employeeId}/tasks/new`,
  EMPLOYEE_CERTIFICATION_NEW: (employeeId: string) => `/employees/${employeeId}/certifications/new`,
  EMPLOYEE_CERTIFICATION_VIEW: (employeeId: string, certificationId: string) => `/employees/${employeeId}/certifications/${certificationId}`,

  // Shifts
  SHIFTS: '/shifts',
  SHIFTS_NEW: '/shifts/new',
  SHIFT_DETAIL: (id: string) => `/shifts/${id}`,
  SHIFT_SWAP_REQUEST: '/shifts/swap-request/new',

  // Attendance
  ATTENDANCE: '/attendance',
  ATTENDANCE_ADJUSTMENT: '/attendance/adjustment',

  // Tasks
  TASKS: '/tasks',
  TASKS_NEW: '/tasks/new',
  TASK_DETAIL: (id: string) => `/tasks/${id}`,

  // Clients - Institutions
  INSTITUTIONS: '/clients/institutions',
  INSTITUTIONS_NEW: '/clients/institutions/new',
  INSTITUTION_DETAIL: (id: string) => `/clients/institutions/${id}`,
  INSTITUTION_INVOICE_NEW: (institutionId: string) => `/clients/institutions/${institutionId}/invoices/new`,
  INSTITUTION_TRIP_NEW: (institutionId: string) => `/clients/institutions/${institutionId}/trips/new`,

  // Clients - Patients
  PATIENTS: '/clients/patients',
  PATIENTS_NEW: '/clients/patients/new',
  PATIENT_DETAIL: (id: string) => `/clients/patients/${id}`,

  // Clients - Trips
  TRIPS_NEW: '/clients/trips/new',

  // Fleet
  VEHICLES: '/fleet/vehicles',
  VEHICLES_NEW: '/fleet/vehicles/new',
  VEHICLE_DETAIL: (id: string) => `/fleet/vehicles/${id}`,

  // Operations
  OPERATIONS_TRIPS: '/operations/trips',
  OPERATIONS_TRIP_DETAIL: (id: string) => `/operations/trips/${id}`,
  OPERATIONS_TRIPS_NEW: '/operations/trips/new',

  // Finance
  INVOICES: '/finance/invoices',
  INVOICES_NEW: '/finance/invoices/new',

  // Communication
  CHAT: '/communication/chat',
  CHAT_CONVERSATIONS: (chatType: string) => `/communication/chat/${chatType}`,

  // Settings
  SETTINGS: '/settings',
  VEHICLE_TYPES_NEW: '/settings/vehicle-types/new',
  VEHICLE_TYPES_EDIT: (id: string) => `/settings/vehicle-types/${id}/edit`,
  ROLES: '/settings/roles',
  ROLES_NEW: '/settings/roles/new',
  ROLES_EDIT: (id: string) => `/settings/roles/${id}/edit`,
  USERS: '/settings/users',
  USERS_NEW: '/settings/users/new',
  USERS_EDIT: (id: string) => `/settings/users/${id}/edit`,

  // Other
  PROFILE: '/profile',
  WORKING_HOURS: '/working-hours',
  APPOINTMENTS: '/appointments',
  PAYMENTS: '/payments',
  SERVICES: '/services',
  SUPPORT: '/support',
  ABOUT: '/about',
  FORM_EXAMPLE: '/form',
  USERS_TABLE: '/users',
} as const

