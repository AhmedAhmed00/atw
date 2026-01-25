/**
 * EmployeeAvailability Component
 * Availability tab content for Employee Detail Page
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import { Employee } from '../types'
import { cn } from '@/lib/utils'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'

interface EmployeeAvailabilityProps {
  employee: Employee
}

interface AvailabilityDay {
  date: Date
  status: 'available' | 'unavailable' | 'partial' | 'busy'
  notes?: string
}

// Mock availability data - in real app, this would come from API
const getAvailabilityData = (employee: Employee): AvailabilityDay[] => {
  const availability: AvailabilityDay[] = []
  const today = new Date()
  const startDate = startOfMonth(today)
  const endDate = endOfMonth(addMonths(today, 2)) // Show 3 months

  const days = eachDayOfInterval({ start: startDate, end: endDate })

  days.forEach((day) => {
    const dayOfWeek = day.getDay()
    const random = Math.random()

    let status: 'available' | 'unavailable' | 'partial' | 'busy' = 'available'

    // Weekends might be less available
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      if (random > 0.4) {
        status = 'unavailable'
      } else if (random > 0.2) {
        status = 'partial'
      }
    } else {
      // Weekdays
      if (random > 0.85) {
        status = 'unavailable'
      } else if (random > 0.7) {
        status = 'partial'
      } else if (random > 0.5) {
        status = 'busy'
      }
    }

    availability.push({
      date: day,
      status,
      notes: status === 'partial' ? 'Available after 2 PM' : status === 'busy' ? 'Limited availability' : undefined,
    })
  })

  return availability
}

export function EmployeeAvailability({ employee }: EmployeeAvailabilityProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const availability = getAvailabilityData(employee)

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          icon: CheckCircle2,
          className: 'bg-green-500 hover:bg-green-600 text-white',
          label: 'Available',
          dotColor: 'bg-green-500',
        }
      case 'unavailable':
        return {
          icon: XCircle,
          className: 'bg-red-500 hover:bg-red-600 text-white',
          label: 'Unavailable',
          dotColor: 'bg-red-500',
        }
      case 'partial':
        return {
          icon: AlertCircle,
          className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          label: 'Partial',
          dotColor: 'bg-yellow-500',
        }
      case 'busy':
        return {
          icon: Clock,
          className: 'bg-blue-500 hover:bg-blue-600 text-white',
          label: 'Busy',
          dotColor: 'bg-blue-500',
        }
      default:
        return {
          icon: CheckCircle2,
          className: 'bg-gray-500 hover:bg-gray-600 text-white',
          label: status,
          dotColor: 'bg-gray-500',
        }
    }
  }

  const getDayAvailability = (date: Date) => {
    return availability.find((a) => isSameDay(a.date, date))
  }

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  // Get days for current month view
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get first day of week for the month
  const firstDayOfWeek = monthStart.getDay()
  const daysBeforeMonth = Array.from({ length: firstDayOfWeek }, (_, i) => {
    const date = new Date(monthStart)
    date.setDate(date.getDate() - (firstDayOfWeek - i))
    return date
  })

  // Get days after month to fill the grid
  const lastDayOfWeek = monthEnd.getDay()
  const daysAfterMonth = Array.from({ length: 6 - lastDayOfWeek }, (_, i) => {
    const date = new Date(monthEnd)
    date.setDate(date.getDate() + (i + 1))
    return date
  })

  const allDays = [...daysBeforeMonth, ...monthDays, ...daysAfterMonth]

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Availability Calendar</h3>
          <p className="text-sm text-muted-foreground">
            View and manage employee availability schedule
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={previousMonth}
            className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10"
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextMonth}
            className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Big Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-between">
            <span>{format(currentMonth, 'MMMM yyyy')}</span>
          </CardTitle>
          <CardDescription>Employee availability for the selected month</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="w-full">
            {/* Week Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="p-3 text-center text-sm font-semibold text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {allDays.map((day, index) => {
                const dayAvailability = getDayAvailability(day)
                const isCurrentMonth = isSameMonth(day, currentMonth)
                const isToday = isSameDay(day, new Date())
                const statusConfig = dayAvailability ? getStatusConfig(dayAvailability.status) : null

                return (
                  <div
                    key={index}
                    className={cn(
                      'min-h-[100px] p-2 border rounded-lg transition-all hover:shadow-md',
                      !isCurrentMonth && 'opacity-40 bg-muted/30',
                      isToday && 'border-2 border-[#09B0B6] bg-[#09B0B6]/5',
                      dayAvailability && statusConfig && 'cursor-pointer hover:bg-muted/50'
                    )}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span
                        className={cn(
                          'text-sm font-medium',
                          isToday && 'text-[#09B0B6] font-bold',
                          !isCurrentMonth && 'text-muted-foreground'
                        )}
                      >
                        {format(day, 'd')}
                      </span>
                      {dayAvailability && statusConfig && (
                        <div
                          className={cn(
                            'w-2 h-2 rounded-full',
                            statusConfig.dotColor
                          )}
                          title={statusConfig.label}
                        />
                      )}
                    </div>
                    {dayAvailability && (
                      <div className="mt-1 space-y-1">
                        <Badge
                          variant="outline"
                          className={cn(
                            'text-xs w-full justify-center',
                            dayAvailability.status === 'available' &&
                              'border-green-500 text-green-600',
                            dayAvailability.status === 'unavailable' &&
                              'border-red-500 text-red-600',
                            dayAvailability.status === 'partial' &&
                              'border-yellow-500 text-yellow-600',
                            dayAvailability.status === 'busy' &&
                              'border-blue-500 text-blue-600'
                          )}
                        >
                          {statusConfig?.label}
                        </Badge>
                        {dayAvailability.notes && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {dayAvailability.notes}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['available', 'unavailable', 'partial', 'busy'] as const).map((status) => {
              const config = getStatusConfig(status)
              const Icon = config.icon
              return (
                <div key={status} className="flex items-center gap-2">
                  <div className={cn('w-3 h-3 rounded-full', config.dotColor)} />
                  <div className="flex items-center gap-1">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{config.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

