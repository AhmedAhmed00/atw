/**
 * Add Vehicle Form Controller
 * Multi-step form for adding a new vehicle
 */

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { StepIndicator } from '@/features/clients/components/forms/StepIndicator'

const STEP_LABELS = [
  'Basic Info',
  'Documents',
  'Medical Equipment',
  'Crew Members',
  'Credentials',
]
import { addVehicleSchema, AddVehicleFormData } from '../../schemas/addVehicleSchema'
import { Step1BasicInfo } from './steps/Step1BasicInfo'
import { Step2Documents } from './steps/Step2Documents'
import { Step3MedicalEquipment } from './steps/Step3MedicalEquipment'
import { Step4CrewMembers } from './steps/Step4CrewMembers'
import { Step5Credentials } from './steps/Step5Credentials'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const TOTAL_STEPS = 5

export function AddVehicleForm() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm<AddVehicleFormData>({
    resolver: zodResolver(addVehicleSchema),
    defaultValues: {
      vehicleId: '',
      vehicleClass: '',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      vin: '',
      plateNumber: '',
      baseLocation: '',
      seatingCapacity: undefined,
      bariatricCapacity: undefined,
      activeStatus: true,
      insuranceExpiryDate: '',
      registrationExpiryDate: '',
      hasLiftOrRamp: false,
      adaCompliant: false,
      notes: '',
      documents: [],
      stretcher: false,
      aed: false,
      suctionUnit: false,
      oxygenSystem: false,
      firstAidKit: false,
      immobilizationEquipment: false,
      otherEquipment: '',
      crewMembers: [],
      username: '',
      password: '',
    },
    mode: 'onBlur',
  })

  const { trigger, formState } = form

  const handleNext = async () => {
    let fieldsToValidate: (keyof AddVehicleFormData)[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          'vehicleId',
          'vehicleClass',
          'make',
          'model',
          'year',
          'plateNumber',
          'baseLocation',
        ]
        break
      case 2:
        // Documents are optional, so no validation needed
        break
      case 3:
        // Medical equipment checkboxes are optional
        break
      case 4:
        // Crew members are optional
        break
      case 5:
        fieldsToValidate = ['username', 'password']
        break
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate as any)
      if (!isValid) {
        return
      }
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: AddVehicleFormData) => {
    try {
      console.log('Vehicle data:', data)
      // TODO: Submit to API
      // await createVehicle(data)
      
      // Navigate to success page or back to vehicles list
      navigate('/fleet/vehicles?success=true')
    } catch (error) {
      console.error('Error creating vehicle:', error)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo />
      case 2:
        return <Step2Documents />
      case 3:
        return <Step3MedicalEquipment />
      case 4:
        return <Step4CrewMembers />
      case 5:
        return <Step5Credentials />
      default:
        return null
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} stepLabels={STEP_LABELS} />

        {/* Step Content */}
        <Card>
          <CardContent className="pt-6">{renderStep()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center gap-2">
            {currentStep < TOTAL_STEPS ? (
              <Button
                type="button"
                onClick={handleNext}
                className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={formState.isSubmitting}
                className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
              >
                {formState.isSubmitting ? 'Saving...' : 'Save Vehicle'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

