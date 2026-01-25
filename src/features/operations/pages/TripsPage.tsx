/**
 * TripsPage Component
 * Real-time tracking and management for patient trips
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Route, Plus, Upload, Download, Printer, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TripStatsCards } from '../components/TripStatsCards'
import { TripViewToggle, TripViewMode } from '../components/TripViewToggle'
import { TripsMapView } from '../components/TripsMapView'
import { trips, tripStats, Trip } from '../data/mockTripsData'

export function TripsPage() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<TripViewMode>('table')

  const handleAddTrip = () => {
    navigate('/operations/trips/new')
  }

  const handleImport = () => {
    // TODO: Implement import functionality
    console.log('Import trips')
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export trips')
  }

  const handlePrint = () => {
    window.print()
  }

  const handleView = (tripId: string) => {
    // TODO: Navigate to trip detail page
    console.log('View trip:', tripId)
  }

  const handleEdit = (tripId: string) => {
    // TODO: Navigate to edit trip page
    console.log('Edit trip:', tripId)
  }

  const handleDelete = (tripId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete trip:', tripId)
  }

  const tripColumns: ColumnDef<Trip>[] = [
    {
      accessorKey: 'tripId',
      header: 'Trip ID',
      cell: ({ row }) => (
        <div className="font-medium text-[#05647A]">{row.getValue('tripId')}</div>
      ),
    },
    {
      accessorKey: 'patient',
      header: 'Patient',
      cell: ({ row }) => {
        const trip = row.original
        return (
          <div>
            <div className="font-medium">{trip.patient}</div>
            <div className="text-xs text-muted-foreground">{trip.patientId}</div>
          </div>
        )
      },
    },
    {
      id: 'pickupDropoff',
      header: 'Pickup / Dropoff',
      cell: ({ row }) => {
        const trip = row.original
        return (
          <div className="space-y-1">
            <div className="text-sm">
              <span className="text-muted-foreground">From: </span>
              <span className="font-medium">{trip.pickupLocation}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">To: </span>
              <span className="font-medium">{trip.dropoffLocation}</span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'service',
      header: 'Service',
      cell: ({ row }) => {
        const service = row.getValue('service') as string
        return (
          <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
            {service}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const statusConfig: Record<string, { className: string }> = {
          Completed: { className: 'bg-green-500 hover:bg-green-600' },
          'En Route': { className: 'bg-blue-500 hover:bg-blue-600' },
          Pending: { className: 'bg-yellow-500 hover:bg-yellow-600' },
          Delayed: { className: 'bg-red-500 hover:bg-red-600' },
        }
        const config = statusConfig[status] || { className: '' }
        return (
          <Badge variant="default" className={config.className}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => {
        const priority = row.getValue('priority') as string
        const priorityConfig: Record<string, { className: string }> = {
          Routine: { className: 'bg-gray-500 hover:bg-gray-600' },
          Urgent: { className: 'bg-orange-500 hover:bg-orange-600' },
          Emergency: { className: 'bg-red-500 hover:bg-red-600' },
        }
        const config = priorityConfig[priority] || { className: '' }
        return (
          <Badge variant="default" className={config.className}>
            {priority}
          </Badge>
        )
      },
    },
    {
      id: 'driverVehicle',
      header: 'Driver / Vehicle',
      cell: ({ row }) => {
        const trip = row.original
        return (
          <div className="space-y-1">
            <div className="text-sm font-medium">{trip.driver}</div>
            <div className="text-xs text-muted-foreground">{trip.vehicle}</div>
          </div>
        )
      },
    },
    {
      accessorKey: 'duration',
      header: 'Duration',
      cell: ({ row }) => (
        <div className="font-semibold">{row.getValue('duration')}</div>
      ),
    },
    {
      accessorKey: 'approval',
      header: 'Approval',
      cell: ({ row }) => {
        const approval = row.getValue('approval') as string
        const approvalConfig: Record<string, { className: string }> = {
          Approved: { className: 'bg-green-500 hover:bg-green-600' },
          Pending: { className: 'bg-yellow-500 hover:bg-yellow-600' },
          Rejected: { className: 'bg-red-500 hover:bg-red-600' },
        }
        const config = approvalConfig[approval] || { className: '' }
        return (
          <Badge variant="default" className={config.className}>
            {approval}
          </Badge>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const trip = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleView(trip.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(trip.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(trip.id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Trips Management"
          description="Real-time tracking and management for patient trips"
          icon={Route}
        />
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <Button
            variant="outline"
            onClick={handleImport}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Import
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
            onClick={handlePrint}
            className="gap-2"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            onClick={handleAddTrip}
            className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Trip
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <TripStatsCards stats={tripStats} />

      {/* View Toggle */}
      <div className="flex items-center justify-end">
        <TripViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      {/* Table or Map View */}
      {viewMode === 'table' ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
              Trips
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Complete list of all trips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={tripColumns} data={trips} />
          </CardContent>
        </Card>
      ) : (
        <TripsMapView trips={trips} />
      )}
    </div>
  )
}

export default TripsPage

