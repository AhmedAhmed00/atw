/**
 * Add Institution Multi-Step Form
 * Main form controller with step navigation and validation
 */

import * as React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Save, CheckCircle2, Users, Plus } from 'lucide-react'
import {
  addInstitutionFormSchema,
  defaultInstitutionFormValues,
  institutionStepSchemas,
  AddInstitutionFormData,
} from '../../../schemas/addInstitutionSchema'
import { StepIndicator } from '../StepIndicator'
import { Step1BasicInfo } from './steps/Step1BasicInfo'
import { Step2ContractDetails } from './steps/Step2ContractDetails'

const STEP_LABELS = ['Basic Information', 'Contract Details']

const TOTAL_STEPS = 2

interface AddInstitutionFormProps {
  onSubmit: (data: AddInstitutionFormData) => Promise<void> | void
  onCancel?: () => void
  onViewAllInstitutions?: () => void
  defaultValues?: Partial<AddInstitutionFormData>
}

export function AddInstitutionForm({
  onSubmit,
  onCancel,
  onViewAllInstitutions,
  defaultValues,
}: AddInstitutionFormProps) {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const form = useForm<AddInstitutionFormData>({
    resolver: zodResolver(addInstitutionFormSchema),
    defaultValues: { ...defaultInstitutionFormValues, ...defaultValues },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  // Define field names for each step
  const stepFields: Record<number, (keyof AddInstitutionFormData)[]> = {
    1: [
      'institutionName',
      'institutionType',
      'commercialRegistration',
      'taxNumber',
      'establishmentDate',
      'governorate',
      'city',
      'fullAddress',
      'generalManagerName',
      'generalManagerPhone',
      'generalManagerEmail',
      'contactPersonName',
      'contactPersonPhone',
      'contactPersonEmail',
      'fax',
      'latitude',
      'longitude',
    ],
    2: [
      'phoneNumber',
      'email',
      'website',
      'services',
      'serviceConfigurations',
    ],
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
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1)
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
    localStorage.setItem('institution_form_draft', JSON.stringify(formData))
    console.log('Draft saved:', formData)
  }

  const handleSubmit = async (data: AddInstitutionFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      setIsSuccess(true)
      localStorage.removeItem('institution_form_draft')
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
        return <Step1BasicInfo />
      case 2:
        return <Step2ContractDetails />
      default:
        return null
    }
  }

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
                Institution Created Successfully!
              </h3>
              <p className="text-muted-foreground max-w-md">
                The medical institution has been added to the system and is now available in the institutions list.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-md">
              {onViewAllInstitutions && (
                <Button
                  onClick={onViewAllInstitutions}
                  className="w-full sm:w-auto gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                  size="lg"
                >
                  <Users className="w-4 h-4" />
                  View All Institutions
                </Button>
              )}
              <Button
                onClick={handleAddAnother}
                variant="outline"
                className="w-full sm:w-auto gap-2"
                size="lg"
              >
                <Plus className="w-4 h-4" />
                Add Another Institution
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
        <Card>
          <CardContent className="pt-6">
            <StepIndicator
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              stepLabels={STEP_LABELS}
            />
          </CardContent>
        </Card>

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

