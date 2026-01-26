/**
 * useMultiStepForm Hook
 * Manages multi-step form state and navigation
 */

import { useState, useCallback } from 'react'
import { UseFormReturn } from 'react-hook-form'

export interface UseMultiStepFormOptions {
  totalSteps: number
  initialStep?: number
  onComplete?: () => void
}

export function useMultiStepForm<T extends Record<string, unknown>>(
  form: UseFormReturn<T>,
  options: UseMultiStepFormOptions
) {
  const { totalSteps, initialStep = 1, onComplete } = options
  const [currentStep, setCurrentStep] = useState(initialStep)

  const nextStep = useCallback(async () => {
    // Validate current step before proceeding
    const isValid = await form.trigger()
    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }, [form, currentStep, totalSteps])

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step)
    }
  }, [totalSteps])

  const resetForm = useCallback(() => {
    form.reset()
    setCurrentStep(initialStep)
  }, [form, initialStep])

  const submitForm = useCallback(async () => {
    const isValid = await form.trigger()
    if (isValid) {
      const data = form.getValues()
      if (onComplete) {
        onComplete()
      }
      return data
    }
    return null
  }, [form, onComplete])

  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps
  const progress = (currentStep / totalSteps) * 100

  return {
    currentStep,
    totalSteps,
    nextStep,
    previousStep,
    goToStep,
    resetForm,
    submitForm,
    isFirstStep,
    isLastStep,
    progress,
  }
}

