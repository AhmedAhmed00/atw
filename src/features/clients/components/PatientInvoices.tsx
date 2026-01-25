/**
 * PatientInvoices Component
 * Displays patient invoices with stats cards and table
 */

import { 
  Receipt, 
  CheckCircle2, 
  Clock,
  DollarSign,
  Download,
  Eye,
  MoreHorizontal
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/shared/table'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ColumnDef } from '@tanstack/react-table'
import { SortableHeader } from '@/components/shared/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { generatePatientInvoices, type PatientInvoice } from '../data/mockInvoicesData'
import { INVOICE_STATUS_CONFIG } from '@/utils/statusConfigs'
import { cn } from '@/lib/utils'

interface PatientInvoicesProps {
  patientId: string
}

const invoiceColumns: ColumnDef<PatientInvoice>[] = [
  {
      accessorKey: 'invoiceId',
      header: ({ column }) => <SortableHeader column={column}>Invoice ID</SortableHeader>,
      cell: ({ row }) => {
        return (
          <div className="font-medium text-[#05647A] font-mono">
            {row.getValue('invoiceId')}
          </div>
        )
      },
    },
    {
      accessorKey: 'date',
      header: ({ column }) => <SortableHeader column={column}>Date</SortableHeader>,
      cell: ({ row }) => {
        const date = new Date(row.getValue('date'))
        return (
          <div className="space-y-0.5">
            <div className="text-sm font-medium">
              {date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-xs text-muted-foreground">
              {date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'tripsIncluded',
      header: ({ column }) => <SortableHeader column={column}>Trips Included</SortableHeader>,
      cell: ({ row }) => {
        const trips = row.getValue('tripsIncluded') as number
        return (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-[#09B0B6] text-[#05647A] dark:text-[#09B0B6]">
              {trips} {trips === 1 ? 'Trip' : 'Trips'}
            </Badge>
          </div>
        )
      },
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => <SortableHeader column={column}>Amount</SortableHeader>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'))
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount)
        return <div className="font-semibold text-[#09B0B6]">{formatted}</div>
      },
    },
    {
      accessorKey: 'paymentMethod',
      header: ({ column }) => <SortableHeader column={column}>Payment Method</SortableHeader>,
      cell: ({ row }) => {
        const method = row.getValue('paymentMethod') as string
        const methodColors: Record<string, string> = {
          'Cash': 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
          'Credit Card': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
          'Bank Transfer': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
          'Insurance': 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800',
          'Pending': 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800',
        }
        return (
          <Badge variant="outline" className={cn("font-medium", methodColors[method] || '')}>
            {method}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return <StatusBadge status={status} config={INVOICE_STATUS_CONFIG} />
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
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => console.log('View invoice', invoice.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Download invoice', invoice.id)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
]

export function PatientInvoices({ patientId }: PatientInvoicesProps) {
  const { stats, invoices } = generatePatientInvoices(patientId, 15)

  const summaryCards: StatsCardProps[] = [
    {
      title: 'Total Invoices',
      value: stats.totalInvoices.toString(),
      icon: Receipt,
      colorVariant: 'primary',
    },
    {
      title: 'Paid',
      value: stats.paid.toString(),
      icon: CheckCircle2,
      colorVariant: 'success',
    },
    {
      title: 'Pending',
      value: stats.pending.toString(),
      icon: Clock,
      colorVariant: 'warning',
    },
    {
      title: 'Total Paid',
      value: `$${stats.totalPaid.toLocaleString()}`,
      icon: DollarSign,
      colorVariant: 'info',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCardGrid 
        cards={summaryCards} 
        columns={{ default: 1, sm: 2, lg: 4 }} 
      />

      {/* Invoices Table */}
      <Card className="border-t-4 border-t-[#09B0B6]">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6] flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={invoiceColumns} data={invoices} />
        </CardContent>
      </Card>
    </div>
  )
}

