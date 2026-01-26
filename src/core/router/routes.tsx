import { Route } from 'react-router'
import { Navigate } from 'react-router-dom'
import * as Lazy from './lazyComponents'

/**
 * Route configuration organized by feature
 * Makes it easy to maintain and understand route structure
 */

interface PublicRouteProps {
  isAuthenticated: boolean
}

export const createPublicRoutes = ({ isAuthenticated }: PublicRouteProps) => [
  <Route
    key="login"
    path="/login"
    element={isAuthenticated ? <Navigate to="/" replace /> : <Lazy.LoginPage />}
  />,
  <Route
    key="forgot-password"
    path="/forgot-password"
    element={isAuthenticated ? <Navigate to="/" replace /> : <Lazy.ForgotPasswordPage />}
  />,
  <Route
    key="verify-otp"
    path="/verify-otp"
    element={isAuthenticated ? <Navigate to="/" replace /> : <Lazy.VerifyOTPPage />}
  />,
]

export const protectedRoutes = [
  // Dashboard & Core
  <Route key="dashboard" path="/" element={<Lazy.DashboardPage />} />,
  <Route key="profile" path="/profile" element={<Lazy.ProfilePage />} />,
  <Route key="working-hours" path="/working-hours" element={<Lazy.WorkingHoursPage />} />,
  <Route key="appointments" path="/appointments/*" element={<Lazy.AppointmentsPage />} />,
  <Route key="payments" path="/payments" element={<Lazy.PaymentsPage />} />,
  <Route key="services" path="/services" element={<Lazy.ServicesPage />} />,
  <Route key="support" path="/support/*" element={<Lazy.SupportPage />} />,
  <Route key="settings" path="/settings" element={<Lazy.SettingsPage />} />,

  // Employees
  <Route key="employees" path="/employees" element={<Lazy.EmployeesPage />} />,
  <Route
    key="employees-new"
    path="/employees/new"
    element={<Lazy.AddEmployeeSelectionPage />}
  />,
  <Route
    key="employees-new-quick"
    path="/employees/new/quick"
    element={<Lazy.QuickAddEmployeePage />}
  />,
  <Route
    key="employees-new-full"
    path="/employees/new/full"
    element={<Lazy.FullRegistrationPage />}
  />,
  <Route
    key="employees-review"
    path="/employees/pending-approvals/:approvalId/review"
    element={<Lazy.ReviewEmployeePage />}
  />,
  <Route
    key="employees-detail"
    path="/employees/:id"
    element={<Lazy.EmployeeDetailPage />}
  />,
  <Route
    key="employees-task-new"
    path="/employees/:employeeId/tasks/new"
    element={<Lazy.AddTaskPage />}
  />,
  <Route
    key="employees-certification-new"
    path="/employees/:employeeId/certifications/new"
    element={<Lazy.AddCertificationPage />}
  />,
  <Route
    key="employees-certification-view"
    path="/employees/:employeeId/certifications/:certificationId"
    element={<Lazy.ViewCertificationPage />}
  />,

  // Shifts
  <Route key="shifts" path="/shifts" element={<Lazy.ShiftsPage />} />,
  <Route key="shifts-new" path="/shifts/new" element={<Lazy.CreateShiftPage />} />,
  <Route key="shifts-detail" path="/shifts/:id" element={<Lazy.ShiftDetailPage />} />,
  <Route
    key="shifts-swap"
    path="/shifts/swap-request/new"
    element={<Lazy.SwapRequestFormPage />}
  />,

  // Attendance
  <Route key="attendance" path="/attendance" element={<Lazy.AttendancePage />} />,
  <Route
    key="attendance-adjustment"
    path="/attendance/adjustment"
    element={<Lazy.ManualAttendanceAdjustmentPage />}
  />,

  // Tasks
  <Route key="tasks" path="/tasks" element={<Lazy.TasksPage />} />,
  <Route key="tasks-new" path="/tasks/new" element={<Lazy.AddTaskPage />} />,
  <Route key="tasks-detail" path="/tasks/:id" element={<Lazy.TaskDetailPage />} />,

  // Clients - Institutions
  <Route
    key="institutions"
    path="/clients/institutions"
    element={<Lazy.InstitutionsPage />}
  />,
  <Route
    key="institutions-new"
    path="/clients/institutions/new"
    element={<Lazy.AddInstitutionPage />}
  />,
  <Route
    key="institutions-detail"
    path="/clients/institutions/:id"
    element={<Lazy.InstitutionDetailPage />}
  />,
  <Route
    key="institutions-invoice-new"
    path="/clients/institutions/:institutionId/invoices/new"
    element={<Lazy.CreateInvoicePage />}
  />,
  <Route
    key="institutions-trip-new"
    path="/clients/institutions/:institutionId/trips/new"
    element={<Lazy.AddTripPage />}
  />,

  // Clients - Patients
  <Route key="patients" path="/clients/patients" element={<Lazy.PatientsPage />} />,
  <Route
    key="patients-new"
    path="/clients/patients/new"
    element={<Lazy.AddPatientPage />}
  />,
  <Route
    key="patients-detail"
    path="/clients/patients/:id"
    element={<Lazy.PatientDetailPage />}
  />,

  // Clients - Trips
  <Route
    key="clients-trips-new"
    path="/clients/trips/new"
    element={<Lazy.AddTripPage />}
  />,

  // Fleet
  <Route key="vehicles" path="/fleet/vehicles" element={<Lazy.VehiclesPage />} />,
  <Route
    key="vehicles-new"
    path="/fleet/vehicles/new"
    element={<Lazy.AddVehiclePage />}
  />,
  <Route
    key="vehicles-detail"
    path="/fleet/vehicles/:id"
    element={<Lazy.VehicleDetailPage />}
  />,

  // Operations
  <Route key="operations-trips" path="/operations/trips" element={<Lazy.TripsPage />} />,
  <Route
    key="operations-trips-detail"
    path="/operations/trips/:id"
    element={<Lazy.TripDetailPage />}
  />,
  <Route
    key="operations-trips-new"
    path="/operations/trips/new"
    element={<Lazy.AddTripPage />}
  />,

  // Finance
  <Route key="finance-invoices" path="/finance/invoices" element={<Lazy.InvoicesPage />} />,
  <Route
    key="finance-invoices-new"
    path="/finance/invoices/new"
    element={<Lazy.CreateFinanceInvoicePage />}
  />,

  // Communication
  <Route key="chat" path="/communication/chat" element={<Lazy.ChatPage />} />,
  <Route
    key="chat-conversations"
    path="/communication/chat/:chatType"
    element={<Lazy.ChatConversationsPage />}
  />,

  // Settings
  <Route
    key="settings-vehicle-types-new"
    path="/settings/vehicle-types/new"
    element={<Lazy.AddVehicleTypePage />}
  />,
  <Route
    key="settings-vehicle-types-edit"
    path="/settings/vehicle-types/:id/edit"
    element={<Lazy.AddVehicleTypePage />}
  />,
  <Route key="settings-roles" path="/settings/roles" element={<Lazy.RolesPage />} />,
  <Route
    key="settings-roles-new"
    path="/settings/roles/new"
    element={<Lazy.AddRolePage />}
  />,
  <Route
    key="settings-roles-edit"
    path="/settings/roles/:id/edit"
    element={<Lazy.AddRolePage />}
  />,
  <Route key="settings-users" path="/settings/users" element={<Lazy.UsersPage />} />,
  <Route
    key="settings-users-new"
    path="/settings/users/new"
    element={<Lazy.AddUserPage />}
  />,
  <Route
    key="settings-users-edit"
    path="/settings/users/:id/edit"
    element={<Lazy.AddUserPage />}
  />,
]

