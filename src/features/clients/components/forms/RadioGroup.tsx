/**
 * RadioGroup Component
 * Reusable radio group component for React Hook Form
 */

import * as React from 'react'
import { RadioGroup as RadioGroupPrimitive, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage, useFormField } from '@/components/ui/form'
import { cn } from '@/lib/utils'

interface RadioOption {
  value: string
  label: string
}

interface FormRadioGroupProps {
  name: string
  label: string
  description?: string
  options: RadioOption[]
  className?: string
}

export function FormRadioGroup({
  name,
  label,
  description,
  options,
  className,
}: FormRadioGroupProps) {
  const { formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <RadioGroupField name={name} options={options} />
      </FormControl>
      {description && <FormDescription id={formDescriptionId}>{description}</FormDescription>}
      <FormMessage id={formMessageId} />
    </FormItem>
  )
}

function RadioGroupField({ name, options }: { name: string; options: RadioOption[] }) {
  // Placeholder - will be properly implemented in step components
  return null
}

