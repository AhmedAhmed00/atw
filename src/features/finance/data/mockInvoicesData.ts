/**
 * Mock Invoices Data
 */

export interface Invoice {
  id: string
  invoiceNumber: string
  type: 'Patient' | 'Institution'
  client: string
  clientId: string
  issueDate: string
  dueDate: string
  amount: number
  status: 'Paid' | 'Pending' | 'Overdue'
  paidDate?: string
}

export const invoices: Invoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-2024-001',
    type: 'Patient',
    client: 'Ahmed Mohamed',
    clientId: 'P-001',
    issueDate: '2024-01-15',
    dueDate: '2024-02-15',
    amount: 1250.00,
    status: 'Paid',
    paidDate: '2024-01-20',
  },
  {
    id: 'inv2',
    invoiceNumber: 'INV-2024-002',
    type: 'Institution',
    client: 'Cairo University Hospital',
    clientId: 'INST-001',
    issueDate: '2024-01-10',
    dueDate: '2024-02-10',
    amount: 15000.00,
    status: 'Pending',
  },
  {
    id: 'inv3',
    invoiceNumber: 'INV-2024-003',
    type: 'Patient',
    client: 'Fatima Ali',
    clientId: 'P-002',
    issueDate: '2024-01-12',
    dueDate: '2024-02-12',
    amount: 850.00,
    status: 'Paid',
    paidDate: '2024-01-18',
  },
  {
    id: 'inv4',
    invoiceNumber: 'INV-2024-004',
    type: 'Institution',
    client: 'Alexandria Medical Center',
    clientId: 'INST-002',
    issueDate: '2024-01-08',
    dueDate: '2024-02-08',
    amount: 22000.00,
    status: 'Overdue',
  },
  {
    id: 'inv5',
    invoiceNumber: 'INV-2024-005',
    type: 'Patient',
    client: 'Mohamed Hassan',
    clientId: 'P-003',
    issueDate: '2024-01-18',
    dueDate: '2024-02-18',
    amount: 950.00,
    status: 'Pending',
  },
  {
    id: 'inv6',
    invoiceNumber: 'INV-2024-006',
    type: 'Institution',
    client: 'Mansoura General Hospital',
    clientId: 'INST-003',
    issueDate: '2024-01-14',
    dueDate: '2024-02-14',
    amount: 18000.00,
    status: 'Paid',
    paidDate: '2024-01-25',
  },
  {
    id: 'inv7',
    invoiceNumber: 'INV-2024-007',
    type: 'Patient',
    client: 'Sara Ibrahim',
    clientId: 'P-004',
    issueDate: '2024-01-20',
    dueDate: '2024-02-20',
    amount: 1100.00,
    status: 'Pending',
  },
  {
    id: 'inv8',
    invoiceNumber: 'INV-2024-008',
    type: 'Institution',
    client: 'Aswan Medical Complex',
    clientId: 'INST-004',
    issueDate: '2024-01-05',
    dueDate: '2024-02-05',
    amount: 25000.00,
    status: 'Overdue',
  },
]

// Calculate stats
export const invoiceStats = {
  totalInvoices: invoices.length,
  totalAmount: invoices.reduce((sum, inv) => sum + inv.amount, 0),
  pending: invoices.filter((inv) => inv.status === 'Pending').length,
  paid: invoices.filter((inv) => inv.status === 'Paid').length,
}

