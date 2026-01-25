/**
 * InstitutionContract Component
 * Contract management tab for institution details
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Calendar, Save, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

const serviceOptions = [
  { value: 'ambulatory', label: 'Ambulatory' },
  { value: 'wheelchair', label: 'Wheelchair' },
  { value: 'stretcher', label: 'Stretcher' },
  { value: 'bls', label: 'BLS' },
  { value: 'als', label: 'ALS' },
  { value: 'cct', label: 'CCT' },
] as const

const rateDetailsSchema = z.object({
  baseRate: z.number().min(0, 'Base rate must be positive').optional(),
  perMileRate: z.number().min(0, 'Per mile rate must be positive').optional(),
  perWaitRate: z.number().min(0, 'Per wait rate must be positive').optional(),
  stairCarryFee: z.number().min(0, 'Stair carry fee must be positive').optional(),
  waitTimePerMin: z.number().min(0, 'Wait time per minute must be positive').optional(),
  afterHoursMultiplier: z.number().min(0, 'After hours multiplier must be positive').optional(),
  holidayMultiplier: z.number().min(0, 'Holiday multiplier must be positive').optional(),
  roundingSurcharge: z.number().min(0, 'Rounding surcharge must be positive').optional(),
  noShowFee: z.number().min(0, 'No show fee must be positive').optional(),
  cancellationFee: z.number().min(0, 'Cancellation fee must be positive').optional(),
  effectiveStartDate: z.string().min(1, 'Effective start date is required'),
  effectiveDueDate: z.string().min(1, 'Effective due date is required'),
  notes: z.string().optional(),
})

type RateDetailsFormData = z.infer<typeof rateDetailsSchema>

interface InstitutionContractProps {
  institutionId: string
}

export function InstitutionContract({ institutionId }: InstitutionContractProps) {
  const [selectedService, setSelectedService] = useState<string>('ambulatory')
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<RateDetailsFormData>({
    resolver: zodResolver(rateDetailsSchema),
    defaultValues: {
      baseRate: undefined,
      perMileRate: undefined,
      perWaitRate: undefined,
      stairCarryFee: undefined,
      waitTimePerMin: undefined,
      afterHoursMultiplier: undefined,
      holidayMultiplier: undefined,
      roundingSurcharge: undefined,
      noShowFee: undefined,
      cancellationFee: undefined,
      effectiveStartDate: '2024-01-01',
      effectiveDueDate: '2024-12-31',
      notes: '',
    },
  })

  const handleSaveDraft = async (data: RateDetailsFormData) => {
    setIsSaving(true)
    try {
      // TODO: Implement save draft API call
      console.log('Saving draft:', { selectedService, ...data })
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert('Draft saved successfully!')
    } catch (error) {
      console.error('Error saving draft:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveContract = async (data: RateDetailsFormData) => {
    setIsSaving(true)
    try {
      // TODO: Implement save contract API call
      console.log('Saving contract:', { selectedService, ...data })
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert('Contract saved successfully!')
    } catch (error) {
      console.error('Error saving contract:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const getServiceLabel = (value: string) => {
    return serviceOptions.find((opt) => opt.value === value)?.label || value
  }

  return (
    <div className="space-y-6">
      {/* Contract Period */}
      <Card className="border-t-4 border-t-[#09B0B6]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Contract Period
          </CardTitle>
          <CardDescription>
            {form.watch('effectiveStartDate')} to {form.watch('effectiveDueDate')}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Service Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Service Selection</CardTitle>
          <CardDescription>
            Select the services included in this contract
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedService}
            onValueChange={setSelectedService}
            className="grid gap-3 md:grid-cols-3"
          >
            {serviceOptions.map((service) => (
              <div key={service.value}>
                <RadioGroupItem value={service.value} id={service.value} className="sr-only" />
                <Label
                  htmlFor={service.value}
                  className={cn(
                    'flex items-center space-x-3 rounded-md border-2 border-muted p-4 hover:bg-accent/50 transition-colors cursor-pointer',
                    selectedService === service.value && 'border-[#09B0B6] bg-[#09B0B6]/5'
                  )}
                >
                  <div className="flex-1">
                    <span className="font-normal cursor-pointer text-base">
                      {service.label}
                    </span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Rate Details Form */}
      {selectedService && (
        <Form {...form}>
          <form className="space-y-6">
            <Card className="border-t-4 border-t-[#05647A]">
              <CardHeader>
                <CardTitle className="text-base">
                  {getServiceLabel(selectedService)} Rate Details
                </CardTitle>
                <CardDescription>
                  Configure pricing and terms for {getServiceLabel(selectedService)} service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="baseRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Rate ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="perMileRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Per Mile Rate ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="perWaitRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Per Wait Rate ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stairCarryFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stair Carry Fee ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="waitTimePerMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wait Time/Min ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="afterHoursMultiplier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>After Hours Multiplier</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            {...field}
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="holidayMultiplier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Holiday Multiplier</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            {...field}
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roundingSurcharge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rounding Surcharge ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="noShowFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No Show Fee ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cancellationFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cancellation Fee ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="effectiveStartDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Effective Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="effectiveDueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Effective Due Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes / Terms</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter contract terms, notes, or special conditions..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Additional terms, conditions, or notes for this contract
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={form.handleSubmit(handleSaveDraft)}
                disabled={isSaving}
                className="gap-2"
              >
                <FileText className="w-4 h-4" />
                Save as Draft
              </Button>
              <Button
                type="button"
                onClick={form.handleSubmit(handleSaveContract)}
                disabled={isSaving}
                className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Contract'}
              </Button>
            </div>
          </form>
        </Form>
      )}

    </div>
  )
}

