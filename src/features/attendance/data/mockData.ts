/**
 * Mock Attendance Data
 * Sample attendance records for development and testing
 */

import { Attendance, BreakRecord } from '../types'

// Helper function to generate random time
const randomTime = (startHour: number, endHour: number): string => {
  const hour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour
  const minute = Math.floor(Math.random() * 60)
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

// Helper function to calculate hours between two times
const calculateHours = (start: string, end: string, breaks: BreakRecord[]): number => {
  const [startH, startM] = start.split(':').map(Number)
  const [endH, endM] = end.split(':').map(Number)
  const startMinutes = startH * 60 + startM
  const endMinutes = endH * 60 + endM
  let totalMinutes = endMinutes - startMinutes
  
  // Handle overnight shifts
  if (totalMinutes < 0) {
    totalMinutes += 24 * 60
  }
  
  const breakMinutes = breaks.reduce((sum, b) => sum + b.duration, 0)
  return (totalMinutes - breakMinutes) / 60
}

// Helper function to generate break records
const generateBreaks = (date: string): BreakRecord[] => {
  const breaks: BreakRecord[] = []
  
  // Lunch break (30-60 minutes)
  const lunchStart = randomTime(12, 13)
  const lunchDuration = Math.floor(Math.random() * 31) + 30 // 30-60 minutes
  const [lunchH, lunchM] = lunchStart.split(':').map(Number)
  const lunchEndMinutes = lunchH * 60 + lunchM + lunchDuration
  const lunchEndH = Math.floor(lunchEndMinutes / 60)
  const lunchEndM = lunchEndMinutes % 60
  const lunchEnd = `${lunchEndH.toString().padStart(2, '0')}:${lunchEndM.toString().padStart(2, '0')}`
  
  breaks.push({
    id: `break-${date}-lunch`,
    startTime: lunchStart,
    endTime: lunchEnd,
    duration: lunchDuration,
    type: 'lunch',
  })
  
  // Sometimes a coffee break (10-15 minutes)
  if (Math.random() > 0.5) {
    const coffeeStart = randomTime(10, 11)
    const coffeeDuration = Math.floor(Math.random() * 6) + 10 // 10-15 minutes
    const [coffeeH, coffeeM] = coffeeStart.split(':').map(Number)
    const coffeeEndMinutes = coffeeH * 60 + coffeeM + coffeeDuration
    const coffeeEndH = Math.floor(coffeeEndMinutes / 60)
    const coffeeEndM = coffeeEndMinutes % 60
    const coffeeEnd = `${coffeeEndH.toString().padStart(2, '0')}:${coffeeEndM.toString().padStart(2, '0')}`
    
    breaks.push({
      id: `break-${date}-coffee`,
      startTime: coffeeStart,
      endTime: coffeeEnd,
      duration: coffeeDuration,
      type: 'coffee',
    })
  }
  
  return breaks
}

// Generate dates for the last 30 days
const generateDates = (): string[] => {
  const dates: string[] = []
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date.toISOString().split('T')[0])
    }
  }
  return dates.reverse()
}

// Employee names from employees feature
const employeeNames = [
  { id: 'emp-001', name: 'Sarah Johnson' },
  { id: 'emp-002', name: 'Michael Chen' },
  { id: 'emp-003', name: 'Emily Rodriguez' },
  { id: 'emp-004', name: 'David Thompson' },
  { id: 'emp-005', name: 'Jessica Martinez' },
  { id: 'emp-006', name: 'James Wilson' },
  { id: 'emp-007', name: 'Lisa Anderson' },
  { id: 'emp-008', name: 'Robert Taylor' },
]

// Generate mock attendance records
const generateAttendanceRecords = (): Attendance[] => {
  const records: Attendance[] = []
  const dates = generateDates()
  
  employeeNames.forEach((employee) => {
    dates.forEach((date) => {
      const statusRoll = Math.random()
      let status: Attendance['status']
      let clockIn: string | null = null
      let clockOut: string | null = null
      let breaks: BreakRecord[] = []
      let totalHours = 0
      let overtime = 0
      let reason: string | undefined
      
      if (statusRoll < 0.75) {
        // 75% present
        status = 'present'
        clockIn = randomTime(7, 9) // Clock in between 7 AM and 9 AM
        clockOut = randomTime(16, 18) // Clock out between 4 PM and 6 PM
        breaks = generateBreaks(date)
        totalHours = calculateHours(clockIn, clockOut, breaks)
        
        // Sometimes overtime
        if (totalHours > 8) {
          overtime = totalHours - 8
        }
      } else if (statusRoll < 0.85) {
        // 10% late
        status = 'late'
        clockIn = randomTime(9, 10) // Late clock in
        clockOut = randomTime(17, 19)
        breaks = generateBreaks(date)
        totalHours = calculateHours(clockIn, clockOut, breaks)
        reason = 'Traffic delay'
      } else if (statusRoll < 0.90) {
        // 5% half-day
        status = 'half-day'
        clockIn = randomTime(7, 9)
        clockOut = randomTime(12, 13) // Early leave
        breaks = []
        totalHours = calculateHours(clockIn, clockOut, breaks)
        reason = 'Personal appointment'
      } else if (statusRoll < 0.95) {
        // 5% on-leave
        status = 'on-leave'
        reason = 'Sick leave'
      } else {
        // 5% absent
        status = 'absent'
        reason = 'No show'
      }
      
      records.push({
        id: `att-${employee.id}-${date}`,
        employeeId: employee.id,
        employeeName: employee.name,
        date,
        clockIn,
        clockOut,
        breaks,
        totalHours: Math.round(totalHours * 10) / 10, // Round to 1 decimal
        overtime: Math.round(overtime * 10) / 10,
        status,
        reason,
        notes: status === 'present' && Math.random() > 0.8 ? 'Completed all tasks' : undefined,
        createdAt: new Date(date).toISOString(),
        updatedAt: new Date(date).toISOString(),
      })
    })
  })
  
  return records
}

export const mockAttendance: Attendance[] = generateAttendanceRecords()

// Calculate attendance stats
export const calculateAttendanceStats = (records: Attendance[]): AttendanceStats => {
  return {
    totalRecords: records.length,
    present: records.filter(r => r.status === 'present').length,
    absent: records.filter(r => r.status === 'absent').length,
    late: records.filter(r => r.status === 'late').length,
    halfDay: records.filter(r => r.status === 'half-day').length,
    onLeave: records.filter(r => r.status === 'on-leave').length,
    totalHours: records.reduce((sum, r) => sum + r.totalHours, 0),
    totalOvertime: records.reduce((sum, r) => sum + r.overtime, 0),
  }
}

