import { ColumnDef } from '@tanstack/react-table'
import { Employee } from '../types'
import { SortableHeader } from '@/components/shared/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import { cn } from '@/lib/utils'

export const employeeColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column}>Employee</SortableHeader>,
    cell: ({ row }) => {
      const employee = row.original
      const initials = employee.name
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
            <div className="font-medium text-[#05647A]">{employee.name}</div>
            <div className="text-xs text-muted-foreground">{employee.email}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'jobTitle',
    header: ({ column }) => <SortableHeader column={column}>Job Title</SortableHeader>,
    cell: ({ row }) => {
      return <div className="text-muted-foreground">{row.getValue('jobTitle')}</div>
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusConfig = {
        'active': {
          label: 'Active',
          variant: 'default' as const,
          className: 'bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white',
        },
        'on-leave': {
          label: 'On Leave',
          variant: 'secondary' as const,
          className: 'bg-[#63A7D8]/20 text-[#266BAC] dark:bg-[#63A7D8]/30 dark:text-[#AADCF7] border-[#63A7D8]/40 dark:border-[#63A7D8]/50',
        },
        'pending': {
          label: 'Pending',
          variant: 'outline' as const,
          className: 'border-[#09B0B6] text-[#05647A]',
        },
      }
      
      const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
      
      return (
        <Badge variant={config.variant} className={cn('border', config.className)}>
          {config.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'certifications',
    header: ({ column }) => <SortableHeader column={column}>Certifications</SortableHeader>,
    cell: ({ row }) => {
      const certifications = row.getValue('certifications') as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {certifications.length > 0 ? (
            certifications.map((cert, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs border-[#09B0B6] text-[#05647A]"
              >
                {cert}
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
    accessorKey: 'currentShift',
    header: ({ column }) => <SortableHeader column={column}>Current Shift</SortableHeader>,
    cell: ({ row }) => {
      const shift = row.getValue('currentShift') as string | null
      return (
        <div className="text-sm">
          {shift ? (
            <span className="text-foreground">{shift}</span>
          ) : (
            <span className="text-muted-foreground italic">No shift assigned</span>
          )}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const employee = row.original

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
              onClick={() => navigator.clipboard.writeText(employee.id)}
            >
              Copy employee ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit employee
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete employee
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

