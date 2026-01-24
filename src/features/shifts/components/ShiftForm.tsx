/**
 * ShiftForm Component
 * Comprehensive form for creating/editing shifts with conditional rendering
 * based on shift type (open/closed)
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { shiftFormSchema, ShiftFormValues } from '../schemas/shift-schema'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { VehicleSelector } from './VehicleSelector'
import { RoleRequirements } from './RoleRequirements'
import { VehicleType, Employee } from '../types'
import { mockEmployees } from '../data/mockData'
import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface ShiftFormProps {
  onSubmit: (data: ShiftFormValues) => void
  onCancel?: () => void
  initialData?: Partial<ShiftFormValues>
}

export function ShiftForm({ onSubmit, onCancel, initialData }: ShiftFormProps) {
  const [shiftType, setShiftType] = useState<'open' | 'closed'>(
    (initialData?.shiftType as 'open' | 'closed') || 'open'
  )

  const form = useForm<ShiftFormValues>({
    resolver: zodResolver(shiftFormSchema),
    mode: 'onChange',
    defaultValues: {
      shiftType: (initialData?.shiftType as 'open' | 'closed') || 'open',
      shiftDate: initialData?.shiftDate || '',
      startTime: initialData?.startTime || '',
      endTime: initialData?.endTime || '',
      workLocation: initialData?.workLocation || '',
      hasVehicleRequirements: initialData?.hasVehicleRequirements || false,
      vehicleTypes: initialData?.vehicleTypes || [],
      roleRequirements: initialData?.roleRequirements || [{ role: '', quantity: 1 }],
      ...(initialData?.shiftType === 'open'
        ? {
            availableEmployees: initialData?.availableEmployees || [],
            instructions: initialData?.instructions || '',
          }
        : {
            scheduleDetails: initialData?.scheduleDetails || '',
            assignedEmployees: initialData?.assignedEmployees || [],
          }),
    },
  })

  const hasVehicleRequirements = form.watch('hasVehicleRequirements')
  const vehicleTypes = form.watch('vehicleTypes') || []
  const currentShiftType = form.watch('shiftType')

  // Filter employees based on selected vehicle types
  const availableEmployeesList = useMemo(() => {
    if (!hasVehicleRequirements || !vehicleTypes || vehicleTypes.length === 0) {
      return mockEmployees
    }

    return mockEmployees.filter((emp) =>
      emp.vehicleTypes.some((vt) => vehicleTypes.includes(vt))
    )
  }, [hasVehicleRequirements, vehicleTypes])

  const handleShiftTypeChange = (value: 'open' | 'closed') => {
    setShiftType(value)
    form.setValue('shiftType', value)
    // Reset conditional fields when switching types
    if (value === 'open') {
      form.setValue('scheduleDetails', undefined)
      form.setValue('assignedEmployees', undefined)
    } else {
      form.setValue('availableEmployees', undefined)
      form.setValue('instructions', undefined)
    }
  }

  const handleSubmit = (data: ShiftFormValues) => {
    console.log('Shift Form Payload:', JSON.stringify(data, null, 2))
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Shift Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shift Type</CardTitle>
            <CardDescription>Select whether this is an open or closed shift</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="shiftType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleShiftTypeChange(value as 'open' | 'closed')
                      }}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="open" id="open" />
                        <Label htmlFor="open" className="font-normal cursor-pointer">
                          Open Shift
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="closed" id="closed" />
                        <Label htmlFor="closed" className="font-normal cursor-pointer">
                          Closed Shift
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Common Fields */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shift Details</CardTitle>
            <CardDescription>Basic information about the shift</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="shiftDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shift Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time *</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time *</FormLabel>
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
              name="workLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Main Hospital - Emergency Department" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Vehicle Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vehicle Requirements</CardTitle>
            <CardDescription>Specify if this shift requires specific vehicle types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="hasVehicleRequirements"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Vehicle Requirements</FormLabel>
                    <FormDescription>
                      Check if this shift requires specific vehicle types
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {hasVehicleRequirements && (
              <FormField
                control={form.control}
                name="vehicleTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <VehicleSelector
                        vehicleTypes={field.value || []}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        {/* Role Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Role Requirements</CardTitle>
            <CardDescription>Specify the roles and quantities needed for this shift</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="roleRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RoleRequirements
                      roleRequirements={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Open Shift Specific Fields */}
        {currentShiftType === 'open' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Open Shift Details</CardTitle>
              <CardDescription>Information specific to open shifts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Available Employees</Label>
                <div className="text-sm text-muted-foreground mb-2">
                  Employees filtered by selected vehicle types:
                </div>
                {availableEmployeesList.length > 0 ? (
                  <div className="border rounded-md p-3 max-h-48 overflow-y-auto">
                    <div className="space-y-2">
                      {availableEmployeesList.map((emp) => (
                        <div
                          key={emp.id}
                          className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                        >
                          <div>
                            <div className="font-medium text-sm">{emp.name}</div>
                            <div className="text-xs text-muted-foreground">{emp.jobTitle}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {emp.vehicleTypes.join(', ') || 'No vehicles'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-md p-3 text-sm text-muted-foreground text-center">
                    No employees match the selected vehicle requirements
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions & Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional instructions or notes for this shift..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* Closed Shift Specific Fields */}
        {currentShiftType === 'closed' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Closed Shift Details</CardTitle>
              <CardDescription>Information specific to closed shifts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="scheduleDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schedule Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Schedule details or summary..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide details about the scheduled shift
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Label className="text-sm font-medium mb-2 block">Staffing Requirements</Label>
                <div className="text-sm text-muted-foreground mb-2">
                  Based on role requirements:
                </div>
                <div className="border rounded-md p-3 bg-muted/50">
                  {form.watch('roleRequirements')?.map((req, idx) => (
                    <div key={idx} className="text-sm">
                      {req.quantity}x {req.role || 'Unspecified Role'}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Assign Employees</Label>
                <div className="text-sm text-muted-foreground mb-2">
                  Select employees for this shift (filtered by vehicle types):
                </div>
                {availableEmployeesList.length > 0 ? (
                  <div className="border rounded-md p-3 max-h-48 overflow-y-auto">
                    <div className="space-y-2">
                      {availableEmployeesList.map((emp) => (
                        <div
                          key={emp.id}
                          className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                        >
                          <div>
                            <div className="font-medium text-sm">{emp.name}</div>
                            <div className="text-xs text-muted-foreground">{emp.jobTitle}</div>
                          </div>
                          <Checkbox
                            checked={
                              form.watch('assignedEmployees')?.includes(emp.id) || false
                            }
                            onCheckedChange={(checked) => {
                              const current = form.getValues('assignedEmployees') || []
                              if (checked) {
                                form.setValue('assignedEmployees', [...current, emp.id])
                              } else {
                                form.setValue(
                                  'assignedEmployees',
                                  current.filter((id) => id !== emp.id)
                                )
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-md p-3 text-sm text-muted-foreground text-center">
                    No employees match the selected vehicle requirements
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions & Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional instructions or notes for this shift..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            className="bg-linear-to-r from-[#09B0B6] to-[#05647A]"
          >
            Create Shift
          </Button>
        </div>
      </form>
    </Form>
  )
}

