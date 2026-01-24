import { ColumnDef } from '@tanstack/react-table'
import { Payment } from '../types'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { SortableHeader } from '@/components/shared/table'
import { cn } from '@/lib/utils'
import { 
  CreditCard, 
  Banknote, 
  Building2, 
  ShieldCheck 
} from 'lucide-react'

const getPaymentMethodIcon = (method: Payment['paymentMethod']) => {
  const icons = {
    'credit-card': CreditCard,
    'cash': Banknote,
    'bank-transfer': Building2,
    'insurance': ShieldCheck,
  }
  return icons[method]
}

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
    pending: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800',
    failed: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800'
  }
  return variants[status]
}

export const paymentTableColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'transactionId',
    header: ({ column }) => (
      <SortableHeader column={column}>Transaction</SortableHeader>
    ),
    cell: ({ row }) => {
      const transactionId = row.getValue('transactionId') as string
      const description = row.original.description
      return (
        <div>
          <p className="font-medium text-sm">{transactionId}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'patientName',
    header: ({ column }) => (
      <SortableHeader column={column}>Patient Name</SortableHeader>
    ),
    cell: ({ row }) => {
      const patientName = row.getValue('patientName') as string
      const initials = patientName.split(' ').map(n => n[0]).join('')
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) text-white text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{patientName}</span>
        </div>
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
        <span className="font-semibold">
          ${amount.toFixed(2)}
        </span>
      )
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell: ({ row }) => {
      const method = row.getValue('paymentMethod') as Payment['paymentMethod']
      const Icon = getPaymentMethodIcon(method)
      return (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{getPaymentMethodLabel(method)}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Payment['status']
      return (
        <Badge 
          className={cn(
            'text-xs font-medium capitalize',
            getStatusVariant(status)
          )}
        >
          {status}
        </Badge>
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

