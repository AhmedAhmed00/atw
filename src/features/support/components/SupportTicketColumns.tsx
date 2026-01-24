/**
 * Support Ticket Table Columns
 */

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { SupportTicket } from '../types'
import { TICKET_STATUS_CONFIG, TICKET_TYPE_CONFIG } from '../types'
import { cn } from '@/lib/utils'

export const supportTicketColumns: ColumnDef<SupportTicket>[] = [
  {
    accessorKey: 'ticketNumber',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-transparent px-0"
        >
          Ticket Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <span className="font-mono font-medium text-[rgb(var(--brand-primary))]">
          {row.getValue('ticketNumber')}
        </span>
      )
    },
  },
  {
    accessorKey: 'subject',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-transparent px-0"
        >
          Subject
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const ticket = row.original
      return (
        <div className="max-w-[300px]">
          <p className="font-medium truncate">{ticket.subject}</p>
          <p className="text-xs text-muted-foreground truncate">
            {ticket.clientName}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: 'ticketType',
    header: 'Type',
    cell: ({ row }) => {
      const ticketType = row.getValue('ticketType') as SupportTicket['ticketType']
      const config = TICKET_TYPE_CONFIG[ticketType]
      return (
        <Badge className={cn('font-medium', config.bgColor, config.color)}>
          {config.label}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as SupportTicket['status']
      const config = TICKET_STATUS_CONFIG[status]
      return (
        <Badge
          className={cn(
            'font-medium border',
            config.bgColor,
            config.color,
            config.borderColor
          )}
        >
          {config.label}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-transparent px-0"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return (
        <div className="text-sm">
          <p>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          <p className="text-xs text-muted-foreground">
            {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const ticket = row.original
      return (
        <Link to={`/support/details/${ticket.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="border-[rgb(var(--brand-primary))] text-[rgb(var(--brand-primary))] hover:bg-[rgb(var(--brand-primary))]/10"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
      )
    },
  },
]

