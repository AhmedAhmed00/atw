import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OverviewTab, TransactionHistoryTab, WithdrawalsTab } from './components'
import { paymentStats, mockPayments, mockWithdrawals, mockTransactions, mockBankAccounts } from './data/mockPayments'
import { Wallet, Receipt, CreditCard } from 'lucide-react'

export function PaymentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
          Payments
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your earnings, track transactions history, and request withdrawals.
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview" className="gap-2">
            <Wallet className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <Receipt className="h-4 w-4" />
            Transactions History
          </TabsTrigger>
          <TabsTrigger value="withdrawals" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Withdrawals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab 
            stats={paymentStats} 
            recentTransactions={mockPayments} 
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <TransactionHistoryTab transactions={mockTransactions} />
        </TabsContent>

        <TabsContent value="withdrawals" className="space-y-6">
          <WithdrawalsTab 
            withdrawals={mockWithdrawals}
            availableBalance={paymentStats.availableBalance}
            bankAccounts={mockBankAccounts}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PaymentsPage

