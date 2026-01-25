/**
 * Step 2: Contract Details
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormCheckbox } from '../../FormCheckbox'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { AddInstitutionFormData, SERVICE_OPTIONS } from '../../../../schemas/addInstitutionSchema'
import { cn } from '@/lib/utils'

import { Input } from '@/components/ui/input'

export function Step2ContractDetails() {
  const form = useFormContext<AddInstitutionFormData>()
  const selectedServices = form.watch('services') || []
  const serviceConfigurations = form.watch('serviceConfigurations') || {}

  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
            Contact Details
          </h3>
          <p className="text-sm text-muted-foreground">
            Primary contact information for the institution
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+20 2 1234 5678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="info@institution.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://www.institution.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Service Selection */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
            Service Selection
          </h3>
          <p className="text-sm text-muted-foreground">
            Select one or more services to include in the contract. A rate card confirmation is required for each selected service.
          </p>
        </div>

      <FormField
        control={form.control}
        name="services"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Services *</FormLabel>
              <FormDescription>
                Select all services that will be provided under this contract
              </FormDescription>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {SERVICE_OPTIONS.map((service) => (
                <FormField
                  key={service.value}
                  control={form.control}
                  name="services"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={service.value}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/50 transition-colors"
                      >
                        <FormControl>
                          <FormCheckbox
                            checked={field.value?.includes(service.value)}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || []
                              if (checked) {
                                field.onChange([...currentValue, service.value])
                                // Initialize configuration for new service
                                const currentConfigs = form.getValues('serviceConfigurations') || {}
                                form.setValue('serviceConfigurations', {
                                  ...currentConfigs,
                                  [service.value]: {
                                    rateCardConfirmed: false,
                                  },
                                })
                              } else {
                                field.onChange(
                                  currentValue.filter((value: string) => value !== service.value)
                                )
                                // Remove configuration for deselected service
                                const currentConfigs = form.getValues('serviceConfigurations') || {}
                                const { [service.value]: removed, ...rest } = currentConfigs
                                form.setValue('serviceConfigurations', rest)
                              }
                            }}
                          />
                        </FormControl>
                        <div className="flex-1">
                          <FormLabel className="font-normal cursor-pointer text-base">
                            {service.label}
                          </FormLabel>
                        </div>
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

      {/* Service Configurations */}
      {selectedServices.length > 0 && (
        <div className="space-y-4 mt-8">
          <div>
            <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
              Service Configuration
            </h3>
            <p className="text-sm text-muted-foreground">
              Confirm rate card for each selected service
            </p>
          </div>

          <div className="grid gap-4">
            {selectedServices.map((service: string) => {
              const serviceLabel = SERVICE_OPTIONS.find((s) => s.value === service)?.label || service
              const config = serviceConfigurations[service]
              const isConfirmed = config?.rateCardConfirmed === true

              return (
                <Card
                  key={service}
                  className={cn(
                    'border-2 transition-all',
                    isConfirmed
                      ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20'
                      : 'border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20'
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        {serviceLabel}
                        {isConfirmed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                        )}
                      </CardTitle>
                      <span
                        className={cn(
                          'text-xs font-medium px-2 py-1 rounded',
                          isConfirmed
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        )}
                      >
                        {isConfirmed ? 'Confirmed' : 'Pending'}
                      </span>
                    </div>
                    <CardDescription>
                      Rate card confirmation required for {serviceLabel}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name={`serviceConfigurations.${service}.rateCardConfirmed` as any}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background">
                          <FormControl>
                            <FormCheckbox
                              checked={field.value || false}
                              onCheckedChange={(checked) => {
                                field.onChange(checked)
                                // Trigger validation for the serviceConfigurations field
                                form.trigger('serviceConfigurations' as any)
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none flex-1">
                            <FormLabel className="cursor-pointer font-normal">
                              I confirm that the rate card for {serviceLabel} has been reviewed and approved
                            </FormLabel>
                            <FormDescription>
                              This confirmation is required before the contract can be finalized
                            </FormDescription>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {selectedServices.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                Please select at least one service to continue
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

