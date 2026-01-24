import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
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

import { addServiceSchema, type AddServiceFormData, type AddServiceFormInput } from '../schemas/service-schema'

interface AddServiceDialogProps {
  onSubmit: (data: AddServiceFormData) => void
}

export function AddServiceDialog({ onSubmit }: AddServiceDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<AddServiceFormInput>({
    resolver: zodResolver(addServiceSchema),
    defaultValues: {
      name: '',
      price: '',
      duration: '',
    },
  })

  const handleSubmit = (data: AddServiceFormInput) => {
    console.log('Form submitted:', data)
    // Transform strings to numbers
    const transformedData: AddServiceFormData = {
      name: data.name,
      price: Number(data.price),
      duration: Number(data.duration),
    }
    onSubmit(transformedData)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="">
          <Plus className="w-4 h-4" />
          Add Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Add New Service</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in the details below to create a new service
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-4">
            {/* Service Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Service Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., General Consultation"
                      className="focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Enter the name of the service you want to offer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 150"
                      min="0"
                      step="0.01"
                      className="focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Set the price for this service in dollars
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 30"
                      min="1"
                      step="1"
                      className="focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Estimated time required for this service
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  setOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Adding...' : 'Add Service'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

