import { Task } from '../types'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { 
  Activity, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle
} from 'lucide-react'

interface TasksStatsCardsProps {
  tasks: Task[]
}

export function TasksStatsCards({ tasks }: TasksStatsCardsProps) {
  const activeResponses = tasks.filter(
    (t) => t.category === 'active-response' && t.status !== 'completed' && t.status !== 'cancelled'
  ).length

  const vehicleMaintenance = tasks.filter(
    (t) => t.category === 'vehicle-maintenance' && t.status !== 'completed' && t.status !== 'cancelled'
  ).length

  const completedShifts = tasks.filter(
    (t) => t.category === 'shift' && t.status === 'completed'
  ).length

  const criticalAlerts = tasks.filter(
    (t) => t.category === 'alert' && t.priority === 'critical' && t.status !== 'completed'
  ).length

  const cards: StatsCardProps[] = [
    {
      title: 'Active Responses',
      value: activeResponses,
      icon: Activity,
      colorVariant: 'primary',
      description: 'Ongoing emergency responses',
    },
    {
      title: 'Vehicle Maintenance',
      value: vehicleMaintenance,
      icon: Wrench,
      colorVariant: 'info',
      description: 'Pending maintenance tasks',
    },
    {
      title: 'Completed Shifts',
      value: completedShifts,
      icon: CheckCircle2,
      colorVariant: 'success',
      description: 'Shifts completed today',
    },
    {
      title: 'Critical Alerts',
      value: criticalAlerts,
      icon: AlertTriangle,
      colorVariant: 'danger',
      description: 'Requires immediate attention',
    },
  ]

  return <StatsCardGrid cards={cards} columns={{ default: 1, md: 2, lg: 4 }} />
}

