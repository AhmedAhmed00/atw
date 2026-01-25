/**
 * EmployeeShifts Component
 * Shifts tab content for Employee Detail Page
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, FileText } from 'lucide-react'
import { Employee } from '../types'
import { cn } from '@/lib/utils'

interface EmployeeShiftsProps {
  employee: Employee
}

interface Shift {
  id: string
  date: string
  startTime: string
  endTime: string
  dispatcher: string
  description: string
  status: 'completed' | 'upcoming' | 'cancelled'
  shiftType?: string
}

// Mock shifts data - in real app, this would come from API
const getShiftsData = (employee: Employee): Shift[] => {
  const shifts: Shift[] = []
  const dispatchers = ['Ahmed Mohamed', 'Fatima Ali', 'Mohamed Hassan', 'Sara Ibrahim']
  const descriptions = [
    'Day shift - Emergency response team',
    'Night shift - Critical care transport',
    'Day shift - Routine patient transport',
    'Evening shift - Scheduled appointments',
    'Day shift - Hospital transfers',
    'Night shift - Emergency dispatch',
  ]

  // Generate shifts for the past and upcoming weeks
  for (let i = -14; i <= 14; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)

    // Skip weekends for some variety
    if (Math.random() > 0.3) {
      const shiftTypes = ['Day Shift', 'Night Shift', 'Evening Shift']
      const shiftType = shiftTypes[Math.floor(Math.random() * shiftTypes.length)]
      
      let startTime = '08:00'
      let endTime = '16:00'
      
      if (shiftType === 'Night Shift') {
        startTime = '22:00'
        endTime = '06:00'
      } else if (shiftType === 'Evening Shift') {
        startTime = '14:00'
        endTime = '22:00'
      }

      const status = i < 0 ? 'completed' : i === 0 ? 'upcoming' : 'upcoming'
      
      shifts.push({
        id: `shift-${employee.id}-${i}`,
        date: date.toISOString().split('T')[0],
        startTime,
        endTime,
        dispatcher: dispatchers[Math.floor(Math.random() * dispatchers.length)],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        status,
        shiftType,
      })
    }
  }

  return shifts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function EmployeeShifts({ employee }: EmployeeShiftsProps) {
  const shifts = getShiftsData(employee)

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          className: 'bg-green-500 hover:bg-green-600 text-white',
          label: 'Completed',
        }
      case 'upcoming':
        return {
          className: 'bg-blue-500 hover:bg-blue-600 text-white',
          label: 'Upcoming',
        }
      case 'cancelled':
        return {
          className: 'bg-red-500 hover:bg-red-600 text-white',
          label: 'Cancelled',
        }
      default:
        return {
          className: 'bg-gray-500 hover:bg-gray-600 text-white',
          label: status,
        }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    })
  }

  const completedShifts = shifts.filter((s) => s.status === 'completed').length
  const upcomingShifts = shifts.filter((s) => s.status === 'upcoming').length

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Shifts</p>
                <p className="text-2xl font-bold text-[#05647A]">{shifts.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#09B0B6]/10">
                <Calendar className="w-6 h-6 text-[#09B0B6]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedShifts}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold text-blue-600">{upcomingShifts}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shifts Cards */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">All Shifts</h3>
          <p className="text-sm text-muted-foreground">
            {shifts.length} shift{shifts.length !== 1 ? 's' : ''} scheduled
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shifts.map((shift) => {
            const statusConfig = getStatusConfig(shift.status)
            const isPast = new Date(shift.date) < new Date()
            const isToday = new Date(shift.date).toDateString() === new Date().toDateString()

            return (
              <Card
                key={shift.id}
                className={cn(
                  'hover:shadow-lg transition-all',
                  isToday && 'border-2 border-[#09B0B6]',
                  shift.status === 'cancelled' && 'opacity-60'
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-[#09B0B6]" />
                        <span className="font-semibold text-foreground">{formatDate(shift.date)}</span>
                        {isToday && (
                          <Badge variant="outline" className="border-[#09B0B6] text-[#09B0B6] text-xs">
                            Today
                          </Badge>
                        )}
                      </div>
                      {shift.shiftType && (
                        <Badge variant="outline" className="border-[#09B0B6] text-[#05647A] text-xs">
                          {shift.shiftType}
                        </Badge>
                      )}
                    </div>
                    <Badge className={cn('font-semibold text-xs', statusConfig.className)}>
                      {statusConfig.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Time */}
                  <div className="flex items-center gap-2 text-sm">
                    <div className="p-1.5 rounded bg-[#09B0B6]/10">
                      <Clock className="w-3.5 h-3.5 text-[#09B0B6]" />
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{shift.startTime}</span>
                      <span className="text-muted-foreground mx-1">-</span>
                      <span className="font-medium text-foreground">{shift.endTime}</span>
                    </div>
                  </div>

                  {/* Dispatcher */}
                  <div className="flex items-center gap-2 text-sm">
                    <div className="p-1.5 rounded bg-[#09B0B6]/10">
                      <User className="w-3.5 h-3.5 text-[#09B0B6]" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Dispatcher: </span>
                      <span className="font-medium text-foreground">{shift.dispatcher}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex items-start gap-2 text-sm pt-2 border-t">
                    <div className="p-1.5 rounded bg-[#09B0B6]/10 shrink-0 mt-0.5">
                      <FileText className="w-3.5 h-3.5 text-[#09B0B6]" />
                    </div>
                    <p className="text-sm text-muted-foreground">{shift.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {shifts.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-sm text-muted-foreground">No shifts scheduled for this employee</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

