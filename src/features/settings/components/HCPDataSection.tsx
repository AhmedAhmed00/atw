/**
 * HCP Data Section Component
 * Manages healthcare provider basic information
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PhoneInputField } from '@/components/ui/phone-input'
import { Building2, Mail, MapPin, Phone, Save, Loader2 } from 'lucide-react'
import type { HCPData } from '../types'

const hcpDataSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(10, 'Please enter a complete address'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
})

type HCPDataFormValues = z.infer<typeof hcpDataSchema>

interface HCPDataSectionProps {
  data: HCPData
  onSave: (data: HCPDataFormValues) => void
}

export function HCPDataSection({ data, onSave }: HCPDataSectionProps) {
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<HCPDataFormValues>({
    resolver: zodResolver(hcpDataSchema),
    defaultValues: {
      name: data.name,
      address: data.address,
      phoneNumber: data.phoneNumber,
      email: data.email,
    },
  })

  const handleSubmit = async (values: HCPDataFormValues) => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    onSave(values)
    setIsSaving(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Building2 className="h-5 w-5 text-[rgb(var(--brand-primary))]" />
          HCP Information
        </CardTitle>
        <CardDescription>
          Manage your healthcare provider's basic information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    HCP Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter healthcare provider name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The official name of your healthcare provider organization
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter full address"
                      className="resize-none"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Complete street address including city, state, and ZIP code
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <PhoneInputField
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter phone number"
                    />
                  </FormControl>
                  <FormDescription>
                    Primary contact number with country code
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormDescription>
                    Primary email for notifications and communications
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

