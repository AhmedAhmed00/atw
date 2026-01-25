/**
 * MultiSelect Component
 * Reusable multi-select component for React Hook Form
 */

import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage, useFormField } from '@/components/ui/form'
import { cn } from '@/lib/utils'

interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({ options, value, onChange, placeholder = 'Select options...', className }: MultiSelectProps) {
  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue]
    onChange(newValue)
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="border rounded-md p-3 space-y-3 min-h-[120px] bg-background">
        {options.length === 0 ? (
          <p className="text-sm text-muted-foreground">{placeholder}</p>
        ) : (
          options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={value.includes(option.value)}
                onCheckedChange={() => handleToggle(option.value)}
              />
              <Label
                htmlFor={option.value}
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {option.label}
              </Label>
            </div>
          ))
        )}
      </div>
      {value.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {value.length} {value.length === 1 ? 'item' : 'items'} selected
        </p>
      )}
    </div>
  )
}

interface FormMultiSelectProps {
  name: string
  label: string
  description?: string
  options: MultiSelectOption[]
  placeholder?: string
  className?: string
}

export function FormMultiSelect({
  name,
  label,
  description,
  options,
  placeholder,
  className,
}: FormMultiSelectProps) {
  const { formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <MultiSelectField name={name} options={options} placeholder={placeholder} />
      </FormControl>
      {description && <FormDescription id={formDescriptionId}>{description}</FormDescription>}
      <FormMessage id={formMessageId} />
    </FormItem>
  )
}

function MultiSelectField({ name, options, placeholder }: { name: string; options: MultiSelectOption[]; placeholder?: string }) {
  const { field } = useFormField()
  const form = React.useContext(require('@/components/ui/form').FormFieldContext)

  // This is a simplified version - in practice, you'd use useFormContext
  return null // Placeholder - will be properly implemented in step components
}

