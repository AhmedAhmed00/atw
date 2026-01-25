/**
 * StepIndicator Component
 * Visual progress indicator for multi-step forms
 */

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
}

export function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                {/* Step Circle */}
                <div
                  className={cn(
                    'relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all',
                    isCompleted &&
                      'bg-[#09B0B6] border-[#09B0B6] text-white',
                    isCurrent &&
                      'bg-[#09B0B6] border-[#09B0B6] text-white ring-4 ring-[#09B0B6]/20',
                    isUpcoming &&
                      'bg-background border-muted-foreground/30 text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>
                {/* Step Label */}
                <span
                  className={cn(
                    'mt-2 text-xs font-medium text-center max-w-[100px]',
                    isCurrent && 'text-[#05647A] dark:text-[#09B0B6]',
                    isCompleted && 'text-[#09B0B6]',
                    isUpcoming && 'text-muted-foreground'
                  )}
                >
                  {label}
                </span>
              </div>
              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 transition-colors',
                    isCompleted ? 'bg-[#09B0B6]' : 'bg-muted-foreground/30'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
      {/* Progress Bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-[#09B0B6] to-[#05647A] transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )
}

