/**
 * Step 3: Insurance Information
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { AddPatientFormData } from '../../../schemas/addPatientSchema'

export function Step3Insurance() {
  const form = useFormContext<AddPatientFormData>()
  const priorAuth = form.watch('priorAuthorization')

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="payerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payer Name *</FormLabel>
              <FormControl>
                <Input placeholder="Insurance Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payerMemberId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payer Member ID *</FormLabel>
              <FormControl>
                <Input placeholder="MEMBER-12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="payerPlan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payer Plan *</FormLabel>
            <FormControl>
              <Input placeholder="Plan Name/Type" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="priorAuthorization"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Prior Authorization Required? *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="prior-auth-yes" />
                  <Label htmlFor="prior-auth-yes" className="font-normal cursor-pointer">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="prior-auth-no" />
                  <Label htmlFor="prior-auth-no" className="font-normal cursor-pointer">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {priorAuth === 'Yes' && (
        <div className="space-y-6 p-4 border rounded-lg bg-muted/30">
          <h4 className="font-semibold text-sm">Authorization Details</h4>
          
          <FormField
            control={form.control}
            name="authorizationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Authorization Number *</FormLabel>
                <FormControl>
                  <Input placeholder="AUTH-12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="authorizationStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authorizationEndDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      )}
    </div>
  )
}

