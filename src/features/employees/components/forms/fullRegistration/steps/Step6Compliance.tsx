/**
 * Step 6: Compliance
 * Full Registration Form - Step 6
 */

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Upload, X, FileText, ShieldCheck } from 'lucide-react'
import { FullRegistrationFormData } from '../../../../schemas/fullRegistrationSchema'

export function Step6Compliance() {
  const form = useFormContext<FullRegistrationFormData>()
  const [backgroundCheckFile, setBackgroundCheckFile] = useState<File | null>(null)
  const [drugScreeningFile, setDrugScreeningFile] = useState<File | null>(null)
  const [immunizationFiles, setImmunizationFiles] = useState<File[]>([])

  const handleBackgroundCheckFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBackgroundCheckFile(file)
      form.setValue('backgroundCheck.report', file)
    }
  }

  const handleRemoveBackgroundCheckFile = () => {
    setBackgroundCheckFile(null)
    form.setValue('backgroundCheck.report', undefined)
  }

  const handleDrugScreeningFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setDrugScreeningFile(file)
      form.setValue('drugScreening.report', file)
    }
  }

  const handleRemoveDrugScreeningFile = () => {
    setDrugScreeningFile(null)
    form.setValue('drugScreening.report', undefined)
  }

  const handleImmunizationFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const newFiles = [...immunizationFiles, ...files]
      setImmunizationFiles(newFiles)
      form.setValue('immunization.documents', newFiles)
    }
  }

  const handleRemoveImmunizationFile = (index: number) => {
    const newFiles = immunizationFiles.filter((_, i) => i !== index)
    setImmunizationFiles(newFiles)
    form.setValue('immunization.documents', newFiles.length > 0 ? newFiles : undefined)
  }

  return (
    <div className="space-y-6">
      {/* Background Check */}
      <Card>
        <CardHeader>
          <CardTitle>Background Check</CardTitle>
          <CardDescription>Background check information and documentation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="backgroundCheck.date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Background Check Date <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Background Check Report</FormLabel>
            {backgroundCheckFile ? (
              <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/30">
                <div className="p-2 rounded-lg bg-[#09B0B6]/10">
                  <FileText className="w-5 h-5 text-[#09B0B6]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{backgroundCheckFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(backgroundCheckFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveBackgroundCheckFile}
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
                      htmlFor="background-check-upload"
                      className="cursor-pointer text-sm font-medium text-[#05647A] hover:text-[#09B0B6]"
                    >
                      Click to upload or drag and drop
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG (max 10MB)
                    </p>
                  </div>
                  <Input
                    id="background-check-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleBackgroundCheckFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('background-check-upload')?.click()}
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

      {/* Drug Screening */}
      <Card>
        <CardHeader>
          <CardTitle>Drug Screening</CardTitle>
          <CardDescription>Drug screening information and documentation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="drugScreening.date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Drug Screening Date <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Drug Screening Report</FormLabel>
            {drugScreeningFile ? (
              <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/30">
                <div className="p-2 rounded-lg bg-[#09B0B6]/10">
                  <FileText className="w-5 h-5 text-[#09B0B6]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{drugScreeningFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(drugScreeningFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveDrugScreeningFile}
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
                      htmlFor="drug-screening-upload"
                      className="cursor-pointer text-sm font-medium text-[#05647A] hover:text-[#09B0B6]"
                    >
                      Click to upload or drag and drop
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG (max 10MB)
                    </p>
                  </div>
                  <Input
                    id="drug-screening-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleDrugScreeningFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('drug-screening-upload')?.click()}
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

      {/* Immunization Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#09B0B6]" />
            Immunization Records
          </CardTitle>
          <CardDescription>Immunization documentation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="immunization.onFile"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Immunization on File</FormLabel>
                  <p className="text-xs text-muted-foreground">
                    Check if immunization records are on file
                  </p>
                </div>
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Immunization Documents</FormLabel>
            {immunizationFiles.length > 0 && (
              <div className="space-y-2">
                {immunizationFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
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
                      onClick={() => handleRemoveImmunizationFile(index)}
                      className="shrink-0 h-8 w-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="border-2 border-dashed rounded-lg p-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="p-3 rounded-lg bg-[#09B0B6]/10">
                  <Upload className="w-6 h-6 text-[#09B0B6]" />
                </div>
                <div className="text-center">
                  <Label
                    htmlFor="immunization-upload"
                    className="cursor-pointer text-sm font-medium text-[#05647A] hover:text-[#09B0B6]"
                  >
                    Click to upload or drag and drop
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG, PNG (multiple files allowed, max 10MB each)
                  </p>
                </div>
                <Input
                  id="immunization-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  onChange={handleImmunizationFilesChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('immunization-upload')?.click()}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Select Files
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

