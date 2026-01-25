/**
 * Add Patient Multi-Step Form
 * Main form controller with step navigation and validation
 */

import * as React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Save, CheckCircle2, Users, Plus } from 'lucide-react'
import {
  addPatientFormSchema,
  defaultFormValues,
  AddPatientFormData,
} from '../../schemas/addPatientSchema'
import { StepIndicator } from './StepIndicator'
import { Step1PersonalInfo } from './steps/Step1PersonalInfo'
import { Step2MedicalDetails } from './steps/Step2MedicalDetails'
import { Step3Insurance } from './steps/Step3Insurance'
import { Step4Accessibility } from './steps/Step4Accessibility'
import { Step5ContactAddress } from './steps/Step5ContactAddress'
import { Step6Summary } from './steps/Step6Summary'

const STEP_LABELS = [
  'Personal Info',
  'Medical Details',
  'Insurance',
  'Accessibility',
  'Contact',
  'Summary',
]

const TOTAL_STEPS = 6

interface AddPatientFormProps {
  onSubmit: (data: AddPatientFormData) => Promise<void> | void
  onCancel?: () => void
  onViewAllPatients?: () => void
  defaultValues?: Partial<AddPatientFormData>
}

export function AddPatientForm({ onSubmit, onCancel, onViewAllPatients, defaultValues }: AddPatientFormProps) {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const form = useForm<AddPatientFormData>({
    resolver: zodResolver(addPatientFormSchema),
    defaultValues: { ...defaultFormValues, ...defaultValues },
    mode: 'onBlur', // Validate on blur for better UX
    reValidateMode: 'onChange', // Re-validate on change after first error
  })

  // Define field names for each step
  const stepFields: Record<number, (keyof AddPatientFormData)[]> = {
    1: ['firstName', 'lastName', 'dateOfBirth', 'gender', 'medicalRecordNumber'],
    2: ['mobilityStatus', 'baselineO2Level', 'height', 'weight', 'clinicalFlags'],
    3: [
      'payerName',
      'payerMemberId',
      'payerPlan',
      'priorAuthorization',
      'authorizationNumber',
      'authorizationStartDate',
      'authorizationEndDate',
    ],
    4: [
      'accessibilityConstraints',
      'equipmentNeeded',
      'interpreterRequired',
      'preferredLanguage',
      'escortRequired',
      'communicationImpairments',
      'behavioralConsiderations',
    ],
    5: [
      'emergencyContactName',
      'emergencyContactPhone',
      'careTeamContact',
      'addressLine1',
      'addressLine2',
      'city',
      'state',
      'postalCode',
      'consentOnFile',
      'photoIdOnFile',
    ],
    6: ['additionalNotes'],
  }

  // Validate current step before advancing using trigger
  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate = stepFields[currentStep]
    if (!fieldsToValidate) return true

    // Trigger validation for only the current step fields
    const result = await form.trigger(fieldsToValidate as any)
    
    // Scroll to first error if validation fails
    if (!result) {
      const firstErrorField = fieldsToValidate.find((field) => {
        const fieldState = form.getFieldState(field)
        return fieldState.error
      })
      
      if (firstErrorField) {
        // Try to find the input element by name or id
        const fieldName = String(firstErrorField)
        const element = document.querySelector(`[name="${fieldName}"]`) ||
                       document.querySelector(`#${fieldName}`) ||
                       document.querySelector(`[id*="${fieldName}"]`)
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
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1)
      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSaveDraft = async () => {
    const formData = form.getValues()
    // Save to localStorage as draft
    localStorage.setItem('patient_form_draft', JSON.stringify(formData))
    // You could also call an API here
    console.log('Draft saved:', formData)
  }

  const handleSubmit = async (data: AddPatientFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      setIsSuccess(true)
      // Clear draft from localStorage
      localStorage.removeItem('patient_form_draft')
      // Don't auto-reset - wait for user action
    } catch (error) {
      console.error('Form submission error:', error)
      // Error handling would go here
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddAnother = () => {
    form.reset()
    setCurrentStep(1)
    setIsSuccess(false)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo />
      case 2:
        return <Step2MedicalDetails />
      case 3:
        return <Step3Insurance />
      case 4:
        return <Step4Accessibility />
      case 5:
        return <Step5ContactAddress />
      case 6:
        return <Step6Summary />
      default:
        return null
    }
  }

  if (isSuccess) {
    return (
      <Card className="border-green-500 shadow-lg">
        <CardContent className="pt-12 pb-12">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            {/* Success Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
              <CheckCircle2 className="relative w-20 h-20 text-green-600 dark:text-green-500" />
            </div>
            
            {/* Success Message */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Patient Created Successfully!
              </h3>
              <p className="text-muted-foreground max-w-md">
                The patient has been added to the system and is now available in the patients list.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-md">
              {onViewAllPatients && (
                <Button
                  onClick={onViewAllPatients}
                  className="w-full sm:w-auto gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                  size="lg"
                >
                  <Users className="w-4 h-4" />
                  View All Patients
                </Button>
              )}
              <Button
                onClick={handleAddAnother}
                variant="outline"
                className="w-full sm:w-auto gap-2"
                size="lg"
              >
                <Plus className="w-4 h-4" />
                Add Another Patient
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Step Indicator */}
        <Card>
          <CardContent className="pt-6">
            <StepIndicator
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              stepLabels={STEP_LABELS}
            />
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Step {currentStep} of {TOTAL_STEPS}: {STEP_LABELS[currentStep - 1]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
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
            {currentStep < TOTAL_STEPS ? (
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
              <>
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
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Confirm & Submit
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

