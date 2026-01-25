/**
 * Step 1: Basic Information
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
import { Textarea } from '@/components/ui/textarea'
import { AddInstitutionFormData, GOVERNORATE_OPTIONS } from '../../../../schemas/addInstitutionSchema'
import { MapPicker } from '../MapPicker'

export function Step1BasicInfo() {
  const form = useFormContext<AddInstitutionFormData>()
  const address = form.watch('fullAddress')

  return (
    <div className="space-y-8">
      {/* Institution Information */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
            Institution Information
          </h3>
          <p className="text-sm text-muted-foreground">
            Basic details about the medical institution
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="institutionName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Cairo University Hospital" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="institutionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution Type *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select institution type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Hospital">Hospital</SelectItem>
                    <SelectItem value="Care Home">Care Home</SelectItem>
                    <SelectItem value="Government">Government</SelectItem>
                    <SelectItem value="Clinic">Clinic</SelectItem>
                    <SelectItem value="Medical Center">Medical Center</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="commercialRegistration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commercial Registration / National ID *</FormLabel>
                <FormControl>
                  <Input placeholder="12345-67890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax Number</FormLabel>
                <FormControl>
                  <Input placeholder="TAX-12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="establishmentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Establishment Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="governorate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Governorate *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select governorate" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GOVERNORATE_OPTIONS.map((gov) => (
                      <SelectItem key={gov} value={gov}>
                        {gov}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
          name="fullAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Address *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Street address, building number, district..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Complete street address including building and district information
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Management & Contact Info */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
            Management & Contact Info
          </h3>
          <p className="text-sm text-muted-foreground">
            Key personnel and contact information
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/30">
            <h4 className="font-semibold text-sm mb-4">General Manager</h4>
            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="generalManagerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. Ahmed Mohamed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="generalManagerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+20 100 123 4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="generalManagerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="gm@institution.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-muted/30">
            <h4 className="font-semibold text-sm mb-4">Contact Person</h4>
            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="contactPersonName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact Person Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPersonPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+20 100 123 4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPersonEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@institution.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="fax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fax</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+20 2 1234 5679" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
            Location
          </h3>
          <p className="text-sm text-muted-foreground">
            Select the institution location on the map
          </p>
        </div>

        <MapPicker
          latitude={form.watch('latitude')}
          longitude={form.watch('longitude')}
          onLocationChange={(lat, lng) => {
            form.setValue('latitude', lat)
            form.setValue('longitude', lng)
            form.trigger(['latitude', 'longitude'])
          }}
          address={address}
        />
      </div>
    </div>
  )
}

