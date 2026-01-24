/**
 * ManualAttendanceAdjustmentDialog Component
 * Dialog form for manually adjusting attendance records
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { attendanceAdjustmentSchema, AttendanceAdjustmentFormValues } from '../schemas/attendance-adjustment-schema'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { mockEmployees } from '@/features/employees/data/mockEmployees'

interface ManualAttendanceAdjustmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: AttendanceAdjustmentFormValues) => void
}

export function ManualAttendanceAdjustmentDialog({
  open,
  onOpenChange,
  onSubmit,
}: ManualAttendanceAdjustmentDialogProps) {
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
    onSubmit(data)
    form.reset()
    setDate(new Date())
    onOpenChange(false)
  }

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0]
      form.setValue('date', dateStr, { shouldValidate: true })
    }
  }

  // Sync date state with form value when dialog opens
  useEffect(() => {
    if (open) {
      const formDate = form.getValues('date')
      if (formDate) {
        setDate(new Date(formDate))
      } else {
        const today = new Date()
        setDate(today)
        form.setValue('date', today.toISOString().split('T')[0])
      }
    }
  }, [open, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manual Attendance Adjustment</DialogTitle>
          <DialogDescription>
            Manually adjust or create an attendance record for an employee
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  setDate(new Date())
                  onOpenChange(false)
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save Adjustment</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

