import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { Users, MapPin, DollarSign, AlertCircle } from 'lucide-react'
import { PatientStats } from '../data/mockPatientsData'

interface PatientStatsCardsProps {
  stats: PatientStats
}

export function PatientStatsCards({ stats }: PatientStatsCardsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Total Patients',
      value: stats.totalPatients.toLocaleString(),
      icon: Users,
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

