/**
 * TasksPage Component
 * Main tasks management page with stats, filters, and table
 */

import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { CheckSquare, Plus } from 'lucide-react'
import { TasksStatsCards, TasksTable, DateFilter, SortSelector, filterTasksByDate } from './components'
import { mockTasks } from './data/mockData'
import { DateFilter as DateFilterType, SortOption } from './types'
import { sortByPriorityThenDate, sortByDate, sortByPriority, sortByStatus } from '@/lib/sort-utils'

export function TasksPage() {
  const navigate = useNavigate()
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
        return sortByPriorityThenDate(tasks, (t) => t.priority, (t) => t.dueDate)
      }
      
      case 'date': {
        return sortByDate(tasks, (t) => t.dueDate, 'asc')
      }
      
      case 'priority': {
        return sortByPriority(tasks, (t) => t.priority)
      }
      
      case 'status': {
        return sortByStatus(tasks, (t) => t.status)
      }
      
      default:
        return tasks
    }
  }, [filteredTasks, sortOption])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="Tasks Management"
          description="Track and manage all tasks, responses, maintenance, and alerts"
          icon={CheckSquare}
        />
        <Button
          onClick={() => navigate('/tasks/new')}
          className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

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
