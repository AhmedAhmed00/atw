/**
 * Add Patient Form Schemas
 * Multi-step form validation schemas using Zod
 */

import { z } from 'zod'

// Step 1: Personal Information
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine(
      (date) => {
        const dob = new Date(date)
        const today = new Date()
        const age = today.getFullYear() - dob.getFullYear()
        const monthDiff = today.getMonth() - dob.getMonth()
        const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate()) ? age - 1 : age
        return actualAge >= 0 && actualAge <= 120
      },
      { message: 'Please enter a valid date of birth' }
    ),
  gender: z.enum(['Male', 'Female', 'Other', 'Prefer not to say'], {
    required_error: 'Gender is required',
  }),
  medicalRecordNumber: z
    .string()
    .min(1, 'Medical Record Number is required')
    .max(50, 'Medical Record Number must not exceed 50 characters')
    .regex(/^[A-Z0-9-]+$/, 'Medical Record Number can only contain uppercase letters, numbers, and hyphens'),
})

// Step 2: Medical Details
export const medicalDetailsSchema = z.object({
  mobilityStatus: z.enum(['Ambulatory', 'Wheelchair', 'Stretcher', 'Other'], {
    required_error: 'Mobility status is required',
  }),
  baselineO2Level: z
    .string()
    .min(1, 'Baseline O₂ Level is required')
    .refine(
      (val) => {
        const num = parseFloat(val)
        return !isNaN(num) && num >= 0 && num <= 100
      },
      { message: 'Baseline O₂ Level must be between 0 and 100' }
    ),
  height: z
    .string()
    .min(1, 'Height is required')
    .refine(
      (val) => {
        const num = parseFloat(val)
        return !isNaN(num) && num > 0 && num <= 300
      },
      { message: 'Height must be a valid number between 1 and 300 cm' }
    ),
  weight: z
    .string()
    .min(1, 'Weight is required')
    .refine(
      (val) => {
        const num = parseFloat(val)
        return !isNaN(num) && num > 0 && num <= 500
      },
      { message: 'Weight must be a valid number between 1 and 500 kg' }
    ),
  clinicalFlags: z
    .array(z.enum(['Isolation', 'Seizure Risk', 'Fall Risk', 'DNR']))
    .default([]),
})

// Step 3: Insurance Information
const insuranceBaseSchema = z.object({
  payerName: z
    .string()
    .min(2, 'Payer name must be at least 2 characters')
    .max(100, 'Payer name must not exceed 100 characters'),
  payerMemberId: z
    .string()
    .min(1, 'Payer Member ID is required')
    .max(50, 'Payer Member ID must not exceed 50 characters'),
  payerPlan: z
    .string()
    .min(1, 'Payer Plan is required')
    .max(100, 'Payer Plan must not exceed 100 characters'),
  priorAuthorization: z.enum(['Yes', 'No'], {
    required_error: 'Prior Authorization is required',
  }),
  authorizationNumber: z.string().optional(),
  authorizationStartDate: z.string().optional(),
  authorizationEndDate: z.string().optional(),
})

export const insuranceSchema = insuranceBaseSchema.refine(
  (data) => {
    if (data.priorAuthorization === 'Yes') {
      return (
        data.authorizationNumber &&
        data.authorizationNumber.length > 0 &&
        data.authorizationStartDate &&
        data.authorizationEndDate
      )
    }
    return true
  },
  {
    message: 'Authorization number and dates are required when Prior Authorization is Yes',
    path: ['authorizationNumber'],
  }
).refine(
  (data) => {
    if (data.priorAuthorization === 'Yes' && data.authorizationStartDate && data.authorizationEndDate) {
      const startDate = new Date(data.authorizationStartDate)
      const endDate = new Date(data.authorizationEndDate)
      return endDate >= startDate
    }
    return true
  },
  {
    message: 'Authorization end date must be after start date',
    path: ['authorizationEndDate'],
  }
)

// Step 4: Accessibility & Equipment
const accessibilityBaseSchema = z.object({
  accessibilityConstraints: z
    .array(z.enum(['Visual Impairment', 'Hearing Impairment', 'Mobility Impairment', 'Cognitive Impairment', 'Other']))
    .default([]),
  equipmentNeeded: z
    .array(z.enum(['Oxygen Tank', 'Wheelchair', 'Stretcher', 'Ventilator', 'IV Pump', 'Other']))
    .default([]),
  interpreterRequired: z.enum(['Yes', 'No'], {
    required_error: 'Interpreter Required is required',
  }),
  preferredLanguage: z.string().optional(),
  escortRequired: z.enum(['Yes', 'No'], {
    required_error: 'Escort Required is required',
  }),
  communicationImpairments: z.string().max(500, 'Communication Impairments must not exceed 500 characters').optional(),
  behavioralConsiderations: z.string().max(500, 'Behavioral Considerations must not exceed 500 characters').optional(),
})

