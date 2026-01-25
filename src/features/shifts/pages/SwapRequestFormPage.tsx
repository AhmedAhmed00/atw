/**
 * SwapRequestFormPage Component
 * Standalone form page for creating new swap requests
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { swapRequestSchema, SwapRequestFormValues } from '../schemas/swap-request-schema'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/shared/page-header'
import { ArrowLeft, ArrowLeftRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockShifts, mockEmployees } from '../data/mockData'

export function SwapRequestFormPage() {
  const navigate = useNavigate()

  const form = useForm<SwapRequestFormValues>({
    resolver: zodResolver(swapRequestSchema),
    defaultValues: {
      employeeId: '',
      currentShiftId: '',
      proposedDate: '',
      proposedStartTime: '',
      proposedEndTime: '',
      reason: '',
    },
  })

  const selectedEmployeeId = form.watch('employeeId')
  const selectedShiftId = form.watch('currentShiftId')

  // Get available shifts for selected employee
  const availableShifts = mockShifts.filter(
    (shift) => shift.status === 'filled' || shift.status === 'published'
  )

  // Get selected shift details
  const selectedShift = mockShifts.find((shift) => shift.id === selectedShiftId)

  const handleSubmit = (data: SwapRequestFormValues) => {
    console.log('Swap Request Form Payload:', JSON.stringify(data, null, 2))
    // Here you would typically submit to API
    // For now, just log and navigate back
    navigate('/shifts')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="New Swap Request"
          description="Request to swap your current shift with a proposed new shift"
          icon={ArrowLeftRight}
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

      <Card>
        <CardHeader>
          <CardTitle>Swap Request Details</CardTitle>
          <CardDescription>
            Fill in the details below to submit a shift swap request
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an employee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockEmployees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name} - {employee.jobTitle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the employee requesting the shift swap
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentShiftId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Shift to Swap *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select current shift" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableShifts.map((shift) => (
                          <SelectItem key={shift.id} value={shift.id}>
                            {new Date(shift.shiftDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}{' '}
                            - {shift.startTime} to {shift.endTime} ({shift.shiftType})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the shift you want to swap
                    </FormDescription>
                    {selectedShift && (
                      <div className="mt-2 p-3 rounded-md bg-muted text-sm">
                        <div className="font-medium">Current Shift Details:</div>
                        <div className="text-muted-foreground mt-1">
                          Location: {selectedShift.workLocation}
                        </div>
                        <div className="text-muted-foreground">
                          Date: {new Date(selectedShift.shiftDate).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="text-sm font-medium">Proposed New Shift Data</div>

                <FormField
                  control={form.control}
                  name="proposedDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proposed Date *</FormLabel>
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
                    name="proposedStartTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proposed Start Time *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="proposedEndTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proposed End Time *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Swap *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide a reason for requesting this shift swap..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum 10 characters required
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/shifts')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!form.formState.isValid}
                  className="bg-linear-to-r from-[#09B0B6] to-[#05647A]"
                >
                  Submit Swap Request
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

