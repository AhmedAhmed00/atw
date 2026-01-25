/**
 * SwapRequestsTable Component
 * Displays swap requests in a table format
 */

import { ColumnDef } from '@tanstack/react-table'
import { SwapRequest } from '../types'
import { SortableHeader } from '@/components/shared/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Eye } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/shared/table'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export const swapRequestsColumns: ColumnDef<SwapRequest>[] = [
  {
    accessorKey: 'employeeName',
    header: ({ column }) => <SortableHeader column={column}>Employee Name</SortableHeader>,
    cell: ({ row }) => {
      const employeeName = row.getValue('employeeName') as string
      const initials = employeeName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-linear-to-br from-[#09B0B6] to-[#05647A] text-white text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium text-[#05647A]">{employeeName}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'currentShiftTime',
    header: ({ column }) => <SortableHeader column={column}>Current Shift</SortableHeader>,
    cell: ({ row }) => {
      const request = row.original
      return (
        <div className="text-sm">
          <div>{new Date(request.currentShiftDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}</div>
          <div className="text-muted-foreground">{request.currentShiftTime}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'proposedDate',
    header: ({ column }) => <SortableHeader column={column}>Proposed Shift Date</SortableHeader>,
    cell: ({ row }) => {
      const date = row.getValue('proposedDate') as string
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
    accessorKey: 'proposedStartTime',
    header: ({ column }) => <SortableHeader column={column}>Proposed Time</SortableHeader>,
    cell: ({ row }) => {
      const request = row.original
      return (
        <div className="text-sm font-medium">
          {request.proposedStartTime} - {request.proposedEndTime}
        </div>
      )
    },
  },
  {
    accessorKey: 'reason',
    header: ({ column }) => <SortableHeader column={column}>Reason</SortableHeader>,
    cell: ({ row }) => {
      const reason = row.getValue('reason') as string
      return (
        <div className="max-w-md text-sm text-muted-foreground truncate" title={reason}>
          {reason}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Request Status</SortableHeader>,
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusConfig = {
        pending: {
          label: 'Pending',
          className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
        },
        approved: {
          label: 'Approved',
          className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700',
        },
        rejected: {
          label: 'Rejected',
          className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700',
        },
      }
      const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
      return (
        <Badge variant="outline" className={cn('border', config.className)}>
          {config.label}
        </Badge>
      )
    },
  },
  {
    id: 'statistics',
    header: 'Statistics',
    cell: () => {
      // This would typically come from aggregated data
      // For now, showing a placeholder
      return (
        <div className="text-sm text-muted-foreground">
          Total swaps: N/A
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: () => {
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
              View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface SwapRequestsTableProps {
  swapRequests: SwapRequest[]
}

export function SwapRequestsTable({ swapRequests }: SwapRequestsTableProps) {
  return <DataTable columns={swapRequestsColumns} data={swapRequests} />
}

