/**
 * ComplianceItem Component
 * Reusable component for displaying compliance checklist items
 */

import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComplianceItemProps {
  label: string
  verified: boolean
  className?: string
}

export function ComplianceItem({ label, verified, className }: ComplianceItemProps) {
  return (
    <div className={cn("flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors", className)}>
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        {verified ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">Verified</span>
          </>
        ) : (
          <>
            <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-xs font-medium text-red-600 dark:text-red-400">Pending</span>
          </>
        )}
      </div>
    </div>
  )
}

