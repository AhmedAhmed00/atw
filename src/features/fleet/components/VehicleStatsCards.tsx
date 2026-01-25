/**
 * VehicleStatsCards Component
 */

import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { Car, CheckCircle2, Wrench, Navigation } from 'lucide-react'

interface VehicleStats {
  totalFleet: number
  active: number
  maintenance: number
  onTheMove: number
}

interface VehicleStatsCardsProps {
  stats: VehicleStats
}

export function VehicleStatsCards({ stats }: VehicleStatsCardsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Total Fleet',
      value: stats.totalFleet.toString(),
      icon: Car,
      colorVariant: 'primary',
      description: 'All vehicles',
    },
    {
      title: 'Active',
      value: stats.active.toString(),
      icon: CheckCircle2,
      colorVariant: 'success',
      description: 'Available vehicles',
    },
    {
      title: 'Maintenance',
      value: stats.maintenance.toString(),
      icon: Wrench,
      colorVariant: 'warning',
      description: 'Under maintenance',
    },
    {
      title: 'On the Move',
      value: stats.onTheMove.toString(),
      icon: Navigation,
      colorVariant: 'info',
      description: 'Currently in transit',
    },
  ]

  return (
    <StatsCardGrid 
      cards={cards} 
      columns={{ default: 1, sm: 2, lg: 4 }} 
    />
  )
}

