/**
 * Attendance Types
 * Defines the structure for employee attendance records
 */

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half-day' | 'on-leave'

export interface Attendance {
  id: string
  employeeId: string
  employeeName: string
  date: string // ISO date string (YYYY-MM-DD)
  clockIn: string | null // HH:mm format or null if not clocked in
  clockOut: string | null // HH:mm format or null if not clocked out
  breaks: BreakRecord[] // Array of break records
  totalHours: number // Total working hours (decimal, e.g., 8.5)
  overtime: number // Overtime hours (decimal, e.g., 1.5)
  status: AttendanceStatus
  reason?: string // Reason for absence/late/leave
  notes?: string // Additional notes
  createdAt: string
  updatedAt: string
}

export interface BreakRecord {
  id: string
  startTime: string // HH:mm
  endTime: string // HH:mm
  duration: number // Duration in minutes
  type?: 'lunch' | 'coffee' | 'other'
}

export interface AttendanceStats {
  totalRecords: number
  present: number
  absent: number
  late: number
  halfDay: number
  onLeave: number
  totalHours: number
  totalOvertime: number
}

// Re-export Employee type from employees feature
export type { Employee } from '@/features/employees/types'
