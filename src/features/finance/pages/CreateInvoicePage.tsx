/**
 * CreateInvoicePage Component
 * Full-page route for creating new invoices
 * Allows selection between Patient or Institution invoice
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { FileText, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import { CreateInvoiceForm } from '../components/CreateInvoiceForm'

export function CreateInvoicePage() {
  const navigate = useNavigate()
  const [invoiceType, setInvoiceType] = useState<'patient' | 'institution' | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="Create New Invoice"
          description="Generate invoice for patient or institution"
          icon={FileText}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/finance/invoices')}
          className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {!invoiceType ? (
        <Card>
          <CardHeader>
            <CardTitle>Select Invoice Type</CardTitle>
            <CardDescription>
              Choose whether to create an invoice for a patient or an institution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Select the type of invoice you want to create. You will be able to select the specific patient or institution in the next step.
              </AlertDescription>
            </Alert>

            <RadioGroup value={invoiceType || ''} onValueChange={(value) => setInvoiceType(value as 'patient' | 'institution')}>
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                <RadioGroupItem value="patient" id="patient" />
                <Label htmlFor="patient" className="flex-1 cursor-pointer">
                  <div className="font-medium">Patient Invoice</div>
                  <div className="text-sm text-muted-foreground">
                    Create an invoice for an individual patient
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                <RadioGroupItem value="institution" id="institution" />
                <Label htmlFor="institution" className="flex-1 cursor-pointer">
                  <div className="font-medium">Institution Invoice</div>
                  <div className="text-sm text-muted-foreground">
                    Create an invoice for a medical institution
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      ) : (
        <CreateInvoiceForm
          invoiceType={invoiceType}
          onBack={() => setInvoiceType(null)}
          onCancel={() => navigate('/finance/invoices')}
        />
      )}
    </div>
  )
}

export default CreateInvoicePage

