/**
 * TripStatsCards Component
 */

import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { Route, CheckCircle2, Navigation, Clock } from 'lucide-react'

interface TripStats {
  totalTrips: number
  completed: number
  enRoute: number
  pendingDelayed: number
}

interface TripStatsCardsProps {
  stats: TripStats
}

export function TripStatsCards({ stats }: TripStatsCardsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Total Trips',
      value: stats.totalTrips.toString(),
      icon: Route,
      colorVariant: 'primary',
      description: 'All trips',
    },
    {
      title: 'Completed',
      value: stats.completed.toString(),
      icon: CheckCircle2,
      colorVariant: 'success',
      description: 'Successfully completed',
    },
    {
      title: 'En Route',
      value: stats.enRoute.toString(),
      icon: Navigation,
      colorVariant: 'info',
      description: 'Currently in transit',
    },
    {
      title: 'Pending/Delayed',
      value: stats.pendingDelayed.toString(),
      icon: Clock,
      colorVariant: 'warning',
      description: 'Awaiting or delayed',
    },
  ]

  return (
    <StatsCardGrid 
      cards={cards} 
      columns={{ default: 1, sm: 2, lg: 4 }} 
    />
  )
}

