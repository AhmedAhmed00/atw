/**
 * VehiclesPage Component
 * Page for managing fleet vehicles
 */

import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Car, Plus, Upload, Download, Printer, MoreVertical, Eye, Edit, Trash2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { VehicleStatsCards } from '../components/VehicleStatsCards'
import { FleetActivityProgress } from '../components/FleetActivityProgress'
import { VehicleClassChart } from '../components/VehicleClassChart'
import { VehicleLocationChart } from '../components/VehicleLocationChart'
import { StatusDistributionChart } from '../components/StatusDistributionChart'
import { VehicleViewToggle, VehicleViewMode } from '../components/VehicleViewToggle'
import { LiveFleetTracking } from '../components/LiveFleetTracking'
import {
  vehicles,
  vehicleStats,
  fleetActivity,
  byVehicleClass,
  byLocation,
  statusDistribution,
  Vehicle,
} from '../data/mockVehiclesData'

export function VehiclesPage() {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Maintenance'>('all')
  const [viewMode, setViewMode] = useState<VehicleViewMode>('table')

  // Filter vehicles by status
  const filteredVehicles = useMemo(() => {
    if (statusFilter === 'all') {
      return vehicles
    }
    return vehicles.filter((v) => v.status === statusFilter)
  }, [statusFilter])

  const handleAddVehicle = () => {
    navigate('/fleet/vehicles/new')
  }

  const handleImport = () => {
    // TODO: Implement import functionality
    console.log('Import vehicles')
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export vehicles')
  }

  const handlePrint = () => {
    // Print the current page/table
    window.print()
  }

  const handleView = (vehicleId: string) => {
    // TODO: Navigate to vehicle detail page
    console.log('View vehicle:', vehicleId)
  }

  const handleEdit = (vehicleId: string) => {
    // TODO: Navigate to edit vehicle page
    console.log('Edit vehicle:', vehicleId)
  }

  const handleDelete = (vehicleId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete vehicle:', vehicleId)
  }

  const vehicleColumns: ColumnDef<Vehicle>[] = [
    {
      accessorKey: 'vehicleId',
      header: 'Vehicle ID',
      cell: ({ row }) => (
        <div className="font-medium text-[#05647A]">{row.getValue('vehicleId')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const statusConfig: Record<string, { className: string }> = {
          Active: { className: 'bg-green-500 hover:bg-green-600' },
          Maintenance: { className: 'bg-yellow-500 hover:bg-yellow-600' },
          Inactive: { className: 'bg-gray-500 hover:bg-gray-600' },
          'On the Move': { className: 'bg-blue-500 hover:bg-blue-600' },
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
      accessorKey: 'model',
      header: 'Model',
      cell: ({ row }) => {
        const vehicle = row.original
        return `${vehicle.make} ${vehicle.model}`
      },
    },
    {
      accessorKey: 'class',
      header: 'Class',
      cell: ({ row }) => {
        const vehicleClass = row.getValue('class') as string
        return (
          <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
            {vehicleClass}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'baseLocation',
      header: 'Base Location',
    },
    {
      accessorKey: 'alerts',
      header: 'Alerts',
      cell: ({ row }) => {
        const alerts = row.getValue('alerts') as number
        if (alerts === 0) {
          return <span className="text-muted-foreground">—</span>
        }
        return (
          <div className="flex items-center gap-1">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="font-semibold text-red-500">{alerts}</span>
          </div>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const vehicle = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleView(vehicle.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(vehicle.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(vehicle.id)}
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
          title="Vehicles"
          description="Fleet vehicles management"
          icon={Car}
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
            onClick={handleAddVehicle}
            className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <VehicleStatsCards stats={vehicleStats} />

      {/* Fleet Activity Progress */}
      <FleetActivityProgress activity={{ ...fleetActivity, totalFleet: vehicleStats.totalFleet }} />

      {/* Charts Section */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <VehicleClassChart data={byVehicleClass} />
        <VehicleLocationChart data={byLocation} />
      </div>

      {/* Status Distribution Chart */}
      <StatusDistributionChart data={statusDistribution} />

      {/* Filters and View Toggle */}
      <div className="flex items-center justify-between gap-4">
        <Tabs value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
          <TabsList className="bg-muted">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Active">Active</TabsTrigger>
            <TabsTrigger value="Maintenance">Maintenance</TabsTrigger>
          </TabsList>
        </Tabs>
        <VehicleViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      {/* Table or Map View */}
      {viewMode === 'table' ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
              Vehicles
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {filteredVehicles.length} vehicle(s) {statusFilter !== 'all' ? `(${statusFilter})` : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={vehicleColumns} data={filteredVehicles} />
          </CardContent>
        </Card>
      ) : (
        <LiveFleetTracking vehicles={filteredVehicles} />
      )}
    </div>
  )
}

export default VehiclesPage

