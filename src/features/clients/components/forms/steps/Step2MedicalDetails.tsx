/**
 * Step 2: Medical Details
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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormCheckbox } from '../FormCheckbox'
import { Label } from '@/components/ui/label'
import { AddPatientFormData } from '../../../schemas/addPatientSchema'

const CLINICAL_FLAGS = [
  { value: 'Isolation', label: 'Isolation' },
  { value: 'Seizure Risk', label: 'Seizure Risk' },
  { value: 'Fall Risk', label: 'Fall Risk' },
  { value: 'DNR', label: 'DNR (Do Not Resuscitate)' },
] as const

export function Step2MedicalDetails() {
  const form = useFormContext<AddPatientFormData>()

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="mobilityStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mobility Status *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select mobility status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Ambulatory">Ambulatory</SelectItem>
                <SelectItem value="Wheelchair">Wheelchair</SelectItem>
                <SelectItem value="Stretcher">Stretcher</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-6 md:grid-cols-3">
        <FormField
          control={form.control}
          name="baselineO2Level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Baseline O₂ Level (%) *</FormLabel>
              <FormControl>
                <Input type="number" placeholder="95" min="0" max="100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (cm) *</FormLabel>
              <FormControl>
                <Input type="number" placeholder="170" min="1" max="300" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (kg) *</FormLabel>
              <FormControl>
                <Input type="number" placeholder="70" min="1" max="500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="clinicalFlags"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Clinical Flags</FormLabel>
              <FormDescription>
                Select all applicable clinical flags for this patient
              </FormDescription>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {CLINICAL_FLAGS.map((flag) => (
                <FormField
                  key={flag.value}
                  control={form.control}
                  name="clinicalFlags"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={flag.value}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                      >
                        <FormControl>
                          <FormCheckbox
                            checked={field.value?.includes(flag.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, flag.value])
                                : field.onChange(
                                    field.value?.filter((value: string) => value !== flag.value)
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {flag.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

