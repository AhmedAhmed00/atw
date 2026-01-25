/**
 * ViewInvoiceDialog Component
 * Dialog for viewing invoice details
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Receipt, Calendar, DollarSign, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock invoice details - in real app, this would come from API
const mockInvoiceDetails = {
  'inv-001': {
    invoiceNumber: 'INV-2024-001',
    issueDate: '2024-01-20',
    dueDate: '2024-02-20',
    paidDate: '2024-01-25',
    status: 'Paid',
    trips: [
      { tripNumber: 'TRP-001', patient: 'Ahmed Mohamed Ali', date: '2024-01-15', amount: 450.00 },
      { tripNumber: 'TRP-002', patient: 'Fatima Hassan', date: '2024-01-16', amount: 320.00 },
      { tripNumber: 'TRP-003', patient: 'Mohamed Ibrahim', date: '2024-01-17', amount: 580.00 },
      { tripNumber: 'TRP-004', patient: 'Sara Ahmed', date: '2024-01-18', amount: 250.00 },
      { tripNumber: 'TRP-005', patient: 'Omar Khaled', date: '2024-01-19', amount: 520.00 },
    ],
    subtotal: 2120.00,
    discount: 0,
    tax: 106.00,
    total: 2226.00,
  },
  'inv-002': {
    invoiceNumber: 'INV-2024-002',
    issueDate: '2024-02-01',
    dueDate: '2024-03-01',
    paidDate: null,
    status: 'Pending',
    trips: [
      { tripNumber: 'TRP-006', patient: 'Ahmed Mohamed Ali', date: '2024-01-20', amount: 450.00 },
      { tripNumber: 'TRP-007', patient: 'Fatima Hassan', date: '2024-01-21', amount: 320.00 },
      { tripNumber: 'TRP-008', patient: 'Mohamed Ibrahim', date: '2024-01-22', amount: 580.00 },
    ],
    subtotal: 1350.00,
    discount: 0,
    tax: 67.50,
    total: 1417.50,
  },
  'inv-003': {
    invoiceNumber: 'INV-2024-003',
    issueDate: '2024-02-15',
    dueDate: '2024-03-15',
    paidDate: null,
    status: 'Overdue',
    trips: [
      { tripNumber: 'TRP-009', patient: 'Sara Ahmed', date: '2024-01-23', amount: 250.00 },
      { tripNumber: 'TRP-010', patient: 'Omar Khaled', date: '2024-01-24', amount: 520.00 },
      { tripNumber: 'TRP-011', patient: 'Ahmed Mohamed Ali', date: '2024-01-25', amount: 450.00 },
      { tripNumber: 'TRP-012', patient: 'Fatima Hassan', date: '2024-01-26', amount: 320.00 },
      { tripNumber: 'TRP-013', patient: 'Mohamed Ibrahim', date: '2024-01-27', amount: 580.00 },
      { tripNumber: 'TRP-014', patient: 'Sara Ahmed', date: '2024-01-28', amount: 250.00 },
      { tripNumber: 'TRP-015', patient: 'Omar Khaled', date: '2024-01-29', amount: 520.00 },
      { tripNumber: 'TRP-016', patient: 'Ahmed Mohamed Ali', date: '2024-01-30', amount: 450.00 },
    ],
    subtotal: 3840.00,
    discount: 0,
    tax: 192.00,
    total: 4032.00,
  },
}

interface ViewInvoiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoiceId: string
}

export function ViewInvoiceDialog({ open, onOpenChange, invoiceId }: ViewInvoiceDialogProps) {
  const invoice = mockInvoiceDetails[invoiceId as keyof typeof mockInvoiceDetails]

  if (!invoice) {
    return null
  }

  const statusConfig: Record<string, { className: string }> = {
    Paid: { className: 'bg-green-500 hover:bg-green-600' },
    Pending: { className: 'bg-yellow-500 hover:bg-yellow-600' },
    Overdue: { className: 'bg-red-500 hover:bg-red-600' },
  }
  const statusStyle = statusConfig[invoice.status] || { className: '' }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Invoice Details
          </DialogTitle>
          <DialogDescription>
            View complete invoice information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Invoice Header */}
          <Card className="border-t-4 border-t-[#09B0B6]">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
                    {invoice.invoiceNumber}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="default" className={cn(statusStyle.className)}>
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-sm text-muted-foreground">Total Amount</div>
                  <div className="text-3xl font-bold text-[#05647A] dark:text-[#09B0B6]">
                    ${invoice.total.toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Issue Date</div>
                  <div className="text-base font-semibold mt-1">
                    {new Date(invoice.issueDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Due Date</div>
                  <div className="text-base font-semibold mt-1">
                    {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                {invoice.paidDate && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Paid Date</div>
                    <div className="text-base font-semibold mt-1">
                      {new Date(invoice.paidDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Trips List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Trips Included ({invoice.trips.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {invoice.trips.map((trip, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">{trip.tripNumber}</div>
                      <div className="text-xs text-muted-foreground">
                        {trip.patient} • {new Date(trip.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                    <div className="font-semibold text-[#09B0B6]">
                      ${trip.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Invoice Summary */}
          <Card className="border-t-4 border-t-[#05647A]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Invoice Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${invoice.subtotal.toFixed(2)}</span>
                </div>
                {invoice.discount > 0 && (
                  <div className="flex items-center justify-between text-base">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="font-semibold">-${invoice.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-base">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-semibold">${invoice.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#09B0B6]" />
                    Total Amount
                  </span>
                  <span className="text-2xl text-[#05647A] dark:text-[#09B0B6]">
                    ${invoice.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

