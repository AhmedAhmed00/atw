import { PendingApprovalStats } from '../types'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { 
  FileSearch, 
  FileCheck, 
  Clock
} from 'lucide-react'

interface PendingApprovalsCardsProps {
  stats: PendingApprovalStats
}

export function PendingApprovalsCards({ stats }: PendingApprovalsCardsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Pending Review',
      value: stats.pendingReview,
      icon: FileSearch,
      colorVariant: 'warning',
      description: 'Awaiting initial review',
    },
    {
      title: 'Partially Approved',
      value: stats.partiallyApproved,
      icon: FileCheck,
      colorVariant: 'info',
      description: 'Partially processed',
    },
    {
      title: 'Total Pending',
      value: stats.totalPending,
      icon: Clock,
      colorVariant: 'primary',
      description: 'All pending requests',
    },
  ]

  return <StatsCardGrid cards={cards} columns={{ default: 1, md: 3 }} />
}

