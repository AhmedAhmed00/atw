# Payments Feature

A comprehensive payments management system for healthcare providers to track earnings, view payment history, and manage withdrawals.

## Structure

```
payments/
├── components/
│   ├── OverviewTab.tsx           # Overview dashboard with stats and recent transactions
│   ├── PaymentHistoryTab.tsx     # Payment history with filtering capabilities
│   ├── PaymentTableColumns.tsx   # Table column definitions for payments
│   ├── WithdrawalsTab.tsx        # Withdrawal history and management
│   ├── WithdrawalDialog.tsx      # Dialog form for new withdrawal requests
│   └── index.ts                  # Component exports
├── data/
│   └── mockPayments.ts           # Mock data for payments and withdrawals
├── types/
│   └── index.ts                  # TypeScript type definitions
├── index.tsx                     # Main payments page with tabs
└── README.md                     # This file
```

## Features

### Overview Tab
- **Stats Cards**: Display total earnings, available balance, pending amount, and current month earnings
- **Recent Transactions**: Shows the last 8 transactions with patient info, amount, status, and payment method
- **Visual Design**: Uses brand gradient colors and consistent styling

### Payment History Tab
- **Filter Tabs**: Filter payments by status (All, Completed, Pending, Failed)
- **Data Table**: Sortable and searchable table with the following columns:
  - Transaction ID with description
  - Patient name with avatar
  - Amount
  - Payment method with icon
  - Status badge
  - Date and time
- **Badge Counts**: Shows count for each status filter

### Withdrawals Tab
- **Available Balance**: Prominently displays current withdrawable balance
- **New Request Button**: Opens a dialog to submit withdrawal requests
- **Withdrawal History**: Lists all withdrawal requests with:
  - Amount
  - Bank account (masked)
  - Status with icon
  - Request and processed dates
  - Optional notes
- **Status States**: Completed, Pending, Rejected

### Withdrawal Dialog
- **Form Fields**:
  - Amount (validated against available balance)
  - Bank account number (masked format)
  - Optional notes
- **Validation**: Real-time form validation with error messages
- **Balance Display**: Shows available balance in alert banner

## Types

### Payment
```typescript
{
  id: string
  transactionId: string
  patientName: string
  amount: number
  paymentMethod: 'credit-card' | 'cash' | 'insurance' | 'bank-transfer'
  status: 'completed' | 'pending' | 'failed'
  date: Date
  description?: string
}
```

### PaymentStats
```typescript
{
  totalEarnings: number
  availableBalance: number
  pendingAmount: number
}
```

### Withdrawal
```typescript
{
  id: string
  amount: number
  bankAccount: string
  status: 'completed' | 'pending' | 'rejected'
  requestedDate: Date
  processedDate?: Date
  notes?: string
}
```

## Styling

The feature uses:
- Brand gradient colors from CSS variables (`--brand-gradient-from`, `--brand-gradient-to`)
- Shared `StatsCard` component for consistent card styling
- Shared `DataTable` component for table functionality
- shadcn/ui components (Card, Badge, Dialog, Tabs, etc.)
- Responsive design with mobile-first approach
- Dark mode support

## Usage

```typescript
import PaymentsPage from '@/features/payments'

// Or import individual components
import { OverviewTab, PaymentHistoryTab, WithdrawalsTab } from '@/features/payments/components'
```

## Future Enhancements

- [ ] Export payment history to CSV/PDF
- [ ] Payment receipt generation
- [ ] Advanced filtering (date range, amount range)
- [ ] Payment method analytics
- [ ] Bank account management
- [ ] Email notifications for withdrawals
- [ ] Payment disputes handling

