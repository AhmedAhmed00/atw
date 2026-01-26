import { lazy } from 'react'

/**
 * Lazy-loaded components for code splitting
 * Organized by feature for better maintainability
 */

// Authentication
export const LoginPage = lazy(() => 
  import('@/features/authentication').then(m => ({ default: m.LoginPage }))
)
export const ForgotPasswordPage = lazy(() => 
  import('@/features/authentication').then(m => ({ default: m.ForgotPasswordPage }))
)
export const VerifyOTPPage = lazy(() => 
  import('@/features/authentication').then(m => ({ default: m.VerifyOTPPage }))
)

// Dashboard & Core
export const DashboardPage = lazy(() => import('@/features/dashboard'))
export const ProfilePage = lazy(() => import('@/features/profile'))
export const WorkingHoursPage = lazy(() => import('@/features/working-hours'))
export const PaymentsPage = lazy(() => import('@/features/payments'))
export const ServicesPage = lazy(() => import('@/features/services'))
export const SupportPage = lazy(() => import('@/features/support'))
export const SettingsPage = lazy(() => import('@/features/settings'))

// Employees
export const EmployeesPage = lazy(() => import('@/features/employees'))
export const EmployeeDetailPage = lazy(() => 
  import('@/features/employees/pages/EmployeeDetailPage')
)
export const AddEmployeeSelectionPage = lazy(() => 
  import('@/features/employees/pages/AddEmployeeSelectionPage')
)
export const QuickAddEmployeePage = lazy(() => 
  import('@/features/employees/pages/QuickAddEmployeePage')
)
export const FullRegistrationPage = lazy(() => 
  import('@/features/employees/pages/FullRegistrationPage')
)
export const ReviewEmployeePage = lazy(() => 
  import('@/features/employees/pages/ReviewEmployeePage')
)
export const AddTaskPage = lazy(() => 
  import('@/features/employees/pages/AddTaskPage')
)
export const AddCertificationPage = lazy(() => 
  import('@/features/employees/pages/AddCertificationPage')
)
export const ViewCertificationPage = lazy(() => 
  import('@/features/employees/pages/ViewCertificationPage')
)

// Shifts
export const ShiftsPage = lazy(() => import('@/features/shifts'))
export const CreateShiftPage = lazy(() => 
  import('@/features/shifts/pages/CreateShiftPage').then(m => ({ default: m.CreateShiftPage }))
)
export const ShiftDetailPage = lazy(() => 
  import('@/features/shifts/pages/ShiftDetailPage').then(m => ({ default: m.ShiftDetailPage }))
)
export const SwapRequestFormPage = lazy(() => 
  import('@/features/shifts/pages/SwapRequestFormPage').then(m => ({ default: m.SwapRequestFormPage }))
)

// Attendance
export const AttendancePage = lazy(() => import('@/features/attendance'))
export const ManualAttendanceAdjustmentPage = lazy(() => 
  import('@/features/attendance/pages/ManualAttendanceAdjustmentPage').then(m => ({ default: m.ManualAttendanceAdjustmentPage }))
)

// Tasks
export const TasksPage = lazy(() => import('@/features/tasks'))
export const TaskDetailPage = lazy(() => 
  import('@/features/tasks/pages/TaskDetailPage').then(m => ({ default: m.TaskDetailPage }))
)

// Clients
export const InstitutionsPage = lazy(() => 
  import('@/features/clients/pages/InstitutionsPage')
)
export const AddInstitutionPage = lazy(() => 
  import('@/features/clients/pages/AddInstitutionPage')
)
export const InstitutionDetailPage = lazy(() => 
  import('@/features/clients/pages/InstitutionDetailPage')
)
export const PatientsPage = lazy(() => 
  import('@/features/clients/pages/PatientsPage')
)
export const AddPatientPage = lazy(() => 
  import('@/features/clients/pages/AddPatientPage')
)
export const PatientDetailPage = lazy(() => 
  import('@/features/clients/pages/PatientDetailPage')
)
export const CreateInvoicePage = lazy(() => 
  import('@/features/clients/pages/CreateInvoicePage')
)
export const AddTripPage = lazy(() => 
  import('@/features/clients/pages/AddTripPage')
)

// Fleet
export const VehiclesPage = lazy(() => 
  import('@/features/fleet/pages/VehiclesPage')
)
export const AddVehiclePage = lazy(() => 
  import('@/features/fleet/pages/AddVehiclePage')
)
export const VehicleDetailPage = lazy(() => 
  import('@/features/fleet/pages/VehicleDetailPage').then(m => ({ default: m.VehicleDetailPage }))
)

// Operations
export const TripsPage = lazy(() => 
  import('@/features/operations/pages/TripsPage')
)
export const TripDetailPage = lazy(() => 
  import('@/features/operations/pages/TripDetailPage')
)

// Finance
export const InvoicesPage = lazy(() => 
  import('@/features/finance/pages/InvoicesPage')
)
export const CreateFinanceInvoicePage = lazy(() => 
  import('@/features/finance/pages/CreateInvoicePage')
)

// Communication
export const ChatPage = lazy(() => 
  import('@/features/communication/pages/ChatPage')
)
export const ChatConversationsPage = lazy(() => 
  import('@/features/communication/pages/ChatConversationsPage')
)

// Settings
export const AddVehicleTypePage = lazy(() => 
  import('@/features/settings/pages/AddVehicleTypePage')
)
export const RolesPage = lazy(() => 
  import('@/features/settings/pages/RolesPage')
)
export const AddRolePage = lazy(() => 
  import('@/features/settings/pages/AddRolePage')
)
export const UsersPage = lazy(() => 
  import('@/features/settings/pages/UsersPage')
)
export const AddUserPage = lazy(() => 
  import('@/features/settings/pages/AddUserPage')
)

