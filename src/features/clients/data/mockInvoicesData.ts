/**
 * Mock Invoices Data
 * Sample data for patient invoices
 */

export interface PatientInvoice {
  id: string
  invoiceId: string
  date: string
  tripsIncluded: number
  amount: number
  paymentMethod: 'Cash' | 'Credit Card' | 'Bank Transfer' | 'Insurance' | 'Pending'
  status: 'Paid' | 'Pending' | 'Overdue' | 'Cancelled'
}

interface InvoiceStats {
  totalInvoices: number
  paid: number
  pending: number
  totalPaid: number
}

// Generate mock invoices
export function generatePatientInvoices(patientId: string, count: number = 12): {
  stats: InvoiceStats
  invoices: PatientInvoice[]
} {
  const paymentMethods: PatientInvoice['paymentMethod'][] = [
    'Cash',
    'Credit Card',
    'Bank Transfer',
    'Insurance',
    'Pending',
  ]

  const statuses: PatientInvoice['status'][] = ['Paid', 'Pending', 'Overdue', 'Cancelled']

  const invoices: PatientInvoice[] = []
  let paidCount = 0
  let pendingCount = 0
  let totalPaid = 0

  for (let i = 0; i < count; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (i * 5 + Math.floor(Math.random() * 3)))
    
    const tripsIncluded = Math.floor(Math.random() * 5) + 1
    const amount = Math.floor(Math.random() * 500) + 50
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const paymentMethod = status === 'Paid' 
      ? paymentMethods[Math.floor(Math.random() * 4)] // Exclude 'Pending' for paid
      : status === 'Pending'
      ? 'Pending'
      : paymentMethods[Math.floor(Math.random() * paymentMethods.length)]

    if (status === 'Paid') {
      paidCount++
      totalPaid += amount
    } else if (status === 'Pending') {
      pendingCount++
    }

    invoices.push({
      id: `invoice-${patientId}-${i + 1}`,
      invoiceId: `INV-${patientId}-${String(i + 1).padStart(4, '0')}`,
      date: date.toISOString(),
      tripsIncluded,
      amount,
      paymentMethod,
      status,
    })
  }

  return {
    stats: {
      totalInvoices: invoices.length,
      paid: paidCount,
      pending: pendingCount,
      totalPaid,
    },
    invoices: invoices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  }
}

