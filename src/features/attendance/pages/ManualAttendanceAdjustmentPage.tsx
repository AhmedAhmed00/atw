/**
 * ManualAttendanceAdjustmentPage Component
 * Full-page form for manually adjusting attendance records
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import { CalendarIcon } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { attendanceAdjustmentSchema, AttendanceAdjustmentFormValues } from '../schemas/attendance-adjustment-schema'
import { mockEmployees } from '@/features/employees/data/mockEmployees'
import { ClipboardCheck } from 'lucide-react'

export function ManualAttendanceAdjustmentPage() {
  const navigate = useNavigate()
  const [date, setDate] = useState<Date | undefined>(new Date())

  const form = useForm<AttendanceAdjustmentFormValues>({
    resolver: zodResolver(attendanceAdjustmentSchema),
    defaultValues: {
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      clockInTime: '',
      clockOutTime: '',
      breaksMinutes: 0,
      overtimeHours: 0,
      notes: '',
    },
  })

  const handleSubmit = (data: AttendanceAdjustmentFormValues) => {
    console.log('Attendance adjustment data:', data)
    // TODO: Add attendance record to the database/state
    // For now, we'll just log the data
    // After successful submission, navigate back
    navigate('/attendance')
  }

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0]
      form.setValue('date', dateStr, { shouldValidate: true })
    }
  }

  // Sync date state with form value
  useEffect(() => {
    const formDate = form.getValues('date')
    if (formDate) {
      setDate(new Date(formDate))
    } else {
      const today = new Date()
      setDate(today)
      form.setValue('date', today.toISOString().split('T')[0])
    }
  }, [form])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Manual Attendance Adjustment"
          description="Manually adjust or create an attendance record for an employee"
          icon={ClipboardCheck}
        />
        <Button
          variant="outline"
          onClick={() => navigate('/attendance')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Attendance
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Details</CardTitle>
          <CardDescription>
            Fill in the attendance information for the selected employee
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Employee Selection */}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date Selection */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !date && 'text-muted-foreground'
                              )}
                            >
                              {date ? format(date, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status Selection */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="late">Late</SelectItem>
                          <SelectItem value="half-day">Half Day</SelectItem>
                          <SelectItem value="on-leave">On Leave</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Clock In Time */}
                <FormField
                  control={form.control}
                  name="clockInTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clock In Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormDescription>
                        Required for Present, Late, and Half Day status
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Clock Out Time */}
                <FormField
                  control={form.control}
                  name="clockOutTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clock Out Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Breaks (minutes) */}
                <FormField
                  control={form.control}
                  name="breaksMinutes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breaks (minutes)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Overtime (hours) */}
                <FormField
                  control={form.control}
                  name="overtimeHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Overtime (hours)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.1"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Notes / Reason */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes / Reason</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional notes or reason for this adjustment..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/attendance')}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Adjustment</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

