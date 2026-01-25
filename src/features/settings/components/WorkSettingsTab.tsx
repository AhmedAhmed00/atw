/**
 * WorkSettingsTab Component
 * Work Schedule & Holidays
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCheckbox } from '@/features/clients/components/forms/FormCheckbox'
import { Badge } from '@/components/ui/badge'
import { Plus, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const WEEK_DAYS = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
]

interface Holiday {
  id: string
  name: string
  date: string
}

export function WorkSettingsTab() {
  const [operatingDays, setOperatingDays] = useState<string[]>(['monday', 'tuesday', 'wednesday', 'thursday', 'friday'])
  const [holidays, setHolidays] = useState<Holiday[]>([
    { id: 'h1', name: 'New Year', date: '2024-01-01' },
    { id: 'h2', name: 'Eid al-Fitr', date: '2024-04-10' },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newHolidayName, setNewHolidayName] = useState('')
  const [newHolidayDate, setNewHolidayDate] = useState('')

  const handleDayToggle = (day: string) => {
    setOperatingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const handleAddHoliday = () => {
    if (newHolidayName && newHolidayDate) {
      setHolidays([
        ...holidays,
        {
          id: `h${Date.now()}`,
          name: newHolidayName,
          date: newHolidayDate,
        },
      ])
      setNewHolidayName('')
      setNewHolidayDate('')
      setIsDialogOpen(false)
    }
  }

  const handleRemoveHoliday = (id: string) => {
    setHolidays(holidays.filter((h) => h.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
          Work Schedule & Holidays
        </h2>
        <p className="text-muted-foreground mt-1">
          Configure working hours, shifts, and official holidays
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operating Schedule</CardTitle>
          <CardDescription>Set your organization's working days and hours</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Operating Days */}
          <div className="space-y-3">
            <Label>Operating Days</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {WEEK_DAYS.map((day) => (
                <FormCheckbox
                  key={day.value}
                  id={day.value}
                  label={day.label}
                  checked={operatingDays.includes(day.value)}
                  onCheckedChange={() => handleDayToggle(day.value)}
                />
              ))}
            </div>
          </div>

          {/* Working Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workingHoursStart">Working Hours Start</Label>
              <Input id="workingHoursStart" type="time" defaultValue="08:00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workingHoursEnd">Working Hours End</Label>
              <Input id="workingHoursEnd" type="time" defaultValue="17:00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nightShiftStart">Night Shift Start</Label>
              <Input id="nightShiftStart" type="time" defaultValue="20:00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nightShiftEnd">Night Shift End</Label>
              <Input id="nightShiftEnd" type="time" defaultValue="08:00" />
            </div>
          </div>

          {/* Official Holidays */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Official Holidays</Label>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Holiday
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Official Holiday</DialogTitle>
                    <DialogDescription>
                      Add a new official holiday to the calendar
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="holidayName">Holiday Name</Label>
                      <Input
                        id="holidayName"
                        value={newHolidayName}
                        onChange={(e) => setNewHolidayName(e.target.value)}
                        placeholder="e.g., New Year, Eid al-Fitr"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="holidayDate">Date</Label>
                      <Input
                        id="holidayDate"
                        type="date"
                        value={newHolidayDate}
                        onChange={(e) => setNewHolidayDate(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddHoliday}
                        className="bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                      >
                        Add Holiday
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {holidays.length === 0 ? (
              <p className="text-sm text-muted-foreground">No holidays added yet.</p>
            ) : (
              <div className="space-y-2">
                {holidays.map((holiday) => (
                  <div
                    key={holiday.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{holiday.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(holiday.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveHoliday(holiday.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

