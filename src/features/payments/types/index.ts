export type PaymentStatus = 'completed' | 'pending' | 'failed'

export type TransactionType = 'payment' | 'withdrawal' | 'pay_order'

export interface Transaction {
  id: string
  transactionId: string
  type: TransactionType
  amount: number
  paymentMethod: 'credit-card' | 'cash' | 'insurance' | 'bank-transfer'
  status: PaymentStatus
  date: Date
  description?: string
  notes?: string
}

// Keep Payment as alias for backward compatibility
export interface Payment {
  id: string
  transactionId: string
  patientName: string
  patientAvatar?: string
  amount: number
  paymentMethod: 'credit-card' | 'cash' | 'insurance' | 'bank-transfer'
  status: PaymentStatus
  date: Date
  description?: string
}

export interface PaymentStats {
  totalEarnings: number
  availableBalance: number
  pendingAmount: number
}

export type WithdrawalMethod = 'bank-transfer' | 'paypal' | 'wire-transfer' | 'check'

export interface Withdrawal {
  id: string
  withdrawalNumber: string
  amount: number
  withdrawalMethod: WithdrawalMethod
  status: 'completed' | 'pending' | 'rejected'
  date: Date
  notes?: string
}

export interface BankAccount {
  id: string
  bankName: string
  accountNumber: string // masked, e.g., "****1234"
  accountType: 'checking' | 'savings'
  isDefault: boolean
}

export interface WithdrawalFormData {
  amount: number
  bankAccountId: string
  notes?: string
}

