import { useState } from 'react'
import { Calendar, Clock, Save, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { PageHeader } from '@/components/shared/page-header'
import { DayScheduleRow } from './components/DayScheduleRow'
import { mockWorkingHours } from './data/mockWorkingHours'
import type { DaySchedule } from './types'

export default function WorkingHoursPage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(mockWorkingHours.schedule)
  const [hasChanges, setHasChanges] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleUpdateDay = (index: number, updated: DaySchedule) => {
    const newSchedule = [...schedule]
    newSchedule[index] = updated
    setSchedule(newSchedule)
    setHasChanges(true)
  }

  const handleSave = () => {
    // Here you would typically save to an API
    console.log('Saving schedule:', schedule)
    setHasChanges(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const enabledDays = schedule.filter(d => d.enabled).length
  const totalHours = schedule
    .filter(d => d.enabled)
    .reduce((total, day) => {
      const dayMinutes = day.timeSlots.reduce((dayTotal, slot) => {
        const [startH, startM] = slot.start.split(':').map(Number)
        const [endH, endM] = slot.end.split(':').map(Number)
        const minutes = (endH * 60 + endM) - (startH * 60 + startM)
        return dayTotal + minutes
      }, 0)
      return total + dayMinutes
    }, 0) / 60

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <PageHeader
        title="Working Hours"
        description="Manage your weekly schedule and availability"
        icon={Calendar}
      >
        {hasChanges && (
          <Button
            onClick={handleSave}
            className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) hover:opacity-90 text-white shadow-lg shadow-[rgb(var(--brand-primary))]/30 group"
          >
            <div className="mr-2 p-1 rounded-md bg-white/20 group-hover:bg-white/30 transition-colors">
              <Save className="w-4 h-4" />
            </div>
            Save Changes
          </Button>
        )}
      </PageHeader>

      {/* Success Message */}
      {showSuccess && (
        <Alert className="border-[#09B0B6]/30 bg-[#09B0B6]/10 dark:bg-[#09B0B6]/5 dark:border-[#09B0B6]/20">
          <div className="p-1 rounded-md bg-[#09B0B6]/20">
            <AlertCircle className="h-4 w-4 text-[#05647A] dark:text-[#09B0B6]" />
          </div>
          <AlertDescription className="text-[#05647A] dark:text-[#09B0B6]">
            Your working hours have been saved successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-t-4 border-t-[rgb(var(--brand-primary))] hover:shadow-lg transition-all duration-300 group">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) shadow-lg shadow-[rgb(var(--brand-primary))]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Calendar className="w-7 h-7 text-white relative z-10" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Working Days</p>
                <p className="text-2xl font-bold text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))]">{enabledDays} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[rgb(var(--brand-primary))] hover:shadow-lg transition-all duration-300 group">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) shadow-lg shadow-[rgb(var(--brand-primary))]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Clock className="w-7 h-7 text-white relative z-10" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Hours</p>
                <p className="text-2xl font-bold text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))]">{totalHours.toFixed(1)}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[rgb(var(--brand-primary))] hover:shadow-lg transition-all duration-300 group">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) shadow-lg shadow-[rgb(var(--brand-primary))]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Clock className="w-7 h-7 text-white relative z-10" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg per Day</p>
                <p className="text-2xl font-bold text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))]">
                  {enabledDays > 0 ? (totalHours / enabledDays).toFixed(1) : '0'}h
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule */}
      <div className="space-y-6">
        <div className="flex items-center gap-3.5">
          <div className="w-1 h-12 bg-linear-to-b from-(--brand-gradient-from) to-(--brand-gradient-to) rounded-full" />
          <div>
            <h2 className="text-2xl  font-semibold text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))]">Weekly Schedule</h2>
            <p className="text-sm text-muted-foreground">
              Set your working hours for each day of the week
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {schedule.map((daySchedule, index) => (
            <DayScheduleRow
              key={daySchedule.day}
              daySchedule={daySchedule}
              onUpdate={(updated) => handleUpdateDay(index, updated)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Info Alert */}
      <Alert className="border-[#09B0B6]/20 bg-[#09B0B6]/5">
        <div className="p-1 rounded-md bg-[#09B0B6]/10">
          <AlertCircle className="h-4 w-4 text-[#05647A] dark:text-[#09B0B6]" />
        </div>
          <AlertDescription className="text-slate-700 dark:text-slate-300">
          Toggle the switch to enable or disable working days. Click the edit button to modify time slots.
          You can add multiple time slots per day to support split shifts (e.g., 9:00-13:00 and 14:00-18:00).
        </AlertDescription>
      </Alert>
    </div>
  )
}

