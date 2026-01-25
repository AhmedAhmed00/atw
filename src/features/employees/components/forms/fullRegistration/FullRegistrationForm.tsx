/**
 * Full Registration Multi-Step Form
 * Main form controller with step navigation and validation
 */

import * as React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Save, CheckCircle2, Users, Plus } from 'lucide-react'
import { StepIndicator } from '@/features/clients/components/forms/StepIndicator'
import {
  fullRegistrationSchema,
  FullRegistrationFormData,
} from '../../../schemas/fullRegistrationSchema'
import { Step1Role } from './steps/Step1Role'
import { Step2PersonalInfo } from './steps/Step2PersonalInfo'
import { Step3DriverEVOC } from './steps/Step3DriverEVOC'
import { Step4MedicalLicense } from './steps/Step4MedicalLicense'
import { Step5Certifications } from './steps/Step5Certifications'
import { Step6Compliance } from './steps/Step6Compliance'
import { Step7HRNotes } from './steps/Step7HRNotes'
import { Step8Summary } from './steps/Step8Summary'

const STEP_LABELS = [
  'Role',
  'Personal Info',
  'Driver & EVOC',
  'Medical License',
  'Certifications',
  'Compliance',
  'HR & Notes',
  'Summary',
]

const TOTAL_STEPS = 8

interface FullRegistrationFormProps {
  onSubmit: (data: FullRegistrationFormData) => Promise<void> | void
  onCancel?: () => void
  onViewAllEmployees?: () => void
  defaultValues?: Partial<FullRegistrationFormData>
}

const defaultFormValues: Partial<FullRegistrationFormData> = {
  primaryRole: undefined,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  homebase: undefined,
  shiftAvailabilityNotes: '',
  driverLicense: {
    number: '',
    state: '',
    expiryDate: '',
  },
  evocCertification: {
    certificationNumber: '',
    expiryDate: '',
  },
  step4MedicalLicense: undefined,
  cpr: {
    expiryDate: '',
  },
  acls: {
    expiryDate: '',
  },
  pals: {
    expiryDate: '',
  },
  hipaa: {
    expiryDate: '',
  },
  patientHandling: {
    expiryDate: '',
  },
  wheelchairSecurement: {
    expiryDate: '',
  },
  backgroundCheck: {
    date: '',
  },
  drugScreening: {
    date: '',
  },
  immunization: {
    onFile: false,
  },
  hrStatus: undefined,
  employmentType: undefined,
  hireDate: '',
  administrativeNotes: '',
  additionalInformation: '',
}

