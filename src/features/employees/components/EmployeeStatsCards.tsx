import { EmployeeStats } from '../types'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock
} from 'lucide-react'

interface EmployeeStatsCardsProps {
  stats: EmployeeStats
}

export function EmployeeStatsCards({ stats }: EmployeeStatsCardsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Total Employees',
      value: stats.total,
      icon: Users,
      colorVariant: 'primary',
      description: 'All registered employees',
    },
    {
      title: 'Active',
      value: stats.active,
      icon: UserCheck,
      colorVariant: 'success',
      trend: {
        value: 5.2,
        label: 'vs last month',
        isPositive: true,
      },
    },
    {
      title: 'On Leave',
      value: stats.onLeave,
      icon: UserX,
      colorVariant: 'warning',
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: Clock,
      colorVariant: 'info',
    },
  ]

  return <StatsCardGrid cards={cards} columns={{ default: 1, md: 2, lg: 4 }} />
}

