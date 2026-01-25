/**
 * Add Vehicle Form Schema
 * Zod validation schemas for the 5-step Add Vehicle form
 */

import { z } from 'zod'

// Step 1: Basic Vehicle Information
export const step1Schema = z.object({
  vehicleId: z.string().min(1, 'Vehicle ID is required'),
  vehicleClass: z.string().min(1, 'Vehicle Class is required'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.coerce.number().min(1900).max(new Date().getFullYear() + 1, 'Invalid year'),
  vin: z.string().optional(),
  plateNumber: z.string().min(1, 'Plate Number is required'),
  baseLocation: z.string().min(1, 'Base Location is required'),
  seatingCapacity: z.coerce.number().optional(),
  bariatricCapacity: z.coerce.number().optional(),
  activeStatus: z.boolean().default(true),
  insuranceExpiryDate: z.string().optional(),
  registrationExpiryDate: z.string().optional(),
  hasLiftOrRamp: z.boolean().default(false),
  adaCompliant: z.boolean().default(false),
  notes: z.string().optional(),
})

// Step 2: Upload Vehicle Documents
export const documentSchema = z.object({
  fileName: z.string().min(1, 'File Name is required'),
  fileType: z.enum(['Registration', 'Insurance', 'Inspection', 'Permit', 'Other'], {
    required_error: 'File Type is required',
  }),
  expiryDate: z.string().optional(),
  file: z.instanceof(File).optional(),
})

export const step2Schema = z.object({
  documents: z.array(documentSchema).optional(),
})

// Step 3: Medical Equipment
export const step3Schema = z.object({
  stretcher: z.boolean().default(false),
  aed: z.boolean().default(false),
  suctionUnit: z.boolean().default(false),
  oxygenSystem: z.boolean().default(false),
  firstAidKit: z.boolean().default(false),
  immobilizationEquipment: z.boolean().default(false),
  otherEquipment: z.string().optional(),
})

// Step 4: Assign Crew Members
export const step4Schema = z.object({
  crewMembers: z.array(z.string()).optional(),
})

// Step 5: Vehicle Credentials
export const step5Schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

// Combined schema for the entire form
export const addVehicleSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)

export type AddVehicleFormData = z.infer<typeof addVehicleSchema>
export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
export type Step4Data = z.infer<typeof step4Schema>
export type Step5Data = z.infer<typeof step5Schema>

// Vehicle Class options
export const VEHICLE_CLASS_OPTIONS = [
  { value: 'Type II Ambulance', label: 'Type II Ambulance' },
  { value: 'Type I Ambulance', label: 'Type I Ambulance' },
  { value: 'BLS', label: 'BLS' },
  { value: 'WAV', label: 'WAV' },
] as const

// Base Location options
export const BASE_LOCATION_OPTIONS = [
  { value: 'Station Alpha', label: 'Station Alpha' },
  { value: 'Station Beta', label: 'Station Beta' },
  { value: 'Station Gamma', label: 'Station Gamma' },
] as const

// File Type options
export const FILE_TYPE_OPTIONS = [
  { value: 'Registration', label: 'Registration' },
  { value: 'Insurance', label: 'Insurance' },
  { value: 'Inspection', label: 'Inspection' },
  { value: 'Permit', label: 'Permit' },
  { value: 'Other', label: 'Other' },
] as const

