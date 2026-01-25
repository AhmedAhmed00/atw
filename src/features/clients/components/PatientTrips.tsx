/**
 * PatientTrips Component
 * Displays patient trips with stats cards and table
 */

import { 
  ClipboardList, 
  CheckCircle2, 
  Clock,
  MapPin,
  Stethoscope,
  User,
  Truck,
  DollarSign
} from 'lucide-react'
import { SectionCard } from '@/components/shared/SectionCard'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/shared/table'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { TRIP_STATUS_CONFIG } from '@/utils/statusConfigs'
import { ColumnDef } from '@tanstack/react-table'
import { SortableHeader } from '@/components/shared/table'
import { cn } from '@/lib/utils'

export interface PatientTrip {
  id: string
  patient: string
  dateTime: string
  route: string
  service: string
  driver: string
  vehicle: string
  amount: number
  status: 'Completed' | 'Scheduled' | 'In Progress' | 'Cancelled'
}

interface PatientTripsProps {
  patientId: string
  patientName: string
}

// Mock data generator
function generatePatientTrips(patientId: string, patientName: string): {
  stats: {
    totalTrips: number
    completed: number
    scheduled: number
  }
  trips: PatientTrip[]
} {
  const totalTrips = Math.floor(Math.random() * 50) + 20
  const completed = Math.floor(totalTrips * 0.75)
  const scheduled = totalTrips - completed - Math.floor(Math.random() * 5)

  const services = ['Dialysis', 'Cancer Treatment', 'Physical Therapy', 'General Consultation', 'Emergency Transport']
  const drivers = ['Ahmed Mohamed', 'Fatima Ali', 'Mohamed Hassan', 'Sara Ibrahim', 'Omar Youssef']
  const vehicles = ['AMB-001', 'AMB-002', 'AMB-003', 'AMB-004', 'AMB-005']
  const routes = [
    'Home → Cairo University Hospital',
    'Home → Alexandria Medical Center',
    'Home → Mansoura General Hospital',
    'Home → Aswan Medical Complex',
    'Home → Port Said General Hospital',
  ]

  const trips: PatientTrip[] = Array.from({ length: totalTrips }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 90))
    const hours = Math.floor(Math.random() * 12) + 8
    const minutes = Math.floor(Math.random() * 4) * 15
    const dateTime = new Date(date.setHours(hours, minutes, 0))

    const statuses: PatientTrip['status'][] = ['Completed', 'Scheduled', 'In Progress', 'Cancelled']
    const status = i < completed 
      ? 'Completed' 
      : i < completed + scheduled 
      ? 'Scheduled' 
      : statuses[Math.floor(Math.random() * statuses.length)]

    return {
      id: `trip-${patientId}-${i + 1}`,
      patient: patientName,
      dateTime: dateTime.toISOString(),
      route: routes[Math.floor(Math.random() * routes.length)],
      service: services[Math.floor(Math.random() * services.length)],
      driver: drivers[Math.floor(Math.random() * drivers.length)],
      vehicle: vehicles[Math.floor(Math.random() * vehicles.length)],
      amount: Math.floor(Math.random() * 200) + 50,
      status,
    }
  }).sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())

  return {
    stats: {
      totalTrips,
      completed,
      scheduled,
    },
    trips,
  }
}

const tripColumns: ColumnDef<PatientTrip>[] = [
  {
    accessorKey: 'patient',
    header: ({ column }) => <SortableHeader column={column}>Patient</SortableHeader>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-[#05647A]">
          {row.getValue('patient')}
        </div>
      )
    },
  },
  {
    accessorKey: 'dateTime',
    header: ({ column }) => <SortableHeader column={column}>Date & Time</SortableHeader>,
    cell: ({ row }) => {
      const dateTime = new Date(row.getValue('dateTime'))
      return (
        <div className="space-y-0.5">
          <div className="text-sm font-medium">
            {dateTime.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          <div className="text-xs text-muted-foreground">
            {dateTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'route',
    header: ({ column }) => <SortableHeader column={column}>Route</SortableHeader>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="text-muted-foreground">{row.getValue('route')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'service',
    header: ({ column }) => <SortableHeader column={column}>Service</SortableHeader>,
    cell: ({ row }) => {
      const service = row.getValue('service') as string
      return (
        <Badge variant="outline" className="border-[#09B0B6] text-[#05647A] dark:text-[#09B0B6]">
          <Stethoscope className="w-3 h-3 mr-1" />
          {service}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'driver',
    header: ({ column }) => <SortableHeader column={column}>Driver</SortableHeader>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-sm">
          <User className="w-3.5 h-3.5 text-muted-foreground" />
          <span>{row.getValue('driver')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'vehicle',
    header: ({ column }) => <SortableHeader column={column}>Vehicle</SortableHeader>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-sm font-mono">
          <Truck className="w-3.5 h-3.5 text-muted-foreground" />
          <span>{row.getValue('vehicle')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <SortableHeader column={column}>Amount</SortableHeader>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return <div className="font-semibold text-[#09B0B6]">{formatted}</div>
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
          cell: ({ row }) => {
            const status = row.getValue('status') as string
            return <StatusBadge status={status} config={TRIP_STATUS_CONFIG} />
          },
  },
]

export function PatientTrips({ patientId, patientName }: PatientTripsProps) {
  const { stats, trips } = generatePatientTrips(patientId, patientName)

  const summaryCards: StatsCardProps[] = [
    {
      title: 'Total Trips',
      value: stats.totalTrips.toString(),
      icon: ClipboardList,
      colorVariant: 'primary',
    },
    {
      title: 'Completed',
      value: stats.completed.toString(),
      icon: CheckCircle2,
      colorVariant: 'success',
    },
    {
      title: 'Scheduled',
      value: stats.scheduled.toString(),
      icon: Clock,
      colorVariant: 'info',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCardGrid 
        cards={summaryCards} 
        columns={{ default: 1, sm: 2, lg: 3 }} 
      />

      {/* Trips Table */}
      <SectionCard title="Trips History" icon={ClipboardList}>
        <DataTable columns={tripColumns} data={trips} />
      </SectionCard>
    </div>
  )
}

