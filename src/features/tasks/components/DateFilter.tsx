/**
 * DateFilter Component
 * Filter tasks by date range
 */

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Calendar } from 'lucide-react'
import { DateFilter as DateFilterType, Task } from '../types'
import { filterByDateRange } from '@/lib/date-utils'

interface DateFilterProps {
  value: DateFilterType
  onChange: (filter: DateFilterType) => void
}

export function DateFilter({ value, onChange }: DateFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="date-filter" className="text-sm font-medium flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        Filter by:
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="date-filter" className="w-[180px]">
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tasks</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="this-week">This Week</SelectItem>
          <SelectItem value="this-month">This Month</SelectItem>
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

/**
 * Filter tasks based on date filter
 */
export function filterTasksByDate(tasks: Task[], filter: DateFilterType): Task[] {
  return filterByDateRange(tasks, (task) => task.dueDate, filter)
}

