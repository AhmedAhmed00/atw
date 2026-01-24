/**
 * TasksPage Component
 * Main tasks management page with stats, filters, and table
 */

import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { CheckSquare } from 'lucide-react'
import { TasksStatsCards, TasksTable, DateFilter, SortSelector, filterTasksByDate } from './components'
import { mockTasks } from './data/mockData'
import { DateFilter as DateFilterType, SortOption, Task } from './types'

export function TasksPage() {
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all')
  const [sortOption, setSortOption] = useState<SortOption>('urgency')

  // Filter tasks by date
  const filteredTasks = useMemo(() => {
    return filterTasksByDate(mockTasks, dateFilter)
  }, [dateFilter])

  // Sort tasks
  const sortedTasks = useMemo(() => {
    const tasks = [...filteredTasks]
    
    switch (sortOption) {
      case 'urgency': {
        // Sort by priority (critical first) then by due date
        const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }
        return tasks.sort((a, b) => {
          const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
          if (priorityDiff !== 0) return priorityDiff
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        })
      }
      
      case 'date': {
        return tasks.sort((a, b) => {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        })
      }
      
      case 'priority': {
        const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }
        return tasks.sort((a, b) => {
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        })
      }
      
      case 'status': {
        const statusOrder: Record<string, number> = { 
          'in-progress': 0, 
          'pending': 1, 
          'overdue': 2, 
          'completed': 3, 
          'cancelled': 4 
        }
        return tasks.sort((a, b) => {
          return statusOrder[a.status] - statusOrder[b.status]
        })
      }
      
      default:
        return tasks
    }
  }, [filteredTasks, sortOption])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks Management"
        description="Track and manage all tasks, responses, maintenance, and alerts"
        icon={CheckSquare}
      />

      {/* Stats Cards */}
      <TasksStatsCards tasks={mockTasks} />

      {/* Tasks Table */}
      <TasksTable 
        tasks={sortedTasks}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
    </div>
  )
}

export default TasksPage
