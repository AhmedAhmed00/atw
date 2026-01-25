/**
 * ShiftsTable Component
 * Displays shifts in a table format with sortable columns
 */

import { ColumnDef } from '@tanstack/react-table'
import { Shift } from '../types'
import { SortableHeader } from '@/components/shared/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Eye, Pencil } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/shared/table'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export const shiftsColumns: ColumnDef<Shift>[] = [
  {
    accessorKey: 'id',
    header: 'Shift ID',
    cell: ({ row }) => {
      const shiftId = row.original.id
      return (
        <Link
          to={`/shifts/${shiftId}`}
          className="font-medium text-[#05647A] hover:text-[#09B0B6] hover:underline transition-colors"
        >
          {shiftId.toUpperCase()}
        </Link>
      )
    },
  },
  {
    accessorKey: 'shiftType',
    header: ({ column }) => <SortableHeader column={column}>Shift Type</SortableHeader>,
    cell: ({ row }) => {
      const shiftType = row.getValue('shiftType') as string
      return (
        <Badge
          variant={shiftType === 'open' ? 'default' : 'secondary'}
          className={cn(
            shiftType === 'open'
              ? 'bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700'
          )}
        >
          {shiftType === 'open' ? 'Open' : 'Closed'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'shiftDate',
    header: ({ column }) => <SortableHeader column={column}>Shift Date</SortableHeader>,
    cell: ({ row }) => {
      const date = row.getValue('shiftDate') as string
      return (
        <div className="text-sm">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      )
    },
  },
  {
    accessorKey: 'startTime',
    header: ({ column }) => <SortableHeader column={column}>Start Time</SortableHeader>,
    cell: ({ row }) => {
      return <div className="text-sm font-medium">{row.getValue('startTime')}</div>
    },
  },
  {
    accessorKey: 'endTime',
    header: ({ column }) => <SortableHeader column={column}>End Time</SortableHeader>,
    cell: ({ row }) => {
      return <div className="text-sm font-medium">{row.getValue('endTime')}</div>
    },
  },
  {
    accessorKey: 'workLocation',
    header: ({ column }) => <SortableHeader column={column}>Work Location</SortableHeader>,
    cell: ({ row }) => {
      return <div className="text-sm text-muted-foreground">{row.getValue('workLocation')}</div>
    },
  },
  {
    accessorKey: 'vehicleTypes',
    header: ({ column }) => <SortableHeader column={column}>Vehicle Types</SortableHeader>,
    cell: ({ row }) => {
      const vehicleTypes = row.getValue('vehicleTypes') as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {vehicleTypes && vehicleTypes.length > 0 ? (
            vehicleTypes.map((vt, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {vt}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">None</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'roleRequirements',
    header: ({ column }) => <SortableHeader column={column}>Roles Required</SortableHeader>,
    cell: ({ row }) => {
      const roleRequirements = row.getValue('roleRequirements') as Array<{
        role: string
        quantity: number
      }>
      return (
        <div className="flex flex-wrap gap-1">
          {roleRequirements?.map((req, idx) => (
            <Badge key={idx} variant="outline" className="text-xs border-[#09B0B6] text-[#05647A]">
              {req.quantity}x {req.role}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusConfig = {
        draft: {
          label: 'Draft',
          className: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
        },
        published: {
          label: 'Published',
          className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        },
        filled: {
          label: 'Filled',
          className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        },
        completed: {
          label: 'Completed',
          className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        },
        cancelled: {
          label: 'Cancelled',
          className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        },
      }
      const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
      return (
        <Badge variant="outline" className={cn('border', config.className)}>
          {config.label}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const shift = row.original

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
              <Link to={`/shifts/${shift.id}`} className="flex items-center">
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(shift.id)}
            >
              Copy shift ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface ShiftsTableProps {
  shifts: Shift[]
}

export function ShiftsTable({ shifts }: ShiftsTableProps) {
  return <DataTable columns={shiftsColumns} data={shifts} />
}

