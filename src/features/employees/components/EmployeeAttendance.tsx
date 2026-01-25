/**
 * EmployeeAttendance Component
 * Attendance tab content for Employee Detail Page
 */

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  ClipboardCheck,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
} from 'lucide-react'
import { Employee } from '../types'
import { cn } from '@/lib/utils'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isWeekend } from 'date-fns'

interface EmployeeAttendanceProps {
  employee: Employee
}

interface AttendanceRecord {
  id: string
  date: string
  day: string
  checkIn: string | null
  checkOut: string | null
  hoursWorked: number | null
  status: 'Present' | 'Absent' | 'Late' | 'Half Day' | 'On Leave'
  notes?: string
}

// Mock attendance data - in real app, this would come from API
const getAttendanceData = (employee: Employee): AttendanceRecord[] => {
  const records: AttendanceRecord[] = []
  const today = new Date()
  const startDate = startOfMonth(new Date(today.getFullYear(), today.getMonth() - 2, 1)) // Last 3 months
  const endDate = endOfMonth(today)

  const days = eachDayOfInterval({ start: startDate, end: endDate })

  days.forEach((day) => {
    const dayOfWeek = getDay(day)
    const isWeekendDay = isWeekend(day)
    const random = Math.random()

    let status: AttendanceRecord['status'] = 'Present'
    let checkIn: string | null = '08:00'
    let checkOut: string | null = '17:00'
    let hoursWorked: number | null = 8
    let notes: string | undefined

    if (isWeekendDay) {
      // Weekends might be off
      if (random > 0.3) {
        status = 'On Leave'
        checkIn = null
        checkOut = null
        hoursWorked = null
      }
    } else {
      // Weekdays
      if (random > 0.85) {
        status = 'Absent'
        checkIn = null
        checkOut = null
        hoursWorked = null
        notes = 'No show'
      } else if (random > 0.75) {
        status = 'Late'
        checkIn = '09:15'
        hoursWorked = 7.75
        notes = 'Arrived late'
      } else if (random > 0.7) {
        status = 'Half Day'
        checkIn = '08:00'
        checkOut = '12:30'
        hoursWorked = 4.5
        notes = 'Left early'
      } else {
        // Normal day with some variation
        const checkInHour = 7 + Math.floor(Math.random() * 2) // 7-8 AM
        const checkInMinute = Math.floor(Math.random() * 4) * 15 // 0, 15, 30, 45
        checkIn = `${checkInHour.toString().padStart(2, '0')}:${checkInMinute.toString().padStart(2, '0')}`

        const checkOutHour = 16 + Math.floor(Math.random() * 3) // 4-6 PM
        const checkOutMinute = Math.floor(Math.random() * 4) * 15
        checkOut = `${checkOutHour.toString().padStart(2, '0')}:${checkOutMinute.toString().padStart(2, '0')}`

        // Calculate hours worked
        const checkInTime = checkInHour * 60 + checkInMinute
        const checkOutTime = checkOutHour * 60 + checkOutMinute
        hoursWorked = (checkOutTime - checkInTime) / 60
      }
    }

    records.push({
      id: `att-${employee.id}-${day.toISOString().split('T')[0]}`,
      date: day.toISOString().split('T')[0],
      day: format(day, 'EEE'),
      checkIn,
      checkOut,
      hoursWorked,
      status,
      notes,
    })
  })

  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function EmployeeAttendance({ employee }: EmployeeAttendanceProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), 'yyyy-MM')
  )
  const allRecords = getAttendanceData(employee)

  // Filter records by selected month
  const filteredRecords = useMemo(() => {
    return allRecords.filter((record) => {
      const recordMonth = format(new Date(record.date), 'yyyy-MM')
      return recordMonth === selectedMonth
    })
  }, [allRecords, selectedMonth])

  const handleDownloadReport = () => {
    // TODO: Implement download report functionality
    console.log('Download attendance report for month:', selectedMonth)
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Present':
        return {
          icon: CheckCircle2,
          className: 'bg-green-500 hover:bg-green-600 text-white',
          label: 'Present',
        }
      case 'Absent':
        return {
          icon: XCircle,
          className: 'bg-red-500 hover:bg-red-600 text-white',
          label: 'Absent',
        }
      case 'Late':
        return {
          icon: AlertCircle,
          className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          label: 'Late',
        }
      case 'Half Day':
        return {
          icon: Clock,
          className: 'bg-orange-500 hover:bg-orange-600 text-white',
          label: 'Half Day',
        }
      case 'On Leave':
        return {
          icon: Calendar,
          className: 'bg-blue-500 hover:bg-blue-600 text-white',
          label: 'On Leave',
        }
      default:
        return {
          icon: CheckCircle2,
          className: 'bg-gray-500 hover:bg-gray-600 text-white',
          label: status,
        }
    }
  }

  // Calculate stats for selected month
  const stats = useMemo(() => {
    const presentDays = filteredRecords.filter((r) => r.status === 'Present' || r.status === 'Late').length
    const absentDays = filteredRecords.filter((r) => r.status === 'Absent').length
    const totalDays = filteredRecords.length
    const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0
    const totalHours = filteredRecords.reduce((sum, r) => sum + (r.hoursWorked || 0), 0)
    
    // Calculate average check-in and check-out times
    const checkIns = filteredRecords
      .filter((r) => r.checkIn)
      .map((r) => {
        const [hours, minutes] = r.checkIn!.split(':').map(Number)
        return hours * 60 + minutes
      })
    const avgCheckInMinutes = checkIns.length > 0
      ? Math.round(checkIns.reduce((sum, mins) => sum + mins, 0) / checkIns.length)
      : 0
    const avgCheckIn = avgCheckInMinutes > 0
      ? `${Math.floor(avgCheckInMinutes / 60).toString().padStart(2, '0')}:${(avgCheckInMinutes % 60).toString().padStart(2, '0')}`
      : 'N/A'

    const checkOuts = filteredRecords
      .filter((r) => r.checkOut)
      .map((r) => {
        const [hours, minutes] = r.checkOut!.split(':').map(Number)
        return hours * 60 + minutes
      })
    const avgCheckOutMinutes = checkOuts.length > 0
      ? Math.round(checkOuts.reduce((sum, mins) => sum + mins, 0) / checkOuts.length)
      : 0
    const avgCheckOut = avgCheckOutMinutes > 0
      ? `${Math.floor(avgCheckOutMinutes / 60).toString().padStart(2, '0')}:${(avgCheckOutMinutes % 60).toString().padStart(2, '0')}`
      : 'N/A'

    // Calculate overtime (hours over 8 per day)
    const overtime = filteredRecords.reduce((sum, r) => {
      if (r.hoursWorked && r.hoursWorked > 8) {
        return sum + (r.hoursWorked - 8)
      }
      return sum
    }, 0)

    const lateDays = filteredRecords.filter((r) => r.status === 'Late').length

    return {
      attendanceRate,
      daysPresent: presentDays,
      daysAbsent: absentDays,
      totalHours: Math.round(totalHours * 10) / 10,
      avgCheckIn,
      avgCheckOut,
      overtime: Math.round(overtime * 10) / 10,
      lateDays,
    }
  }, [filteredRecords])

  // Generate month options (last 12 months)
  const monthOptions = useMemo(() => {
    const options: string[] = []
    const today = new Date()
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      options.push(format(date, 'yyyy-MM'))
    }
    return options
  }, [])

  const columns: ColumnDef<AttendanceRecord>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('date'))
        return (
          <div className="text-sm">
            {date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        )
      },
    },
    {
      accessorKey: 'day',
      header: 'Day',
      cell: ({ row }) => {
        return (
          <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
            {row.getValue('day')}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'checkIn',
      header: 'Check In',
      cell: ({ row }) => {
        const checkIn = row.getValue('checkIn') as string | null
        return (
          <div className="text-sm">
            {checkIn ? (
              <span className="font-medium">{checkIn}</span>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'checkOut',
      header: 'Check Out',
      cell: ({ row }) => {
        const checkOut = row.getValue('checkOut') as string | null
        return (
          <div className="text-sm">
            {checkOut ? (
              <span className="font-medium">{checkOut}</span>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'hoursWorked',
      header: 'Hours Worked',
      cell: ({ row }) => {
        const hours = row.getValue('hoursWorked') as number | null
        return (
          <div className="text-sm">
            {hours !== null ? (
              <span className="font-medium">{hours.toFixed(1)}h</span>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const config = getStatusConfig(status)
        const Icon = config.icon

        return (
          <Badge className={cn('font-semibold gap-1', config.className)}>
            <Icon className="w-3 h-3" />
            {config.label}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      cell: ({ row }) => {
        const notes = row.getValue('notes') as string | undefined
        return (
          <div className="text-sm text-muted-foreground max-w-xs truncate">
            {notes || '—'}
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                <p className="text-2xl font-bold text-[#05647A]">{stats.attendanceRate}%</p>
              </div>
              <div className="p-3 rounded-lg bg-[#09B0B6]/10">
                <TrendingUp className="w-6 h-6 text-[#09B0B6]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Days Present</p>
                <p className="text-2xl font-bold text-green-600">{stats.daysPresent}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Days Absent</p>
                <p className="text-2xl font-bold text-red-600">{stats.daysAbsent}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-bold text-[#05647A]">{stats.totalHours}h</p>
              </div>
              <div className="p-3 rounded-lg bg-[#09B0B6]/10">
                <Clock className="w-6 h-6 text-[#09B0B6]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Check In</p>
                <p className="text-2xl font-bold text-[#05647A]">{stats.avgCheckIn}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#09B0B6]/10">
                <Clock className="w-6 h-6 text-[#09B0B6]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Check Out</p>
                <p className="text-2xl font-bold text-[#05647A]">{stats.avgCheckOut}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#09B0B6]/10">
                <Clock className="w-6 h-6 text-[#09B0B6]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overtime</p>
                <p className="text-2xl font-bold text-orange-600">{stats.overtime}h</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/10">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Late Days</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.lateDays}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header, Filter, and Download Button */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-lg font-semibold">Attendance History</h3>
          <p className="text-sm text-muted-foreground">
            {filteredRecords.length} record{filteredRecords.length !== 1 ? 's' : ''} for selected month
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px] border-[#09B0B6]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((month) => (
                <SelectItem key={month} value={month}>
                  {format(new Date(month + '-01'), 'MMMM yyyy')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={handleDownloadReport}
            className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6]"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Attendance History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-[#09B0B6]" />
            Attendance Records
          </CardTitle>
          <CardDescription>Daily attendance records for the selected month</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredRecords} />
        </CardContent>
      </Card>
    </div>
  )
}

