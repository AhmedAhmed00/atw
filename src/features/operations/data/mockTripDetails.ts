/**
 * Mock data for trip details
 */

export interface TripDetail {
  id: string
  tripId: string
  status: 'Completed' | 'En Route' | 'Pending' | 'Delayed'
  priority: 'Routine' | 'Urgent' | 'Emergency'
  // Patient Information
  patient: {
    fullName: string
    age: number
    gender: 'Male' | 'Female' | 'Other'
    contactPhone: string
    emergencyContact: {
      name: string
      phone: string
      relationship: string
    }
    chronicConditions: string[]
    allergies: string[]
    mobilityStatus: string
    preTransportNotes: string
  }
  // Trip Timeline
  timeline: {
    id: string
    event: string
    timestamp: string
    location?: string
    status: 'completed' | 'in-progress' | 'pending'
  }[]
  // Vehicle & Crew Assignment
  vehicle: {
    id: string
    vehicleId: string
    make: string
    model: string
    class: string
  }
  crew: {
    id: string
    name: string
    role: string
    certification: string
  }[]
  // Live Tracking
  liveTracking: {
    currentLocation: {
      lat: number
      lng: number
    }
    gpsDistance: number // in km
    odometerStart: number
    odometerCurrent: number
    waitingTime: number // in minutes
    estimatedArrival: string
  }
  // Medical Report
  medicalReport?: {
    id: string
    date: string
    doctorName: string
    vitals: {
      bp: string
      hr: number
      o2: number
      temperature: number
      respiratoryRate: number
      glucose: number
      painLevel: number
    }
    medicationsAdministered: string[]
    proceduresPerformed: string[]
    tripOutcome: {
      destination: string
      arrivalCondition: string
      incidents: string
    }
    paramedicNotes: string
  }
  // Vehicle Inspection
  vehicleInspection?: {
    id: string
    date: string
    inspector: string
    status: 'Pass' | 'Fail' | 'Pending'
    odometerReading: number
    fuelLevel: number // percentage
    exteriorCondition: 'Excellent' | 'Good' | 'Fair' | 'Poor'
    tirePressure: {
      frontLeft: number
      frontRight: number
      rearLeft: number
      rearRight: number
    }
    tireCondition: 'Good' | 'Fair' | 'Needs Replacement'
    lights: {
      headlights: boolean
      taillights: boolean
      turnSignals: boolean
      brakeLights: boolean
      emergencyLights: boolean
    }
    signals: {
      horn: boolean
      siren: boolean
      radio: boolean
    }
    otherChecks: {
      brakes: boolean
      steering: boolean
      suspension: boolean
      mirrors: boolean
      wipers: boolean
      airConditioning: boolean
    }
    issues: string[]
    notes: string
    inspectionPhotos: string[]
  }
  // Communication
  communication: {
    id: string
    type: 'call' | 'sms' | 'message'
    from: string
    to: string
    content: string
    timestamp: string
    direction: 'inbound' | 'outbound'
    attachments?: {
      id: string
      type: 'photo' | 'audio' | 'video'
      name: string
      url: string
      size?: number
    }[]
  }[]
  // Attachments
  attachments: {
    id: string
    name: string
    type: string
    size: number
    uploadDate: string
    fileUrl: string
  }[]
  // Equipment & Invoice
  equipment: {
    id: string
    item: string
    category: string
    quantity: number
    duration: number // in hours
    unitPrice: number
    total: number
  }[]
  patientSignature?: {
    signedBy: string
    date: string
    verified: boolean
    signatureImage?: string // URL to signature image
  }
  invoice?: {
    id: string
    invoiceNumber: string
    equipmentSubtotal: number
    baseServiceCharge: number
    mileage: number
    mileageRate: number
    mileageCharge: number
    grandTotal: number
    status: 'Paid' | 'Pending' | 'Overdue'
    dueDate: string
  }
}

