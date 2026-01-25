/**
 * Add Institution Form Schemas
 * Multi-step form validation schemas using Zod
 */

import { z } from 'zod'

// Step 1: Basic Information
export const basicInfoSchema = z.object({
  // Institution Information
  institutionName: z
    .string()
    .min(2, 'Institution name must be at least 2 characters')
    .max(200, 'Institution name must not exceed 200 characters'),
  institutionType: z.enum(
    ['Hospital', 'Care Home', 'Government', 'Clinic', 'Medical Center', 'Other'],
    {
      required_error: 'Institution type is required',
    }
  ),
  commercialRegistration: z
    .string()
    .min(1, 'Commercial Registration / National ID is required')
    .max(50, 'Commercial Registration / National ID must not exceed 50 characters'),
  taxNumber: z
    .string()
    .max(50, 'Tax Number must not exceed 50 characters')
    .optional()
    .or(z.literal('')),
  establishmentDate: z
    .string()
    .optional()
    .or(z.literal('')),
  governorate: z
    .string()
    .min(2, 'Governorate is required')
    .max(100, 'Governorate must not exceed 100 characters'),
  city: z
    .string()
    .min(2, 'City is required')
    .max(100, 'City must not exceed 100 characters'),
  fullAddress: z
    .string()
    .min(10, 'Full address must be at least 10 characters')
    .max(500, 'Full address must not exceed 500 characters'),
  
  // Contact Details
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  website: z
    .string()
    .url('Please enter a valid website URL')
    .optional()
    .or(z.literal('')),
  
  // Management & Contact Info
  generalManagerName: z
    .string()
    .min(2, 'General Manager name must be at least 2 characters')
    .max(100, 'General Manager name must not exceed 100 characters'),
  generalManagerPhone: z
    .string()
    .min(1, 'General Manager phone is required')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
  generalManagerEmail: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  contactPersonName: z
    .string()
    .max(100, 'Contact Person name must not exceed 100 characters')
    .optional()
    .or(z.literal('')),
  contactPersonPhone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]*$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  contactPersonEmail: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  fax: z
    .string()
    .regex(/^[\d\s\-\+\(\)]*$/, 'Please enter a valid fax number')
    .optional()
    .or(z.literal('')),
  
  // Location
  latitude: z
    .number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90')
    .optional(),
  longitude: z
    .number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180')
    .optional(),
})

// Step 2: Contract Details
const contractDetailsBaseSchema = z.object({
  services: z
    .array(z.enum(['Ambulatory', 'Wheelchair', 'Stretcher', 'BLS', 'ALS', 'ICU']))
    .min(1, 'At least one service must be selected'),
  serviceConfigurations: z.record(
    z.object({
      rateCardConfirmed: z.boolean(),
    })
  ),
})

export const contractDetailsSchema = contractDetailsBaseSchema.refine(
  (data) => {
    // Ensure all selected services have configurations with confirmed rate cards
    return data.services.every((service) => {
      return data.serviceConfigurations[service]?.rateCardConfirmed === true
    })
  },
  {
    message: 'All selected services must have confirmed rate cards',
    path: ['serviceConfigurations'],
  }
)

// Combined schema for the entire form
export const addInstitutionFormSchema = z.object({
  ...basicInfoSchema.shape,
  ...contractDetailsBaseSchema.shape,
}).refine(
  (data) => {
    // Ensure all selected services have configurations with confirmed rate cards
    return data.services.every((service) => {
      return data.serviceConfigurations[service]?.rateCardConfirmed === true
    })
  },
  {
    message: 'All selected services must have confirmed rate cards',
    path: ['serviceConfigurations'],
  }
)

// Type inference
export type BasicInfoFormData = z.infer<typeof basicInfoSchema>
export type ContractDetailsFormData = z.infer<typeof contractDetailsSchema>
export type AddInstitutionFormData = z.infer<typeof addInstitutionFormSchema>

// Step-by-step validation schemas array
export const institutionStepSchemas = [
  basicInfoSchema,
  contractDetailsSchema,
] as const

// Default values for form initialization
export const defaultInstitutionFormValues: Partial<AddInstitutionFormData> = {
  institutionName: '',
  institutionType: undefined,
  commercialRegistration: '',
  taxNumber: '',
  establishmentDate: '',
  governorate: '',
  city: '',
  fullAddress: '',
  phoneNumber: '',
  email: '',
  website: '',
  generalManagerName: '',
  generalManagerPhone: '',
  generalManagerEmail: '',
  contactPersonName: '',
  contactPersonPhone: '',
  contactPersonEmail: '',
  fax: '',
  latitude: undefined,
  longitude: undefined,
  services: [],
  serviceConfigurations: {},
}

// Service options
export const SERVICE_OPTIONS = [
  { value: 'Ambulatory', label: 'Ambulatory' },
  { value: 'Wheelchair', label: 'Wheelchair' },
  { value: 'Stretcher', label: 'Stretcher' },
  { value: 'BLS', label: 'BLS (Basic Life Support)' },
  { value: 'ALS', label: 'ALS (Advanced Life Support)' },
  { value: 'ICU', label: 'ICU (Intensive Care Unit)' },
] as const

// Governorate options (Egyptian governorates)
export const GOVERNORATE_OPTIONS = [
  'Cairo',
  'Giza',
  'Alexandria',
  'Qalyubia',
  'Dakahlia',
  'Sharqia',
  'Monufia',
  'Gharbia',
  'Kafr El Sheikh',
  'Beheira',
  'Ismailia',
  'Port Said',
  'Suez',
  'North Sinai',
  'South Sinai',
  'Damietta',
  'Aswan',
  'Luxor',
  'Red Sea',
  'New Valley',
  'Matruh',
  'Qena',
  'Sohag',
  'Assiut',
  'Beni Suef',
  'Faiyum',
  'Minya',
] as const

