/**
 * StatusBadge Component
 * Reusable status badge with consistent styling
 */

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type StatusVariant = 'default' | 'secondary' | 'destructive' | 'outline'

export interface StatusConfig {
  label: string
  variant: StatusVariant
  className?: string
}

interface StatusBadgeProps {
  status: string
  config: Record<string, StatusConfig>
  fallback?: StatusConfig
}

export function StatusBadge({ status, config, fallback }: StatusBadgeProps) {
  const statusConfig = config[status] || fallback || { 
    label: status, 
    variant: 'outline' as StatusVariant 
  }

  return (
    <Badge
      variant={statusConfig.variant}
      className={cn(statusConfig.className)}
    >
      {statusConfig.label}
    </Badge>
  )
}

/**
 * Common status configurations
 */
export const COMMON_STATUS_CONFIGS = {
  // Generic statuses
  active: {
    label: 'Active',
    variant: 'default' as StatusVariant,
    className: 'bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white',
  },
  inactive: {
    label: 'Inactive',
    variant: 'secondary' as StatusVariant,
    className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  },
  pending: {
    label: 'Pending',
    variant: 'outline' as StatusVariant,
    className: 'border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-400',
  },
  completed: {
    label: 'Completed',
    variant: 'default' as StatusVariant,
    className: 'bg-green-500 hover:bg-green-600 text-white',
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'destructive' as StatusVariant,
  },
  // Patient/Institution statuses
  'Good Standing': {
    label: 'Good Standing',
    variant: 'default' as StatusVariant,
    className: 'bg-green-500 hover:bg-green-600 text-white',
  },
  'Outstanding Debt': {
    label: 'Outstanding Debt',
    variant: 'destructive' as StatusVariant,
  },
  Suspended: {
    label: 'Suspended',
    variant: 'secondary' as StatusVariant,
    className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  },
  // Trip statuses
  'In Progress': {
    label: 'In Progress',
    variant: 'default' as StatusVariant,
    className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  },
  Scheduled: {
    label: 'Scheduled',
    variant: 'default' as StatusVariant,
    className: 'bg-blue-500 hover:bg-blue-600 text-white',
  },
} as const

