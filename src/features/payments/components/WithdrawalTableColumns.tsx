import { ColumnDef } from '@tanstack/react-table'
import { Withdrawal } from '../types'
import { Badge } from '@/components/ui/badge'
import { SortableHeader } from '@/components/shared/table'
import { cn } from '@/lib/utils'
import { 
  Building2, 
  Wallet,
  Send,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react'

const getWithdrawalMethodIcon = (method: Withdrawal['withdrawalMethod']) => {
  const icons = {
    'bank-transfer': Building2,
    'paypal': Wallet,
    'wire-transfer': Send,
    'check': FileText,
  }
  return icons[method]
}

const getWithdrawalMethodLabel = (method: Withdrawal['withdrawalMethod']) => {
  const labels: Record<string, string> = {
    'bank-transfer': 'Bank Transfer',
    'paypal': 'PayPal',
    'wire-transfer': 'Wire Transfer',
    'check': 'Check',
  }
  return labels[method] || method
}

const getStatusConfig = (status: Withdrawal['status']) => {
  const configs = {
    completed: {
      variant: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800',
      icon: CheckCircle2,
      label: 'Completed'
    },
    pending: {
      variant: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800',
      icon: Clock,
      label: 'Pending'
    },
    rejected: {
      variant: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800',
      icon: AlertCircle,
      label: 'Rejected'
    }
  }
  return configs[status]
}

export const withdrawalTableColumns: ColumnDef<Withdrawal>[] = [
  {
    accessorKey: 'withdrawalNumber',
    header: ({ column }) => (
      <SortableHeader column={column}>Withdrawal Number</SortableHeader>
    ),
    cell: ({ row }) => {
      const withdrawalNumber = row.getValue('withdrawalNumber') as string
      return (
        <p className="font-medium text-sm font-mono">{withdrawalNumber}</p>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <SortableHeader column={column}>Amount</SortableHeader>
    ),
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number
      return (
        <span className="font-semibold text-[rgb(var(--brand-secondary))]">
          ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Withdrawal['status']
      const config = getStatusConfig(status)
      const StatusIcon = config.icon
      return (
        <Badge 
          className={cn(
            'text-xs font-medium gap-1',
            config.variant
          )}
        >
          <StatusIcon className="h-3 w-3" />
          {config.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'withdrawalMethod',
    header: 'Withdrawal Method',
    cell: ({ row }) => {
      const method = row.getValue('withdrawalMethod') as Withdrawal['withdrawalMethod']
      const Icon = getWithdrawalMethodIcon(method)
      return (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{getWithdrawalMethodLabel(method)}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <SortableHeader column={column}>Date</SortableHeader>
    ),
    cell: ({ row }) => {
      const date = row.getValue('date') as Date
      return (
        <div className="text-sm">
          <p>{date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          })}</p>
          <p className="text-xs text-muted-foreground">
            {date.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      )
    },
  },
]

