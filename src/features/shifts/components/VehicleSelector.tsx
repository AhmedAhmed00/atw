/**
 * VehicleSelector Component
 * Handles multi-select vehicle type selection with add/remove functionality
 */

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Plus, X } from 'lucide-react'
import { VehicleType } from '../types'
import { cn } from '@/lib/utils'

const VEHICLE_OPTIONS: { value: VehicleType; label: string }[] = [
  { value: 'ambulance', label: 'Ambulance' },
  { value: 'van', label: 'Van' },
  { value: 'truck', label: 'Truck' },
  { value: 'car', label: 'Car' },
  { value: 'none', label: 'None' },
]

interface VehicleSelectorProps {
  vehicleTypes: VehicleType[]
  onChange: (vehicleTypes: VehicleType[]) => void
  disabled?: boolean
}

export function VehicleSelector({
  vehicleTypes,
  onChange,
  disabled = false,
}: VehicleSelectorProps) {
  const handleToggle = (vehicleType: VehicleType) => {
    if (disabled) return

    if (vehicleTypes.includes(vehicleType)) {
      // Remove vehicle type
      onChange(vehicleTypes.filter((vt) => vt !== vehicleType))
    } else {
      // Add vehicle type
      onChange([...vehicleTypes, vehicleType])
    }
  }

  const handleAddRow = () => {
    // This allows adding multiple vehicle type selections
    // In this implementation, we're using checkboxes, so this is more of a visual grouping
    // The actual functionality is handled by the checkboxes
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Vehicle Types</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddRow}
          disabled={disabled}
          className="h-7 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {VEHICLE_OPTIONS.map((option) => (
          <div
            key={option.value}
            className={cn(
              'flex items-center space-x-2 p-2 rounded-md border',
              vehicleTypes.includes(option.value)
                ? 'border-[#09B0B6] bg-[#09B0B6]/5'
                : 'border-input',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Checkbox
              id={`vehicle-${option.value}`}
              checked={vehicleTypes.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
              disabled={disabled}
            />
            <Label
              htmlFor={`vehicle-${option.value}`}
              className="text-sm font-normal cursor-pointer flex-1"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>

      {vehicleTypes.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {vehicleTypes.map((vehicleType) => {
            const option = VEHICLE_OPTIONS.find((opt) => opt.value === vehicleType)
            return (
              <div
                key={vehicleType}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#09B0B6]/10 text-[#05647A] text-xs"
              >
                <span>{option?.label}</span>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => handleToggle(vehicleType)}
                    className="hover:bg-[#09B0B6]/20 rounded p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

