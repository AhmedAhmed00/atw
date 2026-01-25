/**
 * Step 5: Vehicle & Crew Assignment
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
import { Car, Users, Sparkles } from 'lucide-react'
import { AddTripFormData } from '../../../../schemas/addTripSchema'
import { cn } from '@/lib/utils'

// Mock data - in real app, these would come from API
const MOCK_VEHICLES = [
  { id: 'v1', name: 'Ambulance #101', type: 'ALS' },
  { id: 'v2', name: 'Ambulance #102', type: 'BLS' },
  { id: 'v3', name: 'Ambulance #103', type: 'CCT' },
  { id: 'v4', name: 'Wheelchair Van #201', type: 'Wheelchair' },
]

const MOCK_DRIVERS = [
  { id: 'd1', name: 'Ahmed Mohamed', license: 'CDL-12345' },
  { id: 'd2', name: 'Ibrahim Hassan', license: 'CDL-12346' },
  { id: 'd3', name: 'Khaled Ali', license: 'CDL-12347' },
]

const MOCK_MEDICAL_CREW = [
  { id: 'c1', name: 'Dr. Sarah Ahmed', certification: 'ALS' },
  { id: 'c2', name: 'Paramedic Omar', certification: 'BLS' },
  { id: 'c3', name: 'Dr. Fatima Hassan', certification: 'CCT' },
]

export function Step5VehicleCrew() {
  const form = useFormContext<AddTripFormData>()
  const assignmentType = form.watch('assignmentType')
  const serviceLevel = form.watch('serviceLevel')

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
          Assignment Type
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose how to assign vehicle and crew for this trip
        </p>
      </div>

      <FormField
        control={form.control}
        name="assignmentType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid gap-4 md:grid-cols-2"
              >
                <div>
                  <RadioGroupItem value="Automatic Assignment" id="automatic" className="sr-only" />
                  <Label
                    htmlFor="automatic"
                    className={cn(
                      'flex items-center gap-3 rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all',
                      field.value === 'Automatic Assignment' && 'border-[#09B0B6] bg-[#09B0B6]/5'
                    )}
                  >
                    <Sparkles className="w-6 h-6 text-[#09B0B6]" />
                    <div>
                      <div className="font-semibold">Automatic Assignment</div>
                      <div className="text-xs text-muted-foreground">
                        System will assign based on availability
                      </div>
                    </div>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="Manual Assignment" id="manual" className="sr-only" />
                  <Label
                    htmlFor="manual"
                    className={cn(
                      'flex items-center gap-3 rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all',
                      field.value === 'Manual Assignment' && 'border-[#09B0B6] bg-[#09B0B6]/5'
                    )}
                  >
                    <Users className="w-6 h-6 text-[#09B0B6]" />
                    <div>
                      <div className="font-semibold">Manual Assignment</div>
                      <div className="text-xs text-muted-foreground">
                        Select specific vehicle and crew
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

      {assignmentType === 'Manual Assignment' && (
        <div className="space-y-6">
          <Card className="border-t-4 border-t-[#09B0B6]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Car className="w-4 h-4" />
                Vehicle Selection
              </CardTitle>
              <CardDescription>
                Select a vehicle for this trip
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="vehicleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MOCK_VEHICLES
                          .filter((v) => !serviceLevel || v.type === serviceLevel || (serviceLevel === 'Wheelchair Van' && v.type === 'Wheelchair'))
                          .map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.id}>
                              {vehicle.name} ({vehicle.type})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Vehicles are filtered based on selected service level
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#05647A]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4" />
                Crew Selection
              </CardTitle>
              <CardDescription>
                Assign driver and medical crew for this trip
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="driverId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select driver" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MOCK_DRIVERS.map((driver) => (
                          <SelectItem key={driver.id} value={driver.id}>
                            {driver.name} - {driver.license}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {serviceLevel !== 'Wheelchair Van' && (
                <FormField
                  control={form.control}
                  name="primaryMedicalCrewId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Medical Crew (ALS)</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select medical crew" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MOCK_MEDICAL_CREW
                            .filter((crew) => !serviceLevel || crew.certification === serviceLevel || serviceLevel === 'ALS')
                            .map((crew) => (
                              <SelectItem key={crew.id} value={crew.id}>
                                {crew.name} - {crew.certification}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Medical crew is filtered based on selected service level
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {assignmentType === 'Automatic Assignment' && (
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                Vehicle and crew will be automatically assigned based on availability, service level, and location proximity
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

