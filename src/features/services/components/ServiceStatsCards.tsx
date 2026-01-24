import { ServiceStats } from '../types'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { 
  Briefcase, 
  Activity, 
  DollarSign, 
  TrendingUp,
  Calendar
} from 'lucide-react'

interface ServiceStatsCardsProps {
  stats: ServiceStats
}

export function ServiceStatsCards({ stats }: ServiceStatsCardsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Total Services',
      value: stats.total,
      icon: Briefcase,
      colorVariant: 'primary',
      description: 'All registered services',
    },
    {
      title: 'Active Services',
      value: stats.active,
      icon: Activity,
      colorVariant: 'success',
      trend: {
        value: 12.5,
        label: 'vs last month',
        isPositive: true,
      },
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      colorVariant: 'info',
      trend: {
        value: 8.3,
        label: 'vs last month',
        isPositive: true,
      },
    },
    {
      title: 'Average Price',
      value: `$${Math.round(stats.averagePrice)}`,
      icon: TrendingUp,
      colorVariant: 'secondary',
      description: 'Mean service price',
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings.toLocaleString(),
      icon: Calendar,
      colorVariant: 'warning',
      trend: {
        value: 15.7,
        label: 'vs last month',
        isPositive: true,
      },
    },
  ]

  return <StatsCardGrid cards={cards} columns={{ default: 1, md: 2, lg: 3 }} />
}

