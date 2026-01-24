import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface SingleDayPickerProps {
  id?: string
  value?: Date
  onSelect?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  'data-invalid'?: boolean
}

export function SingleDayPicker({
  id,
  value,
  onSelect,
  placeholder = 'Pick a date',
  className,
  'data-invalid': dataInvalid,
}: SingleDayPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            dataInvalid && 'border-destructive',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onSelect} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

