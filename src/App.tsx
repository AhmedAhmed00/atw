import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { Layout } from './components/Layout'
import { ScrollRestoration } from './components/ScrollRestoration'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Loader2 } from 'lucide-react'

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
const AttendancePage = lazy(() => import('./features/attendance'))
const ManualAttendanceAdjustmentPage = lazy(() => import('./features/attendance/pages/ManualAttendanceAdjustmentPage').then(m => ({ default: m.ManualAttendanceAdjustmentPage })))
const TasksPage = lazy(() => import('./features/tasks'))
const InstitutionsPage = lazy(() => import('./features/clients/pages/InstitutionsPage'))
const PatientsPage = lazy(() => import('./features/clients/pages/PatientsPage'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const VerifyOTP = lazy(() => import('./pages/VerifyOTP'))

function AppRoutes() {
  const { isAuthenticated } = useAuth()

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
                      <Route path="/shifts" element={<ShiftsPage />} />
                      <Route path="/shifts/new" element={<CreateShiftPage />} />
                      <Route path="/shifts/swap-request/new" element={<SwapRequestFormPage />} />
                      <Route path="/attendance" element={<AttendancePage />} />
                      <Route path="/attendance/adjustment" element={<ManualAttendanceAdjustmentPage />} />
                      <Route path="/tasks" element={<TasksPage />} />
                      <Route path="/clients/institutions" element={<InstitutionsPage />} />
                      <Route path="/clients/patients" element={<PatientsPage />} />
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
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App

