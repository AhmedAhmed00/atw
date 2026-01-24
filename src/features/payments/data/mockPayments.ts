import { Payment, PaymentStats, Withdrawal, Transaction, BankAccount } from '../types'

export const mockBankAccounts: BankAccount[] = [
  {
    id: 'bank-1',
    bankName: 'Chase Bank',
    accountNumber: '****1234',
    accountType: 'checking',
    isDefault: true,
  },
  {
    id: 'bank-2',
    bankName: 'Bank of America',
    accountNumber: '****5678',
    accountType: 'savings',
    isDefault: false,
  },
  {
    id: 'bank-3',
    bankName: 'Wells Fargo',
    accountNumber: '****9876',
    accountType: 'checking',
    isDefault: false,
  },
  {
    id: 'bank-4',
    bankName: 'Citibank',
    accountNumber: '****4321',
    accountType: 'savings',
    isDefault: false,
  },
]

export const paymentStats: PaymentStats = {
  totalEarnings: 125480.50,
  availableBalance: 45230.00,
  pendingAmount: 12350.75,
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    transactionId: 'TXN-2026-001',
    type: 'payment',
    amount: 250.00,
    paymentMethod: 'credit-card',
    status: 'completed',
    date: new Date('2026-01-15T10:30:00'),
    description: 'General Consultation',
    notes: 'Payment received for consultation service'
  },
  {
    id: '2',
    transactionId: 'TXN-2026-002',
    type: 'pay_order',
    amount: 450.00,
    paymentMethod: 'insurance',
    status: 'pending',
    date: new Date('2026-01-14T14:20:00'),
    description: 'Physical Therapy Session'
  },
  {
    id: '3',
    transactionId: 'TXN-2026-003',
    type: 'payment',
    amount: 180.00,
    paymentMethod: 'cash',
    status: 'completed',
    date: new Date('2026-01-14T09:15:00'),
    description: 'Follow-up Appointment'
  },
  {
    id: '4',
    transactionId: 'WDR-2026-001',
    type: 'withdrawal',
    amount: 5000.00,
    paymentMethod: 'bank-transfer',
    status: 'completed',
    date: new Date('2026-01-13T16:45:00'),
    description: 'Monthly withdrawal to bank account ****1234',
    notes: 'Processed successfully'
  },
  {
    id: '5',
    transactionId: 'TXN-2026-005',
    type: 'payment',
    amount: 550.00,
    paymentMethod: 'credit-card',
    status: 'failed',
    date: new Date('2026-01-13T11:30:00'),
    description: 'MRI Scan',
    notes: 'Card declined - insufficient funds'
  },
  {
    id: '6',
    transactionId: 'TXN-2026-006',
    type: 'pay_order',
    amount: 200.00,
    paymentMethod: 'insurance',
    status: 'pending',
    date: new Date('2026-01-12T15:20:00'),
    description: 'Lab Tests'
  },
  {
    id: '7',
    transactionId: 'TXN-2026-007',
    type: 'payment',
    amount: 380.00,
    paymentMethod: 'credit-card',
    status: 'completed',
    date: new Date('2026-01-12T10:00:00'),
    description: 'X-Ray Examination'
  },
  {
    id: '8',
    transactionId: 'WDR-2026-002',
    type: 'withdrawal',
    amount: 3500.00,
    paymentMethod: 'bank-transfer',
    status: 'pending',
    date: new Date('2026-01-11T13:45:00'),
    description: 'Equipment purchase withdrawal'
  },
  {
    id: '9',
    transactionId: 'TXN-2026-009',
    type: 'pay_order',
    amount: 420.00,
    paymentMethod: 'bank-transfer',
    status: 'pending',
    date: new Date('2026-01-11T09:30:00'),
    description: 'Surgery Consultation'
  },
  {
    id: '10',
    transactionId: 'TXN-2026-010',
    type: 'payment',
    amount: 190.00,
    paymentMethod: 'credit-card',
    status: 'completed',
    date: new Date('2026-01-10T14:15:00'),
    description: 'Prescription Refill'
  },
  {
    id: '11',
    transactionId: 'TXN-2026-011',
    type: 'payment',
    amount: 475.00,
    paymentMethod: 'insurance',
    status: 'completed',
    date: new Date('2026-01-09T11:00:00'),
    description: 'Cardiology Checkup'
  },
  {
    id: '12',
    transactionId: 'TXN-2026-012',
    type: 'pay_order',
    amount: 325.00,
    paymentMethod: 'credit-card',
    status: 'pending',
    date: new Date('2026-01-08T16:30:00'),
    description: 'Dermatology Treatment'
  },
  {
    id: '13',
    transactionId: 'WDR-2026-003',
    type: 'withdrawal',
    amount: 7500.00,
    paymentMethod: 'bank-transfer',
    status: 'completed',
    date: new Date('2026-01-08T09:45:00'),
    description: 'Year-end withdrawal to bank account ****5678',
    notes: 'Completed'
  },
  {
    id: '14',
    transactionId: 'TXN-2026-014',
    type: 'payment',
    amount: 680.00,
    paymentMethod: 'bank-transfer',
    status: 'failed',
    date: new Date('2026-01-07T14:00:00'),
    description: 'Orthopedic Surgery',
    notes: 'Transfer rejected by bank'
  },
  {
    id: '15',
    transactionId: 'TXN-2026-015',
    type: 'payment',
    amount: 290.00,
    paymentMethod: 'credit-card',
    status: 'completed',
    date: new Date('2026-01-06T10:15:00'),
    description: 'Eye Examination'
  },
]

