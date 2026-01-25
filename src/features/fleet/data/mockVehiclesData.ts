/**
 * Mock Vehicles Data
 */

export interface Vehicle {
  id: string
  vehicleId: string
  status: 'Active' | 'Maintenance' | 'Inactive' | 'On the Move'
  model: string
  class: 'Type II Ambulance' | 'Type I Ambulance' | 'BLS' | 'WAV'
  baseLocation: 'Station Alpha' | 'Station Beta' | 'Station Gamma'
  alerts: number
  make: string
  year: number
  licensePlate: string
  mileage: number
  lastMaintenance: string
}

export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    vehicleId: 'AMB-101',
    status: 'Active',
    model: 'Sprinter',
    class: 'Type II Ambulance',
    baseLocation: 'Station Alpha',
    alerts: 0,
    make: 'Mercedes-Benz',
    year: 2022,
    licensePlate: 'ABC-1234',
    mileage: 45000,
    lastMaintenance: '2024-01-15',
  },
  {
    id: 'v2',
    vehicleId: 'AMB-102',
    status: 'On the Move',
    model: 'Transit',
    class: 'BLS',
    baseLocation: 'Station Beta',
    alerts: 1,
    make: 'Ford',
    year: 2021,
    licensePlate: 'DEF-5678',
    mileage: 52000,
    lastMaintenance: '2024-01-10',
  },
  {
    id: 'v3',
    vehicleId: 'AMB-103',
    status: 'Maintenance',
    model: 'Sprinter',
    class: 'Type I Ambulance',
    baseLocation: 'Station Gamma',
    alerts: 2,
    make: 'Mercedes-Benz',
    year: 2023,
    licensePlate: 'GHI-9012',
    mileage: 12000,
    lastMaintenance: '2024-01-20',
  },
  {
    id: 'v4',
    vehicleId: 'WC-201',
    status: 'Active',
    model: 'E-Series',
    class: 'WAV',
    baseLocation: 'Station Alpha',
    alerts: 0,
    make: 'Ford',
    year: 2020,
    licensePlate: 'JKL-3456',
    mileage: 68000,
    lastMaintenance: '2024-01-05',
  },
  {
    id: 'v5',
    vehicleId: 'AMB-104',
    status: 'Active',
    model: 'Sprinter',
    class: 'Type II Ambulance',
    baseLocation: 'Station Beta',
    alerts: 0,
    make: 'Mercedes-Benz',
    year: 2022,
    licensePlate: 'MNO-7890',
    mileage: 35000,
    lastMaintenance: '2023-12-20',
  },
  {
    id: 'v6',
    vehicleId: 'AMB-105',
    status: 'On the Move',
    model: 'Sprinter',
    class: 'Type I Ambulance',
    baseLocation: 'Station Alpha',
    alerts: 0,
    make: 'Mercedes-Benz',
    year: 2023,
    licensePlate: 'PQR-1111',
    mileage: 15000,
    lastMaintenance: '2024-01-18',
  },
  {
    id: 'v7',
    vehicleId: 'AMB-106',
    status: 'Active',
    model: 'Transit',
    class: 'BLS',
    baseLocation: 'Station Gamma',
    alerts: 1,
    make: 'Ford',
    year: 2021,
    licensePlate: 'STU-2222',
    mileage: 48000,
    lastMaintenance: '2024-01-12',
  },
  {
    id: 'v8',
    vehicleId: 'WC-202',
    status: 'Active',
    model: 'E-Series',
    class: 'WAV',
    baseLocation: 'Station Beta',
    alerts: 0,
    make: 'Ford',
    year: 2020,
    licensePlate: 'VWX-3333',
    mileage: 72000,
    lastMaintenance: '2024-01-08',
  },
  {
    id: 'v9',
    vehicleId: 'AMB-107',
    status: 'Maintenance',
    model: 'Sprinter',
    class: 'Type II Ambulance',
    baseLocation: 'Station Alpha',
    alerts: 3,
    make: 'Mercedes-Benz',
    year: 2022,
    licensePlate: 'YZA-4444',
    mileage: 40000,
    lastMaintenance: '2024-01-22',
  },
  {
    id: 'v10',
    vehicleId: 'AMB-108',
    status: 'Active',
    model: 'Transit',
    class: 'BLS',
    baseLocation: 'Station Gamma',
    alerts: 0,
    make: 'Ford',
    year: 2021,
    licensePlate: 'BCD-5555',
    mileage: 55000,
    lastMaintenance: '2024-01-14',
  },
]

// Calculate stats
export const vehicleStats = {
  totalFleet: vehicles.length,
  active: vehicles.filter((v) => v.status === 'Active').length,
  maintenance: vehicles.filter((v) => v.status === 'Maintenance').length,
  onTheMove: vehicles.filter((v) => v.status === 'On the Move').length,
}

// Fleet Activity data
export const fleetActivity = {
  averageSpeed: 45, // mph
  movingVehicles: vehicleStats.onTheMove,
  maintenanceRate: (vehicleStats.maintenance / vehicleStats.totalFleet) * 100,
}

// By Vehicle Class
export const byVehicleClass = [
  { name: 'Type II Ambulance', value: vehicles.filter((v) => v.class === 'Type II Ambulance').length },
  { name: 'Type I Ambulance', value: vehicles.filter((v) => v.class === 'Type I Ambulance').length },
  { name: 'BLS', value: vehicles.filter((v) => v.class === 'BLS').length },
  { name: 'WAV', value: vehicles.filter((v) => v.class === 'WAV').length },
]

// By Location
export const byLocation = [
  { name: 'Station Alpha', value: vehicles.filter((v) => v.baseLocation === 'Station Alpha').length },
  { name: 'Station Beta', value: vehicles.filter((v) => v.baseLocation === 'Station Beta').length },
  { name: 'Station Gamma', value: vehicles.filter((v) => v.baseLocation === 'Station Gamma').length },
]

// Status Distribution
export const statusDistribution = [
  { name: 'Active', value: vehicleStats.active },
  { name: 'Maintenance', value: vehicleStats.maintenance },
]

