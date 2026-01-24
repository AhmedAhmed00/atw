import { DashboardStats as Stats } from '../types'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { 
  Calendar,
  CheckCircle2,
  DollarSign,
  Users,
} from 'lucide-react'

interface DashboardStatsProps {
  stats: Stats
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Upcoming Appointments',
      value: stats.upcomingAppointments,
      icon: Calendar,
      colorVariant: 'primary',
      trend: {
        value: stats.appointmentsChange,
        label: 'vs last month',
        isPositive: true,
      },
    },
    {
      title: 'Confirmed Appointments',
      value: stats.confirmedAppointments,
      icon: CheckCircle2,
      colorVariant: 'secondary',
      description: `${stats.confirmedAppointments} confirmed today`,
    },
    {
      title: 'This Month Revenue',
      value: `$${stats.monthRevenue.toLocaleString()}`,
      icon: DollarSign,
      colorVariant: 'secondary',
      trend: {
        value: stats.revenueChange,
        label: 'vs last month',
        isPositive: true,
      },
    },
    {
      title: 'Total Patients',
      value: stats.totalPatients.toLocaleString(),
      icon: Users,
      colorVariant: 'secondary',
      trend: {
        value: stats.patientsChange,
        label: 'new this month',
        isPositive: true,
      },
    },
  ]

  return (
    <StatsCardGrid 
      cards={cards} 
      columns={{ default: 1, sm: 2, lg: 4 }} 
    />
  )
}

