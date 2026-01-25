/**
 * Step 1: Role Selection
 * Full Registration Form - Step 1
 */

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { UserCheck } from 'lucide-react'
import { FullRegistrationFormData } from '../../../../schemas/fullRegistrationSchema'

const roleOptions = [
  { value: 'driver', label: 'Driver' },
  { value: 'emt', label: 'EMT (Emergency Medical Technician)' },
  { value: 'paramedic', label: 'Paramedic' },
  { value: 'rn', label: 'RN (Registered Nurse)' },
  { value: 'dispatcher', label: 'Dispatcher' },
  { value: 'supervisor', label: 'Supervisor' },
]

export function Step1Role() {
  const form = useFormContext<FullRegistrationFormData>()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-[#09B0B6]" />
          Role Selection
        </CardTitle>
        <CardDescription>Choose the primary role for this employee</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="primaryRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Primary Role <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-3"
                >
                  {roleOptions.map((role) => (
                    <div key={role.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={role.value} id={role.value} />
                      <Label
                        htmlFor={role.value}
                        className="font-normal cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {role.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

