/**
 * CreateShiftPage Component
 * Full-page form for creating new shifts
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
import { VehicleSelector } from '../components/VehicleSelector'
import { RoleRequirements } from '../components/RoleRequirements'
import { mockEmployees } from '../data/mockData'
import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { PageHeader } from '@/components/shared/page-header'
import { ArrowLeft, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function CreateShiftPage() {
  const navigate = useNavigate()
  const [, setShiftType] = useState<'open' | 'closed'>('open')

  const form = useForm<ShiftFormValues>({
    resolver: zodResolver(shiftFormSchema),
    mode: 'onChange',
    defaultValues: {
      shiftType: 'open',
      shiftDate: '',
      startTime: '',
      endTime: '',
      workLocation: '',
      hasVehicleRequirements: false,
      vehicleTypes: [],
      roleRequirements: [{ role: '', quantity: 1 }],
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
    // Here you would typically submit to API
    navigate('/shifts')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="Create New Shift"
          description="Fill in the details below to create a new shift. Select whether it's an open or closed shift."
          icon={Calendar}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/shifts')}
          className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shifts
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Shift Type Selection */}
          <Card className="border-t-4 border-t-[#09B0B6]">
            <CardHeader>
              <CardTitle className="text-lg text-[#05647A]">Shift Type</CardTitle>
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
          <Card className="border-t-4 border-t-[#05647A]">
            <CardHeader>
              <CardTitle className="text-lg text-[#05647A]">Shift Details</CardTitle>
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
          <Card className="border-t-4 border-t-[#09B0B6]">
            <CardHeader>
              <CardTitle className="text-lg text-[#05647A]">Vehicle Requirements</CardTitle>
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
          <Card className="border-t-4 border-t-[#05647A]">
            <CardHeader>
              <CardTitle className="text-lg text-[#05647A]">Role Requirements</CardTitle>
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
            <Card className="border-t-4 border-t-[#09B0B6]">
              <CardHeader>
                <CardTitle className="text-lg text-[#05647A]">Open Shift Details</CardTitle>
                <CardDescription>Information specific to open shifts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Available Employees</Label>
                  <div className="text-sm text-muted-foreground mb-2">
                    Employees filtered by selected vehicle types:
                  </div>
                  {availableEmployeesList.length > 0 ? (
                    <div className="border rounded-md p-3 max-h-48 overflow-y-auto bg-muted/30">
                      <div className="space-y-2">
                        {availableEmployeesList.map((emp) => (
                          <div
                            key={emp.id}
                            className="flex items-center justify-between p-2 rounded-md bg-background"
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
                    <div className="border rounded-md p-3 text-sm text-muted-foreground text-center bg-muted/30">
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
            <Card className="border-t-4 border-t-[#05647A]">
              <CardHeader>
                <CardTitle className="text-lg text-[#05647A]">Closed Shift Details</CardTitle>
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
                  <div className="border rounded-md p-3 bg-muted/30">
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
                    <div className="border rounded-md p-3 max-h-48 overflow-y-auto bg-muted/30">
                      <div className="space-y-2">
                        {availableEmployeesList.map((emp) => (
                          <div
                            key={emp.id}
                            className="flex items-center justify-between p-2 rounded-md bg-background"
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
                    <div className="border rounded-md p-3 text-sm text-muted-foreground text-center bg-muted/30">
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
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => navigate('/shifts')}>
              Cancel
            </Button>
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
    </div>
  )
}

