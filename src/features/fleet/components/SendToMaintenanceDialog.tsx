/**
 * Send to Maintenance Dialog
 * Form for sending vehicles to maintenance (automatic or manual selection)
 */

import { useEffect } from 'react'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Car, Wrench, AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Vehicle } from '../data/mockVehiclesData'

const sendToMaintenanceSchema = z.object({
  mode: z.enum(['automatic', 'manual'], {
    required_error: 'Please select a mode',
  }),
  vehicleIds: z.array(z.string()).optional(),
}).refine((data) => {
  if (data.mode === 'manual') {
    return data.vehicleIds && data.vehicleIds.length > 0
  }
  return true
}, {
  message: 'Please select at least one vehicle',
  path: ['vehicleIds'],
})

type SendToMaintenanceFormData = z.infer<typeof sendToMaintenanceSchema>

interface SendToMaintenanceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicles: Vehicle[]
  onConfirm: (data: SendToMaintenanceFormData) => void
  initialVehicleId?: string // Pre-select a specific vehicle
}

export function SendToMaintenanceDialog({
  open,
  onOpenChange,
  vehicles,
  onConfirm,
  initialVehicleId,
}: SendToMaintenanceDialogProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SendToMaintenanceFormData>({
    resolver: zodResolver(sendToMaintenanceSchema),
    defaultValues: {
      mode: initialVehicleId ? 'manual' : 'automatic',
      vehicleIds: initialVehicleId ? [initialVehicleId] : [],
    },
  })

  // Update form when initialVehicleId changes or dialog opens
  useEffect(() => {
    if (open && initialVehicleId) {
      setValue('mode', 'manual')
      setValue('vehicleIds', [initialVehicleId])
    } else if (open && !initialVehicleId) {
      setValue('mode', 'automatic')
      setValue('vehicleIds', [])
    }
  }, [open, initialVehicleId, setValue])

  const mode = watch('mode')
  const selectedVehicleIds = watch('vehicleIds') || []

  // Filter vehicles that are not already in maintenance
  const availableVehicles = vehicles.filter((v) => v.status !== 'Maintenance')

  const handleModeChange = (value: 'automatic' | 'manual') => {
    setValue('mode', value)
    if (value === 'automatic') {
      setValue('vehicleIds', [])
    }
  }

  const handleVehicleToggle = (vehicleId: string) => {
    const currentIds = selectedVehicleIds
    if (currentIds.includes(vehicleId)) {
      setValue(
        'vehicleIds',
        currentIds.filter((id) => id !== vehicleId)
      )
    } else {
      setValue('vehicleIds', [...currentIds, vehicleId])
    }
  }

  const handleSelectAll = () => {
    if (selectedVehicleIds.length === availableVehicles.length) {
      setValue('vehicleIds', [])
    } else {
      setValue(
        'vehicleIds',
        availableVehicles.map((v) => v.id)
      )
    }
  }

  const onSubmit = (data: SendToMaintenanceFormData) => {
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Wrench className="h-5 w-5 text-[#09B0B6]" />
            Send to Maintenance
          </DialogTitle>
          <DialogDescription>
            Select how you want to send vehicles to maintenance. Automatic mode will send all available vehicles, while manual mode allows you to select specific vehicles.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Mode Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Selection Mode</Label>
            <RadioGroup
              value={mode}
              onValueChange={(value) => handleModeChange(value as 'automatic' | 'manual')}
              className="grid grid-cols-2 gap-4"
            >
              <div
                className={cn(
                  'relative flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all',
                  mode === 'automatic'
                    ? 'border-[#09B0B6] bg-[#09B0B6]/5'
                    : 'border-gray-200 dark:border-gray-700 hover:border-[#09B0B6]/50'
                )}
                onClick={() => handleModeChange('automatic')}
              >
                <RadioGroupItem value="automatic" id="automatic" className="mt-0" />
                <div className="flex-1">
                  <Label
                    htmlFor="automatic"
                    className="flex items-center gap-2 font-semibold cursor-pointer"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#09B0B6]" />
                    Automatic
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Send all available vehicles to maintenance
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'relative flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all',
                  mode === 'manual'
                    ? 'border-[#09B0B6] bg-[#09B0B6]/5'
                    : 'border-gray-200 dark:border-gray-700 hover:border-[#09B0B6]/50'
                )}
                onClick={() => handleModeChange('manual')}
              >
                <RadioGroupItem value="manual" id="manual" className="mt-0" />
                <div className="flex-1">
                  <Label
                    htmlFor="manual"
                    className="flex items-center gap-2 font-semibold cursor-pointer"
                  >
                    <Car className="h-4 w-4 text-[#09B0B6]" />
                    Manual
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select specific vehicles to send
                  </p>
                </div>
              </div>
            </RadioGroup>
            {errors.mode && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.mode.message}</p>
            )}
          </div>

          {/* Manual Vehicle Selection */}
          {mode === 'manual' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">
                  Select Vehicles ({selectedVehicleIds.length} selected)
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  className="text-xs"
                >
                  {selectedVehicleIds.length === availableVehicles.length
                    ? 'Deselect All'
                    : 'Select All'}
                </Button>
              </div>

              {availableVehicles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-900/50">
                  <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No vehicles available for maintenance
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[300px] rounded-lg border p-4">
                  <div className="space-y-2">
                    {availableVehicles.map((vehicle) => {
                      const isSelected = selectedVehicleIds.includes(vehicle.id)
                      return (
                        <div
                          key={vehicle.id}
                          className={cn(
                            'flex items-center space-x-3 rounded-lg border p-3 cursor-pointer transition-all',
                            isSelected
                              ? 'border-[#09B0B6] bg-[#09B0B6]/5'
                              : 'border-gray-200 dark:border-gray-700 hover:border-[#09B0B6]/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
                          )}
                          onClick={() => handleVehicleToggle(vehicle.id)}
                        >
                          <Checkbox
                            id={vehicle.id}
                            checked={isSelected}
                            onCheckedChange={() => handleVehicleToggle(vehicle.id)}
                          />
                          <Label
                            htmlFor={vehicle.id}
                            className="flex-1 cursor-pointer flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-[#09B0B6]/10">
                                <Car className="h-4 w-4 text-[#09B0B6]" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{vehicle.vehicleId}</p>
                                <p className="text-xs text-muted-foreground">
                                  {vehicle.make} {vehicle.model} • {vehicle.class}
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(
                                'ml-2',
                                vehicle.status === 'Active'
                                  ? 'border-green-500 text-green-700 dark:text-green-400'
                                  : 'border-gray-500 text-gray-700 dark:text-gray-400'
                              )}
                            >
                              {vehicle.status}
                            </Badge>
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              )}

              {errors.vehicleIds && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.vehicleIds.message}
                </p>
              )}

              {selectedVehicleIds.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs text-muted-foreground">Selected:</span>
                  {selectedVehicleIds.map((id) => {
                    const vehicle = availableVehicles.find((v) => v.id === id)
                    return vehicle ? (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="bg-[#09B0B6]/10 text-[#05647A] border-[#09B0B6]/30"
                      >
                        {vehicle.vehicleId}
                      </Badge>
                    ) : null
                  })}
                </div>
              )}
            </div>
          )}

          {/* Automatic Mode Info */}
          {mode === 'automatic' && (
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Automatic Mode
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    All {availableVehicles.length} available vehicle(s) will be sent to maintenance.
                    Vehicles already in maintenance will be excluded.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              <Wrench className="mr-2 h-4 w-4" />
              Send to Maintenance
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

