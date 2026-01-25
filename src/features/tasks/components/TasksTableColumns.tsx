/**
 * TasksTableColumns Component
 * Defines columns for the tasks table
 */

import { ColumnDef } from '@tanstack/react-table'
import { Task, TaskStatus, TaskPriority, TaskCategory } from '../types'
import { SortableHeader } from '@/components/shared/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Eye } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { PRIORITY_ORDER } from '@/lib/sort-utils'
import { Link } from 'react-router-dom'

const statusConfig: Record<TaskStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className?: string }> = {
  pending: {
    label: 'Pending',
    variant: 'outline',
    className: 'border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-400',
  },
  'in-progress': {
    label: 'In Progress',
    variant: 'default',
    className: 'bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white',
  },
  completed: {
    label: 'Completed',
    variant: 'secondary',
    className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700',
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'outline',
    className: 'border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400',
  },
  overdue: {
    label: 'Overdue',
    variant: 'destructive',
  },
}

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  low: {
    label: 'Low',
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300 dark:border-blue-700',
  },
  medium: {
    label: 'Medium',
    className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
  },
  high: {
    label: 'High',
    className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-300 dark:border-orange-700',
  },
  critical: {
    label: 'Critical',
    className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700',
  },
}

const categoryConfig: Record<TaskCategory, { label: string }> = {
  'active-response': { label: 'Active Response' },
  'vehicle-maintenance': { label: 'Vehicle Maintenance' },
  shift: { label: 'Shift' },
  alert: { label: 'Alert' },
  other: { label: 'Other' },
}

export const tasksColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'id',
    header: 'Task ID',
    cell: ({ row }) => {
      const taskId = row.original.id
      return (
        <Link
          to={`/tasks/${taskId}`}
          className="font-medium text-[#05647A] hover:text-[#09B0B6] hover:underline transition-colors text-sm"
        >
          {taskId.toUpperCase()}
        </Link>
      )
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableHeader column={column}>Task</SortableHeader>,
    cell: ({ row }) => {
      const task = row.original
      return (
        <Link
          to={`/tasks/${task.id}`}
          className="flex flex-col hover:text-[#09B0B6] transition-colors"
        >
          <span className="font-medium text-sm">{task.title}</span>
          {task.description && (
            <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {task.description}
            </span>
          )}
        </Link>
      )
    },
  },
  {
    accessorKey: 'assignedCrew',
    header: 'Assigned Crew',
    cell: ({ row }) => {
      const crew = row.getValue('assignedCrew') as string[]
      return (
        <div className="flex flex-col gap-1">
          {crew.map((member, idx) => (
            <span key={idx} className="text-sm">
              {member}
            </span>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => <SortableHeader column={column}>Due / Shift</SortableHeader>,
    cell: ({ row }) => {
      const task = row.original
      const dueDate = new Date(task.dueDate)
      const shiftDate = task.shiftDate ? new Date(task.shiftDate) : null
      
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm">
            {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-xs text-muted-foreground">
            {dueDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
          {shiftDate && (
            <span className="text-xs text-muted-foreground mt-1">
              Shift: {shiftDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original.dueDate).getTime()
      const dateB = new Date(rowB.original.dueDate).getTime()
      return dateA - dateB
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    cell: ({ row }) => {
      const status = row.getValue('status') as TaskStatus
      const config = statusConfig[status]
      return (
        <Badge variant={config.variant} className={cn('text-xs', config.className)}>
          {config.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => <SortableHeader column={column}>Priority</SortableHeader>,
    cell: ({ row }) => {
      const priority = row.getValue('priority') as TaskPriority
      const config = priorityConfig[priority]
      return (
        <Badge variant="outline" className={cn('text-xs', config.className)}>
          {config.label}
        </Badge>
      )
    },
    sortingFn: (rowA, rowB) => {
      const priorityA = PRIORITY_ORDER[rowA.original.priority] ?? 999
      const priorityB = PRIORITY_ORDER[rowB.original.priority] ?? 999
      return priorityA - priorityB
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <SortableHeader column={column}>Category</SortableHeader>,
    cell: ({ row }) => {
      const category = row.getValue('category') as TaskCategory
      const config = categoryConfig[category]
      return <span className="text-sm">{config.label}</span>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const task = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link to={`/tasks/${task.id}`} className="flex items-center">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log('Edit task:', task.id)}>
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Delete task:', task.id)}>
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

