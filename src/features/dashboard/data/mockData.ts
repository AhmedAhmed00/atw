import { 
  Appointment, 
  DashboardStats,
  FleetOverviewStats,
  HourlyTripData,
  WeeklyPerformanceData,
  MonthlyRevenueData,
  TopPerformer,
  FleetVehicle,
  Trip,
  VehicleHealth,
  SystemAlert
} from '../types'

export const dashboardStats: DashboardStats = {
  upcomingAppointments: 24,
  confirmedAppointments: 18,
  monthRevenue: 45680,
  totalPatients: 1247,
  revenueChange: 12.5,
  patientsChange: 8.3,
  appointmentsChange: 15.2,
}

export const upcomingAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Sarah Anderson',
    service: 'General Consultation',
    date: '2026-01-13',
    time: '09:00 AM',
    status: 'confirmed',
    doctor: 'Dr. Johnson',
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    service: 'Dental Cleaning',
    date: '2026-01-13',
    time: '10:30 AM',
    status: 'confirmed',
    doctor: 'Dr. Chen',
  },
  {
    id: '4',
    patientName: 'James Wilson',
    service: 'Mental Health Counseling',
    date: '2026-01-14',
    time: '11:00 AM',
    status: 'confirmed',
    doctor: 'Dr. Wilson',
  },

]

export const confirmedAppointments: Appointment[] = upcomingAppointments.filter(
  (apt) => apt.status === 'confirmed'
)

export const todayAppointments: Appointment[] = upcomingAppointments.filter(
  (apt) => apt.date === '2026-01-13'
)

// Fleet Dashboard Mock Data
export const fleetOverviewStats: FleetOverviewStats = {
  totalPatients: 2847,
  institutions: 42,
  activeTrips: 18,
  completedToday: 127,
  fleetActive: 24,
  avgResponse: '8.5 min',
}

export const hourlyTripData: HourlyTripData[] = [
  { hour: '00:00', trips: 2 },
  { hour: '02:00', trips: 1 },
  { hour: '04:00', trips: 0 },
  { hour: '06:00', trips: 3 },
  { hour: '08:00', trips: 12 },
  { hour: '10:00', trips: 18 },
  { hour: '12:00', trips: 24 },
  { hour: '14:00', trips: 22 },
  { hour: '16:00', trips: 19 },
  { hour: '18:00', trips: 15 },
  { hour: '20:00', trips: 8 },
  { hour: '22:00', trips: 4 },
]

export const weeklyPerformanceData: WeeklyPerformanceData[] = [
  { day: 'Mon', trips: 145, revenue: 12500 },
  { day: 'Tue', trips: 162, revenue: 13800 },
  { day: 'Wed', trips: 178, revenue: 15200 },
  { day: 'Thu', trips: 148, revenue: 13100 },
  { day: 'Fri', trips: 195, revenue: 16800 },
  { day: 'Sat', trips: 112, revenue: 9800 },
  { day: 'Sun', trips: 98, revenue: 8500 },
]

export const monthlyRevenueData: MonthlyRevenueData[] = [
  { month: 'Jan', revenue: 125000 },
  { month: 'Feb', revenue: 138000 },
  { month: 'Mar', revenue: 152000 },
  { month: 'Apr', revenue: 168000 },
  { month: 'May', revenue: 175000 },
  { month: 'Jun', revenue: 189000 },
  { month: 'Jul', revenue: 195000 },
  { month: 'Aug', revenue: 203000 },
]

export const topPerformers: TopPerformer[] = [
  { id: '1', name: 'John Smith', trips: 342, revenue: 28900, rating: 4.9 },
  { id: '2', name: 'Sarah Johnson', trips: 318, revenue: 27100, rating: 4.8 },
  { id: '3', name: 'Mike Davis', trips: 295, revenue: 25200, rating: 4.7 },
  { id: '4', name: 'Emily Brown', trips: 278, revenue: 23800, rating: 4.9 },
  { id: '5', name: 'David Wilson', trips: 265, revenue: 22400, rating: 4.6 },
]