// Keep mockPayments for backward compatibility with OverviewTab
export const mockPayments: Payment[] = [
  {
    id: '1',
    transactionId: 'TXN-2026-001',
    patientName: 'John Smith',
    amount: 250.00,
    paymentMethod: 'credit-card',
    status: 'completed',
    date: new Date('2026-01-15T10:30:00'),
    description: 'General Consultation'
  },
  {
    id: '2',
    transactionId: 'TXN-2026-002',
    patientName: 'Sarah Johnson',
    amount: 450.00,
    paymentMethod: 'insurance',
    status: 'pending',
    date: new Date('2026-01-14T14:20:00'),
    description: 'Physical Therapy Session'
  },
  {
    id: '3',
    transactionId: 'TXN-2026-003',
    patientName: 'Michael Brown',
    amount: 180.00,
    paymentMethod: 'cash',
    status: 'completed',
    date: new Date('2026-01-14T09:15:00'),
    description: 'Follow-up Appointment'
  },
  {
    id: '4',
    transactionId: 'TXN-2026-004',
    patientName: 'Emily Davis',
    amount: 320.00,
    paymentMethod: 'bank-transfer',
    status: 'completed',
    date: new Date('2026-01-13T16:45:00'),
    description: 'Dental Cleaning'
  },
  {
    id: '5',
    transactionId: 'TXN-2026-005',
    patientName: 'David Wilson',
    amount: 550.00,
    paymentMethod: 'credit-card',
    status: 'failed',
    date: new Date('2026-01-13T11:30:00'),
    description: 'MRI Scan'
  },
  {
    id: '6',
    transactionId: 'TXN-2026-006',
    patientName: 'Jessica Martinez',
    amount: 200.00,
    paymentMethod: 'insurance',
    status: 'pending',
    date: new Date('2026-01-12T15:20:00'),
    description: 'Lab Tests'
  },
  {
    id: '7',
    transactionId: 'TXN-2026-007',
    patientName: 'Robert Taylor',
    amount: 380.00,
    paymentMethod: 'credit-card',
    status: 'completed',
    date: new Date('2026-01-12T10:00:00'),
    description: 'X-Ray Examination'
  },
  {
    id: '8',
    transactionId: 'TXN-2026-008',
    patientName: 'Amanda Anderson',
    amount: 275.00,
    paymentMethod: 'cash',
    status: 'completed',
    date: new Date('2026-01-11T13:45:00'),
    description: 'Vaccination'
  },
]

export const mockWithdrawals: Withdrawal[] = [
  {
    id: '1',
    withdrawalNumber: 'WDR-2026-001',
    amount: 5000.00,
    withdrawalMethod: 'bank-transfer',
    status: 'completed',
    date: new Date('2026-01-12T14:30:00'),
    notes: 'Monthly withdrawal'
  },
  {
    id: '2',
    withdrawalNumber: 'WDR-2026-002',
    amount: 3500.00,
    withdrawalMethod: 'bank-transfer',
    status: 'pending',
    date: new Date('2026-01-14T09:00:00'),
    notes: 'Equipment purchase'
  },
  {
    id: '3',
    withdrawalNumber: 'WDR-2026-003',
    amount: 7500.00,
    withdrawalMethod: 'wire-transfer',
    status: 'completed',
    date: new Date('2026-01-07T16:00:00'),
  },
  {
    id: '4',
    withdrawalNumber: 'WDR-2026-004',
    amount: 2000.00,
    withdrawalMethod: 'paypal',
    status: 'rejected',
    date: new Date('2026-01-04T10:00:00'),
    notes: 'Insufficient balance'
  },
  {
    id: '5',
    withdrawalNumber: 'WDR-2025-005',
    amount: 4200.00,
    withdrawalMethod: 'bank-transfer',
    status: 'completed',
    date: new Date('2025-12-30T09:45:00'),
    notes: 'Year-end withdrawal'
  },
  {
    id: '6',
    withdrawalNumber: 'WDR-2025-006',
    amount: 2800.00,
    withdrawalMethod: 'check',
    status: 'completed',
    date: new Date('2025-12-22T15:20:00'),
  },
  {
    id: '7',
    withdrawalNumber: 'WDR-2025-007',
    amount: 1500.00,
    withdrawalMethod: 'paypal',
    status: 'pending',
    date: new Date('2026-01-16T11:00:00'),
  },
  {
    id: '8',
    withdrawalNumber: 'WDR-2025-008',
    amount: 6000.00,
    withdrawalMethod: 'wire-transfer',
    status: 'completed',
    date: new Date('2025-12-15T10:30:00'),
    notes: 'Quarterly distribution'
  },
]

