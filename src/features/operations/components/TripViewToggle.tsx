/**
 * TripViewToggle Component
 * Toggle between table and map views
 */

import { Button } from '@/components/ui/button'
import { Table2, Map } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TripViewMode = 'table' | 'map'

interface TripViewToggleProps {
  value: TripViewMode
  onChange: (mode: TripViewMode) => void
  className?: string
}

export function TripViewToggle({ value, onChange, className }: TripViewToggleProps) {
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
        Table
      </Button>
      <Button
        variant={value === 'map' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('map')}
        className={cn(
          'gap-2',
          value === 'map' &&
            'bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90'
        )}
      >
        <Map className="h-4 w-4" />
        Map
      </Button>
    </div>
  )
}

