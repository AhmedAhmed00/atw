/**
 * Mock data for vehicle details
 */

export interface VehicleDetail {
  id: string
  vehicleId: string
  vehicleClass: string
  baseLocation: string
  assignedCrew: {
    id: string
    name: string
    role: string
    certification: string
  }[]
  // Vehicle Information
  make: string
  model: string
  year: number
  plateNumber: string
  vin: string
  seatingCapacity: number
  adaCompliant: boolean
  bariatricCapacity: number
  // Medical Equipment
  medicalEquipment: {
    stretcher: boolean
    oxygenSystem: boolean
    aed: boolean
    firstAidKit: boolean
    suctionUnit: boolean
    immobilization: boolean
  }
  otherEquipment: string
  // Compliance & Documentation
  insurancePolicyNumber: string
  insuranceExpiryDate: string
  registrationExpiryDate: string
  lastSanitizeDate: string
  // Devices & Tracking
  telematicsDeviceId: string
  gpsDeviceId: string
  dashcamId: string
  // General Notes
  generalNotes: string
  // Maintenance Log
  maintenanceLog: {
    id: string
    name: string
    description: string
    technician: string
    serviceProvider: string
    nextServiceDue: string
    performedBy: string
    notes: string
    date: string
    cost?: number
    mileage?: number
  }[]
  // Inspection Reports
  inspectionReports: {
    id: string
    name: string
    status: 'Pass' | 'Fail' | 'Pending'
    priority: 'Low' | 'Medium' | 'High' | 'Critical'
    driverName: string
    date: string
    kms: number
    issuesFound: string
    actionRequired: string
    inspectionPhotos: string[]
  }[]
  // Documents
  documents: {
    id: string
    name: string
    type: 'Registration Certificate' | 'Insurance Certificate' | 'Inspection Report' | 'Other'
    uploadDate: string
    expiryDate?: string
    fileUrl: string
  }[]
}

