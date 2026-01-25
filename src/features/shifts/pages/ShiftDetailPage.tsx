/**
 * Shift Detail Page
 * Displays comprehensive information about a specific shift
 */

import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import { 
  ArrowLeft, 
  Bell, 
  Download, 
  Edit, 
  X, 
  Send,
  MapPin,
  User,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { mockShiftDetails } from '../data/mockShiftDetails'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface Trip {
  id: string
  tripId: string
  patient: string
  pickupLocation: string
  dropoffLocation: string
  scheduledTime: string
  status: 'Completed' | 'En Route' | 'Pending' | 'Delayed'
  driver: string
  vehicle: string
}

interface TeamMember {
  id: string
  name: string
  role: string
  status: 'active' | 'on-break' | 'off-duty'
}

interface Comment {
  id: string
  author: string
  authorRole: string
  timestamp: string
  content: string
}

export function ShiftDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const shiftDetail = id ? mockShiftDetails[id] : null

  if (!shiftDetail) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Shift Not Found</h2>
          <p className="text-muted-foreground">The shift you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/shifts')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shifts
          </Button>
        </div>
      </div>
    )
  }

  const handleNotify = () => {
    // TODO: Implement notification logic
    console.log('Notify clicked')
  }

  const handleExport = () => {
    // TODO: Implement export logic
    console.log('Export clicked')
  }

  const handleEdit = () => {
    navigate(`/shifts/${id}/edit`)
  }

  const handleCancel = () => {
    // TODO: Implement cancel shift logic
    console.log('Cancel clicked')
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // TODO: Add comment to shift detail
    setNewComment('')
    setIsSubmitting(false)
  }

  // Trip Logistics Table Columns
  const tripColumns: ColumnDef<Trip>[] = [
    {
      accessorKey: 'tripId',
      header: 'Trip ID',
      cell: ({ row }) => (
        <span className="font-medium text-[#05647A]">{row.getValue('tripId')}</span>
      ),
    },
    {
      accessorKey: 'patient',
      header: 'Patient',
    },
    {
      accessorKey: 'pickupLocation',
      header: 'Pickup Location',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{row.getValue('pickupLocation')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'dropoffLocation',
      header: 'Dropoff Location',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{row.getValue('dropoffLocation')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'scheduledTime',
      header: 'Scheduled Time',
      cell: ({ row }) => {
        const time = new Date(row.getValue('scheduledTime'))
        return (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {format(time, 'MMM dd, yyyy HH:mm')}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const statusConfig = {
          'Completed': { variant: 'default' as const, className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700' },
          'En Route': { variant: 'default' as const, className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300 dark:border-blue-700' },
          'Pending': { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700' },
          'Delayed': { variant: 'destructive' as const, className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700' },
        }
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Pending
        return (
          <Badge variant={config.variant} className={config.className}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'driver',
      header: 'Driver',
    },
    {
      accessorKey: 'vehicle',
      header: 'Vehicle',
    },
  ]

  // Assigned Team Table Columns
  const teamColumns: ColumnDef<TeamMember>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-[#09B0B6] text-white text-xs">
              {row.original.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.getValue('name')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const statusConfig = {
          'active': { 
            label: 'Active', 
            className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700',
            icon: CheckCircle2
          },
          'on-break': { 
            label: 'On Break', 
            className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
            icon: Clock
          },
          'off-duty': { 
            label: 'Off Duty', 
            className: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-300 dark:border-gray-700',
            icon: X
          },
        }
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
        const Icon = config.icon
        return (
          <Badge variant="outline" className={cn('flex items-center gap-1', config.className)}>
            <Icon className="h-3 w-3" />
            {config.label}
          </Badge>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/shifts')}
              className="border-[#09B0B6] text-[#09B0B6] hover:bg-[#09B0B6] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-[#103454] dark:text-white">
                Shift Details
              </h1>
              <p className="text-muted-foreground mt-1">
                {shiftDetail.shiftId} • {shiftDetail.location}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleNotify}
            className="gap-2"
          >
            <Bell className="h-4 w-4" />
            Notify
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
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
            onClick={handleCancel}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
        </div>
      </div>

      {/* Shift Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Shift ID</CardDescription>
            <CardTitle className="text-lg">{shiftDetail.shiftId}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Location</CardDescription>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#09B0B6]" />
              {shiftDetail.location}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Supervisor</CardDescription>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-4 w-4 text-[#09B0B6]" />
              {shiftDetail.supervisor.name}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Team Size</CardDescription>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4 text-[#09B0B6]" />
              {shiftDetail.team.length} Members
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Trip Logistics */}
      <Card>
        <CardHeader>
          <CardTitle>Trip Logistics</CardTitle>
          <CardDescription>
            Trips assigned to this shift
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={tripColumns} data={shiftDetail.trips} />
        </CardContent>
      </Card>

      {/* Assigned Team */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Team</CardTitle>
          <CardDescription>
            Team members working on this shift
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={teamColumns} data={shiftDetail.team} />
        </CardContent>
      </Card>

      {/* Operational Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Operational Feed</CardTitle>
          <CardDescription>
            Comments and updates for this shift
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Comments List */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {shiftDetail.comments.map((comment) => (
              <div key={comment.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#09B0B6] text-white text-xs">
                      {comment.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <Badge variant="outline" className="text-xs">
                        {comment.authorRole}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(comment.timestamp), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="space-y-2 pt-4 border-t">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim() || isSubmitting}
                className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Post Comment
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ShiftDetailPage

