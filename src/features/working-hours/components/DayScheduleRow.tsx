import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { getDayColorScheme } from '../constants/day-colors'
import { getDayIconType, getDayStatusLabel } from '../utils'
import { DayHeader } from './DayHeader'
import { TimeSlotsList } from './TimeSlotsList'
import type { DaySchedule, TimeSlot } from '../types'

interface DayScheduleRowProps {
  daySchedule: DaySchedule
  onUpdate: (updated: DaySchedule) => void
  index: number
}

export function DayScheduleRow({ daySchedule, onUpdate, index }: DayScheduleRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null)
  const color = getDayColorScheme(index)
  const iconType = getDayIconType(index)
  const statusLabel = getDayStatusLabel(daySchedule.enabled)

  const handleEditSlot = (slotId: string) => {
    setIsEditing(true)
    setEditingSlotId(slotId)
  }

  const handleUpdateSlot = (slotId: string, start: string, end: string) => {
    const updatedSlots = daySchedule.timeSlots.map(slot =>
      slot.id === slotId ? { ...slot, start, end } : slot
    )
    onUpdate({
      ...daySchedule,
      timeSlots: updatedSlots,
    })
    setIsEditing(false)
    setEditingSlotId(null)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingSlotId(null)
  }

  const handleAddSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      start: '09:00',
      end: '17:00',
    }
    onUpdate({
      ...daySchedule,
      timeSlots: [...daySchedule.timeSlots, newSlot],
    })
  }

  const handleRemoveSlot = (slotId: string) => {
    if (daySchedule.timeSlots.length > 1) {
      onUpdate({
        ...daySchedule,
        timeSlots: daySchedule.timeSlots.filter(slot => slot.id !== slotId),
      })
    }
  }

  const handleToggle = (enabled: boolean) => {
    onUpdate({
      ...daySchedule,
      enabled,
    })
  }

  return (
    <Card className={`relative overflow-hidden border-2 ${color.border} transition-all duration-300 hover:shadow-lg ${
      !daySchedule.enabled ? 'opacity-60' : ''
    }`}>
      {/* Gradient accent bar */}
      <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${color.from} ${color.to}`} />
      
      <div className={`p-6 pl-8 ${color.bg}`}>
        <div className="flex items-center justify-between gap-4">
          <DayHeader
            day={daySchedule.day}
            statusLabel={statusLabel}
            iconType={iconType}
            colorScheme={color}
          />

          <TimeSlotsList
            dayName={daySchedule.day}
            timeSlots={daySchedule.timeSlots}
            enabled={daySchedule.enabled}
            colorScheme={color}
            isEditing={isEditing}
            editingSlotId={editingSlotId}
            onEditSlot={handleEditSlot}
            onUpdateSlot={handleUpdateSlot}
            onCancelEdit={handleCancelEdit}
            onAddSlot={handleAddSlot}
            onRemoveSlot={handleRemoveSlot}
          />

          <div className="flex items-center gap-2">
            <Switch
              checked={daySchedule.enabled}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-linear-to-r data-[state=checked]:from-(--brand-gradient-from) data-[state=checked]:to-(--brand-gradient-to)"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

