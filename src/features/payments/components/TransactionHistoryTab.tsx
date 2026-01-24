import { useState, useMemo } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataTable } from '@/components/shared/table'
import { transactionTableColumns } from './TransactionTableColumns'
import { Transaction, PaymentStatus } from '../types'
import { Badge } from '@/components/ui/badge'

interface TransactionHistoryTabProps {
  transactions: Transaction[]
}

export function TransactionHistoryTab({ transactions }: TransactionHistoryTabProps) {
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all')

  // Filter transactions based on selected status
  const filteredTransactions = useMemo(() => {
    if (statusFilter === 'all') return transactions
    return transactions.filter(transaction => transaction.status === statusFilter)
  }, [transactions, statusFilter])

  // Count transactions by status
  const counts = useMemo(() => {
    return {
      all: transactions.length,
      completed: transactions.filter(t => t.status === 'completed').length,
      pending: transactions.filter(t => t.status === 'pending').length,
      failed: transactions.filter(t => t.status === 'failed').length,
    }
  }, [transactions])

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <Tabs value={statusFilter} onValueChange={(value) => setStatusFilter(value as PaymentStatus | 'all')}>
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="all" className="gap-2">
              All
              <Badge variant="secondary" className="ml-1 h-5 w-auto min-w-[1.25rem] px-1.5">
                {counts.all}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              Completed
              <Badge variant="secondary" className="ml-1 h-5 w-auto min-w-[1.25rem] px-1.5">
                {counts.completed}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              Pending
              <Badge variant="secondary" className="ml-1 h-5 w-auto min-w-[1.25rem] px-1.5">
                {counts.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="failed" className="gap-2">
              Failed
              <Badge variant="secondary" className="ml-1 h-5 w-auto min-w-[1.25rem] px-1.5">
                {counts.failed}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Transactions Table */}
      <DataTable columns={transactionTableColumns} data={filteredTransactions} />
    </div>
  )
}

