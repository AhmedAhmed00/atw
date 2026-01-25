/**
 * Task Detail Page
 * Displays comprehensive information about a specific task
 */

import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Edit, 
  Trash2,
  CheckCircle2,
  Clock,
  User,
  Calendar,
  AlertCircle,
  FileText,
  Tag,
  Users,
  MapPin
} from 'lucide-react'
import { mockTasks } from '../data/mockData'
import { Task, TaskStatus, TaskPriority, TaskCategory } from '../types'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

const statusConfig: Record<TaskStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className?: string; icon: typeof CheckCircle2 }> = {
  pending: {
    label: 'Pending',
    variant: 'outline',
    className: 'border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-400',
    icon: Clock,
  },
  'in-progress': {
    label: 'In Progress',
    variant: 'default',
    className: 'bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white',
    icon: Clock,
  },
  completed: {
    label: 'Completed',
    variant: 'secondary',
    className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'outline',
    className: 'border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400',
    icon: AlertCircle,
  },
  overdue: {
    label: 'Overdue',
    variant: 'destructive',
    icon: AlertCircle,
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

const categoryConfig: Record<TaskCategory, { label: string; icon: typeof FileText }> = {
  'active-response': { label: 'Active Response', icon: AlertCircle },
  'vehicle-maintenance': { label: 'Vehicle Maintenance', icon: FileText },
  shift: { label: 'Shift', icon: Clock },
  alert: { label: 'Alert', icon: AlertCircle },
  other: { label: 'Other', icon: FileText },
}

export function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const task = id ? mockTasks.find(t => t.id === id) : null

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Task Not Found</h2>
          <p className="text-muted-foreground">The task you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/tasks')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tasks
          </Button>
        </div>
      </div>
    )
  }

  const statusInfo = statusConfig[task.status]
  const StatusIcon = statusInfo.icon
  const priorityInfo = priorityConfig[task.priority]
  const categoryInfo = categoryConfig[task.category]
  const CategoryIcon = categoryInfo.icon

  const handleEdit = () => {
    navigate(`/tasks/${id}/edit`)
  }

  const handleDelete = () => {
    // TODO: Implement delete logic
    console.log('Delete task:', id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/tasks')}
              className="border-[#09B0B6] text-[#09B0B6] hover:bg-[#09B0B6] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-[#103454] dark:text-white">
                {task.title}
              </h1>
              <p className="text-muted-foreground mt-1">
                Task ID: {task.id.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleEdit}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Status and Priority Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Status</CardDescription>
            <CardTitle className="text-lg">
              <Badge variant={statusInfo.variant} className={cn('flex items-center gap-2', statusInfo.className)}>
                <StatusIcon className="h-4 w-4" />
                {statusInfo.label}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Priority</CardDescription>
            <CardTitle className="text-lg">
              <Badge variant="outline" className={cn('flex items-center gap-2', priorityInfo.className)}>
                <AlertCircle className="h-4 w-4" />
                {priorityInfo.label}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Category</CardDescription>
            <CardTitle className="text-lg flex items-center gap-2">
              <CategoryIcon className="h-4 w-4 text-[#09B0B6]" />
              {categoryInfo.label}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          {task.description && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#09B0B6]" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{task.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Assigned Crew */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#09B0B6]" />
                Assigned Crew
              </CardTitle>
              <CardDescription>
                Team members assigned to this task
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {task.assignedCrew.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#09B0B6] text-white">
                        {member.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{member}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          {/* Task Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#09B0B6]" />
                Task Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Task ID</span>
                  <span className="text-sm font-medium">{task.id.toUpperCase()}</span>
                </div>
                <Separator />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Due Date
                  </span>
                  <span className="text-sm font-medium">
                    {format(new Date(task.dueDate), 'MMM dd, yyyy HH:mm')}
                  </span>
                </div>
                <Separator />
              </div>

              {task.shiftDate && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Shift Date
                    </span>
                    <span className="text-sm font-medium">
                      {format(new Date(task.shiftDate), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <Separator />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Created At</span>
                  <span className="text-sm font-medium">
                    {format(new Date(task.createdAt), 'MMM dd, yyyy HH:mm')}
                  </span>
                </div>
                <Separator />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <span className="text-sm font-medium">
                    {format(new Date(task.updatedAt), 'MMM dd, yyyy HH:mm')}
                  </span>
                </div>
                {task.completedAt && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Completed At
                      </span>
                      <span className="text-sm font-medium">
                        {format(new Date(task.completedAt), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {task.status !== 'completed' && task.status !== 'cancelled' && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    // TODO: Implement status change
                    console.log('Mark as completed')
                  }}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Mark as Completed
                </Button>
              )}
              {task.status === 'pending' && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    // TODO: Implement start task
                    console.log('Start task')
                  }}
                >
                  <Clock className="h-4 w-4" />
                  Start Task
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4" />
                Edit Task
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailPage

