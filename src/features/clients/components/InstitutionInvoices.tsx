/**
 * InstitutionInvoices Component
 * Invoice management tab for institution details
 */

import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, MoreVertical, Eye } from 'lucide-react'
import { DataTable } from '@/components/shared/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router'
import { ViewInvoiceDialog } from './ViewInvoiceDialog'

// Mock invoices data - in real app, this would come from API
const mockInvoices = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2024-001',
    issueDate: '2024-01-20',
    dueDate: '2024-02-20',
    trips: 5,
    amount: 2120.00,
    tax: 106.00,
    total: 2226.00,
    status: 'Paid',
    paidDate: '2024-01-25',
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2024-002',
    issueDate: '2024-02-01',
    dueDate: '2024-03-01',
    trips: 3,
    amount: 1350.00,
    tax: 67.50,
    total: 1417.50,
    status: 'Pending',
    paidDate: null,
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2024-003',
    issueDate: '2024-02-15',
    dueDate: '2024-03-15',
    trips: 8,
    amount: 3840.00,
    tax: 192.00,
    total: 4032.00,
    status: 'Overdue',
    paidDate: null,
  },
]

type Invoice = typeof mockInvoices[0]

interface InstitutionInvoicesProps {
  institutionId: string
}

export function InstitutionInvoices({ institutionId }: InstitutionInvoicesProps) {
  const navigate = useNavigate()
  const [viewInvoiceId, setViewInvoiceId] = useState<string | null>(null)

  const handleCreateInvoice = () => {
    navigate(`/clients/institutions/${institutionId}/invoices/new`)
  }

  const invoiceColumns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'invoiceNumber',
      header: 'Invoice #',
      cell: ({ row }) => (
        <div className="font-medium text-[#05647A]">{row.getValue('invoiceNumber')}</div>
      ),
    },
    {
      accessorKey: 'issueDate',
      header: 'Issue Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('issueDate'))
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      },
    },
    {
      accessorKey: 'dueDate',
      header: 'Due Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('dueDate'))
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      },
    },
    {
      accessorKey: 'trips',
      header: 'Trips',
      cell: ({ row }) => (
        <div className="font-semibold">{row.getValue('trips')}</div>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const amount = row.getValue('amount') as number
        return (
          <div className="font-semibold">
            ${amount.toFixed(2)}
          </div>
        )
      },
    },
    {
      accessorKey: 'tax',
      header: 'Tax',
      cell: ({ row }) => {
        const tax = row.getValue('tax') as number
        return (
          <div className="font-semibold">
            ${tax.toFixed(2)}
          </div>
        )
      },
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => {
        const total = row.getValue('total') as number
        return (
          <div className="font-semibold text-[#09B0B6]">
            ${total.toFixed(2)}
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const statusConfig: Record<string, { className: string }> = {
          Paid: { className: 'bg-green-500 hover:bg-green-600' },
          Pending: { className: 'bg-yellow-500 hover:bg-yellow-600' },
          Overdue: { className: 'bg-red-500 hover:bg-red-600' },
        }
        const config = statusConfig[status] || { className: '' }
        return (
          <Badge variant="default" className={config.className}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'paidDate',
      header: 'Paid Date',
      cell: ({ row }) => {
        const paidDate = row.getValue('paidDate') as string | null
        if (!paidDate) {
          return <span className="text-muted-foreground">—</span>
        }
        const date = new Date(paidDate)
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const invoice = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setViewInvoiceId(invoice.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6]">
            Invoices
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track institution invoices
          </p>
        </div>
        <Button
          onClick={handleCreateInvoice}
          className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Add Invoice
        </Button>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
            Invoices
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Complete list of all invoices for this institution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={invoiceColumns} data={mockInvoices} />
        </CardContent>
      </Card>

      {/* View Invoice Dialog */}
      {viewInvoiceId && (
        <ViewInvoiceDialog
          open={!!viewInvoiceId}
          onOpenChange={(open) => !open && setViewInvoiceId(null)}
          invoiceId={viewInvoiceId}
        />
      )}
    </div>
  )
}
