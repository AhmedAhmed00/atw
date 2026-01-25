/**
 * QuickAddEmployeePage Component
 * Quick add employee form with essential information only
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Save, UserPlus } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Badge } from '@/components/ui/badge'

const quickAddEmployeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  homebase: z.enum([
    'emergency response',
    'transport',
    'operations',
    'administration',
    'training',
  ]),
  role: z.enum([
    'ambulance driver',
    'senior emt',
    'emergency medical technician',
    'paramedic',
    'registered nurse',
    'dispatcher',
    'supervisor',
    'hr coordinator',
    'administrative staff',
  ]),
})

type QuickAddEmployeeFormData = z.infer<typeof quickAddEmployeeSchema>

// Auto-generate employee ID
const generateEmployeeId = (): string => {
  const prefix = 'EMP'
  const randomNum = Math.floor(Math.random() * 1000000)
  return `${prefix}-${randomNum.toString().padStart(6, '0')}`
}

const homebaseOptions = [
  { value: 'emergency response', label: 'Emergency Response' },
  { value: 'transport', label: 'Transport' },
  { value: 'operations', label: 'Operations' },
  { value: 'administration', label: 'Administration' },
  { value: 'training', label: 'Training' },
]

const roleOptions = [
  { value: 'ambulance driver', label: 'Ambulance Driver' },
  { value: 'senior emt', label: 'Senior EMT' },
  { value: 'emergency medical technician', label: 'Emergency Medical Technician' },
  { value: 'paramedic', label: 'Paramedic' },
  { value: 'registered nurse', label: 'Registered Nurse' },
  { value: 'dispatcher', label: 'Dispatcher' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'hr coordinator', label: 'HR Coordinator' },
  { value: 'administrative staff', label: 'Administrative Staff' },
]

export function QuickAddEmployeePage() {
  const navigate = useNavigate()
  const [employeeId] = useState<string>(generateEmployeeId())
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<QuickAddEmployeeFormData>({
    resolver: zodResolver(quickAddEmployeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      homebase: undefined,
      role: undefined,
    },
  })

  const handleSubmit = async (data: QuickAddEmployeeFormData) => {
    setIsLoading(true)

    const formData = {
      ...data,
      employeeId,
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // TODO: Submit to API
    console.log('Creating employee (quick add):', formData)

    setIsLoading(false)
    navigate('/employees')
  }

  const handleCancel = () => {
    navigate('/employees/new')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="Quick Add Employee"
          description="Add a new employee with essential information"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleCancel}
          className="shrink-0 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Identity Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#09B0B6]" />
                Identity
              </CardTitle>
              <CardDescription>Employee identification information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Employee ID (Auto-generated) */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Employee ID
                </label>
                <div className="flex items-center gap-2">
                  <Input value={employeeId} disabled className="bg-muted" />
                  <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
                    Auto-generated
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Employee ID is automatically generated and cannot be changed
                </p>
              </div>

              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        First Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Last Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Details Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#09B0B6]" />
                Contact Details
              </CardTitle>
              <CardDescription>Employee contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Role & Location Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#09B0B6]" />
                Role & Location
              </CardTitle>
              <CardDescription>Employee role and work location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="homebase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Homebase / Work Location <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select homebase" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {homebaseOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Role <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              <Save className="h-4 w-4" />
              {isLoading ? 'Creating...' : 'Create Employee'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default QuickAddEmployeePage

