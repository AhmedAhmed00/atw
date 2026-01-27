import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import type { SortableHeaderProps } from './types'

export function SortableHeader({ column, children }: SortableHeaderProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="-ml-4 h-8"
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}