export const mockVehicleDetails: Record<string, VehicleDetail> = {
  'v1': {
    id: 'v1',
    vehicleId: 'AMB-101',
    vehicleClass: 'Type II Ambulance',
    baseLocation: 'Station Alpha',
    assignedCrew: [
      { id: 'cm1', name: 'John Smith', role: 'Paramedic', certification: 'EMT-P' },
      { id: 'cm2', name: 'Sarah Johnson', role: 'EMT', certification: 'EMT-B' },
    ],
    make: 'Mercedes-Benz',
    model: 'Sprinter',
    year: 2022,
    plateNumber: 'ABC-1234',
    vin: 'WD3PE8EB5N1234567',
    seatingCapacity: 2,
    adaCompliant: true,
    bariatricCapacity: 500,
    medicalEquipment: {
      stretcher: true,
      oxygenSystem: true,
      aed: true,
      firstAidKit: true,
      suctionUnit: true,
      immobilization: true,
    },
    otherEquipment: 'Ventilator, IV pump, cardiac monitor',
    insurancePolicyNumber: 'INS-2022-001234',
    insuranceExpiryDate: '2024-12-31',
    registrationExpiryDate: '2025-06-30',
    lastSanitizeDate: '2024-01-20',
    telematicsDeviceId: 'TEL-AMB-101-001',
    gpsDeviceId: 'GPS-AMB-101-001',
    dashcamId: 'CAM-AMB-101-001',
    generalNotes: 'Vehicle in excellent condition. Regular maintenance performed. All equipment checked and functional.',
    maintenanceLog: [
      {
        id: 'm1',
        name: 'Routine Service - Oil Change',
        description: 'Oil change, tire rotation, brake inspection',
        technician: 'Mike Davis',
        serviceProvider: 'Fleet Maintenance Department',
        nextServiceDue: '2024-04-15',
        performedBy: 'Mike Davis',
        notes: 'All systems checked. Vehicle in good condition. Next service due in 3 months or 5,000 miles.',
        date: '2024-01-15',
        cost: 250,
        mileage: 45000,
      },
      {
        id: 'm2',
        name: 'Alternator Replacement',
        description: 'Replaced alternator due to failure',
        technician: 'Mike Davis',
        serviceProvider: 'Fleet Maintenance Department',
        nextServiceDue: '2024-02-10',
        performedBy: 'Mike Davis',
        notes: 'Alternator replaced with OEM part. Battery tested and in good condition.',
        date: '2023-12-10',
        cost: 450,
        mileage: 42000,
      },
      {
        id: 'm3',
        name: 'Brake System Inspection',
        description: 'Complete brake system inspection and pad replacement',
        technician: 'John Wilson',
        serviceProvider: 'AutoCare Services',
        nextServiceDue: '2024-07-15',
        performedBy: 'John Wilson',
        notes: 'Front and rear brake pads replaced. Brake fluid flushed. System operating normally.',
        date: '2023-11-20',
        cost: 320,
        mileage: 40000,
      },
    ],
    inspectionReports: [
      {
        id: 'i1',
        name: 'Annual Safety Inspection',
        status: 'Pass',
        priority: 'High',
        driverName: 'John Smith',
        date: '2024-01-10',
        kms: 45000,
        issuesFound: 'None - All systems operational',
        actionRequired: 'None',
        inspectionPhotos: [
          '/documents/inspections/AMB-101-2024-01-10-photo1.jpg',
          '/documents/inspections/AMB-101-2024-01-10-photo2.jpg',
        ],
      },
      {
        id: 'i2',
        name: 'Equipment Inspection',
        status: 'Pass',
        priority: 'Medium',
        driverName: 'Sarah Johnson',
        date: '2023-12-15',
        kms: 43000,
        issuesFound: 'None - All medical equipment tested and functional',
        actionRequired: 'None',
        inspectionPhotos: [],
      },
      {
        id: 'i3',
        name: 'Pre-Trip Inspection',
        status: 'Fail',
        priority: 'Critical',
        driverName: 'John Smith',
        date: '2024-01-18',
        kms: 45200,
        issuesFound: 'Left rear tire showing signs of wear. Oxygen tank gauge not functioning properly.',
        actionRequired: 'Replace left rear tire immediately. Repair or replace oxygen tank gauge before next trip.',
        inspectionPhotos: [
          '/documents/inspections/AMB-101-2024-01-18-tire.jpg',
          '/documents/inspections/AMB-101-2024-01-18-gauge.jpg',
        ],
      },
    ],
    documents: [
      {
        id: 'd1',
        name: 'Vehicle Registration Certificate',
        type: 'Registration Certificate',
        uploadDate: '2024-01-01',
        expiryDate: '2025-06-30',
        fileUrl: '/documents/AMB-101-registration-certificate.pdf',
      },
      {
        id: 'd2',
        name: 'Insurance Certificate',
        type: 'Insurance Certificate',
        uploadDate: '2024-01-01',
        expiryDate: '2024-12-31',
        fileUrl: '/documents/AMB-101-insurance-certificate.pdf',
      },
      {
        id: 'd3',
        name: 'Annual Safety Inspection Report - 2024',
        type: 'Inspection Report',
        uploadDate: '2024-01-10',
        fileUrl: '/documents/inspections/AMB-101-2024-01-10.pdf',
      },
      {
        id: 'd4',
        name: 'Equipment Inspection Report - December 2023',
        type: 'Inspection Report',
        uploadDate: '2023-12-15',
        fileUrl: '/documents/inspections/AMB-101-2023-12-15.pdf',
      },
    ],
  },
  'v2': {
    id: 'v2',
    vehicleId: 'AMB-102',
    vehicleClass: 'BLS',
    baseLocation: 'Station Beta',
    assignedCrew: [
      { id: 'cm3', name: 'Michael Brown', role: 'EMT', certification: 'EMT-B' },
    ],
    make: 'Ford',
    model: 'Transit',
    year: 2021,
    plateNumber: 'DEF-5678',
    vin: 'NM0AE8F75M1234567',
    seatingCapacity: 3,
    adaCompliant: true,
    bariatricCapacity: 400,
    medicalEquipment: {
      stretcher: true,
      oxygenSystem: true,
      aed: true,
      firstAidKit: true,
      suctionUnit: false,
      immobilization: true,
    },
    otherEquipment: 'Basic life support equipment',
    insurancePolicyNumber: 'INS-2021-005678',
    insuranceExpiryDate: '2024-11-30',
    registrationExpiryDate: '2025-03-15',
    lastSanitizeDate: '2024-01-19',
    telematicsDeviceId: 'TEL-AMB-102-001',
    gpsDeviceId: 'GPS-AMB-102-001',
    dashcamId: 'CAM-AMB-102-001',
    generalNotes: 'Standard BLS vehicle. Well maintained.',
    maintenanceLog: [
      {
        id: 'm4',
        name: 'Routine Service - Oil Change',
        description: 'Oil change, filter replacement',
        technician: 'Mike Davis',
        serviceProvider: 'Fleet Maintenance Department',
        nextServiceDue: '2024-04-10',
        performedBy: 'Mike Davis',
        notes: 'Standard service completed. No issues found.',
        date: '2024-01-10',
        cost: 180,
        mileage: 52000,
      },
    ],
    inspectionReports: [
      {
        id: 'i4',
        name: 'Quarterly Inspection',
        status: 'Pass',
        priority: 'Medium',
        driverName: 'Michael Brown',
        date: '2024-01-05',
        kms: 52000,
        issuesFound: 'None - Vehicle in good condition',
        actionRequired: 'None',
        inspectionPhotos: [
          '/documents/inspections/AMB-102-2024-01-05-photo1.jpg',
        ],
      },
    ],
    documents: [
      {
        id: 'd5',
        name: 'Vehicle Registration Certificate',
        type: 'Registration Certificate',
        uploadDate: '2024-01-01',
        expiryDate: '2025-03-15',
        fileUrl: '/documents/AMB-102-registration-certificate.pdf',
      },
      {
        id: 'd6',
        name: 'Insurance Certificate',
        type: 'Insurance Certificate',
        uploadDate: '2024-01-01',
        expiryDate: '2024-11-30',
        fileUrl: '/documents/AMB-102-insurance-certificate.pdf',
      },
      {
        id: 'd7',
        name: 'Quarterly Inspection Report - Q1 2024',
        type: 'Inspection Report',
        uploadDate: '2024-01-05',
        fileUrl: '/documents/inspections/AMB-102-2024-01-05.pdf',
      },
    ],
  },
}

