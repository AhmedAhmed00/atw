/**
 * EmployeeTasks Component
 * Tasks tab content for Employee Detail Page
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import { Plus, MoreVertical, Eye, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Employee } from '../types'
import { cn } from '@/lib/utils'

interface EmployeeTasksProps {
  employee: Employee
}

interface Task {
  id: string
  task: string
  category: string
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed'
  assignedEmployee?: string
  relatedEmployee?: string
}

// Mock tasks data - in real app, this would come from API
const getTasksData = (employee: Employee): Task[] => {
  const categories = ['Training', 'Documentation', 'Maintenance', 'Review', 'Follow-up']
  const priorities: Task['priority'][] = ['Low', 'Medium', 'High', 'Urgent']
  const statuses: Task['status'][] = ['pending', 'in-progress', 'completed']

  return [
    {
      id: 'task-1',
      task: 'Complete ACLS Recertification',
      category: 'Training',
      priority: 'High',
      dueDate: '2024-02-15',
      status: 'in-progress',
      assignedEmployee: employee.name,
    },
    {
      id: 'task-2',
      task: 'Update patient care documentation',
      category: 'Documentation',
      priority: 'Medium',
      dueDate: '2024-01-25',
      status: 'pending',
      assignedEmployee: employee.name,
    },
    {
      id: 'task-3',
      task: 'Vehicle inspection and maintenance',
      category: 'Maintenance',
      priority: 'Urgent',
      dueDate: '2024-01-20',
      status: 'completed',
      assignedEmployee: employee.name,
    },
    {
      id: 'task-4',
      task: 'Review quarterly performance metrics',
      category: 'Review',
      priority: 'Low',
      dueDate: '2024-02-01',
      status: 'pending',
      assignedEmployee: employee.name,
    },
    {
      id: 'task-5',
      task: 'Follow up with patient feedback',
      category: 'Follow-up',
      priority: 'Medium',
      dueDate: '2024-01-22',
      status: 'in-progress',
      assignedEmployee: employee.name,
    },
  ]
}

export function EmployeeTasks({ employee }: EmployeeTasksProps) {
  const navigate = useNavigate()
  const [tasks] = useState<Task[]>(getTasksData(employee))

  const handleAddTask = () => {
    navigate(`/employees/${employee.id}/tasks/new`)
  }

  const handleView = (task: Task) => {
    // TODO: Open view task dialog
    console.log('View task:', task.id)
  }

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return {
          className: 'bg-red-500 hover:bg-red-600 text-white',
          label: 'Urgent',
        }
      case 'High':
        return {
          className: 'bg-orange-500 hover:bg-orange-600 text-white',
          label: 'High',
        }
      case 'Medium':
        return {
          className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          label: 'Medium',
        }
      case 'Low':
        return {
          className: 'bg-blue-500 hover:bg-blue-600 text-white',
          label: 'Low',
        }
      default:
        return {
          className: 'bg-gray-500 hover:bg-gray-600 text-white',
          label: priority,
        }
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle2,
          className: 'bg-green-500 hover:bg-green-600 text-white',
          label: 'Completed',
        }
      case 'in-progress':
        return {
          icon: Clock,
          className: 'bg-blue-500 hover:bg-blue-600 text-white',
          label: 'In Progress',
        }
      case 'pending':
        return {
          icon: AlertCircle,
          className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          label: 'Pending',
        }
      default:
        return {
          icon: AlertCircle,
          className: 'bg-gray-500 hover:bg-gray-600 text-white',
          label: status,
        }
    }
  }

  const pendingTasks = tasks.filter((t) => t.status === 'pending').length
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length
  const completedTasks = tasks.filter((t) => t.status === 'completed').length

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: 'task',
      header: 'Task',
      cell: ({ row }) => {
        return <div className="font-medium text-[#05647A]">{row.getValue('task')}</div>
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        const category = row.getValue('category') as string
        return (
          <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
            {category}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => {
        const priority = row.getValue('priority') as string
        const config = getPriorityConfig(priority)
        return (
          <Badge className={cn('font-semibold', config.className)}>
            {config.label}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'dueDate',
      header: 'Due Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('dueDate'))
        const isOverdue = date < new Date() && row.original.status !== 'completed'
        return (
          <div className="text-sm">
            <div className={cn(isOverdue && 'text-red-600 font-medium')}>
              {date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            {isOverdue && (
              <span className="text-xs text-red-600">Overdue</span>
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
      id: 'actions',
      cell: ({ row }) => {
        const task = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleView(task)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingTasks}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{inProgressTasks}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header and Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">All Tasks</h3>
          <p className="text-sm text-muted-foreground">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} assigned
          </p>
        </div>
        <Button
          onClick={handleAddTask}
          className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add New Task
        </Button>
      </div>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#09B0B6]" />
            Tasks List
          </CardTitle>
          <CardDescription>All tasks assigned to this employee</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={tasks} />
        </CardContent>
      </Card>
    </div>
  )
}

