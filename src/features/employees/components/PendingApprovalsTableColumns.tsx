import { ColumnDef } from '@tanstack/react-table'
import { PendingApproval } from '../types'
import { SortableHeader } from '@/components/shared/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, CheckCircle2, XCircle, FileSearch } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { NavigateFunction } from 'react-router-dom'

const requestTypeLabels: Record<PendingApproval['requestType'], string> = {
  'leave': 'Leave Request',
  'certification': 'Certification',
  'shift-change': 'Shift Change',
  'department-transfer': 'Department Transfer',
}

interface PendingApprovalsColumnsProps {
  navigate: NavigateFunction
  onReject?: (approval: PendingApproval) => void
}

export const getPendingApprovalsColumns = ({ navigate, onReject }: PendingApprovalsColumnsProps): ColumnDef<PendingApproval>[] => [
  {
    accessorKey: 'employeeName',
    header: ({ column }) => <SortableHeader column={column}>Employee</SortableHeader>,
    cell: ({ row }) => {
      const approval = row.original
      const initials = approval.employeeName
        .split(' ')
        .map(n => n[0])
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
          <div>
            <div className="font-medium text-[#05647A]">{approval.employeeName}</div>
            <div className="text-xs text-muted-foreground">{approval.jobTitle}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'requestType',
    header: ({ column }) => <SortableHeader column={column}>Request Type</SortableHeader>,
    cell: ({ row }) => {
      const requestType = row.getValue('requestType') as PendingApproval['requestType']
      return (
        <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
          {requestTypeLabels[requestType]}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    cell: ({ row }) => {
      const approval = row.original
      const status = row.getValue('status') as PendingApproval['status']
      
      const statusConfig = {
        'pending': {
          label: 'Pending',
          variant: 'secondary' as const,
          className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700 cursor-pointer hover:opacity-80 transition-opacity',
        },
        'approved': {
          label: 'Approved',
          variant: 'default' as const,
          className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700',
        },
        'rejected': {
          label: 'Rejected',
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700',
        },
      }
      
      const config = statusConfig[status]
      
      const handleAccept = () => {
        // TODO: Implement accept logic
        console.log('Accept:', approval.id)
      }

      const handleReject = () => {
        // This will be handled by the parent component via callback
        if (onReject) {
          onReject(approval)
        }
      }
      
      // If status is pending, make it clickable with dropdown
      if (status === 'pending') {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge variant={config.variant} className={cn('border', config.className)}>
                {config.label}
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleAccept} className="text-green-600">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Accept
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleReject} className="text-red-600">
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
      
      // For approved/rejected, just show the badge
      return (
        <Badge variant={config.variant} className={cn('border', config.className)}>
          {config.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'details',
    header: ({ column }) => <SortableHeader column={column}>Details</SortableHeader>,
    cell: ({ row }) => {
      const details = row.getValue('details') as string
      return (
        <div className="max-w-md text-sm text-muted-foreground">
          {details}
        </div>
      )
    },
  },
  {
    accessorKey: 'submittedDate',
    header: ({ column }) => <SortableHeader column={column}>Submitted</SortableHeader>,
    cell: ({ row }) => {
      const date = row.getValue('submittedDate') as string
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
    id: 'actions',
    cell: ({ row }) => {
      const approval = row.original

      const handleReview = () => {
        navigate(`/employees/pending-approvals/${approval.id}/review`)
      }

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(approval.id)}
            >
              Copy approval ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleReview}>
              <FileSearch className="mr-2 h-4 w-4" />
              Review
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Default export for backward compatibility (will be deprecated)
export const pendingApprovalsColumns = getPendingApprovalsColumns

