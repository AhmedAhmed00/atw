import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Transaction } from '../types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SortableHeader } from '@/components/shared/table'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  CreditCard, 
  Banknote, 
  Building2, 
  ShieldCheck,
  MoreHorizontal,
  StickyNote,
  ArrowDownCircle,
  ArrowUpCircle,
  Receipt,
} from 'lucide-react'
import { AddNoteDialog } from './AddNoteDialog'

const getPaymentMethodIcon = (method: Transaction['paymentMethod']) => {
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

const getStatusVariant = (status: Transaction['status']) => {
  const variants = {
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800',
    pending: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800',
    failed: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800'
  }
  return variants[status]
}

const getTypeConfig = (type: Transaction['type']) => {
  const config = {
    payment: {
      label: 'Payment',
      icon: ArrowDownCircle,
      className: 'bg-[rgb(var(--brand-primary))]/10 text-[rgb(var(--brand-primary))] border-[rgb(var(--brand-primary))]/30',
    },
    withdrawal: {
      label: 'Withdrawal',
      icon: ArrowUpCircle,
      className: 'bg-[rgb(var(--brand-secondary))]/10 text-[rgb(var(--brand-secondary))] border-[rgb(var(--brand-secondary))]/30',
    },
    pay_order: {
      label: 'Pay Order',
      icon: Receipt,
      className: 'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-400 dark:border-violet-800',
    },
  }
  return config[type]
}

// Action cell component with dialog state
function ActionCell({ transaction }: { transaction: Transaction }) {
  const [showNoteDialog, setShowNoteDialog] = useState(false)
  const [currentNote, setCurrentNote] = useState(transaction.notes || '')

  const handleSaveNote = (note: string) => {
    setCurrentNote(note)
    // In a real app, you'd call an API here
    console.log(`Note saved for ${transaction.transactionId}:`, note)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowNoteDialog(true)}>
            <StickyNote className="mr-2 h-4 w-4" />
            {currentNote ? 'Edit Note' : 'Add Note'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddNoteDialog
        open={showNoteDialog}
        onOpenChange={setShowNoteDialog}
        transactionId={transaction.transactionId}
        currentNote={currentNote}
        onSave={handleSaveNote}
      />
    </>
  )
}

export const transactionTableColumns: ColumnDef<Transaction>[] = [
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
            <p className="text-xs text-muted-foreground truncate max-w-[200px]">{description}</p>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as Transaction['type']
      const config = getTypeConfig(type)
      const Icon = config.icon
      return (
        <Badge 
          variant="outline"
          className={cn(
            'text-xs font-medium gap-1.5',
            config.className
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {config.label}
        </Badge>
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
      const type = row.original.type
      const isWithdrawal = type === 'withdrawal'
      return (
        <span className={cn(
          "font-semibold",
          isWithdrawal ? "text-[rgb(var(--brand-secondary))]" : ""
        )}>
          {isWithdrawal ? '-' : ''}${amount.toFixed(2)}
        </span>
      )
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell: ({ row }) => {
      const method = row.getValue('paymentMethod') as Transaction['paymentMethod']
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
      const status = row.getValue('status') as Transaction['status']
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
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionCell transaction={row.original} />,
  },
]

