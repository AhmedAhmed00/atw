import { Shift, SwapRequest } from '../types'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { 
  Calendar, 
  CalendarCheck, 
  CalendarX, 
  Clock
} from 'lucide-react'

interface ShiftsStatsCardsProps {
  shifts: Shift[]
  swapRequests: SwapRequest[]
}

export function ShiftsStatsCards({ shifts, swapRequests }: ShiftsStatsCardsProps) {
  const openShifts = shifts.filter((s) => s.shiftType === 'open').length
  const closedShifts = shifts.filter((s) => s.shiftType === 'closed').length
  const pendingSwaps = swapRequests.filter((s) => s.status === 'pending').length

  const cards: StatsCardProps[] = [
    {
      title: 'Total Shifts',
      value: shifts.length,
      icon: Calendar,
      colorVariant: 'primary',
      description: 'All scheduled shifts',
    },
    {
      title: 'Open Shifts',
      value: openShifts,
      icon: CalendarCheck,
      colorVariant: 'success',
      trend: {
        value: 8.5,
        label: 'vs last month',
        isPositive: true,
      },
    },
    {
      title: 'Closed Shifts',
      value: closedShifts,
      icon: CalendarX,
      colorVariant: 'info',
    },
    {
      title: 'Pending Swaps',
      value: pendingSwaps,
      icon: Clock,
      colorVariant: 'warning',
    },
  ]

  return <StatsCardGrid cards={cards} columns={{ default: 1, md: 2, lg: 4 }} />
}

