/**
 * Step 5: Contact & Address
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
import { AddPatientFormData } from '../../../schemas/addPatientSchema'
import { Separator } from '@/components/ui/separator'

export function Step5ContactAddress() {
  const form = useFormContext<AddPatientFormData>()

  return (
    <div className="space-y-6">
      {/* Emergency Contact Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6]">
            Emergency Contact
          </h3>
          <p className="text-sm text-muted-foreground">
            Primary emergency contact information
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="emergencyContactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergencyContactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone *</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Care Team Contact */}
      <FormField
        control={form.control}
        name="careTeamContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Care Team Contact</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Primary care physician, specialist, or care coordinator contact information..."
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Additional care team members or healthcare providers
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      {/* Address Information */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6]">
            Address Information
          </h3>
          <p className="text-sm text-muted-foreground">
            Patient's residential address
          </p>
        </div>

        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1 *</FormLabel>
              <FormControl>
                <Input placeholder="123 Main Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2</FormLabel>
              <FormControl>
                <Input placeholder="Apartment, Suite, Unit, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City *</FormLabel>
                <FormControl>
                  <Input placeholder="Cairo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province *</FormLabel>
                <FormControl>
                  <Input placeholder="Cairo Governorate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code *</FormLabel>
                <FormControl>
                  <Input placeholder="12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Compliance Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6]">
            Compliance
          </h3>
          <p className="text-sm text-muted-foreground">
            Required documentation verification
          </p>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="consentOnFile"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <FormCheckbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">
                    Consent on File *
                  </FormLabel>
                  <FormDescription>
                    Patient consent documentation is on file and verified
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photoIdOnFile"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <FormCheckbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">
                    Photo ID on File *
                  </FormLabel>
                  <FormDescription>
                    Valid photo identification is on file and verified
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <FormMessage />
      </div>
    </div>
  )
}

