import { Clock } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface TimePickerProps {
  value: string
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
  id?: string
}

export function TimePicker({ value, onChange, className, disabled, id }: TimePickerProps) {
  const [hours, minutes] = value.split(':')

  const handleHoursChange = (newHours: string) => {
    onChange(`${newHours}:${minutes}`)
  }

  const handleMinutesChange = (newMinutes: string) => {
    onChange(`${hours}:${newMinutes}`)
  }

  return (
    <div className={cn("flex items-center gap-2", className)} id={id}>
      <div className="relative flex items-center gap-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 p-0.5 rounded bg-[#09B0B6]/10 pointer-events-none z-10">
          <Clock className="w-3.5 h-3.5 text-[#05647A] dark:text-[#09B0B6]" />
        </div>
        <Select value={hours} onValueChange={handleHoursChange} disabled={disabled}>
          <SelectTrigger className="w-[98px] pl-10 font-mono">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 24 }, (_, i) => {
              const hour = i.toString().padStart(2, '0')
              return (
                <SelectItem key={hour} value={hour}>
                  {hour}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <span className="text-slate-400 font-mono">:</span>
        <Select value={minutes} onValueChange={handleMinutesChange} disabled={disabled}>
          <SelectTrigger className="w-[80px] font-mono">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 60 }, (_, i) => {
              const minute = i.toString().padStart(2, '0')
              return (
                <SelectItem key={minute} value={minute}>
                  {minute}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

