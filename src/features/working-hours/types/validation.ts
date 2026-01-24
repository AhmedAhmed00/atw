import { z } from 'zod'

// Helper function to convert HH:mm to minutes for comparison
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

// Time slot validation schema
export const timeSlotSchema = z.object({
  start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
  end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
}).refine((data) => {
  // Ensure end time is after start time
  const startMinutes = timeToMinutes(data.start)
  const endMinutes = timeToMinutes(data.end)
  return endMinutes > startMinutes
}, {
  message: 'End time must be after start time',
  path: ['end'],
})

// Day schedule validation schema
export const dayScheduleSchema = z.object({
  day: z.string(),
  enabled: z.boolean(),
  timeSlot: timeSlotSchema,
})

// Working hours validation schema
export const workingHoursSchema = z.object({
  schedule: z.array(dayScheduleSchema),
})

export type TimeSlotFormData = z.infer<typeof timeSlotSchema>
export type DayScheduleFormData = z.infer<typeof dayScheduleSchema>
export type WorkingHoursFormData = z.infer<typeof workingHoursSchema>

