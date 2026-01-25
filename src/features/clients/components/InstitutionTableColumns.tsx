import { ColumnDef } from '@tanstack/react-table'
import { Institution } from '../data/mockInstitutionsData'
import { SortableHeader } from '@/components/shared/table'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'

export const institutionColumns: ColumnDef<Institution>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column}>Institution</SortableHeader>,
    cell: ({ row }) => {
      const institution = row.original
      return (
        <Link
          to={`/clients/institutions/${institution.id}`}
          className="font-medium text-[#05647A] hover:underline"
        >
          {row.getValue('name')}
        </Link>
      )
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <SortableHeader column={column}>Type</SortableHeader>,
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return (
        <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
          {type}
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
      const statusVariants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', className?: string }> = {
        'Good Standing': { variant: 'default', className: 'bg-green-500 hover:bg-green-600' },
        'Active': { variant: 'default', className: 'bg-blue-500 hover:bg-blue-600' },
        'Suspended': { variant: 'secondary', className: 'bg-yellow-500 hover:bg-yellow-600' },
        'Outstanding Debt': { variant: 'destructive' },
      }
      const variant = statusVariants[status] || { variant: 'outline' }
      return (
        <Badge
          variant={variant.variant}
          className={cn(variant.className)}
        >
          {status}
        </Badge>
      )
    },
  },
]

