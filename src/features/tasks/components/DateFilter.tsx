/**
 * DateFilter Component
 * Filter tasks by date range
 */

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Calendar } from 'lucide-react'
import { DateFilter as DateFilterType, Task } from '../types'

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
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  switch (filter) {
    case 'today': {
      const todayStr = today.toISOString().split('T')[0]
      return tasks.filter(t => {
        const dueDate = new Date(t.dueDate).toISOString().split('T')[0]
        return dueDate === todayStr
      })
    }
    
    case 'this-week': {
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay()) // Sunday
      return tasks.filter(t => {
        const dueDate = new Date(t.dueDate)
        return dueDate >= startOfWeek && dueDate <= now
      })
    }
    
    case 'this-month': {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      return tasks.filter(t => {
        const dueDate = new Date(t.dueDate)
        return dueDate >= startOfMonth && dueDate <= now
      })
    }
    
    case 'custom':
      // For custom, return all - would need date picker implementation
      return tasks
      
    case 'all':
    default:
      return tasks
  }
}

