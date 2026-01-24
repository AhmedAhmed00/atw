/**
 * Attendance Adjustment Schema
 * Zod validation schema for manual attendance adjustment form
 */

import { z } from 'zod'

export const attendanceStatusEnum = z.enum(['present', 'absent', 'late', 'half-day', 'on-leave'])

export const attendanceAdjustmentSchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  date: z.string().min(1, 'Date is required'),
  status: attendanceStatusEnum,
  clockInTime: z.string().optional().or(z.literal('')),
  clockOutTime: z.string().optional().or(z.literal('')),
  breaksMinutes: z.coerce.number().min(0, 'Breaks cannot be negative').optional().or(z.literal(0)),
  overtimeHours: z.coerce.number().min(0, 'Overtime cannot be negative').optional().or(z.literal(0)),
  notes: z.string().optional().or(z.literal('')),
}).refine(
  (data) => {
    // If status is present, late, or half-day, at least clock in should be provided
    if (['present', 'late', 'half-day'].includes(data.status)) {
      return !!data.clockInTime
    }
    return true
  },
  {
    message: 'Clock in time is required for this status',
    path: ['clockInTime'],
  }
).refine(
  (data) => {
    // If clock out is provided, clock in must also be provided
    if (data.clockOutTime && !data.clockInTime) {
      return false
    }
    return true
  },
  {
    message: 'Clock in time is required when clock out time is provided',
    path: ['clockInTime'],
  }
)

export type AttendanceAdjustmentFormValues = z.infer<typeof attendanceAdjustmentSchema>

