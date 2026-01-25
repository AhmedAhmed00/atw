/**
 * Step 1: Trip Creation Method
 */

import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, Download, FileText } from 'lucide-react'
import { AddTripFormData } from '../../../../schemas/addTripSchema'
import { cn } from '@/lib/utils'

export function Step1TripCreationMethod() {
  const form = useFormContext<AddTripFormData>()
  const creationMethod = form.watch('creationMethod')
  const uploadedFileName = form.watch('uploadedFileName')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ]
      
      if (allowedTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        form.setValue('uploadedFile', file)
        form.setValue('uploadedFileName', file.name)
      } else {
        alert('Please upload a CSV or XLSX file')
      }
    }
  }

  const handleDownloadTemplate = () => {
    // TODO: Implement template download
    console.log('Download template')
    // Create a CSV template and trigger download
    const csvContent = 'Patient Name,Service Level,Pickup Address,Drop-off Address,Date,Time\n'
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'trip_import_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
          How would you like to add trips?
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose between creating a single trip or importing multiple trips from a file
        </p>
      </div>

      <FormField
        control={form.control}
        name="creationMethod"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid gap-4 md:grid-cols-2"
              >
                <div>
                  <RadioGroupItem value="Single Trip" id="single-trip" className="sr-only" />
                  <Label
                    htmlFor="single-trip"
                    className={cn(
                      'flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-background p-6 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all',
                      field.value === 'Single Trip' && 'border-[#09B0B6] bg-[#09B0B6]/5'
                    )}
                  >
                    <div className="text-center space-y-2">
                      <FileText className="w-8 h-8 text-[#09B0B6]" />
                      <div className="font-semibold">Single Trip</div>
                      <div className="text-xs text-muted-foreground">
                        Create one trip at a time
                      </div>
                    </div>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="Batch Import" id="batch-import" className="sr-only" />
                  <Label
                    htmlFor="batch-import"
                    className={cn(
                      'flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-background p-6 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all',
                      field.value === 'Batch Import' && 'border-[#09B0B6] bg-[#09B0B6]/5'
                    )}
                  >
                    <div className="text-center space-y-2">
                      <Upload className="w-8 h-8 text-[#09B0B6]" />
                      <div className="font-semibold">Batch Import</div>
                      <div className="text-xs text-muted-foreground">
                        Import multiple trips from file
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {creationMethod === 'Batch Import' && (
        <Card className="border-2 border-[#09B0B6]/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDownloadTemplate}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Template
                </Button>
                <div className="flex-1">
                  <input
                    type="file"
                    id="file-upload"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="gap-2 w-full"
                  >
                    <Upload className="w-4 h-4" />
                    Upload File
                  </Button>
                </div>
              </div>

              {uploadedFileName && (
                <div className="p-3 bg-muted rounded-md flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#09B0B6]" />
                  <span className="text-sm font-medium">{uploadedFileName}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      form.setValue('uploadedFile', undefined)
                      form.setValue('uploadedFileName', undefined)
                    }}
                    className="ml-auto"
                  >
                    Remove
                  </Button>
                </div>
              )}

              <FormDescription>
                Accepted formats: CSV, XLSX. Maximum file size: 10MB
              </FormDescription>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

