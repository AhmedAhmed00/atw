/**
 * InvoiceStatsCards Component
 */

import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { FileText, DollarSign, Clock, CheckCircle2 } from 'lucide-react'

interface InvoiceStats {
  totalInvoices: number
  totalAmount: number
  pending: number
  paid: number
}

interface InvoiceStatsCardsProps {
  stats: InvoiceStats
}

export function InvoiceStatsCards({ stats }: InvoiceStatsCardsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Total Invoices',
      value: stats.totalInvoices.toString(),
      icon: FileText,
      colorVariant: 'primary',
      description: 'All invoices',
    },
    {
      title: 'Total Amount',
      value: `$${stats.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      colorVariant: 'info',
      description: 'Total invoice value',
    },
    {
      title: 'Pending',
      value: stats.pending.toString(),
      icon: Clock,
      colorVariant: 'warning',
      description: 'Awaiting payment',
    },
    {
      title: 'Paid',
      value: stats.paid.toString(),
      icon: CheckCircle2,
      colorVariant: 'success',
      description: 'Successfully paid',
    },
  ]

  return (
    <StatsCardGrid 
      cards={cards} 
      columns={{ default: 1, sm: 2, lg: 4 }} 
    />
  )
}

