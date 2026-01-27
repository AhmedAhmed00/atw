/**
 * Table Helper Utilities
 * Reusable functions for creating table columns
 */

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import { StatusBadge } from '@/components/ui/status-bage'
import { Link } from 'react-router-dom'
import type { StatusConfig } from '@/utils/statusConfigs'

/**
 * Create a status column with badge
 */
export function createStatusColumn<T>(
  accessor: keyof T | ((row: T) => string),
  config: StatusConfig,
  header: string = 'Status'
): ColumnDef<T> {
  return {
    accessorKey: typeof accessor === 'string' ? accessor : undefined,
    header,
    cell: ({ row }) => {
      const status = typeof accessor === 'function'
        ? accessor(row.original)
        : (row.getValue(String(accessor)) as string)
      return <StatusBadge status={ status } config = { config } />
    },
  }
}

/**
 * Create an action column with dropdown menu
 */
export function createActionColumn<T>(
  actions: Array<{
    label: string
    onClick: (row: T) => void
    icon?: React.ComponentType<{ className?: string }>
    variant?: 'default' | 'destructive'
  }>,
  header: string = 'Actions'
): ColumnDef<T> {
  return {
    id: 'actions',
    header,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild >
        <Button variant= "ghost" className = "h-8 w-8 p-0" >
          <span className="sr-only" > Open menu </span>
            < MoreVertical className = "h-4 w-4" />
              </Button>
              </DropdownMenuTrigger>
              < DropdownMenuContent align = "end" >
              {
                actions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <DropdownMenuItem
                  key= { index }
                  onClick = {() => action.onClick(row.original)
                }
                  className = { action.variant === 'destructive' ? 'text-destructive' : '' }
                  >
                  { Icon && <Icon className="mr-2 h-4 w-4" />}
      { action.label }
      </DropdownMenuItem>
              )
    })
  }
    </DropdownMenuContent>
    </DropdownMenu>
      )
},
  }
}

/**
 * Create a link column
 */
export function createLinkColumn<T>(
  accessor: keyof T | ((row: T) => string),
  getHref: (value: string, row: T) => string,
  header: string,
  className?: string
): ColumnDef<T> {
  return {
    accessorKey: typeof accessor === 'string' ? accessor : undefined,
    header,
    cell: ({ row }) => {
      const value = typeof accessor === 'function'
        ? accessor(row.original)
        : (row.getValue(String(accessor)) as string)
      const href = getHref(value, row.original)
      return (
        <Link to= { href } className = {`text-[#09B0B6] hover:underline ${className || ''}`
    }>
    { value }
    </Link>
      )
},
  }
}

/**
 * Create a date column with formatting
 */
export function createDateColumn<T>(
  accessor: keyof T | ((row: T) => string | Date),
  header: string,
  formatFn?: (date: string | Date) => string
): ColumnDef<T> {
  return {
    accessorKey: typeof accessor === 'string' ? accessor : undefined,
    header,
    cell: ({ row }) => {
      const date = typeof accessor === 'function'
        ? accessor(row.original)
        : (row.getValue(String(accessor)) as string | Date)

      if (!date) return '-'

      if (formatFn) {
        return formatFn(date)
      }

      // Default formatting
      try {
        const dateObj = typeof date === 'string' ? new Date(date) : date
        return dateObj.toLocaleDateString()
      } catch {
        return String(date)
      }
    },
  }
}

/**
 * Create a currency column
 */
export function createCurrencyColumn<T>(
  accessor: keyof T | ((row: T) => number),
  header: string,
  currency: string = 'USD'
): ColumnDef<T> {
  return {
    accessorKey: typeof accessor === 'string' ? accessor : undefined,
    header,
    cell: ({ row }) => {
      const amount = typeof accessor === 'function'
        ? accessor(row.original)
        : (row.getValue(String(accessor)) as number)

      if (amount === null || amount === undefined) return '-'

      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
      }).format(amount)
    },
  }
}

