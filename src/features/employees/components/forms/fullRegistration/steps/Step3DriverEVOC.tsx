/**
 * Step 3: Driver & EVOC
 * Full Registration Form - Step 3
 */

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Upload, X, FileText } from 'lucide-react'
import { FullRegistrationFormData } from '../../../../schemas/fullRegistrationSchema'

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

export function Step3DriverEVOC() {
  const form = useFormContext<FullRegistrationFormData>()
  const [evocFile, setEvocFile] = useState<File | null>(null)

  const handleEvocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setEvocFile(file)
      form.setValue('evocCertification.file', file)
    }
  }

  const handleRemoveEvocFile = () => {
    setEvocFile(null)
    form.setValue('evocCertification.file', undefined)
  }

  return (
    <div className="space-y-6">
      {/* Driver License */}
      <Card>
        <CardHeader>
          <CardTitle>Driver License</CardTitle>
          <CardDescription>Driver license information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="driverLicense.number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  License Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter license number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="driverLicense.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    State <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="driverLicense.expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Expiry Date <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* EVOC Certification */}
      <Card>
        <CardHeader>
          <CardTitle>EVOC Certification</CardTitle>
          <CardDescription>Emergency Vehicle Operations Course certification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="evocCertification.certificationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Certification Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter certification number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="evocCertification.expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Expiry Date <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EVOC Certificate File Upload */}
          <div className="space-y-2">
            <FormLabel>
              EVOC Certificate <span className="text-red-500">*</span>
            </FormLabel>
            {evocFile ? (
              <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/30">
                <div className="p-2 rounded-lg bg-[#09B0B6]/10">
                  <FileText className="w-5 h-5 text-[#09B0B6]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{evocFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(evocFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveEvocFile}
                  className="shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-6">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="p-3 rounded-lg bg-[#09B0B6]/10">
                    <Upload className="w-6 h-6 text-[#09B0B6]" />
                  </div>
                  <div className="text-center">
                    <Label
                      htmlFor="evoc-file-upload"
                      className="cursor-pointer text-sm font-medium text-[#05647A] hover:text-[#09B0B6]"
                    >
                      Click to upload or drag and drop
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG (max 10MB)
                    </p>
                  </div>
                  <Input
                    id="evoc-file-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleEvocFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('evoc-file-upload')?.click()}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Select File
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

