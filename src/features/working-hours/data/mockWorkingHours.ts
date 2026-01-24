import type { WorkingHours } from '../types'

export const mockWorkingHours: WorkingHours = {
  schedule: [
    {
      day: 'Monday',
      enabled: true,
      timeSlots: [
        { id: '1', start: '09:00', end: '13:00' },
        { id: '2', start: '14:00', end: '18:00' }
      ]
    },
    {
      day: 'Tuesday',
      enabled: true,
      timeSlots: [
        { id: '1', start: '09:00', end: '17:00' }
      ]
    },
    {
      day: 'Wednesday',
      enabled: true,
      timeSlots: [
        { id: '1', start: '09:00', end: '17:00' }
      ]
    },
    {
      day: 'Thursday',
      enabled: true,
      timeSlots: [
        { id: '1', start: '09:00', end: '13:00' },
        { id: '2', start: '15:00', end: '19:00' }
      ]
    },
    {
      day: 'Friday',
      enabled: true,
      timeSlots: [
        { id: '1', start: '09:00', end: '17:00' }
      ]
    },
    {
      day: 'Saturday',
      enabled: false,
      timeSlots: [
        { id: '1', start: '09:00', end: '13:00' }
      ]
    },
    {
      day: 'Sunday',
      enabled: false,
      timeSlots: [
        { id: '1', start: '10:00', end: '14:00' }
      ]
    }
  ]
}

