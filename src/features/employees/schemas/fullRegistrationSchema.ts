/**
 * Full Registration Schema
 * Zod validation schema for the 7-step full employee registration form
 */

import { z } from 'zod'

// Step 1: Role
export const step1RoleSchema = z.object({
  primaryRole: z.enum(['driver', 'emt', 'paramedic', 'rn', 'dispatcher', 'supervisor']),
})

// Step 2: Personal Info
export const step2PersonalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  homebase: z.string().min(1, 'Homebase/Work location is required'),
  shiftAvailabilityNotes: z.string().optional(),
})

// Step 3: Driver & EVOC
export const step3DriverEVOCSchema = z.object({
  driverLicense: z.object({
    number: z.string().min(1, 'License number is required'),
    state: z.string().min(1, 'State is required'),
    expiryDate: z.string().min(1, 'Expiry date is required'),
  }),
  evocCertification: z.object({
    certificationNumber: z.string().min(1, 'Certification number is required'),
    expiryDate: z.string().min(1, 'Expiry date is required'),
    file: z.instanceof(File).optional(),
  }),
})

// Step 4: Medical License (conditional - only if role is EMT)
export const step4MedicalLicenseSchema = z.object({
  medicalLicenseNumber: z.string().min(1, 'Medical license number is required'),
  issuingState: z.string().min(1, 'Issuing state is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  licenseFile: z.instanceof(File).optional(),
})

// Step 5: Certifications
export const step5CertificationsSchema = z.object({
  cpr: z.object({
    expiryDate: z.string().min(1, 'CPR expiry date is required'),
    file: z.instanceof(File).optional(),
  }),
  acls: z.object({
    expiryDate: z.string().min(1, 'ACLS expiry date is required'),
    file: z.instanceof(File).optional(),
  }),
  pals: z.object({
    expiryDate: z.string().min(1, 'PALS expiry date is required'),
    file: z.instanceof(File).optional(),
  }),
  hipaa: z.object({
    expiryDate: z.string().min(1, 'HIPAA expiry date is required'),
    file: z.instanceof(File).optional(),
  }),
  patientHandling: z.object({
    expiryDate: z.string().min(1, 'Patient Handling expiry date is required'),
    file: z.instanceof(File).optional(),
  }),
  wheelchairSecurement: z.object({
    expiryDate: z.string().min(1, 'Wheelchair Securement expiry date is required'),
    file: z.instanceof(File).optional(),
  }),
})

// Step 6: Compliance
export const step6ComplianceSchema = z.object({
  backgroundCheck: z.object({
    date: z.string().min(1, 'Background check date is required'),
    report: z.instanceof(File).optional(),
  }),
  drugScreening: z.object({
    date: z.string().min(1, 'Drug screening date is required'),
    report: z.instanceof(File).optional(),
  }),
  immunization: z.object({
    onFile: z.boolean(),
    documents: z.array(z.instanceof(File)).optional(),
  }),
})

// Step 7: HR & Notes
export const step7HRNotesSchema = z.object({
  hrStatus: z.enum(['active', 'pending', 'on-leave', 'suspended']),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'temporary']),
  hireDate: z.string().min(1, 'Hire date is required'),
  administrativeNotes: z.string().optional(),
  additionalInformation: z.string().optional(),
})

// Combined schema
export const fullRegistrationSchema = z
  .object({
    ...step1RoleSchema.shape,
    ...step2PersonalInfoSchema.shape,
    ...step3DriverEVOCSchema.shape,
    step4MedicalLicense: step4MedicalLicenseSchema.optional(),
    ...step5CertificationsSchema.shape,
    ...step6ComplianceSchema.shape,
    ...step7HRNotesSchema.shape,
  })
  .refine(
    (data) => {
      // If role is EMT, medical license is required
      if (data.primaryRole === 'emt') {
        return data.step4MedicalLicense !== undefined
      }
      return true
    },
    {
      message: 'Medical license is required for EMT role',
      path: ['step4MedicalLicense'],
    }
  )

export type FullRegistrationFormData = z.infer<typeof fullRegistrationSchema>

