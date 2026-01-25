/**
 * Step 4: Trip Locations & Timing
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, ArrowRight, ArrowLeftRight, Navigation } from 'lucide-react'
import { AddTripFormData } from '../../../../schemas/addTripSchema'
import { MapPicker } from '../../institution/MapPicker'

export function Step4TripLocations() {
  const form = useFormContext<AddTripFormData>()
  const tripMode = form.watch('tripMode')
  const outboundPickupAddress = form.watch('outboundPickupAddress')
  const outboundDropoffAddress = form.watch('outboundDropoffAddress')

  return (
    <div className="space-y-8">
      {/* Outbound Trip */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2 flex items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            Outbound Trip
          </h3>
          <p className="text-sm text-muted-foreground">
            Configure pickup and drop-off details for the outbound trip
          </p>
        </div>

        {/* Pickup Details */}
        <Card className="border-t-4 border-t-[#09B0B6]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Pickup Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="outboundPickupAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter pickup address or select on map..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <MapPicker
              latitude={form.watch('outboundPickupLatitude')}
              longitude={form.watch('outboundPickupLongitude')}
              onLocationChange={(lat, lng) => {
                form.setValue('outboundPickupLatitude', lat)
                form.setValue('outboundPickupLongitude', lng)
                form.trigger(['outboundPickupLatitude', 'outboundPickupLongitude'])
              }}
              address={outboundPickupAddress}
            />

            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="outboundPickupFacilityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facility Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Hospital Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="outboundPickupWindowStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Window Start</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="outboundPickupWindowEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Window End</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="outboundPickupInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Special instructions for pickup location..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Drop-off Details */}
        <Card className="border-t-4 border-t-[#05647A]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Drop-off Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="outboundDropoffAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drop-off Address *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter drop-off address or select on map..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <MapPicker
              latitude={form.watch('outboundDropoffLatitude')}
              longitude={form.watch('outboundDropoffLongitude')}
              onLocationChange={(lat, lng) => {
                form.setValue('outboundDropoffLatitude', lat)
                form.setValue('outboundDropoffLongitude', lng)
                form.trigger(['outboundDropoffLatitude', 'outboundDropoffLongitude'])
              }}
              address={outboundDropoffAddress}
            />

            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="outboundDropoffFacilityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facility Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Hospital Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="outboundDropoffWindowStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Window Start</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="outboundDropoffWindowEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Window End</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="outboundDropoffInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Special instructions for drop-off location..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Calculated Fields */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FormLabel className="text-xs font-medium text-muted-foreground uppercase">
                  Estimated Distance
                </FormLabel>
                <p className="text-lg font-semibold">
                  {form.watch('estimatedDistance') 
                    ? `${form.watch('estimatedDistance')?.toFixed(1)} mi`
                    : 'Calculating...'}
                </p>
              </div>
              <div>
                <FormLabel className="text-xs font-medium text-muted-foreground uppercase">
                  Estimated Duration
                </FormLabel>
                <p className="text-lg font-semibold">
                  {form.watch('estimatedDuration')
                    ? `${Math.floor((form.watch('estimatedDuration') || 0) / 60)} min`
                    : 'Calculating...'}
                </p>
              </div>
            </div>
            <FormDescription className="mt-2">
              Distance and duration are calculated based on selected locations
            </FormDescription>
          </CardContent>
        </Card>
      </div>

      {/* Return Trip (if Round Trip) */}
      {tripMode === 'Round Trip' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2 flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5" />
              Return Trip
            </h3>
            <p className="text-sm text-muted-foreground">
              Configure pickup and drop-off details for the return trip
            </p>
          </div>

          {/* Return Pickup Details */}
          <Card className="border-t-4 border-t-[#09B0B6]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Return Pickup Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="returnPickupAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Return Pickup Address *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter return pickup address or select on map..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <MapPicker
                latitude={form.watch('returnPickupLatitude')}
                longitude={form.watch('returnPickupLongitude')}
                onLocationChange={(lat, lng) => {
                  form.setValue('returnPickupLatitude', lat)
                  form.setValue('returnPickupLongitude', lng)
                  form.trigger(['returnPickupLatitude', 'returnPickupLongitude'])
                }}
                address={form.watch('returnPickupAddress')}
              />

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="returnPickupFacilityName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facility Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Hospital Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="returnPickupWindowStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Window Start</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="returnPickupWindowEnd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Window End</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="returnPickupInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Special instructions for return pickup location..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Return Drop-off Details */}
          <Card className="border-t-4 border-t-[#05647A]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                Return Drop-off Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="returnDropoffAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Return Drop-off Address *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter return drop-off address or select on map..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <MapPicker
                latitude={form.watch('returnDropoffLatitude')}
                longitude={form.watch('returnDropoffLongitude')}
                onLocationChange={(lat, lng) => {
                  form.setValue('returnDropoffLatitude', lat)
                  form.setValue('returnDropoffLongitude', lng)
                  form.trigger(['returnDropoffLatitude', 'returnDropoffLongitude'])
                }}
                address={form.watch('returnDropoffAddress')}
              />

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="returnDropoffFacilityName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facility Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Hospital Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="returnDropoffWindowStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Window Start</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="returnDropoffWindowEnd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Window End</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="returnDropoffInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Special instructions for return drop-off location..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

