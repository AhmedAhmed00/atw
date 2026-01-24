import { Sun, Moon } from 'lucide-react'
import type { DayColorScheme } from '../constants/day-colors'

interface DayHeaderProps {
  day: string
  statusLabel: string
  iconType: 'sun' | 'moon'
  colorScheme: DayColorScheme
}

export function DayHeader({ day, statusLabel, iconType, colorScheme }: DayHeaderProps) {
  return (
    <div className="flex items-center gap-4 min-w-[200px]">
      <div className={`relative w-14 h-14 rounded-2xl bg-linear-to-br ${colorScheme.gradient} shadow-lg flex items-center justify-center group transition-transform duration-300 hover:scale-105`}>
        <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {iconType === 'sun' ? (
          <Sun className="w-7 h-7 text-white relative z-10" />
        ) : (
          <Moon className="w-7 h-7 text-white relative z-10" />
        )}
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {day}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {statusLabel}
        </p>
      </div>
    </div>
  )
}

