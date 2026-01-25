/**
 * AddCertificationPage Component
 * Full-page route for adding a new certification
 */

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const certificationSchema = z.object({
  name: z.string().min(1, 'Certification name is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  status: z.enum(['Valid', 'Expiring Soon', 'Expired']),
})

type CertificationFormData = z.infer<typeof certificationSchema>

export function AddCertificationPage() {
  const navigate = useNavigate()
  const { employeeId } = useParams<{ employeeId: string }>()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: '',
      issueDate: '',
      expiryDate: '',
      status: 'Valid',
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
  }

  const handleSubmit = async (data: CertificationFormData) => {
    setIsLoading(true)

    const formData = {
      ...data,
      file: selectedFile,
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // TODO: Submit to API
    console.log('Creating certification:', {
      ...formData,
      fileName: selectedFile?.name,
    })

    setIsLoading(false)
    navigate(`/employees/${employeeId}`)
  }

  const handleCancel = () => {
    navigate(`/employees/${employeeId}`)
  }

  // Auto-update status based on expiry date
  const handleExpiryDateChange = (date: string) => {
    form.setValue('expiryDate', date)
    if (date) {
      const expiryDate = new Date(date)
      const today = new Date()
      const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysUntilExpiry < 0) {
        form.setValue('status', 'Expired')
      } else if (daysUntilExpiry < 90) {
        form.setValue('status', 'Expiring Soon')
      } else {
        form.setValue('status', 'Valid')
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="Add New Certification"
          description="Add a new certification or license for this employee"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleCancel}
          className="shrink-0 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Certification Information</CardTitle>
              <CardDescription>Enter certification details and upload supporting documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Advanced Cardiac Life Support (ACLS)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Issue Date and Expiry Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Issue Date <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Expiry Date <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            handleExpiryDateChange(e.target.value)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Status <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || 'Valid'}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Valid">Valid</SelectItem>
                        <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                        <SelectItem value="Expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Status is automatically updated based on expiry date, but can be manually adjusted
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File Upload */}
              <div className="space-y-2">
                <Label>
                  File <span className="text-muted-foreground">(Optional)</span>
                </Label>
                {selectedFile ? (
                  <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/30">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleRemoveFile}
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
                          htmlFor="file-upload"
                          className="cursor-pointer text-sm font-medium text-[#05647A] hover:text-[#09B0B6]"
                        >
                          Click to upload or drag and drop
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF, JPG, PNG (max 10MB)
                        </p>
                      </div>
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('file-upload')?.click()}
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              <Save className="h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save Certification'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddCertificationPage

