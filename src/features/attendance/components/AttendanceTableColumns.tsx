/**
 * AttendanceTableColumns Component
 * Defines table columns for attendance records
 */

import { ColumnDef } from '@tanstack/react-table'
import { Attendance } from '../types'
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
import { cn } from '@/lib/utils'

export const attendanceColumns: ColumnDef<Attendance>[] = [
  {
    accessorKey: 'employeeName',
    header: ({ column }) => <SortableHeader column={column}>Employee Name</SortableHeader>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-[#05647A]">
          {row.getValue('employeeName')}
        </div>
      )
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <SortableHeader column={column}>Date</SortableHeader>,
    cell: ({ row }) => {
      const date = row.getValue('date') as string
      return (
        <div className="text-sm">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short',
          })}
        </div>
      )
    },
  },
  {
    accessorKey: 'clockIn',
    header: ({ column }) => <SortableHeader column={column}>Clock In</SortableHeader>,
    cell: ({ row }) => {
      const clockIn = row.getValue('clockIn') as string | null
      return (
        <div className="text-sm font-medium">
          {clockIn || <span className="text-muted-foreground italic">Not clocked in</span>}
        </div>
      )
    },
  },
  {
    accessorKey: 'clockOut',
    header: ({ column }) => <SortableHeader column={column}>Clock Out</SortableHeader>,
    cell: ({ row }) => {
      const clockOut = row.getValue('clockOut') as string | null
      return (
        <div className="text-sm font-medium">
          {clockOut || <span className="text-muted-foreground italic">Not clocked out</span>}
        </div>
      )
    },
  },
  {
    accessorKey: 'breaks',
    header: ({ column }) => <SortableHeader column={column}>Breaks</SortableHeader>,
    cell: ({ row }) => {
      const breaks = row.getValue('breaks') as Attendance['breaks']
      const totalBreakMinutes = breaks.reduce((sum, b) => sum + b.duration, 0)
      const totalBreakHours = Math.round((totalBreakMinutes / 60) * 10) / 10
      return (
        <div className="text-sm">
          {breaks.length > 0 ? (
            <div className="flex flex-col gap-0.5">
              <span>{breaks.length} break{breaks.length !== 1 ? 's' : ''}</span>
              <span className="text-xs text-muted-foreground">{totalBreakHours}h total</span>
            </div>
          ) : (
            <span className="text-muted-foreground italic">No breaks</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'totalHours',
    header: ({ column }) => <SortableHeader column={column}>Total Hrs</SortableHeader>,
    cell: ({ row }) => {
      const totalHours = row.getValue('totalHours') as number
      return (
        <div className="text-sm font-semibold text-[#09B0B6]">
          {totalHours.toFixed(1)}h
        </div>
      )
    },
  },
  {
    accessorKey: 'overtime',
    header: ({ column }) => <SortableHeader column={column}>Overtime</SortableHeader>,
    cell: ({ row }) => {
      const overtime = row.getValue('overtime') as number
      return (
        <div className="text-sm">
          {overtime > 0 ? (
            <span className="font-medium text-[#63A7D8] dark:text-[#AADCF7]">
              +{overtime.toFixed(1)}h
            </span>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    cell: ({ row }) => {
      const status = row.getValue('status') as Attendance['status']
      const statusConfig = {
        present: {
          label: 'Present',
          className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700',
        },
        absent: {
          label: 'Absent',
          className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700',
        },
        late: {
          label: 'Late',
          className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
        },
        'half-day': {
          label: 'Half Day',
          className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
        },
        'on-leave': {
          label: 'On Leave',
          className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300 dark:border-blue-700',
        },
      }
      const config = statusConfig[status] || statusConfig.present
      return (
        <Badge variant="outline" className={cn('border', config.className)}>
          {config.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'reason',
    header: ({ column }) => <SortableHeader column={column}>Reason / Notes</SortableHeader>,
    cell: ({ row }) => {
      const attendance = row.original
      const text = attendance.reason || attendance.notes || ''
      return (
        <div className="text-sm text-muted-foreground max-w-[200px] truncate" title={text}>
          {text || <span className="italic">—</span>}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const attendance = row.original

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
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit record
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(attendance.id)}
            >
              Copy attendance ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

