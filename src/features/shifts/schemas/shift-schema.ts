import { z } from 'zod'

// Vehicle type enum
export const vehicleTypeEnum = z.enum(['ambulance', 'van', 'truck', 'car', 'none'])

// Role requirement schema
export const roleRequirementSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
})

// Base shift schema with common fields
const baseShiftSchema = z.object({
  shiftType: z.enum(['open', 'closed'], {
    required_error: 'Please select a shift type',
  }),
  shiftDate: z.string().min(1, 'Shift date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  workLocation: z.string().min(1, 'Work location is required'),
  hasVehicleRequirements: z.boolean(),
  vehicleTypes: z.array(vehicleTypeEnum).optional(),
  roleRequirements: z.array(roleRequirementSchema).min(1, 'At least one role requirement is needed'),
})

// Open shift schema
const openShiftSchema = baseShiftSchema.extend({
  shiftType: z.literal('open'),
  availableEmployees: z.array(z.string()).optional(),
  instructions: z.string().optional(),
}).refine(
  (data) => {
    // If vehicle requirements are enabled, vehicle types must be provided
    if (data.hasVehicleRequirements) {
      return data.vehicleTypes && data.vehicleTypes.length > 0
    }
    return true
  },
  {
    message: 'Please select at least one vehicle type',
    path: ['vehicleTypes'],
  }
)

// Closed shift schema
const closedShiftSchema = baseShiftSchema.extend({
  shiftType: z.literal('closed'),
  scheduleDetails: z.string().optional(),
  assignedEmployees: z.array(z.string()).optional(),
}).refine(
  (data) => {
    // If vehicle requirements are enabled, vehicle types must be provided
    if (data.hasVehicleRequirements) {
      return data.vehicleTypes && data.vehicleTypes.length > 0
    }
    return true
  },
  {
    message: 'Please select at least one vehicle type',
    path: ['vehicleTypes'],
  }
)

// Union schema for shift form
// Using regular union - discriminatedUnion requires shiftType to always be present
// This union will try both schemas and use the one that matches
export const shiftFormSchema = z.union([
  openShiftSchema,
  closedShiftSchema,
])

export type ShiftFormValues = z.infer<typeof shiftFormSchema>

