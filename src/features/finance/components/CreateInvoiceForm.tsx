/**
 * CreateInvoiceForm Component
 * Form for creating invoices (similar to institution invoice creation)
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface CreateInvoiceFormProps {
  invoiceType: 'patient' | 'institution'
  onBack: () => void
  onCancel: () => void
}

// Mock data - in real app, this would come from API
const MOCK_PATIENTS = [
  { id: 'P-001', name: 'Ahmed Mohamed' },
  { id: 'P-002', name: 'Fatima Ali' },
  { id: 'P-003', name: 'Mohamed Hassan' },
  { id: 'P-004', name: 'Sara Ibrahim' },
]

const MOCK_INSTITUTIONS = [
  { id: 'INST-001', name: 'Cairo University Hospital' },
  { id: 'INST-002', name: 'Alexandria Medical Center' },
  { id: 'INST-003', name: 'Mansoura General Hospital' },
  { id: 'INST-004', name: 'Aswan Medical Complex' },
]

const MOCK_TRIPS = [
  { id: 't1', tripId: 'TRP-001', date: '2024-01-15', amount: 250.00 },
  { id: 't2', tripId: 'TRP-002', date: '2024-01-16', amount: 300.00 },
  { id: 't3', tripId: 'TRP-003', date: '2024-01-17', amount: 200.00 },
  { id: 't4', tripId: 'TRP-004', date: '2024-01-18', amount: 350.00 },
]

export function CreateInvoiceForm({ invoiceType, onBack, onCancel }: CreateInvoiceFormProps) {
  const navigate = useNavigate()
  const [selectedClient, setSelectedClient] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedTrips, setSelectedTrips] = useState<string[]>([])
  const [discount, setDiscount] = useState('0')
  const [tax, setTax] = useState('0')

  // Filter trips based on date range
  const filteredTrips = MOCK_TRIPS.filter((trip) => {
    if (!startDate || !endDate) return false
    return trip.date >= startDate && trip.date <= endDate
  })

  // Calculate totals
  const subtotal = selectedTrips.reduce((sum, tripId) => {
    const trip = MOCK_TRIPS.find((t) => t.id === tripId)
    return sum + (trip?.amount || 0)
  }, 0)

  const discountAmount = parseFloat(discount) || 0
  const taxAmount = parseFloat(tax) || 0
  const total = subtotal - discountAmount + taxAmount

  const handleTripToggle = (tripId: string) => {
    setSelectedTrips((prev) =>
      prev.includes(tripId)
        ? prev.filter((id) => id !== tripId)
        : [...prev, tripId]
    )
  }

  const handleSubmit = () => {
    // TODO: Submit invoice
    console.log('Creating invoice:', {
      invoiceType,
      client: selectedClient,
      trips: selectedTrips,
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total,
    })
    navigate('/finance/invoices')
  }

  const clients = invoiceType === 'patient' ? MOCK_PATIENTS : MOCK_INSTITUTIONS

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Create {invoiceType === 'patient' ? 'Patient' : 'Institution'} Invoice
          </CardTitle>
          <CardDescription>
            Select trips and generate invoice for {invoiceType === 'patient' ? 'patient' : 'institution'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Client Selection */}
          <div className="space-y-2">
            <Label htmlFor="client">
              {invoiceType === 'patient' ? 'Patient' : 'Institution'} <span className="text-red-500">*</span>
            </Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger id="client">
                <SelectValue placeholder={`Select ${invoiceType === 'patient' ? 'patient' : 'institution'}`} />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name} ({client.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Filter */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date <span className="text-red-500">*</span></Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date <span className="text-red-500">*</span></Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Trips Selection */}
          {startDate && endDate && (
            <div className="space-y-2">
              <Label>Select Trips</Label>
              <div className="border rounded-lg max-h-64 overflow-y-auto">
                {filteredTrips.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No trips found in the selected date range
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredTrips.map((trip) => (
                      <div
                        key={trip.id}
                        className="flex items-center space-x-3 p-3 hover:bg-accent/50 transition-colors"
                      >
                        <Checkbox
                          id={`trip-${trip.id}`}
                          checked={selectedTrips.includes(trip.id)}
                          onCheckedChange={() => handleTripToggle(trip.id)}
                        />
                        <Label
                          htmlFor={`trip-${trip.id}`}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{trip.tripId}</div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(trip.date).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="font-semibold">
                              ${trip.amount.toFixed(2)}
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Invoice Summary */}
          {selectedTrips.length > 0 && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Invoice Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selected Trips:</span>
                    <span className="font-medium">{selectedTrips.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label htmlFor="discount" className="text-muted-foreground">
                      Discount ($):
                    </Label>
                    <Input
                      id="discount"
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="w-32"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Label htmlFor="tax" className="text-muted-foreground">
                      Tax ($):
                    </Label>
                    <Input
                      id="tax"
                      type="number"
                      value={tax}
                      onChange={(e) => setTax(e.target.value)}
                      className="w-32"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold text-lg">
                    <span>Total Amount:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedClient || selectedTrips.length === 0}
                className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
              >
                Create Invoice
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

