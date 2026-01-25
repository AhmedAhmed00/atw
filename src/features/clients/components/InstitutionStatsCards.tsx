import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { Building2, MapPin, DollarSign, AlertCircle } from 'lucide-react'
import { InstitutionStats } from '../data/mockInstitutionsData'

interface InstitutionStatsCardsProps {
  stats: InstitutionStats
}

export function InstitutionStatsCards({ stats }: InstitutionStatsCardsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Total Institutions',
      value: stats.totalInstitutions.toLocaleString(),
      icon: Building2,
      colorVariant: 'primary',
    },
    {
      title: 'Total Trips',
      value: stats.totalTrips.toLocaleString(),
      icon: MapPin,
      colorVariant: 'info',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      colorVariant: 'success',
    },
    {
      title: 'Outstanding Debts',
      value: `$${stats.outstandingDebts.toLocaleString()}`,
      icon: AlertCircle,
      colorVariant: 'danger',
    },
  ]

  return (
    <StatsCardGrid 
      cards={cards} 
      columns={{ default: 1, sm: 2, lg: 4 }} 
    />
  )
}

