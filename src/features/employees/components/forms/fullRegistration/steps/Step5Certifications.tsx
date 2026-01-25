/**
 * Step 5: Certifications
 * Full Registration Form - Step 5
 */

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Upload, X, FileText, Award } from 'lucide-react'
import { FullRegistrationFormData } from '../../../schemas/fullRegistrationSchema'

interface CertificationRowProps {
  name: string
  label: string
  expiryDateField: string
  fileField: string
}

function CertificationRow({ name, label, expiryDateField, fileField }: CertificationRowProps) {
  const form = useFormContext<FullRegistrationFormData>()
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      form.setValue(fileField as any, selectedFile)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    form.setValue(fileField as any, undefined)
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-[#05647A]">{label}</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={expiryDateField as any}
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

        <div className="space-y-2">
          <FormLabel>Certification File</FormLabel>
          {file ? (
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
              <div className="p-2 rounded-lg bg-[#09B0B6]/10">
                <FileText className="w-4 h-4 text-[#09B0B6]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                className="shrink-0 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-4">
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="w-5 h-5 text-muted-foreground" />
                <Label
                  htmlFor={`${name}-file-upload`}
                  className="cursor-pointer text-xs font-medium text-[#05647A] hover:text-[#09B0B6]"
                >
                  Upload File
                </Label>
                <Input
                  id={`${name}-file-upload`}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Step5Certifications() {
  const certifications = [
    { name: 'cpr', label: 'CPR', expiryDateField: 'cpr.expiryDate', fileField: 'cpr.file' },
    { name: 'acls', label: 'ACLS', expiryDateField: 'acls.expiryDate', fileField: 'acls.file' },
    { name: 'pals', label: 'PALS', expiryDateField: 'pals.expiryDate', fileField: 'pals.file' },
  ]

  const trainingCertifications = [
    { name: 'hipaa', label: 'HIPAA', expiryDateField: 'hipaa.expiryDate', fileField: 'hipaa.file' },
    { name: 'patientHandling', label: 'Patient Handling', expiryDateField: 'patientHandling.expiryDate', fileField: 'patientHandling.file' },
    { name: 'wheelchairSecurement', label: 'Wheelchair Securement', expiryDateField: 'wheelchairSecurement.expiryDate', fileField: 'wheelchairSecurement.file' },
  ]

  return (
    <div className="space-y-6">
      {/* Medical Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#09B0B6]" />
            Medical Certifications
          </CardTitle>
          <CardDescription>Required medical certifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {certifications.map((cert) => (
            <CertificationRow
              key={cert.name}
              name={cert.name}
              label={cert.label}
              expiryDateField={cert.expiryDateField}
              fileField={cert.fileField}
            />
          ))}
        </CardContent>
      </Card>

      {/* Training Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#09B0B6]" />
            Training Certifications
          </CardTitle>
          <CardDescription>Required training certifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {trainingCertifications.map((cert) => (
            <CertificationRow
              key={cert.name}
              name={cert.name}
              label={cert.label}
              expiryDateField={cert.expiryDateField}
              fileField={cert.fileField}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

