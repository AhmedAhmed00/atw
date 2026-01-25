/**
 * CreateInvoiceDialog Component
 * Dialog for creating a new invoice
 */

import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FormCheckbox } from './forms/FormCheckbox'
import { Filter, Receipt, DollarSign, Plus } from 'lucide-react'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'

// Mock trips data - in real app, this would come from API
const mockTrips = [
  {
    id: 't1',
    tripNumber: 'TRP-001',
    patient: 'Ahmed Mohamed Ali',
    date: '2024-01-15',
    service: 'ALS',
    route: 'Cairo → Alexandria',
    amount: 450.00,
    status: 'Completed',
  },
  {
    id: 't2',
    tripNumber: 'TRP-002',
    patient: 'Fatima Hassan',
    date: '2024-01-16',
    service: 'BLS',
    route: 'Cairo → Giza',
    amount: 320.00,
    status: 'Completed',
  },
  {
    id: 't3',
    tripNumber: 'TRP-003',
    patient: 'Mohamed Ibrahim',
    date: '2024-01-17',
    service: 'CCT',
    route: 'Alexandria → Cairo',
    amount: 580.00,
    status: 'Completed',
  },
  {
    id: 't4',
    tripNumber: 'TRP-004',
    patient: 'Sara Ahmed',
    date: '2024-01-18',
    service: 'Wheelchair',
    route: 'Giza → Cairo',
    amount: 250.00,
    status: 'Completed',
  },
  {
    id: 't5',
    tripNumber: 'TRP-005',
    patient: 'Omar Khaled',
    date: '2024-01-19',
    service: 'ALS',
    route: 'Cairo → Mansoura',
    amount: 520.00,
    status: 'Completed',
  },
]

type Trip = typeof mockTrips[0]

const invoiceSchema = z.object({
  discount: z.number().min(0, 'Discount must be positive').optional().or(z.literal(0)),
  tax: z.number().min(0, 'Tax must be positive').optional().or(z.literal(0)),
})

type InvoiceFormData = z.infer<typeof invoiceSchema>

interface CreateInvoiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  institutionId: string
}

export function CreateInvoiceDialog({
  open,
  onOpenChange,
  institutionId,
}: CreateInvoiceDialogProps) {
  const [startDate, setStartDate] = useState('2024-01-01')
  const [endDate, setEndDate] = useState('2024-01-31')
  const [selectedTrips, setSelectedTrips] = useState<string[]>([])
  const [isCreating, setIsCreating] = useState(false)

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      discount: 0,
      tax: 0,
    },
  })

  // Filter trips by date range
  const filteredTrips = useMemo(() => {
    return mockTrips.filter((trip) => {
      const tripDate = new Date(trip.date)
      const start = new Date(startDate)
      const end = new Date(endDate)
      return tripDate >= start && tripDate <= end
    })
  }, [startDate, endDate])

  // Get selected trip details
  const selectedTripDetails = useMemo(() => {
    return filteredTrips.filter((trip) => selectedTrips.includes(trip.id))
  }, [filteredTrips, selectedTrips])

  // Calculate invoice totals
  const subtotal = useMemo(() => {
    return selectedTripDetails.reduce((sum, trip) => sum + trip.amount, 0)
  }, [selectedTripDetails])

  const discount = form.watch('discount') || 0
  const tax = form.watch('tax') || 0
  const totalAmount = subtotal - discount + tax

  const handleTripToggle = (tripId: string) => {
    setSelectedTrips((prev) =>
      prev.includes(tripId)
        ? prev.filter((id) => id !== tripId)
        : [...prev, tripId]
    )
  }

  const handleSelectAll = () => {
    if (selectedTrips.length === filteredTrips.length) {
      setSelectedTrips([])
    } else {
      setSelectedTrips(filteredTrips.map((trip) => trip.id))
    }
  }

  const handleCreateInvoice = async (data: InvoiceFormData) => {
    setIsCreating(true)
    try {
      // TODO: Implement create invoice API call
      console.log('Creating invoice:', {
        institutionId,
        selectedTrips,
        subtotal,
        discount: data.discount,
        tax: data.tax,
        totalAmount,
      })
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert('Invoice created successfully!')
      // Reset form
      setSelectedTrips([])
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error('Error creating invoice:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleClose = () => {
    setSelectedTrips([])
    form.reset()
    setStartDate('2024-01-01')
    setEndDate('2024-01-31')
    onOpenChange(false)
  }

  const tripColumns: ColumnDef<Trip>[] = [
    {
      id: 'select',
      header: () => (
        <FormCheckbox
          checked={selectedTrips.length === filteredTrips.length && filteredTrips.length > 0}
          onCheckedChange={handleSelectAll}
        />
      ),
      cell: ({ row }) => (
        <FormCheckbox
          checked={selectedTrips.includes(row.original.id)}
          onCheckedChange={() => handleTripToggle(row.original.id)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'tripNumber',
      header: 'Trip Number',
      cell: ({ row }) => (
        <div className="font-medium text-[#05647A]">{row.getValue('tripNumber')}</div>
      ),
    },
    {
      accessorKey: 'patient',
      header: 'Patient',
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('date'))
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      },
    },
    {
      accessorKey: 'service',
      header: 'Service',
      cell: ({ row }) => (
        <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
          {row.getValue('service')}
        </Badge>
      ),
    },
    {
      accessorKey: 'route',
      header: 'Route',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const amount = row.getValue('amount') as number
        return (
          <div className="font-semibold text-[#09B0B6]">
            ${amount.toFixed(2)}
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <Badge
            variant="default"
            className="bg-green-500 hover:bg-green-600"
          >
            {status}
          </Badge>
        )
      },
    },
  ]

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Select trips and generate an invoice
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Date Filters */}
          <Card className="border-t-4 border-t-[#09B0B6]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter Trips
              </CardTitle>
              <CardDescription>
                Select a date range to filter available trips
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">Start Date</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">End Date</label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trips Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Select Trips</CardTitle>
              <CardDescription>
                {filteredTrips.length} trip(s) found in the selected date range
                {selectedTrips.length > 0 && ` • ${selectedTrips.length} selected`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={tripColumns} data={filteredTrips} />
            </CardContent>
          </Card>

          {/* Invoice Summary */}
          {selectedTrips.length > 0 && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateInvoice)} className="space-y-6">
                <Card className="border-t-4 border-t-[#05647A]">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Receipt className="w-4 h-4" />
                      Invoice Summary
                    </CardTitle>
                    <CardDescription>
                      Review and adjust invoice details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Selected Trips */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Selected Trips</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-4 bg-muted/30">
                        {selectedTripDetails.map((trip) => (
                          <div
                            key={trip.id}
                            className="flex items-center justify-between py-2 border-b last:border-0"
                          >
                            <div className="flex-1">
                              <div className="font-medium text-sm">{trip.tripNumber}</div>
                              <div className="text-xs text-muted-foreground">
                                {trip.patient} • {trip.date}
                              </div>
                            </div>
                            <div className="font-semibold text-[#09B0B6]">
                              ${trip.amount.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Invoice Totals */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-base">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                      </div>

                      <FormField
                        control={form.control}
                        name="discount"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Discount ($)</FormLabel>
                              <FormControl className="w-32">
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  {...field}
                                  value={field.value || 0}
                                  onChange={(e) =>
                                    field.onChange(parseFloat(e.target.value) || 0)
                                  }
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tax"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Tax ($)</FormLabel>
                              <FormControl className="w-32">
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  {...field}
                                  value={field.value || 0}
                                  onChange={(e) =>
                                    field.onChange(parseFloat(e.target.value) || 0)
                                  }
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between text-lg font-bold">
                          <span className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-[#09B0B6]" />
                            Total Amount
                          </span>
                          <span className="text-2xl text-[#05647A] dark:text-[#09B0B6]">
                            ${totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-4 pt-4 border-t">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={isCreating}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isCreating}
                        className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                      >
                        <Plus className="w-4 h-4" />
                        {isCreating ? 'Creating Invoice...' : 'Create Invoice'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

