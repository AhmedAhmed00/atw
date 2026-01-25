/**
 * Step 2: Trip Mode & Timing
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ArrowLeftRight } from 'lucide-react'
import { AddTripFormData } from '../../../../schemas/addTripSchema'
import { cn } from '@/lib/utils'

export function Step2TripModeTiming() {
  const form = useFormContext<AddTripFormData>()
  const tripMode = form.watch('tripMode')
  const tripTiming = form.watch('tripTiming')

  return (
    <div className="space-y-8">
      {/* Trip Mode */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
            Trip Mode
          </h3>
          <p className="text-sm text-muted-foreground">
            Select whether this is a one-way or round trip
          </p>
        </div>

        <FormField
          control={form.control}
          name="tripMode"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid gap-4 md:grid-cols-2"
                >
                  <div>
                    <RadioGroupItem value="One Way" id="one-way" className="sr-only" />
                    <Label
                      htmlFor="one-way"
                      className={cn(
                        'flex items-center gap-3 rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all',
                        field.value === 'One Way' && 'border-[#09B0B6] bg-[#09B0B6]/5'
                      )}
                    >
                      <ArrowRight className="w-6 h-6 text-[#09B0B6]" />
                      <div>
                        <div className="font-semibold">One Way</div>
                        <div className="text-xs text-muted-foreground">
                          Single destination trip
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="Round Trip" id="round-trip" className="sr-only" />
                    <Label
                      htmlFor="round-trip"
                      className={cn(
                        'flex items-center gap-3 rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all',
                        field.value === 'Round Trip' && 'border-[#09B0B6] bg-[#09B0B6]/5'
                      )}
                    >
                      <ArrowLeftRight className="w-6 h-6 text-[#09B0B6]" />
                      <div>
                        <div className="font-semibold">Round Trip</div>
                        <div className="text-xs text-muted-foreground">
                          Return to origin
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Trip Timing */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
            Trip Timing
          </h3>
          <p className="text-sm text-muted-foreground">
            Select when this trip should occur
          </p>
        </div>

        <FormField
          control={form.control}
          name="tripTiming"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid gap-4 md:grid-cols-2"
                >
                  <div>
                    <RadioGroupItem value="Immediate" id="immediate" className="sr-only" />
                    <Label
                      htmlFor="immediate"
                      className={cn(
                        'flex items-center gap-3 rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all',
                        field.value === 'Immediate' && 'border-[#09B0B6] bg-[#09B0B6]/5'
                      )}
                    >
                      <div>
                        <div className="font-semibold">Immediate</div>
                        <div className="text-xs text-muted-foreground">
                          Dispatch as soon as possible
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="Scheduled" id="scheduled" className="sr-only" />
                    <Label
                      htmlFor="scheduled"
                      className={cn(
                        'flex items-center gap-3 rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all',
                        field.value === 'Scheduled' && 'border-[#09B0B6] bg-[#09B0B6]/5'
                      )}
                    >
                      <div>
                        <div className="font-semibold">Scheduled</div>
                        <div className="text-xs text-muted-foreground">
                          Plan for specific date/time
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Outbound Schedule */}
      <Card className="border-t-4 border-t-[#09B0B6]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            OUTBOUND
          </CardTitle>
          <CardDescription>Pickup schedule for the outbound trip</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="outboundPickupDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="outboundPickupTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time *</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Return Schedule (if Round Trip) */}
      {tripMode === 'Round Trip' && (
        <Card className="border-t-4 border-t-[#05647A]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4" />
              RETURN
            </CardTitle>
            <CardDescription>Return schedule for round trip</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="returnPickupDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Return Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="returnPickupTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Return Time *</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

