/**
 * Add Trip Form Schemas
 * Multi-step form validation schemas using Zod
 */

import { z } from 'zod'

// Step 1: Trip Creation Method
export const tripCreationMethodSchema = z.object({
  creationMethod: z.enum(['Single Trip', 'Batch Import'], {
    required_error: 'Trip creation method is required',
  }),
  uploadedFile: z.instanceof(File).optional(),
  uploadedFileName: z.string().optional(),
})

// Step 2: Trip Mode & Timing
export const tripModeTimingSchema = z.object({
  tripMode: z.enum(['One Way', 'Round Trip'], {
    required_error: 'Trip mode is required',
  }),
  tripTiming: z.enum(['Immediate', 'Scheduled'], {
    required_error: 'Trip timing is required',
  }),
  outboundPickupDate: z.string().min(1, 'Pickup date is required'),
  outboundPickupTime: z.string().min(1, 'Pickup time is required'),
  returnPickupDate: z.string().optional(),
  returnPickupTime: z.string().optional(),
}).refine(
  (data) => {
    if (data.tripMode === 'Round Trip') {
      return data.returnPickupDate && data.returnPickupTime
    }
    return true
  },
  {
    message: 'Return schedule is required for round trips',
    path: ['returnPickupDate'],
  }
)

// Step 3: Patient & Service Information
export const patientServiceSchema = z.object({
  organization: z.string().min(1, 'Organization is required'),
  patient: z.string().min(1, 'Patient is required'),
  serviceLevel: z.enum(['BLS', 'ALS', 'CCT', 'Wheelchair Van'], {
    required_error: 'Service level is required',
  }),
  levelOfCare: z.string().min(1, 'Level of care is required'),
  crewConfiguration: z.enum(['Driver Only', 'Driver + Paramedic', 'Driver + 2 Paramedics'], {
    required_error: 'Crew configuration is required',
  }),
  priority: z.enum(['Routine', 'Urgent', 'Emergency'], {
    required_error: 'Priority is required',
  }),
  equipmentPack: z.array(z.enum(['Oxygen Tank', 'Cardiac Monitor', 'IV Pump', 'Wheelchair', 'PPE Kit', 'Stretcher'])).default([]),
})

// Step 4: Trip Locations & Timing
export const tripLocationsSchema = z.object({
  // Outbound Pickup
  outboundPickupAddress: z.string().min(10, 'Pickup address is required'),
  outboundPickupLatitude: z.number().optional(),
  outboundPickupLongitude: z.number().optional(),
  outboundPickupFacilityName: z.string().optional(),
  outboundPickupWindowStart: z.string().optional(),
  outboundPickupWindowEnd: z.string().optional(),
  outboundPickupInstructions: z.string().max(500).optional(),
  
  // Outbound Drop-off
  outboundDropoffAddress: z.string().min(10, 'Drop-off address is required'),
  outboundDropoffLatitude: z.number().optional(),
  outboundDropoffLongitude: z.number().optional(),
  outboundDropoffFacilityName: z.string().optional(),
  outboundDropoffWindowStart: z.string().optional(),
  outboundDropoffWindowEnd: z.string().optional(),
  outboundDropoffInstructions: z.string().max(500).optional(),
  
  // Return Pickup (if Round Trip)
  returnPickupAddress: z.string().optional(),
  returnPickupLatitude: z.number().optional(),
  returnPickupLongitude: z.number().optional(),
  returnPickupFacilityName: z.string().optional(),
  returnPickupWindowStart: z.string().optional(),
  returnPickupWindowEnd: z.string().optional(),
  returnPickupInstructions: z.string().max(500).optional(),
  
  // Return Drop-off (if Round Trip)
  returnDropoffAddress: z.string().optional(),
  returnDropoffLatitude: z.number().optional(),
  returnDropoffLongitude: z.number().optional(),
  returnDropoffFacilityName: z.string().optional(),
  returnDropoffWindowStart: z.string().optional(),
  returnDropoffWindowEnd: z.string().optional(),
  returnDropoffInstructions: z.string().max(500).optional(),
  
  // Calculated fields
  estimatedDistance: z.number().optional(),
  estimatedDuration: z.number().optional(),
})

// Step 5: Vehicle & Crew Assignment
export const vehicleCrewSchema = z.object({
  assignmentType: z.enum(['Automatic Assignment', 'Manual Assignment'], {
    required_error: 'Assignment type is required',
  }),
  vehicleId: z.string().optional(),
  driverId: z.string().optional(),
  primaryMedicalCrewId: z.string().optional(),
}).refine(
  (data) => {
    if (data.assignmentType === 'Manual Assignment') {
      return data.vehicleId && data.driverId
    }
    return true
  },
  {
    message: 'Vehicle and driver are required for manual assignment',
    path: ['vehicleId'],
  }
)