export const mockTripDetails: Record<string, TripDetail> = {
  't1': {
    id: 't1',
    tripId: 'TRP-001',
    status: 'Completed',
    priority: 'Urgent',
    patient: {
      fullName: 'Ahmed Mohamed',
      age: 65,
      gender: 'Male',
      contactPhone: '+20 100 123 4567',
      emergencyContact: {
        name: 'Fatima Mohamed',
        phone: '+20 100 123 4568',
        relationship: 'Wife',
      },
      chronicConditions: ['Diabetes Type 2', 'Hypertension', 'Heart Disease'],
      allergies: ['Penicillin', 'Latex'],
      mobilityStatus: 'Wheelchair',
      preTransportNotes: 'Patient requires oxygen support during transport. Monitor blood glucose levels. Handle with care due to recent hip surgery.',
    },
    timeline: [
      {
        id: 'tl1',
        event: 'Trip Created',
        timestamp: '2024-01-20T07:30:00',
        status: 'completed',
      },
      {
        id: 'tl2',
        event: 'Vehicle Dispatched',
        timestamp: '2024-01-20T07:45:00',
        status: 'completed',
      },
      {
        id: 'tl3',
        event: 'Arrived at Pickup',
        timestamp: '2024-01-20T08:05:00',
        location: 'Cairo University Hospital',
        status: 'completed',
      },
      {
        id: 'tl4',
        event: 'Patient Loaded',
        timestamp: '2024-01-20T08:15:00',
        status: 'completed',
      },
      {
        id: 'tl5',
        event: 'En Route to Destination',
        timestamp: '2024-01-20T08:20:00',
        status: 'completed',
      },
      {
        id: 'tl6',
        event: 'Arrived at Destination',
        timestamp: '2024-01-20T10:20:00',
        location: 'Alexandria Medical Center',
        status: 'completed',
      },
      {
        id: 'tl7',
        event: 'Patient Unloaded',
        timestamp: '2024-01-20T10:25:00',
        status: 'completed',
      },
      {
        id: 'tl8',
        event: 'Trip Completed',
        timestamp: '2024-01-20T10:30:00',
        status: 'completed',
      },
    ],
    vehicle: {
      id: 'v1',
      vehicleId: 'AMB-101',
      make: 'Mercedes-Benz',
      model: 'Sprinter',
      class: 'Type II Ambulance',
    },
    crew: [
      {
        id: 'cm1',
        name: 'John Smith',
        role: 'Paramedic',
        certification: 'EMT-P',
      },
      {
        id: 'cm2',
        name: 'Sarah Johnson',
        role: 'EMT',
        certification: 'EMT-B',
      },
    ],
    liveTracking: {
      currentLocation: {
        lat: 31.2001,
        lng: 29.9187,
      },
      gpsDistance: 225.5,
      odometerStart: 45000,
      odometerCurrent: 45225,
      waitingTime: 15,
      estimatedArrival: '2024-01-20T10:20:00',
    },
    medicalReport: {
      id: 'mr1',
      date: '2024-01-20T10:30:00',
      doctorName: 'Dr. Mohamed Ali',
      vitals: {
        bp: '130/85',
        hr: 78,
        o2: 96,
        temperature: 36.8,
        respiratoryRate: 18,
        glucose: 120,
        painLevel: 3,
      },
      medicationsAdministered: ['Oxygen 2L/min', 'Insulin 5 units'],
      proceduresPerformed: ['Vital signs monitoring', 'Blood glucose check'],
      tripOutcome: {
        destination: 'Alexandria Medical Center',
        arrivalCondition: 'Stable',
        incidents: 'None',
      },
      paramedicNotes: 'Patient transported safely. All vitals stable throughout the trip. No complications.',
    },
    vehicleInspection: {
      id: 'vi1',
      date: '2024-01-20T07:30:00',
      inspector: 'John Smith',
      status: 'Pass',
      odometerReading: 45000,
      fuelLevel: 85,
      exteriorCondition: 'Good',
      tirePressure: {
        frontLeft: 35,
        frontRight: 35,
        rearLeft: 40,
        rearRight: 40,
      },
      tireCondition: 'Good',
      lights: {
        headlights: true,
        taillights: true,
        turnSignals: true,
        brakeLights: true,
        emergencyLights: true,
      },
      signals: {
        horn: true,
        siren: true,
        radio: true,
      },
      otherChecks: {
        brakes: true,
        steering: true,
        suspension: true,
        mirrors: true,
        wipers: true,
        airConditioning: true,
      },
      issues: [],
      notes: 'Vehicle inspected and ready. All equipment functional. All systems operational.',
      inspectionPhotos: [
        '/documents/inspections/TRP-001-exterior-1.jpg',
        '/documents/inspections/TRP-001-tires-1.jpg',
        '/documents/inspections/TRP-001-interior-1.jpg',
      ],
    },
    communication: [
      {
        id: 'c1',
        type: 'call',
        from: 'Dispatch',
        to: 'John Smith',
        content: 'Trip assigned. Please proceed to Cairo University Hospital.',
        timestamp: '2024-01-20T07:30:00',
        direction: 'inbound',
      },
      {
        id: 'c2',
        type: 'sms',
        from: 'John Smith',
        to: 'Dispatch',
        content: 'Arrived at pickup location.',
        timestamp: '2024-01-20T08:05:00',
        direction: 'outbound',
      },
      {
        id: 'c3',
        type: 'message',
        from: 'John Smith',
        to: 'Dispatch',
        content: 'Patient loaded successfully. En route to destination. Here are some photos of the patient condition.',
        timestamp: '2024-01-20T08:20:00',
        direction: 'outbound',
        attachments: [
          {
            id: 'att-comm-1',
            type: 'photo',
            name: 'patient-condition-1.jpg',
            url: '/documents/trips/TRP-001-patient-photo-1.jpg',
            size: 245000,
          },
          {
            id: 'att-comm-2',
            type: 'photo',
            name: 'patient-condition-2.jpg',
            url: '/documents/trips/TRP-001-patient-photo-2.jpg',
            size: 198000,
          },
        ],
      },
      {
        id: 'c4',
        type: 'message',
        from: 'John Smith',
        to: 'Medical Team',
        content: 'Audio recording of patient vitals check.',
        timestamp: '2024-01-20T09:15:00',
        direction: 'outbound',
        attachments: [
          {
            id: 'att-comm-3',
            type: 'audio',
            name: 'vitals-check-recording.mp3',
            url: '/documents/trips/TRP-001-vitals-audio.mp3',
            size: 1250000,
          },
        ],
      },
      {
        id: 'c5',
        type: 'message',
        from: 'Dispatch',
        to: 'John Smith',
        content: 'Please send video of vehicle interior condition.',
        timestamp: '2024-01-20T09:30:00',
        direction: 'inbound',
      },
      {
        id: 'c6',
        type: 'message',
        from: 'John Smith',
        to: 'Dispatch',
        content: 'Vehicle interior video as requested.',
        timestamp: '2024-01-20T09:35:00',
        direction: 'outbound',
        attachments: [
          {
            id: 'att-comm-4',
            type: 'video',
            name: 'vehicle-interior-inspection.mp4',
            url: '/documents/trips/TRP-001-vehicle-video.mp4',
            size: 5240000,
          },
        ],
      },
    ],
    attachments: [
      {
        id: 'att1',
        name: 'Medical Report - TRP-001.pdf',
        type: 'PDF',
        size: 245000,
        uploadDate: '2024-01-20T10:30:00',
        fileUrl: '/documents/trips/TRP-001-medical-report.pdf',
      },
      {
        id: 'att2',
        name: 'Patient Consent Form.pdf',
        type: 'PDF',
        size: 120000,
        uploadDate: '2024-01-20T08:15:00',
        fileUrl: '/documents/trips/TRP-001-consent.pdf',
      },
    ],
    equipment: [
      {
        id: 'eq1',
        item: 'Oxygen Tank',
        category: 'Medical Equipment',
        quantity: 2,
        duration: 2.5,
        unitPrice: 25.00,
        total: 125.00,
      },
      {
        id: 'eq2',
        item: 'Stretcher',
        category: 'Transport Equipment',
        quantity: 1,
        duration: 2.5,
        unitPrice: 50.00,
        total: 125.00,
      },
      {
        id: 'eq3',
        item: 'First Aid Kit',
        category: 'Medical Supplies',
        quantity: 1,
        duration: 2.5,
        unitPrice: 15.00,
        total: 37.50,
      },
      {
        id: 'eq4',
        item: 'IV Supplies',
        category: 'Medical Supplies',
        quantity: 1,
        duration: 2.5,
        unitPrice: 20.00,
        total: 50.00,
      },
    ],
    patientSignature: {
      signedBy: 'Ahmed Mohamed',
      date: '2024-01-20T10:25:00',
      verified: true,
      signatureImage: '/documents/signatures/TRP-001-patient-signature.png',
    },
    invoice: {
      id: 'inv1',
      invoiceNumber: 'INV-2024-001',
      equipmentSubtotal: 337.50,
      baseServiceCharge: 500.00,
      mileage: 225.5,
      mileageRate: 2.50,
      mileageCharge: 563.75,
      grandTotal: 1401.25,
      status: 'Paid',
      dueDate: '2024-02-20',
    },
  },
  't2': {
    id: 't2',
    tripId: 'TRP-002',
    status: 'En Route',
    priority: 'Routine',
    patient: {
      fullName: 'Fatima Ali',
      age: 45,
      gender: 'Female',
      contactPhone: '+20 100 234 5678',
      emergencyContact: {
        name: 'Ahmed Ali',
        phone: '+20 100 234 5679',
        relationship: 'Husband',
      },
      chronicConditions: ['Asthma'],
      allergies: ['Dust'],
      mobilityStatus: 'Ambulatory',
      preTransportNotes: 'Standard transport. No special requirements.',
    },
    timeline: [
      {
        id: 'tl9',
        event: 'Trip Created',
        timestamp: '2024-01-20T13:30:00',
        status: 'completed',
      },
      {
        id: 'tl10',
        event: 'Vehicle Dispatched',
        timestamp: '2024-01-20T13:45:00',
        status: 'completed',
      },
      {
        id: 'tl11',
        event: 'Arrived at Pickup',
        timestamp: '2024-01-20T14:02:00',
        location: 'Mansoura General Hospital',
        status: 'completed',
      },
      {
        id: 'tl12',
        event: 'Patient Loaded',
        timestamp: '2024-01-20T14:10:00',
        status: 'completed',
      },
      {
        id: 'tl13',
        event: 'En Route to Destination',
        timestamp: '2024-01-20T14:15:00',
        status: 'in-progress',
      },
      {
        id: 'tl14',
        event: 'Arrived at Destination',
        timestamp: '2024-01-20T15:45:00',
        location: 'Cairo Medical Center',
        status: 'pending',
      },
    ],
    vehicle: {
      id: 'v2',
      vehicleId: 'AMB-102',
      make: 'Ford',
      model: 'Transit',
      class: 'BLS',
    },
    crew: [
      {
        id: 'cm3',
        name: 'Michael Brown',
        role: 'EMT',
        certification: 'EMT-B',
      },
    ],
    liveTracking: {
      currentLocation: {
        lat: 30.0131,
        lng: 31.2089,
      },
      gpsDistance: 95.3,
      odometerStart: 52000,
      odometerCurrent: 52095,
      waitingTime: 8,
      estimatedArrival: '2024-01-20T15:45:00',
    },
    communication: [
      {
        id: 'c7',
        type: 'call',
        from: 'Dispatch',
        to: 'Michael Brown',
        content: 'New trip assigned.',
        timestamp: '2024-01-20T13:30:00',
        direction: 'inbound',
      },
    ],
    attachments: [],
    equipment: [
      {
        id: 'eq5',
        item: 'First Aid Kit',
        category: 'Medical Supplies',
        quantity: 1,
        duration: 1.5,
        unitPrice: 15.00,
        total: 22.50,
      },
    ],
  },
}

