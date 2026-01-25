/**
 * PeriodFilter Component
 * Filter attendance records by time period
 */

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Calendar } from 'lucide-react'
import { Attendance } from '../types'
import { filterByDateRange, type DateFilterType } from '@/lib/date-utils'

export type PeriodFilter = 'today' | 'yesterday' | 'this-week' | 'last-week' | 'this-month' | 'last-month' | 'custom' | 'all'

interface PeriodFilterProps {
  value: PeriodFilter
  onChange: (period: PeriodFilter) => void
}

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="period-filter" className="text-sm font-medium flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        Period:
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="period-filter" className="w-[180px]">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="yesterday">Yesterday</SelectItem>
          <SelectItem value="this-week">This Week</SelectItem>
          <SelectItem value="last-week">Last Week</SelectItem>
          <SelectItem value="this-month">This Month</SelectItem>
          <SelectItem value="last-month">Last Month</SelectItem>
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

/**
 * Filter attendance records based on period
 */
export function filterAttendanceByPeriod(
  attendance: Attendance[],
  period: PeriodFilter
): Attendance[] {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  // Handle special cases that aren't in the generic filter
  switch (period) {
    case 'yesterday': {
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]
      return attendance.filter(a => a.date === yesterdayStr)
    }
    
    case 'last-week': {
      const startOfLastWeek = new Date(today)
      startOfLastWeek.setDate(today.getDate() - today.getDay() - 7)
      const endOfLastWeek = new Date(startOfLastWeek)
      endOfLastWeek.setDate(startOfLastWeek.getDate() + 6)
      return attendance.filter(a => {
        const recordDate = new Date(a.date)
        return recordDate >= startOfLastWeek && recordDate <= endOfLastWeek
      })
    }
    
    case 'last-month': {
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      return attendance.filter(a => {
        const recordDate = new Date(a.date)
        return recordDate >= startOfLastMonth && recordDate <= endOfLastMonth
      })
    }
    
    default:
      return filterByDateRange(attendance, (a) => a.date, period as DateFilterType)
  }
}

