/**
 * Add Maintenance Record Dialog
 * Form for adding new maintenance records to a vehicle
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Wrench, Calendar, Gauge, User, Building2, FileText } from 'lucide-react'
import { Controller } from 'react-hook-form'

const maintenanceRecordSchema = z.object({
  maintenanceType: z.string().min(1, 'Maintenance type is required'),
  date: z.string().min(1, 'Date is required'),
  mileageAtService: z.string().min(1, 'Mileage at service is required'),
  technicianName: z.string().min(1, 'Technician name is required'),
  serviceProvider: z.string().min(1, 'Service provider is required'),
  nextServiceDueDate: z.string().min(1, 'Next service due date is required'),
  description: z.string().min(1, 'Description is required'),
  additionalNotes: z.string().optional(),
})

type MaintenanceRecordFormData = z.infer<typeof maintenanceRecordSchema>

interface AddMaintenanceRecordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (data: MaintenanceRecordFormData) => void
}

const maintenanceTypes = [
  'Routine Service',
  'Oil Change',
  'Tire Replacement',
  'Brake Service',
  'Engine Repair',
  'Transmission Service',
  'Battery Replacement',
  'Electrical System',
  'HVAC Service',
  'Body Repair',
  'Other',
]

export function AddMaintenanceRecordDialog({
  open,
  onOpenChange,
  onConfirm,
}: AddMaintenanceRecordDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<MaintenanceRecordFormData>({
    resolver: zodResolver(maintenanceRecordSchema),
    defaultValues: {
      maintenanceType: '',
      date: '',
      mileageAtService: '',
      technicianName: '',
      serviceProvider: '',
      nextServiceDueDate: '',
      description: '',
      additionalNotes: '',
    },
  })

  const onSubmit = (data: MaintenanceRecordFormData) => {
    onConfirm(data)
    reset()
    onOpenChange(false)
  }

  const handleCancel = () => {
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Wrench className="h-5 w-5 text-[#09B0B6]" />
            Add Maintenance Record
          </DialogTitle>
          <DialogDescription>
            Record a new maintenance service for this vehicle. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Maintenance Type */}
            <div className="space-y-2">
              <Label htmlFor="maintenanceType" className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-[#09B0B6]" />
                Maintenance Type <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="maintenanceType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={errors.maintenanceType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select maintenance type" />
                    </SelectTrigger>
                    <SelectContent>
                      {maintenanceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.maintenanceType && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.maintenanceType.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#09B0B6]" />
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                {...register('date')}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.date.message}</p>
              )}
            </div>

            {/* Mileage at Service */}
            <div className="space-y-2">
              <Label htmlFor="mileageAtService" className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-[#09B0B6]" />
                Mileage at Service <span className="text-red-500">*</span>
              </Label>
              <Input
                id="mileageAtService"
                type="number"
                placeholder="Enter mileage"
                {...register('mileageAtService')}
                className={errors.mileageAtService ? 'border-red-500' : ''}
              />
              {errors.mileageAtService && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.mileageAtService.message}
                </p>
              )}
            </div>

            {/* Technician Name */}
            <div className="space-y-2">
              <Label htmlFor="technicianName" className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#09B0B6]" />
                Technician Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="technicianName"
                placeholder="Enter technician name"
                {...register('technicianName')}
                className={errors.technicianName ? 'border-red-500' : ''}
              />
              {errors.technicianName && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.technicianName.message}
                </p>
              )}
            </div>

            {/* Service Provider */}
            <div className="space-y-2">
              <Label htmlFor="serviceProvider" className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#09B0B6]" />
                Service Provider <span className="text-red-500">*</span>
              </Label>
              <Input
                id="serviceProvider"
                placeholder="Enter service provider"
                {...register('serviceProvider')}
                className={errors.serviceProvider ? 'border-red-500' : ''}
              />
              {errors.serviceProvider && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.serviceProvider.message}
                </p>
              )}
            </div>

            {/* Next Service Due Date */}
            <div className="space-y-2">
              <Label htmlFor="nextServiceDueDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#09B0B6]" />
                Next Service Due Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nextServiceDueDate"
                type="date"
                {...register('nextServiceDueDate')}
                className={errors.nextServiceDueDate ? 'border-red-500' : ''}
              />
              {errors.nextServiceDueDate && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.nextServiceDueDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#09B0B6]" />
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Enter maintenance description"
              rows={4}
              {...register('description')}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="additionalNotes" className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#09B0B6]" />
              Additional Notes
            </Label>
            <Textarea
              id="additionalNotes"
              placeholder="Enter any additional notes (optional)"
              rows={3}
              {...register('additionalNotes')}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              <Wrench className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

