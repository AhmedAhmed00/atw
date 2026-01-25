/**
 * StepErrorSummary Component
 * Displays validation errors for the current step
 */

import { useFormContext } from 'react-hook-form'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FullRegistrationFormData } from '../../../schemas/fullRegistrationSchema'

interface StepErrorSummaryProps {
  fields: (keyof FullRegistrationFormData | string)[]
}

export function StepErrorSummary({ fields }: StepErrorSummaryProps) {
  const form = useFormContext<FullRegistrationFormData>()

  const errors = fields
    .map((field) => {
      const fieldState = form.getFieldState(field as any)
      if (fieldState.error) {
        return {
          field,
          message: fieldState.error.message,
        }
      }
      return null
    })
    .filter((error) => error !== null) as Array<{ field: string; message: string }>

  if (errors.length === 0) {
    return null
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Please fix the following errors:</AlertTitle>
      <AlertDescription>
        <ul className="list-disc list-inside mt-2 space-y-1">
          {errors.map((error, index) => (
            <li key={index} className="text-sm">
              {error.message}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
}

