import { ColumnDef } from '@tanstack/react-table'
import { Patient } from '../data/mockPatientsData'
import { SortableHeader } from '@/components/shared/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { PATIENT_STATUS_CONFIG } from '@/utils/statusConfigs'
import { Link } from 'react-router'
import { Eye, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const patientColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column}>Patient</SortableHeader>,
    cell: ({ row }) => {
      const patient = row.original
      return (
        <Link
          to={`/clients/patients/${patient.id}`}
          className="font-medium text-[#05647A] hover:underline"
        >
          {row.getValue('name')}
        </Link>
      )
    },
  },
  {
    accessorKey: 'nationalId',
    header: ({ column }) => <SortableHeader column={column}>National ID</SortableHeader>,
    cell: ({ row }) => {
      return <div className="text-muted-foreground font-mono text-sm">{row.getValue('nationalId')}</div>
    },
  },
  {
    accessorKey: 'condition',
    header: ({ column }) => <SortableHeader column={column}>Condition</SortableHeader>,
    cell: ({ row }) => {
      const condition = row.getValue('condition') as string
      return (
        <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
          {condition}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'region',
    header: ({ column }) => <SortableHeader column={column}>Region</SortableHeader>,
    cell: ({ row }) => {
      return <div className="text-muted-foreground">{row.getValue('region')}</div>
    },
  },
  {
    accessorKey: 'trips',
    header: ({ column }) => <SortableHeader column={column}>Trips</SortableHeader>,
    cell: ({ row }) => {
      const trips = row.getValue('trips') as number
      return <div className="font-semibold">{trips.toLocaleString()}</div>
    },
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => <SortableHeader column={column}>Balance</SortableHeader>,
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue('balance'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(balance)
      return <div className="font-semibold text-[#09B0B6]">{formatted}</div>
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
          cell: ({ row }) => {
            const status = row.getValue('status') as string
            return <StatusBadge status={status} config={PATIENT_STATUS_CONFIG} />
          },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const patient = row.original

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
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/clients/patients/${patient.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

