/**
 * Mock Trips Data
 */

export interface Trip {
  id: string
  tripId: string
  patient: string
  patientId: string
  pickupLocation: string
  dropoffLocation: string
  service: string
  status: 'Completed' | 'En Route' | 'Pending' | 'Delayed'
  priority: 'Routine' | 'Urgent' | 'Emergency'
  driver: string
  vehicle: string
  duration: string
  approval: 'Approved' | 'Pending' | 'Rejected'
  scheduledTime: string
  actualPickupTime?: string
  actualDropoffTime?: string
  location?: {
    lat: number
    lng: number
  }
}

export const trips: Trip[] = [
  {
    id: 't1',
    tripId: 'TRP-001',
    patient: 'Ahmed Mohamed',
    patientId: 'P-001',
    pickupLocation: 'Cairo University Hospital',
    dropoffLocation: 'Alexandria Medical Center',
    service: 'ALS',
    status: 'Completed',
    priority: 'Urgent',
    driver: 'John Smith',
    vehicle: 'AMB-101',
    duration: '2h 15m',
    approval: 'Approved',
    scheduledTime: '2024-01-20T08:00:00',
    actualPickupTime: '2024-01-20T08:05:00',
    actualDropoffTime: '2024-01-20T10:20:00',
    location: { lat: 30.0444, lng: 31.2357 },
  },
  {
    id: 't2',
    tripId: 'TRP-002',
    patient: 'Fatima Ali',
    patientId: 'P-002',
    pickupLocation: 'Mansoura General Hospital',
    dropoffLocation: 'Cairo Medical Center',
    service: 'BLS',
    status: 'En Route',
    priority: 'Routine',
    driver: 'Sarah Johnson',
    vehicle: 'AMB-102',
    duration: '1h 30m',
    approval: 'Approved',
    scheduledTime: '2024-01-20T14:00:00',
    actualPickupTime: '2024-01-20T14:02:00',
    location: { lat: 31.0409, lng: 31.3785 },
  },
  {
    id: 't3',
    tripId: 'TRP-003',
    patient: 'Mohamed Hassan',
    patientId: 'P-003',
    pickupLocation: 'Alexandria Medical Center',
    dropoffLocation: 'Aswan Medical Complex',
    service: 'CCT',
    status: 'Pending',
    priority: 'Emergency',
    driver: 'Michael Brown',
    vehicle: 'AMB-103',
    duration: '3h 45m',
    approval: 'Pending',
    scheduledTime: '2024-01-20T16:00:00',
    location: { lat: 31.2001, lng: 29.9187 },
  },
  {
    id: 't4',
    tripId: 'TRP-004',
    patient: 'Sara Ibrahim',
    patientId: 'P-004',
    pickupLocation: 'Cairo University Hospital',
    dropoffLocation: 'Giza Medical Center',
    service: 'Wheelchair Van',
    status: 'Delayed',
    priority: 'Routine',
    driver: 'Emily Davis',
    vehicle: 'WC-201',
    duration: '45m',
    approval: 'Approved',
    scheduledTime: '2024-01-20T10:00:00',
    location: { lat: 30.0444, lng: 31.2357 },
  },
  {
    id: 't5',
    tripId: 'TRP-005',
    patient: 'Omar Khaled',
    patientId: 'P-005',
    pickupLocation: 'Aswan Medical Complex',
    dropoffLocation: 'Luxor General Hospital',
    service: 'ALS',
    status: 'Completed',
    priority: 'Urgent',
    driver: 'David Wilson',
    vehicle: 'AMB-104',
    duration: '2h 30m',
    approval: 'Approved',
    scheduledTime: '2024-01-20T06:00:00',
    actualPickupTime: '2024-01-20T06:05:00',
    actualDropoffTime: '2024-01-20T08:35:00',
    location: { lat: 24.0889, lng: 32.8998 },
  },
  {
    id: 't6',
    tripId: 'TRP-006',
    patient: 'Nour Ahmed',
    patientId: 'P-006',
    pickupLocation: 'Giza Medical Center',
    dropoffLocation: 'Cairo University Hospital',
    service: 'BLS',
    status: 'En Route',
    priority: 'Routine',
    driver: 'Lisa Anderson',
    vehicle: 'AMB-105',
    duration: '1h 15m',
    approval: 'Approved',
    scheduledTime: '2024-01-20T12:00:00',
    actualPickupTime: '2024-01-20T12:03:00',
    location: { lat: 30.0131, lng: 31.2089 },
  },
  {
    id: 't7',
    tripId: 'TRP-007',
    patient: 'Youssef Mahmoud',
    patientId: 'P-007',
    pickupLocation: 'Luxor General Hospital',
    dropoffLocation: 'Cairo Medical Center',
    service: 'CCT',
    status: 'Pending',
    priority: 'Emergency',
    driver: 'Robert Taylor',
    vehicle: 'AMB-106',
    duration: '4h 00m',
    approval: 'Pending',
    scheduledTime: '2024-01-20T18:00:00',
    location: { lat: 25.6872, lng: 32.6396 },
  },
  {
    id: 't8',
    tripId: 'TRP-008',
    patient: 'Mariam Farid',
    patientId: 'P-008',
    pickupLocation: 'Cairo Medical Center',
    dropoffLocation: 'Alexandria Medical Center',
    service: 'Wheelchair Van',
    status: 'Delayed',
    priority: 'Routine',
    driver: 'Jennifer Martinez',
    vehicle: 'WC-202',
    duration: '2h 00m',
    approval: 'Approved',
    scheduledTime: '2024-01-20T09:00:00',
    location: { lat: 30.0444, lng: 31.2357 },
  },
]

// Calculate stats
export const tripStats = {
  totalTrips: trips.length,
  completed: trips.filter((t) => t.status === 'Completed').length,
  enRoute: trips.filter((t) => t.status === 'En Route').length,
  pendingDelayed: trips.filter((t) => t.status === 'Pending' || t.status === 'Delayed').length,
}

