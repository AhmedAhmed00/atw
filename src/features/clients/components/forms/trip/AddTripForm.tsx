/**
 * Add Trip Multi-Step Form
 * Main form controller with step navigation and validation
 */

import * as React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Save, CheckCircle2, List, Plus } from 'lucide-react'
import {
  addTripFormSchema,
  defaultTripFormValues,
  tripStepSchemas,
  AddTripFormData,
} from '../../../schemas/addTripSchema'
import { StepIndicator } from '../StepIndicator'
import { Step1TripCreationMethod } from './steps/Step1TripCreationMethod'
import { Step2TripModeTiming } from './steps/Step2TripModeTiming'
import { Step3PatientService } from './steps/Step3PatientService'
import { Step4TripLocations } from './steps/Step4TripLocations'
import { Step5VehicleCrew } from './steps/Step5VehicleCrew'
import { Step6PricingCost } from './steps/Step6PricingCost'

const STEP_LABELS = [
  'Creation Method',
  'Mode & Timing',
  'Patient & Service',
  'Locations',
  'Vehicle & Crew',
  'Pricing',
]

const TOTAL_STEPS = 6

interface AddTripFormProps {
  onSubmit: (data: AddTripFormData) => Promise<void> | void
  onCancel?: () => void
  onViewAllTrips?: () => void
  institutionId?: string
  defaultValues?: Partial<AddTripFormData>
}

export function AddTripForm({
  onSubmit,
  onCancel,
  onViewAllTrips,
  institutionId,
  defaultValues,
}: AddTripFormProps) {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const form = useForm<AddTripFormData>({
    resolver: zodResolver(addTripFormSchema),
    defaultValues: { ...defaultTripFormValues, ...defaultValues },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  // Define field names for each step
  const stepFields: Record<number, (keyof AddTripFormData)[]> = {
    1: ['creationMethod', 'uploadedFile', 'uploadedFileName'],
    2: ['tripMode', 'tripTiming', 'outboundPickupDate', 'outboundPickupTime', 'returnPickupDate', 'returnPickupTime'],
    3: ['organization', 'patient', 'serviceLevel', 'levelOfCare', 'crewConfiguration', 'priority', 'equipmentPack'],
    4: [
      'outboundPickupAddress',
      'outboundPickupLatitude',
      'outboundPickupLongitude',
      'outboundPickupFacilityName',
      'outboundPickupWindowStart',
      'outboundPickupWindowEnd',
      'outboundPickupInstructions',
      'outboundDropoffAddress',
      'outboundDropoffLatitude',
      'outboundDropoffLongitude',
      'outboundDropoffFacilityName',
      'outboundDropoffWindowStart',
      'outboundDropoffWindowEnd',
      'outboundDropoffInstructions',
      'returnPickupAddress',
      'returnPickupLatitude',
      'returnPickupLongitude',
      'returnPickupFacilityName',
      'returnPickupWindowStart',
      'returnPickupWindowEnd',
      'returnPickupInstructions',
      'returnDropoffAddress',
      'returnDropoffLatitude',
      'returnDropoffLongitude',
      'returnDropoffFacilityName',
      'returnDropoffWindowStart',
      'returnDropoffWindowEnd',
      'returnDropoffInstructions',
    ],
    5: ['assignmentType', 'vehicleId', 'driverId', 'primaryMedicalCrewId'],
    6: [
      'baseFare',
      'perMileRate',
      'stairCarryFee',
      'bariatricSurcharge',
      'waitTimeCharge',
      'afterHoursMultiplier',
      'holidayRate',
      'cancellationFee',
      'manualOverride',
      'estimatedCost',
    ],
  }

  // Validate current step before advancing using trigger
  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate = stepFields[currentStep]
    if (!fieldsToValidate) return true

    // For step 4, conditionally validate return trip fields
    if (currentStep === 4) {
      const tripMode = form.getValues('tripMode')
      if (tripMode === 'Round Trip') {
        // Include return trip fields
        const allFields = [...fieldsToValidate]
        const result = await form.trigger(allFields as any)
        if (!result) {
          const firstErrorField = allFields.find((field) => {
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
      } else {
        // Exclude return trip fields for one-way trips
        const oneWayFields = fieldsToValidate.filter(
          (field) => !field.startsWith('return')
        )
        const result = await form.trigger(oneWayFields as any)
        if (!result) {
          const firstErrorField = oneWayFields.find((field) => {
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
    }

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
    localStorage.setItem('trip_form_draft', JSON.stringify(formData))
    console.log('Draft saved:', formData)
  }

  const handleSubmit = async (data: AddTripFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      setIsSuccess(true)
      localStorage.removeItem('trip_form_draft')
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
        return <Step1TripCreationMethod />
      case 2:
        return <Step2TripModeTiming />
      case 3:
        return <Step3PatientService />
      case 4:
        return <Step4TripLocations />
      case 5:
        return <Step5VehicleCrew />
      case 6:
        return <Step6PricingCost />
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
                Trip Created Successfully!
              </h3>
              <p className="text-muted-foreground max-w-md">
                The trip has been added to the system and is now available in the trips list.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-md">
              {onViewAllTrips && (
                <Button
                  onClick={onViewAllTrips}
                  className="w-full sm:w-auto gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                  size="lg"
                >
                  <List className="w-4 h-4" />
                  View All Trips
                </Button>
              )}
              <Button
                onClick={handleAddAnother}
                variant="outline"
                className="w-full sm:w-auto gap-2"
                size="lg"
              >
                <Plus className="w-4 h-4" />
                Add Another Trip
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

