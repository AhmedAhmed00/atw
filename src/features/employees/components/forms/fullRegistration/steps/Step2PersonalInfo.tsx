/**
 * Step 2: Personal Information
 * Full Registration Form - Step 2
 */

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User } from 'lucide-react'
import { FullRegistrationFormData } from '../../../../schemas/fullRegistrationSchema'

const homebaseOptions = [
  { value: 'emergency response', label: 'Emergency Response' },
  { value: 'transport', label: 'Transport' },
  { value: 'operations', label: 'Operations' },
  { value: 'administration', label: 'Administration' },
  { value: 'training', label: 'Training' },
]

export function Step2PersonalInfo() {
  const form = useFormContext<FullRegistrationFormData>()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-[#09B0B6]" />
          Personal Information
        </CardTitle>
        <CardDescription>Enter the employee's personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="homebase"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Homebase/Work Location <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select homebase/work location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {homebaseOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
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
          name="shiftAvailabilityNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shift Availability Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter shift availability notes..."
                  rows={4}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

