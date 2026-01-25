/**
 * InvoicesPage Component
 * Manage all invoices for patients and institutions
 */

import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { FileText, Plus, Upload, Download, Printer, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { InvoiceStatsCards } from '../components/InvoiceStatsCards'
import { invoices, invoiceStats, Invoice } from '../data/mockInvoicesData'

export function InvoicesPage() {
  const navigate = useNavigate()

  const handleAddInvoice = () => {
    navigate('/finance/invoices/new')
  }

  const handleImport = () => {
    // TODO: Implement import functionality
    console.log('Import invoices')
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export invoices')
  }

  const handlePrint = () => {
    window.print()
  }

  const handleView = (invoiceId: string) => {
    // TODO: Navigate to invoice detail page
    console.log('View invoice:', invoiceId)
  }

  const handleEdit = (invoiceId: string) => {
    // TODO: Navigate to edit invoice page
    console.log('Edit invoice:', invoiceId)
  }

  const handleDelete = (invoiceId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete invoice:', invoiceId)
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
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => {
        const type = row.getValue('type') as string
        const typeConfig: Record<string, { className: string }> = {
          Patient: { className: 'bg-blue-500 hover:bg-blue-600' },
          Institution: { className: 'bg-purple-500 hover:bg-purple-600' },
        }
        const config = typeConfig[type] || { className: '' }
        return (
          <Badge variant="default" className={config.className}>
            {type}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'client',
      header: 'Client',
      cell: ({ row }) => {
        const invoice = row.original
        return (
          <div>
            <div className="font-medium">{invoice.client}</div>
            <div className="text-xs text-muted-foreground">{invoice.clientId}</div>
          </div>
        )
      },
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
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const amount = row.getValue('amount') as number
        return (
          <div className="font-semibold">
            ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
              <DropdownMenuItem onClick={() => handleView(invoice.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(invoice.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(invoice.id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Invoices"
          description="Manage all invoices for patients and institutions"
          icon={FileText}
        />
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <Button
            variant="outline"
            onClick={handleImport}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            onClick={handlePrint}
            className="gap-2"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            onClick={handleAddInvoice}
            className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add New Invoice
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <InvoiceStatsCards stats={invoiceStats} />

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
            Invoices
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Complete list of all invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={invoiceColumns} data={invoices} />
        </CardContent>
      </Card>
    </div>
  )
}

export default InvoicesPage

