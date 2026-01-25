/**
 * Step 6: Pricing & Cost Summary
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Calculator, DollarSign, Edit } from 'lucide-react'
import { AddTripFormData } from '../../../../schemas/addTripSchema'
import * as React from 'react'

export function Step6PricingCost() {
  const form = useFormContext<AddTripFormData>()
  
  // Watch all pricing-related fields
  const baseFare = form.watch('baseFare') || 0
  const perMileRate = form.watch('perMileRate') || 0
  const estimatedDistance = form.watch('estimatedDistance') || 0
  const stairCarryFee = form.watch('stairCarryFee') || 0
  const bariatricSurcharge = form.watch('bariatricSurcharge') || 0
  const waitTimeCharge = form.watch('waitTimeCharge') || 0
  const afterHoursMultiplier = form.watch('afterHoursMultiplier') || 0
  const holidayRate = form.watch('holidayRate') || 0
  const cancellationFee = form.watch('cancellationFee') || 0
  const manualOverride = form.watch('manualOverride')

  // Calculate costs
  const mileageCost = estimatedDistance * perMileRate
  const subtotal = baseFare + mileageCost + stairCarryFee + bariatricSurcharge + waitTimeCharge
  const multipliers = subtotal * (afterHoursMultiplier / 100) + holidayRate
  const estimatedCost = manualOverride !== undefined ? manualOverride : subtotal + multipliers

  // Update estimated cost when values change
  React.useEffect(() => {
    if (manualOverride === undefined) {
      form.setValue('estimatedCost', subtotal + multipliers)
    }
  }, [baseFare, perMileRate, estimatedDistance, stairCarryFee, bariatricSurcharge, waitTimeCharge, afterHoursMultiplier, holidayRate, subtotal, multipliers, form, manualOverride])

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2 flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Pricing & Cost Summary
        </h3>
        <p className="text-sm text-muted-foreground">
          Review and configure pricing for this trip
        </p>
      </div>

      {/* Base Rates */}
      <Card className="border-t-4 border-t-[#09B0B6]">
        <CardHeader>
          <CardTitle className="text-base">Base Rates</CardTitle>
          <CardDescription>Base pricing configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="baseFare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Fare ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
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
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-3 bg-muted rounded-md">
              <FormLabel className="text-xs font-medium text-muted-foreground uppercase">
                Estimated Distance
              </FormLabel>
              <p className="text-lg font-semibold">
                {estimatedDistance.toFixed(1)} mi
              </p>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <FormLabel className="text-xs font-medium text-muted-foreground uppercase">
                Estimated Duration
              </FormLabel>
              <p className="text-lg font-semibold">
                {form.watch('estimatedDuration')
                  ? `${Math.floor((form.watch('estimatedDuration') || 0) / 60)} min`
                  : 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Charges */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Additional Charges</CardTitle>
          <CardDescription>Optional fees and surcharges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
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
                      value={field.value || 0}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bariatricSurcharge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bariatric Surcharge ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      value={field.value || 0}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="waitTimeCharge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wait Time Charge ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      value={field.value || 0}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Multipliers & Contingencies */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Multipliers & Contingencies</CardTitle>
          <CardDescription>Rate adjustments and contingency fees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="afterHoursMultiplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>After Hours (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0"
                      {...field}
                      value={field.value || 0}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="holidayRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Holiday Rate ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      value={field.value || 0}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
                      value={field.value || 0}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card className="border-2 border-[#09B0B6] bg-[#09B0B6]/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Cost Breakdown
          </CardTitle>
          <CardDescription>Auto-calculated based on form data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Fare</span>
              <span className="font-medium">${baseFare.toFixed(2)}</span>
            </div>
            {estimatedDistance > 0 && perMileRate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Mileage ({estimatedDistance.toFixed(1)} mi × ${perMileRate.toFixed(2)})
                </span>
                <span className="font-medium">${mileageCost.toFixed(2)}</span>
              </div>
            )}
            {stairCarryFee > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Stair Carry Fee</span>
                <span className="font-medium">${stairCarryFee.toFixed(2)}</span>
              </div>
            )}
            {bariatricSurcharge > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bariatric Surcharge</span>
                <span className="font-medium">${bariatricSurcharge.toFixed(2)}</span>
              </div>
            )}
            {waitTimeCharge > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Wait Time Charge</span>
                <span className="font-medium">${waitTimeCharge.toFixed(2)}</span>
              </div>
            )}
            {multipliers > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Multipliers & Adjustments</span>
                <span className="font-medium">${multipliers.toFixed(2)}</span>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex justify-between text-base font-semibold">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {multipliers > 0 && (
            <>
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span>Total (with adjustments)</span>
                <span>${(subtotal + multipliers).toFixed(2)}</span>
              </div>
            </>
          )}

          <Separator />

          {/* Manual Override */}
          <FormField
            control={form.control}
            name="manualOverride"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Manual Override / Final Price ($)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter final price or leave empty for auto-calculation"
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : undefined
                      field.onChange(value)
                      if (value !== undefined) {
                        form.setValue('estimatedCost', value)
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Override the calculated price if needed. Leave empty to use calculated amount.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <div className="flex justify-between items-center p-4 bg-[#09B0B6]/10 rounded-lg border-2 border-[#09B0B6]">
            <div>
              <div className="text-sm font-medium text-muted-foreground uppercase">Estimated Cost</div>
              <div className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
                ${estimatedCost.toFixed(2)}
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-[#09B0B6] opacity-50" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

