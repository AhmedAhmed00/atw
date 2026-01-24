import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatsCardGrid } from '@/components/shared/stats'
import { DollarSign, Wallet, Clock, TrendingUp, Filter } from 'lucide-react'
import { Payment, PaymentStats, PaymentStatus } from '../types'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface OverviewTabProps {
  stats: PaymentStats
  recentTransactions: Payment[]
}

type StatusFilter = PaymentStatus | 'all'

const getPaymentMethodLabel = (method: string) => {
  const labels: Record<string, string> = {
    'credit-card': 'Credit Card',
    'cash': 'Cash',
    'insurance': 'Insurance',
    'bank-transfer': 'Bank Transfer'
  }
  return labels[method] || method
}

const getStatusVariant = (status: Payment['status']) => {
  const variants = {
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800',
    failed: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800'
  }
  return variants[status]
}

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
]

export function OverviewTab({ stats, recentTransactions }: OverviewTabProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filteredTransactions = useMemo(() => {
    if (statusFilter === 'all') {
      return recentTransactions
    }
    return recentTransactions.filter((t) => t.status === statusFilter)
  }, [recentTransactions, statusFilter])
  const statsCards = [
    {
      title: 'Total Earnings',
      value: `$${stats.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      colorVariant: 'primary' as const,
      trend: {
        value: 12.5,
        isPositive: true,
        label: 'from last month'
      }
    },
    {
      title: 'Available Balance',
      value: `$${stats.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: Wallet,
      colorVariant: 'success' as const,
      description: 'Ready to withdraw'
    },
    {
      title: 'Pending Amount',
      value: `$${stats.pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: Clock,
      colorVariant: 'warning' as const,
      description: 'Processing payments'
    },
    {
      title: 'This Month',
      value: `$${(stats.totalEarnings * 0.15).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: TrendingUp,
      colorVariant: 'secondary' as const,
      trend: {
        value: 8.2,
        isPositive: true,
        label: 'vs last month'
      }
    }
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCardGrid 
        cards={statsCards} 
        columns={{ default: 1, sm: 2, lg: 4 }}
      />

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
            Recent Transactions
          </CardTitle>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      {option.value !== 'all' && (
                        <span
                          className={cn(
                            'w-2 h-2 rounded-full',
                            option.value === 'completed' && 'bg-emerald-500',
                            option.value === 'pending' && 'bg-amber-500',
                            option.value === 'failed' && 'bg-rose-500'
                          )}
                        />
                      )}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No transactions found with status "{statusFilter}"</p>
              </div>
            ) : (
              filteredTransactions.slice(0, 8).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) text-white">
                      {transaction.patientName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{transaction.patientName}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {transaction.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-muted-foreground">
                      {getPaymentMethodLabel(transaction.paymentMethod)}
                    </p>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="font-semibold text-sm">
                      ${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <Badge 
                    className={cn(
                      'text-xs font-medium capitalize min-w-[80px] justify-center',
                      getStatusVariant(transaction.status)
                    )}
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

