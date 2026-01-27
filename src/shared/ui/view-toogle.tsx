/**
 * ViewToggle Component
 * Reusable component for switching between table and calendar views
 */

import { Button } from '@/components/ui/button'
import { Table2, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ViewMode = 'table' | 'calendar'

interface ViewToggleProps {
  value: ViewMode
  onChange: (mode: ViewMode) => void
  className?: string
}

export function ViewToggle({ value, onChange, className }: ViewToggleProps) {
  return (
    <div className={cn('flex items-center gap-2 bg-muted p-1 rounded-lg', className)}>
      <Button
        variant={value === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('table')}
        className={cn(
          'gap-2',
          value === 'table' &&
            'bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90'
        )}
      >
        <Table2 className="h-4 w-4" />
        Table View
      </Button>
      <Button
        variant={value === 'calendar' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('calendar')}
        className={cn(
          'gap-2',
          value === 'calendar' &&
            'bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90'
        )}
      >
        <CalendarDays className="h-4 w-4" />
        Calendar View
      </Button>
    </div>
  )
}

