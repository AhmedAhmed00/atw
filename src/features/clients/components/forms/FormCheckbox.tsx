/**
 * FormCheckbox Component
 * Custom styled checkbox for forms with project theme colors
 */

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormCheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  variant?: 'default' | 'primary'
  label?: string
}

const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  FormCheckboxProps
>(({ className, variant = 'primary', label, id, ...props }, ref) => {
  const checkboxId = id || React.useId()
  
  return (
    <div className="flex items-center space-x-2">
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        data-slot="checkbox"
        className={cn(
          'peer border-2 border-slate-300 dark:border-slate-600',
          'dark:bg-input/30 bg-white',
          'focus-visible:border-[#09B0B6] focus-visible:ring-[#09B0B6]/30',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-red-500',
          'size-5 shrink-0 rounded-md border shadow-sm',
          'transition-all duration-200 outline-none focus-visible:ring-[3px]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Primary variant (project theme colors) - Enhanced vibrant colors
          variant === 'primary' && [
            'data-[state=checked]:bg-[#09B0B6]',
            'data-[state=checked]:border-[#09B0B6]',
            'data-[state=checked]:text-white',
            'hover:border-[#09B0B6] hover:bg-[#09B0B6]/10',
            'data-[state=checked]:hover:bg-[#05647A]',
            'data-[state=checked]:hover:border-[#05647A]',
            'data-[state=checked]:shadow-md data-[state=checked]:shadow-[#09B0B6]/25',
          ],
          // Default variant
          variant === 'default' && [
            'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
            'data-[state=checked]:border-primary',
          ],
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="grid place-content-center text-current transition-none"
        >
          <CheckIcon className="size-3.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <Label
          htmlFor={checkboxId}
          className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </Label>
      )}
    </div>
  )
})
FormCheckbox.displayName = 'FormCheckbox'

export { FormCheckbox }

