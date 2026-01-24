import { Clock } from 'lucide-react'
import type { DayColorScheme } from '../constants/day-colors'

interface TimeDisplayProps {
  time: string
  colorScheme: DayColorScheme
}

export function TimeDisplay({ time, colorScheme }: TimeDisplayProps) {
  return (
    <div className={`px-4 py-2 rounded-lg ${colorScheme.bg} border ${colorScheme.border} hover:border-[#09B0B6]/40 transition-colors`}>
      <div className="flex items-center gap-2">
        <div className={`p-1 rounded-md bg-linear-to-br ${colorScheme.gradient}`}>
          <Clock className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">
          {time}
        </span>
      </div>
    </div>
  )
}

