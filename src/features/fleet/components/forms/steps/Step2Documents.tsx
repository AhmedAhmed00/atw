/**
 * Step 2: Upload Vehicle Documents
 */

import { useFormContext, useFieldArray } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Controller } from 'react-hook-form'
import { AddVehicleFormData } from '../../../schemas/addVehicleSchema'
import { FILE_TYPE_OPTIONS } from '../../../schemas/addVehicleSchema'
import { Plus, Trash2, Upload } from 'lucide-react'
import { StepErrorSummary } from '@/features/clients/components/forms/StepErrorSummary'

export function Step2Documents() {
  const {
    control,
    register,
    formState: { errors },
    trigger,
  } = useFormContext<AddVehicleFormData>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'documents',
  })

  const handleAddDocument = () => {
    append({
      fileName: '',
      fileType: 'Registration',
      expiryDate: '',
      file: undefined,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
          Upload Vehicle Documents
        </h2>
        <p className="text-muted-foreground mt-1">
          Upload and manage vehicle-related documents
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Documents</CardTitle>
          <CardDescription>Upload registration, insurance, inspection, and other documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No documents added yet.</p>
              <p className="text-sm">Click "Add Document" to upload a file.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <Card key={field.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Document {index + 1}</h4>
                        {fields.length > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* File Name */}
                        <div className="space-y-2">
                          <Label htmlFor={`documents.${index}.fileName`}>
                            File Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            {...register(`documents.${index}.fileName`)}
                            className={errors.documents?.[index]?.fileName ? 'border-red-500' : ''}
                            onBlur={() => trigger(`documents.${index}.fileName`)}
                          />
                          {errors.documents?.[index]?.fileName && (
                            <p className="text-sm text-red-500">
                              {errors.documents[index]?.fileName?.message}
                            </p>
                          )}
                        </div>

                        {/* File Type */}
                        <div className="space-y-2">
                          <Label htmlFor={`documents.${index}.fileType`}>
                            File Type <span className="text-red-500">*</span>
                          </Label>
                          <Controller
                            name={`documents.${index}.fileType`}
                            control={control}
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger
                                  className={errors.documents?.[index]?.fileType ? 'border-red-500' : ''}
                                  onBlur={() => trigger(`documents.${index}.fileType`)}
                                >
                                  <SelectValue placeholder="Select file type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {FILE_TYPE_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.documents?.[index]?.fileType && (
                            <p className="text-sm text-red-500">
                              {errors.documents[index]?.fileType?.message}
                            </p>
                          )}
                        </div>

                        {/* Expiry Date */}
                        <div className="space-y-2">
                          <Label htmlFor={`documents.${index}.expiryDate`}>Expiry Date</Label>
                          <Input
                            type="date"
                            {...register(`documents.${index}.expiryDate`)}
                            className={errors.documents?.[index]?.expiryDate ? 'border-red-500' : ''}
                          />
                          {errors.documents?.[index]?.expiryDate && (
                            <p className="text-sm text-red-500">
                              {errors.documents[index]?.expiryDate?.message}
                            </p>
                          )}
                        </div>

                        {/* Upload File */}
                        <div className="space-y-2">
                          <Label htmlFor={`documents.${index}.file`}>Upload File</Label>
                          <Controller
                            name={`documents.${index}.file`}
                            control={control}
                            render={({ field: { onChange, value, ...field } }) => (
                              <div>
                                <Input
                                  {...field}
                                  type="file"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    onChange(file)
                                  }}
                                  className="cursor-pointer"
                                />
                                {value && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Selected: {(value as File)?.name}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={handleAddDocument}
            className="w-full gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Document
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

