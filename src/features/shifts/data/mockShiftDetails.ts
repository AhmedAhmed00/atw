/**
 * Mock data for shift details
 */

export interface ShiftDetail {
  id: string
  shiftId: string
  location: string
  supervisor: {
    id: string
    name: string
    email: string
    phone: string
  }
  team: {
    id: string
    name: string
    role: string
    status: 'active' | 'on-break' | 'off-duty'
  }[]
  trips: {
    id: string
    tripId: string
    patient: string
    pickupLocation: string
    dropoffLocation: string
    scheduledTime: string
    status: 'Completed' | 'En Route' | 'Pending' | 'Delayed'
    driver: string
    vehicle: string
  }[]
  comments: {
    id: string
    author: string
    authorRole: string
    timestamp: string
    content: string
  }[]
}

export const mockShiftDetails: Record<string, ShiftDetail> = {
  'shift-001': {
    id: 'shift-001',
    shiftId: 'SHF-001',
    location: 'Main Hospital - Emergency Department',
    supervisor: {
      id: 'sup-001',
      name: 'Dr. James Anderson',
      email: 'james.anderson@alltheway.com',
      phone: '+1 (555) 111-2222',
    },
    team: [
      {
        id: 'emp-001',
        name: 'Sarah Johnson',
        role: 'Senior Nurse',
        status: 'active',
      },
      {
        id: 'emp-002',
        name: 'Michael Chen',
        role: 'Paramedic',
        status: 'active',
      },
      {
        id: 'emp-003',
        name: 'Emily Rodriguez',
        role: 'EMT',
        status: 'on-break',
      },
    ],
    trips: [
      {
        id: 't1',
        tripId: 'TRP-001',
        patient: 'Ahmed Mohamed',
        pickupLocation: 'Cairo University Hospital',
        dropoffLocation: 'Alexandria Medical Center',
        scheduledTime: '2024-02-20T08:00:00',
        status: 'Completed',
        driver: 'John Smith',
        vehicle: 'AMB-101',
      },
      {
        id: 't2',
        tripId: 'TRP-002',
        patient: 'Fatima Ali',
        pickupLocation: 'Mansoura General Hospital',
        dropoffLocation: 'Cairo Medical Center',
        scheduledTime: '2024-02-20T10:30:00',
        status: 'En Route',
        driver: 'Sarah Johnson',
        vehicle: 'AMB-102',
      },
      {
        id: 't3',
        tripId: 'TRP-003',
        patient: 'Mohamed Hassan',
        pickupLocation: 'Alexandria Medical Center',
        dropoffLocation: 'Aswan Medical Complex',
        scheduledTime: '2024-02-20T14:00:00',
        status: 'Pending',
        driver: 'Michael Brown',
        vehicle: 'AMB-103',
      },
    ],
    comments: [
      {
        id: 'c1',
        author: 'Dr. James Anderson',
        authorRole: 'Supervisor',
        timestamp: '2024-02-20T07:45:00',
        content: 'Shift briefing completed. All team members present and ready.',
      },
      {
        id: 'c2',
        author: 'Sarah Johnson',
        authorRole: 'Senior Nurse',
        timestamp: '2024-02-20T09:15:00',
        content: 'First trip completed successfully. Patient transported safely.',
      },
      {
        id: 'c3',
        author: 'Michael Chen',
        authorRole: 'Paramedic',
        timestamp: '2024-02-20T11:30:00',
        content: 'Vehicle AMB-102 requires maintenance check after current trip.',
      },
    ],
  },
  'shift-002': {
    id: 'shift-002',
    shiftId: 'SHF-002',
    location: 'Main Hospital - ICU',
    supervisor: {
      id: 'sup-002',
      name: 'Dr. Maria Garcia',
      email: 'maria.garcia@alltheway.com',
      phone: '+1 (555) 222-3333',
    },
    team: [
      {
        id: 'emp-001',
        name: 'Sarah Johnson',
        role: 'Registered Nurse',
        status: 'active',
      },
      {
        id: 'emp-002',
        name: 'Michael Chen',
        role: 'Physician',
        status: 'active',
      },
      {
        id: 'emp-004',
        name: 'David Thompson',
        role: 'Registered Nurse',
        status: 'active',
      },
      {
        id: 'emp-006',
        name: 'Robert Williams',
        role: 'Registered Nurse',
        status: 'active',
      },
    ],
    trips: [
      {
        id: 't4',
        tripId: 'TRP-004',
        patient: 'Sara Ibrahim',
        pickupLocation: 'Cairo University Hospital',
        dropoffLocation: 'Giza Medical Center',
        scheduledTime: '2024-02-21T16:00:00',
        status: 'Delayed',
        driver: 'Emily Davis',
        vehicle: 'WC-201',
      },
    ],
    comments: [
      {
        id: 'c4',
        author: 'Dr. Maria Garcia',
        authorRole: 'Supervisor',
        timestamp: '2024-02-21T15:00:00',
        content: 'ICU shift started. All systems operational.',
      },
    ],
  },
}

