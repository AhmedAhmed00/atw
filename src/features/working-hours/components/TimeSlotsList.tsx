import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TimeSlotEditor } from './TimeSlotEditor'
import { TimeSlotDisplay } from './TimeSlotDisplay'
import { formatTimeDuration } from '@/lib/time-utils'
import type { TimeSlot } from '../types'
import type { DayColorScheme } from '../constants/day-colors'

interface TimeSlotsListProps {
  dayName: string
  timeSlots: TimeSlot[]
  enabled: boolean
  colorScheme: DayColorScheme
  isEditing: boolean
  editingSlotId: string | null
  onEditSlot: (slotId: string) => void
  onUpdateSlot: (slotId: string, start: string, end: string) => void
  onCancelEdit: () => void
  onAddSlot: () => void
  onRemoveSlot: (slotId: string) => void
}

export function TimeSlotsList({
  dayName,
  timeSlots,
  enabled,
  colorScheme,
  isEditing,
  editingSlotId,
  onEditSlot,
  onUpdateSlot,
  onCancelEdit,
  onAddSlot,
  onRemoveSlot,
}: TimeSlotsListProps) {
  return (
    <div className="flex-1 space-y-2">
      {timeSlots.map((slot) => {
        const isEditingThis = isEditing && editingSlotId === slot.id
        const duration = formatTimeDuration(slot.start, slot.end)

        return (
          <div key={slot.id} className="flex items-center gap-2">
            {isEditingThis ? (
              <div className="flex-1 flex items-center gap-2">
                <TimeSlotEditor
                  dayName={`${dayName}-${slot.id}`}
                  startValue={slot.start}
                  endValue={slot.end}
                  onSubmit={(start, end) => onUpdateSlot(slot.id, start, end)}
                  onCancel={onCancelEdit}
                />
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <TimeSlotDisplay
                    startTime={slot.start}
                    endTime={slot.end}
                    duration={duration}
                    colorScheme={colorScheme}
                    enabled={enabled}
                    onEdit={() => onEditSlot(slot.id)}
                    compact
                  />
                </div>
                {timeSlots.length > 1 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveSlot(slot.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </>
            )}
          </div>
        )
      })}
      
      {!isEditing && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onAddSlot}
          className="w-full mt-2 border-dashed hover:border-solid hover:border-[#09B0B6] hover:bg-[#09B0B6]/5 hover:text-[#09B0B6] transition-all"
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Time Slot
        </Button>
      )}
    </div>
  )
}

