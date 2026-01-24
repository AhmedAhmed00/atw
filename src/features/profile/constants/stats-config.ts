/**
 * Profile statistics configuration
 */

import { TrendingUp, Calendar, DollarSign, Briefcase, type LucideIcon } from 'lucide-react'
import { PRIMARY_GRADIENT, SECONDARY_GRADIENT, type GradientConfig } from '@/lib/gradients'
import type { ProfileData } from '../types'

export interface StatConfig extends GradientConfig {
  icon: LucideIcon
  label: string
  key: keyof ProfileData['statistics']
  prefix?: string
}

export const PROFILE_STATS_CONFIG: StatConfig[] = [
  {
    icon: Briefcase,
    label: 'Total Bookings',
    key: 'totalBookings',
    ...PRIMARY_GRADIENT,
  },
  {
    icon: Calendar,
    label: 'This Month',
    key: 'thisMonth',
    ...SECONDARY_GRADIENT,
  },
  {
    icon: DollarSign,
    label: 'Total Revenue',
    key: 'totalRevenue',
    ...PRIMARY_GRADIENT,
    prefix: '$',
  },
  {
    icon: TrendingUp,
    label: 'Services',
    key: 'services',
    ...PRIMARY_GRADIENT,
  },
]

