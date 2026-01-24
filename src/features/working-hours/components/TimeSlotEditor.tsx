import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { TimePicker } from '@/components/ui/time-picker'

interface TimeSlotEditorProps {
  dayName: string
  startValue: string
  endValue: string
  onSubmit: (start: string, end: string) => void
  onCancel: () => void
}

export function TimeSlotEditor({
  dayName,
  startValue,
  endValue,
  onSubmit,
  onCancel,
}: TimeSlotEditorProps) {
  const [start, setStart] = useState(startValue)
  const [end, setEnd] = useState(endValue)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    // Validate that end time is after start time
    if (start >= end) {
      setError('End time must be after start time')
      return
    }
    setError('')
    onSubmit(start, end)
  }

  return (
    <div className="flex items-center jus gap-2 ">
      <div className="flex items-center gap-2 flex-1">
        <div className="flex-1 space-y-1 min-w-[100px]">
          <Label htmlFor={`start-${dayName}`} className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Start
          </Label>
          <TimePicker
            id={`start-${dayName}`}
            value={start}
            onChange={setStart}
          />
        </div>

        <div className="text-slate-400 pt-5">→</div>

        <div className="flex-1 space-y-1 min-w-[100px]">
          <Label htmlFor={`end-${dayName}`} className="text-xs font-medium text-slate-600 dark:text-slate-400">
            End
          </Label>
          <TimePicker
            id={`end-${dayName}`}
            value={end}
            onChange={setEnd}
          />
        </div>
      </div>

      <div className="flex items-center gap-1 pt-5">
        <Button
          type="button"
          size="sm"
          onClick={handleSubmit}
          className="h-8 w-8 p-0 bg-linear-to-r from-[#09B0B6] to-[#05647A] hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all"
        >
          <Check className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onCancel}
          className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>
      
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 absolute -bottom-5">{error}</p>
      )}
    </div>
  )
}

