/**
 * Mock Notifications Data
 */

import type { Notification } from './types'

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'order',
    title: 'New Appointment Booked',
    message: 'John Doe has booked a General Checkup appointment',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 mins ago
    isRead: false,
    link: '/appointments/details/1',
    data: {
      appointmentId: '1',
      patientName: 'John Doe',
    },
  },
  {
    id: 'notif-2',
    type: 'message',
    title: 'New Message from Patient',
    message: 'Jane Smith sent you a message regarding her appointment',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
    isRead: false,
    link: '/appointments/details/2?tab=conversation',
    data: {
      appointmentId: '2',
      patientName: 'Jane Smith',
    },
  },
  {
    id: 'notif-3',
    type: 'payment',
    title: 'Payment Received',
    message: 'Payment of $250.00 received from Michael Brown',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
    isRead: false,
    link: '/payments',
    data: {
      patientName: 'Michael Brown',
    },
  },
  {
    id: 'notif-4',
    type: 'appointment',
    title: 'Appointment Reminder',
    message: 'Emily Davis appointment in 1 hour - Eye Examination',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 mins ago
    isRead: true,
    link: '/appointments/details/4',
    data: {
      appointmentId: '4',
      patientName: 'Emily Davis',
    },
  },
  {
    id: 'notif-5',
    type: 'message',
    title: 'New Message from Patient',
    message: 'Robert Johnson has a question about his prescription',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isRead: true,
    link: '/appointments/details/3?tab=conversation',
    data: {
      appointmentId: '3',
      patientName: 'Robert Johnson',
    },
  },
  {
    id: 'notif-6',
    type: 'order',
    title: 'Appointment Cancelled',
    message: 'James Wilson has cancelled his consultation appointment',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    isRead: true,
    link: '/appointments/details/5',
    data: {
      appointmentId: '5',
      patientName: 'James Wilson',
    },
  },
  {
    id: 'notif-7',
    type: 'system',
    title: 'System Update',
    message: 'New features are available in the Settings module',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isRead: true,
    link: '/settings',
  },
]