// Step 6: Pricing & Cost Summary
export const pricingCostSchema = z.object({
  baseFare: z.number().min(0, 'Base fare must be positive').optional(),
  perMileRate: z.number().min(0, 'Per mile rate must be positive').optional(),
  stairCarryFee: z.number().min(0).optional().or(z.literal(0)),
  bariatricSurcharge: z.number().min(0).optional().or(z.literal(0)),
  waitTimeCharge: z.number().min(0).optional().or(z.literal(0)),
  afterHoursMultiplier: z.number().min(0).optional().or(z.literal(0)),
  holidayRate: z.number().min(0).optional().or(z.literal(0)),
  cancellationFee: z.number().min(0).optional().or(z.literal(0)),
  manualOverride: z.number().min(0).optional(),
  estimatedCost: z.number().min(0).optional(),
})

// Combined schema for the entire form
export const addTripFormSchema = z.object({
  ...tripCreationMethodSchema.shape,
  ...tripModeTimingSchema.shape,
  ...patientServiceSchema.shape,
  ...tripLocationsSchema.shape,
  ...vehicleCrewSchema.shape,
  ...pricingCostSchema.shape,
})

// Type inference
export type TripCreationMethodFormData = z.infer<typeof tripCreationMethodSchema>
export type TripModeTimingFormData = z.infer<typeof tripModeTimingSchema>
export type PatientServiceFormData = z.infer<typeof patientServiceSchema>
export type TripLocationsFormData = z.infer<typeof tripLocationsSchema>
export type VehicleCrewFormData = z.infer<typeof vehicleCrewSchema>
export type PricingCostFormData = z.infer<typeof pricingCostSchema>
export type AddTripFormData = z.infer<typeof addTripFormSchema>

// Step-by-step validation schemas array
export const tripStepSchemas = [
  tripCreationMethodSchema,
  tripModeTimingSchema,
  patientServiceSchema,
  tripLocationsSchema,
  vehicleCrewSchema,
  pricingCostSchema,
] as const

// Default values for form initialization
export const defaultTripFormValues: Partial<AddTripFormData> = {
  creationMethod: undefined,
  uploadedFile: undefined,
  uploadedFileName: undefined,
  tripMode: undefined,
  tripTiming: undefined,
  outboundPickupDate: '',
  outboundPickupTime: '',
  returnPickupDate: '',
  returnPickupTime: '',
  organization: '',
  patient: '',
  serviceLevel: undefined,
  levelOfCare: '',
  crewConfiguration: undefined,
  priority: undefined,
  equipmentPack: [],
  outboundPickupAddress: '',
  outboundPickupLatitude: undefined,
  outboundPickupLongitude: undefined,
  outboundPickupFacilityName: '',
  outboundPickupWindowStart: '',
  outboundPickupWindowEnd: '',
  outboundPickupInstructions: '',
  outboundDropoffAddress: '',
  outboundDropoffLatitude: undefined,
  outboundDropoffLongitude: undefined,
  outboundDropoffFacilityName: '',
  outboundDropoffWindowStart: '',
  outboundDropoffWindowEnd: '',
  outboundDropoffInstructions: '',
  returnPickupAddress: '',
  returnPickupLatitude: undefined,
  returnPickupLongitude: undefined,
  returnPickupFacilityName: '',
  returnPickupWindowStart: '',
  returnPickupWindowEnd: '',
  returnPickupInstructions: '',
  returnDropoffAddress: '',
  returnDropoffLatitude: undefined,
  returnDropoffLongitude: undefined,
  returnDropoffFacilityName: '',
  returnDropoffWindowStart: '',
  returnDropoffWindowEnd: '',
  returnDropoffInstructions: '',
  estimatedDistance: undefined,
  estimatedDuration: undefined,
  assignmentType: undefined,
  vehicleId: undefined,
  driverId: undefined,
  primaryMedicalCrewId: undefined,
  baseFare: undefined,
  perMileRate: undefined,
  stairCarryFee: 0,
  bariatricSurcharge: 0,
  waitTimeCharge: 0,
  afterHoursMultiplier: 0,
  holidayRate: 0,
  cancellationFee: 0,
  manualOverride: undefined,
  estimatedCost: undefined,
}

// Service Level options
export const SERVICE_LEVEL_OPTIONS = [
  { value: 'BLS', label: 'BLS (Basic Life Support)' },
  { value: 'ALS', label: 'ALS (Advanced Life Support)' },
  { value: 'CCT', label: 'CCT (Critical Care Transport)' },
  { value: 'Wheelchair Van', label: 'Wheelchair Van' },
] as const

// Equipment Pack options
export const EQUIPMENT_PACK_OPTIONS = [
  { value: 'Oxygen Tank', label: 'Oxygen Tank' },
  { value: 'Cardiac Monitor', label: 'Cardiac Monitor' },
  { value: 'IV Pump', label: 'IV Pump' },
  { value: 'Wheelchair', label: 'Wheelchair' },
  { value: 'PPE Kit', label: 'PPE Kit' },
  { value: 'Stretcher', label: 'Stretcher' },
] as const

