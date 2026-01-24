export interface Appointment {
  id: string
  patientName: string
  patientAvatar?: string
  service: string
  date: string
  time: string
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  doctor: string
}

export interface DashboardStats {
  upcomingAppointments: number
  confirmedAppointments: number
  monthRevenue: number
  totalPatients: number
  revenueChange: number
  patientsChange: number
  appointmentsChange: number
}

export interface RecentActivity {
  id: string
  type: 'appointment' | 'payment' | 'registration'
  message: string
  time: string
  icon: string
}

// Fleet Dashboard Types
export interface FleetOverviewStats {
  totalPatients: number
  institutions: number
  activeTrips: number
  completedToday: number
  fleetActive: number
  avgResponse: string // e.g., "8.5 min"
}

export interface HourlyTripData {
  hour: string
  trips: number
}

export interface WeeklyPerformanceData {
  day: string
  trips: number
  revenue: number
}

export interface MonthlyRevenueData {
  month: string
  revenue: number
}

export interface TopPerformer {
  id: string
  name: string
  trips: number
  revenue: number
  rating: number
}

export interface FleetVehicle {
  id: string
  vehicleId: string
  driver: string
  status: 'active' | 'idle' | 'maintenance' | 'offline'
  location: {
    lat: number
    lng: number
  }
  currentTrip?: {
    id: string
    destination: string
    eta: string
  }
}

export interface Trip {
  id: string
  vehicleId: string
  driver: string
  patient: string
  origin: string
  destination: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  scheduledTime: string
  estimatedArrival?: string
  actualArrival?: string
}

export interface VehicleHealth {
  id: string
  vehicleId: string
  status: 'excellent' | 'good' | 'warning' | 'critical'
  lastMaintenance: string
  mileage: number
  nextService: string
  issues: string[]
}

export interface SystemAlert {
  id: string
  type: 'error' | 'warning' | 'info' | 'success'
  title: string
  message: string
  timestamp: string
  resolved: boolean
}

