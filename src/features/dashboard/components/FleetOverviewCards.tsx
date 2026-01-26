import { FleetOverviewCardsProps } from '../types'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import {
  Users,
  Building2,
  MapPin,
  CheckCircle2,
  Truck,
  Clock,
} from 'lucide-react'



export function FleetOverviewCards({ stats }: FleetOverviewCardsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Total Patients',
      value: stats.totalPatients.toLocaleString(),
      icon: Users,
      colorVariant: 'primary',
    },
    {
      title: 'Institutions',
      value: stats.institutions.toString(),
      icon: Building2,
      colorVariant: 'secondary',
    },
    {
      title: 'Active Trips',
      value: stats.activeTrips.toString(),
      icon: MapPin,
      colorVariant: 'info',
    },
    {
      title: 'Completed Today',
      value: stats.completedToday.toString(),
      icon: CheckCircle2,
      colorVariant: 'success',
    },
    {
      title: 'Fleet Active',
      value: `${stats.fleetActive}/30`,
      icon: Truck,
      colorVariant: 'info',
    },
    {
      title: 'Avg Response',
      value: stats.avgResponse,
      icon: Clock,
      colorVariant: 'warning',
    },
  ]

  return (
    <StatsCardGrid
      cards={cards}
      columns={{ default: 1, sm: 2, lg: 3 }}
    />
  )
}

