import { TimeField } from 'react-aria-components'
import { cn } from '@/lib/utils'

import type { TimeValue } from 'react-aria-components'

interface TimeInputProps {
  id?: string
  value?: TimeValue | null
  onChange?: (value: TimeValue | null) => void
  hourCycle?: 12 | 24
  granularity?: 'hour' | 'minute' | 'second'
  className?: string
  'data-invalid'?: boolean
}

export function TimeInput({
  id,
  value,
  onChange,
  hourCycle = 24,
  granularity,
  className,
  'data-invalid': dataInvalid,
}: TimeInputProps) {
  return (
    <TimeField
      id={id}
      value={value ?? undefined}
      onChange={onChange}
      hourCycle={hourCycle}
      granularity={granularity}
      style={{
        height: 'var(--input-height)',
        paddingLeft: 'var(--input-padding-x)',
        paddingRight: 'var(--input-padding-x)',
        paddingTop: 'var(--input-padding-y)',
        paddingBottom: 'var(--input-padding-y)',
        borderWidth: 'var(--input-border-width)',
        // borderColor: dataInvalid ? 'hsl(var(--destructive))' : 'var(--input-border-color)',
        borderRadius: 'var(--input-border-radius)',
        backgroundColor: 'var(--input-bg)',
        fontSize: 'var(--input-text-size)',
      }}
      className={cn(
        'flex w-full ring-offset-background',
        'focus-within:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    />
  )
}

