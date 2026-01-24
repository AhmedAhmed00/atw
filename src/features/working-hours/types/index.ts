export interface TimeSlot {
  id: string
  start: string // Format: "HH:mm" (24-hour format)
  end: string   // Format: "HH:mm" (24-hour format)
}

export interface DaySchedule {
  day: string
  enabled: boolean
  timeSlots: TimeSlot[] // Changed from timeSlot to timeSlots array
}

export interface WorkingHours {
  schedule: DaySchedule[]
}

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
] as const

export type DayOfWeek = typeof DAYS_OF_WEEK[number]

