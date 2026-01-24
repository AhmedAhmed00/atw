import { Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TimeDisplay } from './TimeDisplay'
import type { DayColorScheme } from '../constants/day-colors'

interface TimeSlotDisplayProps {
  startTime: string
  endTime: string
  duration: string
  colorScheme: DayColorScheme
  enabled: boolean
  onEdit: () => void
  compact?: boolean
}

export function TimeSlotDisplay({
  startTime,
  endTime,
  duration,
  colorScheme,
  enabled,
  onEdit,
  compact = false,
}: TimeSlotDisplayProps) {
  if (compact) {
    return (
      <div className="flex items-center justify-between gap-2 p-2 rounded-lg border bg-card/50 hover:bg-accent/30 transition-colors">
        <div className="flex items-center gap-2">
          <TimeDisplay time={startTime} colorScheme={colorScheme} />
          <div className="text-slate-400 text-sm">→</div>
          <TimeDisplay time={endTime} colorScheme={colorScheme} />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {duration}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            disabled={!enabled}
            className="h-8 w-8 p-0 hover:bg-[#09B0B6]/10 hover:text-[#09B0B6]"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center gap-6 flex-1">
        <div className="flex items-center gap-3">
          <TimeDisplay time={startTime} colorScheme={colorScheme} />
          <div className="text-slate-400">—</div>
          <TimeDisplay time={endTime} colorScheme={colorScheme} />
        </div>

        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {duration}
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onEdit}
        disabled={!enabled}
        className={`hover:bg-linear-to-br ${colorScheme.from} ${colorScheme.to} hover:text-white hover:border-transparent transition-all`}
      >
        <Edit2 className="w-4 h-4 mr-2" />
        Edit
      </Button>
    </>
  )
}