export const accessibilitySchema = accessibilityBaseSchema.refine(
  (data) => {
    if (data.interpreterRequired === 'Yes') {
      return data.preferredLanguage && data.preferredLanguage.length > 0
    }
    return true
  },
  {
    message: 'Preferred Language is required when Interpreter Required is Yes',
    path: ['preferredLanguage'],
  }
)

// Step 5: Contact & Address
export const contactAddressSchema = z.object({
  emergencyContactName: z
    .string()
    .min(2, 'Emergency contact name must be at least 2 characters')
    .max(100, 'Emergency contact name must not exceed 100 characters'),
  emergencyContactPhone: z
    .string()
    .min(1, 'Emergency contact phone is required')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
  careTeamContact: z
    .string()
    .max(200, 'Care Team Contact must not exceed 200 characters')
    .optional(),
  addressLine1: z
    .string()
    .min(5, 'Address Line 1 must be at least 5 characters')
    .max(200, 'Address Line 1 must not exceed 200 characters'),
  addressLine2: z
    .string()
    .max(200, 'Address Line 2 must not exceed 200 characters')
    .optional(),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must not exceed 100 characters'),
  state: z
    .string()
    .min(2, 'State must be at least 2 characters')
    .max(100, 'State must not exceed 100 characters'),
  postalCode: z
    .string()
    .min(3, 'Postal code must be at least 3 characters')
    .max(20, 'Postal code must not exceed 20 characters'),
  consentOnFile: z.boolean().refine((val) => val === true, {
    message: 'Consent on File is required',
  }),
  photoIdOnFile: z.boolean().refine((val) => val === true, {
    message: 'Photo ID on File is required',
  }),
})

// Step 6: Summary & Notes
export const summarySchema = z.object({
  additionalNotes: z
    .string()
    .max(2000, 'Additional notes must not exceed 2000 characters')
    .optional(),
})

// Combined schema for the entire form
export const addPatientFormSchema = z.object({
  // Step 1
  ...personalInfoSchema.shape,
  // Step 2
  ...medicalDetailsSchema.shape,
  // Step 3
  ...insuranceBaseSchema.shape,
  // Step 4
  ...accessibilityBaseSchema.shape,
  // Step 5
  ...contactAddressSchema.shape,
  // Step 6
  ...summarySchema.shape,
}).refine(
  (data) => {
    if (data.priorAuthorization === 'Yes') {
      return (
        data.authorizationNumber &&
        data.authorizationNumber.length > 0 &&
        data.authorizationStartDate &&
        data.authorizationEndDate
      )
    }
    return true
  },
  {
    message: 'Authorization number and dates are required when Prior Authorization is Yes',
    path: ['authorizationNumber'],
  }
).refine(
  (data) => {
    if (data.priorAuthorization === 'Yes' && data.authorizationStartDate && data.authorizationEndDate) {
      const startDate = new Date(data.authorizationStartDate)
      const endDate = new Date(data.authorizationEndDate)
      return endDate >= startDate
    }
    return true
  },
  {
    message: 'Authorization end date must be after start date',
    path: ['authorizationEndDate'],
  }
).refine(
  (data) => {
    if (data.interpreterRequired === 'Yes') {
      return data.preferredLanguage && data.preferredLanguage.length > 0
    }
    return true
  },
  {
    message: 'Preferred Language is required when Interpreter Required is Yes',
    path: ['preferredLanguage'],
  }
)

// Type inference
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
export type MedicalDetailsFormData = z.infer<typeof medicalDetailsSchema>
export type InsuranceFormData = z.infer<typeof insuranceSchema>
export type AccessibilityFormData = z.infer<typeof accessibilitySchema>
export type ContactAddressFormData = z.infer<typeof contactAddressSchema>
export type SummaryFormData = z.infer<typeof summarySchema>
export type AddPatientFormData = z.infer<typeof addPatientFormSchema>

// Step-by-step validation schemas array
export const stepSchemas = [
  personalInfoSchema,
  medicalDetailsSchema,
  insuranceSchema,
  accessibilitySchema,
  contactAddressSchema,
  summarySchema,
] as const

// Default values for form initialization
export const defaultFormValues: Partial<AddPatientFormData> = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: undefined,
  medicalRecordNumber: '',
  mobilityStatus: undefined,
  baselineO2Level: '',
  height: '',
  weight: '',
  clinicalFlags: [],
  payerName: '',
  payerMemberId: '',
  payerPlan: '',
  priorAuthorization: undefined,
  authorizationNumber: '',
  authorizationStartDate: '',
  authorizationEndDate: '',
  accessibilityConstraints: [],
  equipmentNeeded: [],
  interpreterRequired: undefined,
  preferredLanguage: '',
  escortRequired: undefined,
  communicationImpairments: '',
  behavioralConsiderations: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  careTeamContact: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  consentOnFile: false,
  photoIdOnFile: false,
  additionalNotes: '',
}

