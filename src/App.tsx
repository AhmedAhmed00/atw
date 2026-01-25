import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { Layout } from './components/Layout'
import { ScrollRestoration } from './components/ScrollRestoration'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAppSelector } from './store/hooks'
import { Loader2 } from 'lucide-react'
import TripDetailPage from './features/operations/pages/TripDetailPage'

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#09B0B6]" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

// Lazy load all routes for code splitting
const DashboardPage = lazy(() => import('./features/dashboard'))
const ProfilePage = lazy(() => import('./features/profile'))
const WorkingHoursPage = lazy(() => import('./features/working-hours'))
const AppointmentsPage = lazy(() => import('./features/appointments'))
const PaymentsPage = lazy(() => import('./features/payments'))
const About = lazy(() => import('./pages/About'))
const FormExample = lazy(() => import('./pages/FormExample'))
const UsersTable = lazy(() => import('./pages/UsersTable'))
const ServicesPage = lazy(() => import('./features/services'))
const SettingsPage = lazy(() => import('./features/settings'))
const SupportPage = lazy(() => import('./features/support'))
const EmployeesPage = lazy(() => import('./features/employees'))
const ShiftsPage = lazy(() => import('./features/shifts'))
const SwapRequestFormPage = lazy(() => import('./features/shifts/pages/SwapRequestFormPage').then(m => ({ default: m.SwapRequestFormPage })))
const CreateShiftPage = lazy(() => import('./features/shifts/pages/CreateShiftPage').then(m => ({ default: m.CreateShiftPage })))
const ShiftDetailPage = lazy(() => import('./features/shifts/pages/ShiftDetailPage').then(m => ({ default: m.ShiftDetailPage })))
const AttendancePage = lazy(() => import('./features/attendance'))
const ManualAttendanceAdjustmentPage = lazy(() => import('./features/attendance/pages/ManualAttendanceAdjustmentPage').then(m => ({ default: m.ManualAttendanceAdjustmentPage })))
const TasksPage = lazy(() => import('./features/tasks'))
const TaskDetailPage = lazy(() => import('./features/tasks/pages/TaskDetailPage').then(m => ({ default: m.TaskDetailPage })))
const InstitutionsPage = lazy(() => import('./features/clients/pages/InstitutionsPage'))
const AddInstitutionPage = lazy(() => import('./features/clients/pages/AddInstitutionPage'))
const PatientsPage = lazy(() => import('./features/clients/pages/PatientsPage'))
const AddPatientPage = lazy(() => import('./features/clients/pages/AddPatientPage'))
const PatientDetailPage = lazy(() => import('./features/clients/pages/PatientDetailPage'))
const InstitutionDetailPage = lazy(() => import('./features/clients/pages/InstitutionDetailPage'))
const CreateInvoicePage = lazy(() => import('./features/clients/pages/CreateInvoicePage'))
const AddTripPage = lazy(() => import('./features/clients/pages/AddTripPage'))
const VehiclesPage = lazy(() => import('./features/fleet/pages/VehiclesPage'))
const AddVehiclePage = lazy(() => import('./features/fleet/pages/AddVehiclePage'))
const VehicleDetailPage = lazy(() => import('./features/fleet/pages/VehicleDetailPage').then(m => ({ default: m.VehicleDetailPage })))
const TripsPage = lazy(() => import('./features/operations/pages/TripsPage'))
const InvoicesPage = lazy(() => import('./features/finance/pages/InvoicesPage'))
const CreateFinanceInvoicePage = lazy(() => import('./features/finance/pages/CreateInvoicePage'))
const ChatPage = lazy(() => import('./features/communication/pages/ChatPage'))
const ChatConversationsPage = lazy(() => import('./features/communication/pages/ChatConversationsPage'))
const AddVehicleTypePage = lazy(() => import('./features/settings/pages/AddVehicleTypePage'))
const RolesPage = lazy(() => import('./features/settings/pages/RolesPage'))
const AddRolePage = lazy(() => import('./features/settings/pages/AddRolePage'))
const UsersPage = lazy(() => import('./features/settings/pages/UsersPage'))
const AddUserPage = lazy(() => import('./features/settings/pages/AddUserPage'))
const EmployeeDetailPage = lazy(() => import('./features/employees/pages/EmployeeDetailPage'))
const AddTaskPage = lazy(() => import('./features/employees/pages/AddTaskPage'))
const AddCertificationPage = lazy(() => import('./features/employees/pages/AddCertificationPage'))
const ViewCertificationPage = lazy(() => import('./features/employees/pages/ViewCertificationPage'))
const AddEmployeeSelectionPage = lazy(() => import('./features/employees/pages/AddEmployeeSelectionPage'))
const QuickAddEmployeePage = lazy(() => import('./features/employees/pages/QuickAddEmployeePage'))
const FullRegistrationPage = lazy(() => import('./features/employees/pages/FullRegistrationPage'))
const ReviewEmployeePage = lazy(() => import('./features/employees/pages/ReviewEmployeePage'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const VerifyOTP = lazy(() => import('./pages/VerifyOTP'))

function AppRoutes() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  return (
    <>
      <ScrollRestoration />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
          />
          <Route 
            path="/forgot-password" 
            element={isAuthenticated ? <Navigate to="/" replace /> : <ForgotPassword />} 
          />
          <Route 
            path="/verify-otp" 
            element={isAuthenticated ? <Navigate to="/" replace /> : <VerifyOTP />} 
          />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/employees" element={<EmployeesPage />} />
                      <Route path="/employees/new" element={<AddEmployeeSelectionPage />} />
                      <Route path="/employees/new/quick" element={<QuickAddEmployeePage />} />
                      <Route path="/employees/new/full" element={<FullRegistrationPage />} />
                      <Route path="/employees/pending-approvals/:approvalId/review" element={<ReviewEmployeePage />} />
                      <Route path="/employees/:id" element={<EmployeeDetailPage />} />
                      <Route path="/employees/:employeeId/tasks/new" element={<AddTaskPage />} />
                      <Route path="/employees/:employeeId/certifications/new" element={<AddCertificationPage />} />
                      <Route path="/employees/:employeeId/certifications/:certificationId" element={<ViewCertificationPage />} />
                      <Route path="/shifts" element={<ShiftsPage />} />
                      <Route path="/shifts/new" element={<CreateShiftPage />} />
                      <Route path="/shifts/:id" element={<ShiftDetailPage />} />
                      <Route path="/shifts/swap-request/new" element={<SwapRequestFormPage />} />
                      <Route path="/attendance" element={<AttendancePage />} />
                      <Route path="/attendance/adjustment" element={<ManualAttendanceAdjustmentPage />} />
                      <Route path="/tasks" element={<TasksPage />} />
                      <Route path="/tasks/new" element={<AddTaskPage />} />
                      <Route path="/tasks/:id" element={<TaskDetailPage />} />
                      <Route path="/clients/institutions" element={<InstitutionsPage />} />
                      <Route path="/clients/institutions/new" element={<AddInstitutionPage />} />
                      <Route path="/clients/institutions/:id" element={<InstitutionDetailPage />} />
                      <Route path="/clients/institutions/:institutionId/invoices/new" element={<CreateInvoicePage />} />
                      <Route path="/clients/institutions/:institutionId/trips/new" element={<AddTripPage />} />
                      <Route path="/clients/trips/new" element={<AddTripPage />} />
                      <Route path="/clients/patients" element={<PatientsPage />} />
                      <Route path="/fleet/vehicles" element={<VehiclesPage />} />
                      <Route path="/fleet/vehicles/new" element={<AddVehiclePage />} />
                      <Route path="/fleet/vehicles/:id" element={<VehicleDetailPage />} />
                      <Route path="/operations/trips" element={<TripsPage />} />
                      <Route path="/operations/trips/:id" element={<TripDetailPage />} />
                      <Route path="/operations/trips/new" element={<AddTripPage />} />
                      <Route path="/finance/invoices" element={<InvoicesPage />} />
                      <Route path="/finance/invoices/new" element={<CreateFinanceInvoicePage />} />
                      <Route path="/communication/chat" element={<ChatPage />} />
                      <Route path="/communication/chat/:chatType" element={<ChatConversationsPage />} />
                      <Route path="/settings/vehicle-types/new" element={<AddVehicleTypePage />} />
                      <Route path="/settings/vehicle-types/:id/edit" element={<AddVehicleTypePage />} />
                      <Route path="/settings/roles" element={<RolesPage />} />
                      <Route path="/settings/roles/new" element={<AddRolePage />} />
                      <Route path="/settings/roles/:id/edit" element={<AddRolePage />} />
                      <Route path="/settings/users" element={<UsersPage />} />
                      <Route path="/settings/users/new" element={<AddUserPage />} />
                      <Route path="/settings/users/:id/edit" element={<AddUserPage />} />
                      <Route path="/clients/patients/new" element={<AddPatientPage />} />
                      <Route path="/clients/patients/:id" element={<PatientDetailPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/working-hours" element={<WorkingHoursPage />} />
                      <Route path="/appointments/*" element={<AppointmentsPage />} />
                      <Route path="/payments" element={<PaymentsPage />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/form" element={<FormExample />} />
                      <Route path="/users" element={<UsersTable />} />
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/support/*" element={<SupportPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  )
}

function App() {
  return <AppRoutes />
}

export default App

