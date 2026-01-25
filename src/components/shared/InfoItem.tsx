/**
 * InfoItem Component
 * Reusable component for displaying labeled information with icons
 */

import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InfoItemProps {
  icon: LucideIcon
  label: string
  value: string | React.ReactNode
  className?: string
}

export function InfoItem({ icon: Icon, label, value, className }: InfoItemProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
        <Icon className="w-3.5 h-3.5" />
        <span>{label}</span>
      </div>
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  )
}

