/**
 * EmployeeTrips Component
 * Trips tab content for Employee Detail Page
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import { Download, Route, CheckCircle2, MapPin, Clock, Truck } from 'lucide-react'
import { Employee } from '../types'
import { cn } from '@/lib/utils'

interface EmployeeTripsProps {
  employee: Employee
}

interface Trip {
  id: string
  tripId: string
  dateTime: string
  route: string
  vehicle: string
  distance: number // in miles
  duration: number // in minutes
  status: 'Completed' | 'In Progress' | 'Cancelled' | 'Scheduled'
}

// Mock trips data - in real app, this would come from API
const getTripsData = (employee: Employee): Trip[] => {
  const routes = [
    'Cairo → Alexandria',
    'Cairo → Giza',
    'Alexandria → Cairo',
    'Giza → Cairo',
    'Cairo → Mansoura',
    'Cairo → Port Said',
  ]
  const vehicles = ['AMB-001', 'AMB-002', 'AMB-003', 'AMB-004', 'AMB-005']
  const statuses: Trip['status'][] = ['Completed', 'In Progress', 'Cancelled', 'Scheduled']

  const trips: Trip[] = []

  // Generate trips for the past 30 days
  for (let i = 0; i < 25; i++) {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))
    const hours = Math.floor(Math.random() * 24)
    const minutes = Math.floor(Math.random() * 4) * 15
    const dateTime = new Date(date.setHours(hours, minutes, 0))

    const status = i < 20 ? 'Completed' : statuses[Math.floor(Math.random() * statuses.length)]
    const distance = Math.floor(Math.random() * 200) + 10 // 10-210 miles
    const duration = Math.floor(Math.random() * 180) + 30 // 30-210 minutes

    trips.push({
      id: `trip-${employee.id}-${i}`,
      tripId: `TRP-${String(i + 1).padStart(6, '0')}`,
      dateTime: dateTime.toISOString(),
      route: routes[Math.floor(Math.random() * routes.length)],
      vehicle: vehicles[Math.floor(Math.random() * vehicles.length)],
      distance,
      duration,
      status,
    })
  }

  return trips.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
}

export function EmployeeTrips({ employee }: EmployeeTripsProps) {
  const [trips] = useState<Trip[]>(getTripsData(employee))

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export trips data')
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Completed':
        return {
          className: 'bg-green-500 hover:bg-green-600 text-white',
          label: 'Completed',
        }
      case 'In Progress':
        return {
          className: 'bg-blue-500 hover:bg-blue-600 text-white',
          label: 'In Progress',
        }
      case 'Scheduled':
        return {
          className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          label: 'Scheduled',
        }
      case 'Cancelled':
        return {
          className: 'bg-red-500 hover:bg-red-600 text-white',
          label: 'Cancelled',
        }
      default:
        return {
          className: 'bg-gray-500 hover:bg-gray-600 text-white',
          label: status,
        }
    }
  }

  // Calculate stats
  const totalTrips = trips.length
  const completedTrips = trips.filter((t) => t.status === 'Completed').length
  const totalMiles = trips.reduce((sum, trip) => sum + trip.distance, 0)
  const totalDuration = trips.reduce((sum, trip) => sum + trip.duration, 0)
  const avgResponseTime = totalTrips > 0 ? Math.round(totalDuration / totalTrips) : 0

  const columns: ColumnDef<Trip>[] = [
    {
      accessorKey: 'tripId',
      header: 'Trip ID',
      cell: ({ row }) => {
        return <div className="font-medium text-[#05647A]">{row.getValue('tripId')}</div>
      },
    },
    {
      accessorKey: 'dateTime',
      header: 'Date & Time',
      cell: ({ row }) => {
        const dateTime = new Date(row.getValue('dateTime'))
        return (
          <div className="text-sm">
            <div className="font-medium">
              {dateTime.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <div className="text-xs text-muted-foreground">
              {dateTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'route',
      header: 'Route',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#09B0B6]" />
            <span className="text-sm">{row.getValue('route')}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'vehicle',
      header: 'Vehicle',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{row.getValue('vehicle')}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'distance',
      header: 'Distance',
      cell: ({ row }) => {
        const distance = row.getValue('distance') as number
        return <div className="text-sm">{distance.toFixed(1)} mi</div>
      },
    },
    {
      accessorKey: 'duration',
      header: 'Duration',
      cell: ({ row }) => {
        const duration = row.getValue('duration') as number
        const hours = Math.floor(duration / 60)
        const minutes = duration % 60
        return (
          <div className="text-sm">
            {hours > 0 ? `${hours}h ` : ''}
            {minutes}m
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
        return (
          <Badge className={cn('font-semibold', config.className)}>
            {config.label}
          </Badge>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Trips</p>
                <p className="text-2xl font-bold text-[#05647A]">{totalTrips}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#09B0B6]/10">
                <Route className="w-6 h-6 text-[#09B0B6]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedTrips}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Miles Driven</p>
                <p className="text-2xl font-bold text-[#05647A]">{totalMiles.toFixed(0)}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#09B0B6]/10">
                <MapPin className="w-6 h-6 text-[#09B0B6]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-[#05647A]">{avgResponseTime}m</p>
              </div>
              <div className="p-3 rounded-lg bg-[#09B0B6]/10">
                <Clock className="w-6 h-6 text-[#09B0B6]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header and Export Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">All Trips</h3>
          <p className="text-sm text-muted-foreground">
            {totalTrips} trip{totalTrips !== 1 ? 's' : ''} recorded
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleExport}
          className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6]"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Trips Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Route className="w-4 h-4 text-[#09B0B6]" />
            Trips List
          </CardTitle>
          <CardDescription>All trips assigned to or completed by this employee</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={trips} />
        </CardContent>
      </Card>
    </div>
  )
}