export const fleetVehicles: FleetVehicle[] = [
  {
    id: '1',
    vehicleId: 'AMB-001',
    driver: 'John Smith',
    status: 'active',
    location: { lat: 40.7128, lng: -74.0060 },
    currentTrip: {
      id: 'trip-1',
      destination: 'City Hospital',
      eta: '15 min',
    },
  },
  {
    id: '2',
    vehicleId: 'AMB-002',
    driver: 'Sarah Johnson',
    status: 'active',
    location: { lat: 40.7580, lng: -73.9855 },
    currentTrip: {
      id: 'trip-2',
      destination: 'Regional Medical',
      eta: '8 min',
    },
  },
  {
    id: '3',
    vehicleId: 'AMB-003',
    driver: 'Mike Davis',
    status: 'idle',
    location: { lat: 40.7505, lng: -73.9934 },
  },
  {
    id: '4',
    vehicleId: 'AMB-004',
    driver: 'Emily Brown',
    status: 'active',
    location: { lat: 40.7282, lng: -73.9942 },
    currentTrip: {
      id: 'trip-3',
      destination: 'Community Clinic',
      eta: '12 min',
    },
  },
]

export const trips: Trip[] = [
  {
    id: 'trip-1',
    vehicleId: 'AMB-001',
    driver: 'John Smith',
    patient: 'Robert Taylor',
    origin: '123 Main St',
    destination: 'City Hospital',
    status: 'in-progress',
    scheduledTime: '10:00 AM',
    estimatedArrival: '10:15 AM',
  },
  {
    id: 'trip-2',
    vehicleId: 'AMB-002',
    driver: 'Sarah Johnson',
    patient: 'Maria Garcia',
    origin: '456 Oak Ave',
    destination: 'Regional Medical',
    status: 'in-progress',
    scheduledTime: '10:30 AM',
    estimatedArrival: '10:38 AM',
  },
  {
    id: 'trip-3',
    vehicleId: 'AMB-004',
    driver: 'Emily Brown',
    patient: 'James Wilson',
    origin: '789 Pine Rd',
    destination: 'Community Clinic',
    status: 'scheduled',
    scheduledTime: '11:00 AM',
  },
  {
    id: 'trip-4',
    vehicleId: 'AMB-005',
    driver: 'David Lee',
    patient: 'Linda Martinez',
    origin: '321 Elm St',
    destination: 'General Hospital',
    status: 'completed',
    scheduledTime: '09:00 AM',
    actualArrival: '09:12 AM',
  },
]

export const vehicleHealth: VehicleHealth[] = [
  {
    id: '1',
    vehicleId: 'AMB-001',
    status: 'excellent',
    lastMaintenance: '2026-01-01',
    mileage: 45230,
    nextService: '2026-02-15',
    issues: [],
  },
  {
    id: '2',
    vehicleId: 'AMB-002',
    status: 'good',
    lastMaintenance: '2025-12-20',
    mileage: 38950,
    nextService: '2026-02-10',
    issues: [],
  },
  {
    id: '3',
    vehicleId: 'AMB-003',
    status: 'warning',
    lastMaintenance: '2025-11-15',
    mileage: 52100,
    nextService: '2026-01-20',
    issues: ['Tire pressure low'],
  },
  {
    id: '4',
    vehicleId: 'AMB-004',
    status: 'excellent',
    lastMaintenance: '2026-01-05',
    mileage: 31200,
    nextService: '2026-03-01',
    issues: [],
  },
  {
    id: '5',
    vehicleId: 'AMB-005',
    status: 'critical',
    lastMaintenance: '2025-10-10',
    mileage: 67800,
    nextService: '2026-01-15',
    issues: ['Engine check light', 'Brake pad replacement needed'],
  },
]

export const systemAlerts: SystemAlert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Vehicle Maintenance Due',
    message: 'AMB-003 requires scheduled maintenance within 5 days',
    timestamp: '2026-01-13T08:30:00',
    resolved: false,
  },
  {
    id: '2',
    type: 'error',
    title: 'Critical Vehicle Issue',
    message: 'AMB-005 has critical issues requiring immediate attention',
    timestamp: '2026-01-13T09:15:00',
    resolved: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'New Trip Assigned',
    message: 'Trip #127 has been assigned to AMB-001',
    timestamp: '2026-01-13T10:00:00',
    resolved: true,
  },
  {
    id: '4',
    type: 'success',
    title: 'Trip Completed',
    message: 'Trip #124 has been completed successfully',
    timestamp: '2026-01-13T09:45:00',
    resolved: true,
  },
]

