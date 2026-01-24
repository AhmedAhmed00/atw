import { ColumnDef } from '@tanstack/react-table'
import { Service } from '../types'
import { SortableHeader } from '@/components/shared/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const serviceColumns: ColumnDef<Service>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column}>Service Name</SortableHeader>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-[#05647A]">
          {row.getValue('name')}
        </div>
      )
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <SortableHeader column={column}>Category</SortableHeader>,
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
          {row.getValue('category')}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'provider',
    header: ({ column }) => <SortableHeader column={column}>Provider</SortableHeader>,
    cell: ({ row }) => {
      return <div className="text-muted-foreground">{row.getValue('provider')}</div>
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <SortableHeader column={column}>Price</SortableHeader>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)
      return <div className="font-semibold text-[#09B0B6]">{formatted}</div>
    },
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => <SortableHeader column={column}>Duration</SortableHeader>,
    cell: ({ row }) => {
      const duration = row.getValue('duration') as number
      return <div>{duration} min</div>
    },
  },
  {
    accessorKey: 'bookings',
    header: ({ column }) => <SortableHeader column={column}>Bookings</SortableHeader>,
    cell: ({ row }) => {
      const bookings = row.getValue('bookings') as number
      return (
        <div className="font-medium">
          {bookings.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge
          variant={
            status === 'active'
              ? 'default'
              : status === 'inactive'
              ? 'secondary'
              : 'outline'
          }
          className={
            status === 'active'
              ? 'bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white'
              : ''
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const service = row.original

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
              onClick={() => navigator.clipboard.writeText(service.id)}
            >
              Copy service ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit service
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete service
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

