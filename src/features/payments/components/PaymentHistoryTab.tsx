import { useState, useMemo } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataTable } from '@/components/shared/table'
import { paymentTableColumns } from './PaymentTableColumns'
import { Payment, PaymentStatus } from '../types'
import { Badge } from '@/components/ui/badge'

interface PaymentHistoryTabProps {
  payments: Payment[]
}

export function PaymentHistoryTab({ payments }: PaymentHistoryTabProps) {
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all')

  // Filter payments based on selected status
  const filteredPayments = useMemo(() => {
    if (statusFilter === 'all') return payments
    return payments.filter(payment => payment.status === statusFilter)
  }, [payments, statusFilter])

  // Count payments by status
  const counts = useMemo(() => {
    return {
      all: payments.length,
      completed: payments.filter(p => p.status === 'completed').length,
      pending: payments.filter(p => p.status === 'pending').length,
      failed: payments.filter(p => p.status === 'failed').length,
    }
  }, [payments])

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

      {/* Payments Table */}
      <DataTable columns={paymentTableColumns} data={filteredPayments} />
    </div>
  )
}