export function FullRegistrationForm({
  onSubmit,
  onCancel,
  onViewAllEmployees,
  defaultValues,
}: FullRegistrationFormProps) {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const form = useForm<FullRegistrationFormData>({
    resolver: zodResolver(fullRegistrationSchema),
    defaultValues: { ...defaultFormValues, ...defaultValues },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  // Get primary role to determine if step 4 should be shown
  const primaryRole = form.watch('primaryRole')
  const shouldShowStep4 = primaryRole === 'emt'

  // Define field names for each step
  const stepFields: Record<number, (keyof FullRegistrationFormData | string)[]> = {
    1: ['primaryRole'],
    2: ['firstName', 'lastName', 'email', 'phone', 'homebase', 'shiftAvailabilityNotes'],
    3: [
      'driverLicense.number',
      'driverLicense.state',
      'driverLicense.expiryDate',
      'evocCertification.certificationNumber',
      'evocCertification.expiryDate',
    ],
    4: [
      'step4MedicalLicense.medicalLicenseNumber',
      'step4MedicalLicense.issuingState',
      'step4MedicalLicense.expiryDate',
    ],
    5: [
      'cpr.expiryDate',
      'acls.expiryDate',
      'pals.expiryDate',
      'hipaa.expiryDate',
      'patientHandling.expiryDate',
      'wheelchairSecurement.expiryDate',
    ],
    6: [
      'backgroundCheck.date',
      'drugScreening.date',
      'immunization.onFile',
    ],
    7: ['hrStatus', 'employmentType', 'hireDate'],
    8: [],
  }

  // Validate current step before advancing using trigger
  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate = stepFields[currentStep]
    if (!fieldsToValidate || fieldsToValidate.length === 0) return true

    // Trigger validation for only the current step fields
    const result = await form.trigger(fieldsToValidate as any)

    // Scroll to first error if validation fails
    if (!result) {
      const firstErrorField = fieldsToValidate.find((field) => {
        const fieldState = form.getFieldState(field as any)
        return fieldState.error
      })

      if (firstErrorField) {
        const element =
          document.querySelector(`[name="${firstErrorField}"]`) ||
          document.querySelector(`#${firstErrorField}`) ||
          document.querySelector(`[id*="${firstErrorField}"]`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          ;(element as HTMLElement).focus()
        }
      }
    }

    return result
  }

  const handleNext = async () => {
    const isValid = await validateCurrentStep()
    if (isValid) {
      // Skip step 4 if not EMT and we're on step 3
      if (currentStep === 3 && !shouldShowStep4) {
        setCurrentStep(5)
      } else if (currentStep < TOTAL_STEPS) {
        setCurrentStep((prev) => prev + 1)
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      // Skip step 4 if not EMT and we're going back from step 5
      if (currentStep === 5 && !shouldShowStep4) {
        setCurrentStep(3)
      } else {
        setCurrentStep((prev) => prev - 1)
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSaveDraft = async () => {
    const formData = form.getValues()
    localStorage.setItem('employee_full_registration_draft', JSON.stringify(formData))
    console.log('Draft saved:', formData)
  }

  const handleSubmit = async (data: FullRegistrationFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      setIsSuccess(true)
      localStorage.removeItem('employee_full_registration_draft')
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddAnother = () => {
    form.reset()
    setCurrentStep(1)
    setIsSuccess(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Role />
      case 2:
        return <Step2PersonalInfo />
      case 3:
        return <Step3DriverEVOC />
      case 4:
        return shouldShowStep4 ? <Step4MedicalLicense /> : null
      case 5:
        return <Step5Certifications />
      case 6:
        return <Step6Compliance />
      case 7:
        return <Step7HRNotes />
      case 8:
        return <Step8Summary />
      default:
        return null
    }
  }

  // Adjust step labels based on conditional step
  const getStepLabels = () => {
    if (!shouldShowStep4) {
      return STEP_LABELS.filter((_, index) => index !== 3) // Remove "Medical License"
    }
    return STEP_LABELS
  }

  const effectiveTotalSteps = shouldShowStep4 ? TOTAL_STEPS : TOTAL_STEPS - 1

  if (isSuccess) {
    return (
      <Card className="border-green-500 shadow-lg">
        <CardContent className="pt-12 pb-12">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
              <CheckCircle2 className="relative w-20 h-20 text-green-600 dark:text-green-500" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Employee Registered Successfully!
              </h3>
              <p className="text-muted-foreground max-w-md">
                The employee has been added to the system and is now available in the employees list.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-md">
              {onViewAllEmployees && (
                <Button
                  onClick={onViewAllEmployees}
                  className="w-full sm:w-auto gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                  size="lg"
                >
                  <Users className="w-4 h-4" />
                  View All Employees
                </Button>
              )}
              <Button
                onClick={handleAddAnother}
                variant="outline"
                className="w-full sm:w-auto gap-2"
                size="lg"
              >
                <Plus className="w-4 h-4" />
                Add Another Employee
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const stepLabels = getStepLabels()
  const currentStepLabel = stepLabels[currentStep - 1] || STEP_LABELS[currentStep - 1]

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <StepIndicator
              currentStep={currentStep}
              totalSteps={effectiveTotalSteps}
              stepLabels={stepLabels}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Step {currentStep} of {effectiveTotalSteps}: {currentStepLabel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[400px]">{renderStepContent()}</div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between gap-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isSubmitting}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentStep < effectiveTotalSteps ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

