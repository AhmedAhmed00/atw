/**
 * Step 4: Accessibility & Equipment
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
import { Textarea } from '@/components/ui/textarea'
import { FormCheckbox } from '../FormCheckbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { AddPatientFormData } from '../../../schemas/addPatientSchema'

const ACCESSIBILITY_CONSTRAINTS = [
  { value: 'Visual Impairment', label: 'Visual Impairment' },
  { value: 'Hearing Impairment', label: 'Hearing Impairment' },
  { value: 'Mobility Impairment', label: 'Mobility Impairment' },
  { value: 'Cognitive Impairment', label: 'Cognitive Impairment' },
  { value: 'Other', label: 'Other' },
] as const

const EQUIPMENT_OPTIONS = [
  { value: 'Oxygen Tank', label: 'Oxygen Tank' },
  { value: 'Wheelchair', label: 'Wheelchair' },
  { value: 'Stretcher', label: 'Stretcher' },
  { value: 'Ventilator', label: 'Ventilator' },
  { value: 'IV Pump', label: 'IV Pump' },
  { value: 'Other', label: 'Other' },
] as const

export function Step4Accessibility() {
  const form = useFormContext<AddPatientFormData>()
  const interpreterRequired = form.watch('interpreterRequired')

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="accessibilityConstraints"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Accessibility Constraints</FormLabel>
              <FormDescription>
                Select all applicable accessibility constraints
              </FormDescription>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {ACCESSIBILITY_CONSTRAINTS.map((constraint) => (
                <FormField
                  key={constraint.value}
                  control={form.control}
                  name="accessibilityConstraints"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={constraint.value}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                      >
                        <FormControl>
                          <FormCheckbox
                            checked={field.value?.includes(constraint.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, constraint.value])
                                : field.onChange(
                                    field.value?.filter((value: string) => value !== constraint.value)
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {constraint.label}
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

      <FormField
        control={form.control}
        name="equipmentNeeded"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Equipment Needed</FormLabel>
              <FormDescription>
                Select all equipment required for patient transport
              </FormDescription>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {EQUIPMENT_OPTIONS.map((equipment) => (
                <FormField
                  key={equipment.value}
                  control={form.control}
                  name="equipmentNeeded"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={equipment.value}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                      >
                        <FormControl>
                          <FormCheckbox
                            checked={field.value?.includes(equipment.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, equipment.value])
                                : field.onChange(
                                    field.value?.filter((value: string) => value !== equipment.value)
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {equipment.label}
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

      <FormField
        control={form.control}
        name="interpreterRequired"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Interpreter Required? *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="interpreter-yes" />
                  <Label htmlFor="interpreter-yes" className="font-normal cursor-pointer">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="interpreter-no" />
                  <Label htmlFor="interpreter-no" className="font-normal cursor-pointer">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {interpreterRequired === 'Yes' && (
        <FormField
          control={form.control}
          name="preferredLanguage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Language *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Arabic, Spanish, French" {...field} />
              </FormControl>
              <FormDescription>
                Language preference for interpreter services
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="escortRequired"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Escort Required? *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="escort-yes" />
                  <Label htmlFor="escort-yes" className="font-normal cursor-pointer">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="escort-no" />
                  <Label htmlFor="escort-no" className="font-normal cursor-pointer">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="communicationImpairments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Communication Impairments</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe any communication impairments or special considerations..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Any specific communication challenges or requirements
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="behavioralConsiderations"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Behavioral Considerations</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe any behavioral considerations or special needs..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Any behavioral considerations or special handling requirements
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

