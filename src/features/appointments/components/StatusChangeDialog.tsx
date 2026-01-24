/**
 * StatusChangeDialog Component
 * Dialog for changing appointment status
 */

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { APPOINTMENT_STATUS_CONFIG } from '../constants/appointment-status'
import type { AppointmentStatus } from '../types'
import { CheckCircle2, Clock, XCircle, AlertCircle, Loader2 } from 'lucide-react'

interface StatusChangeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentStatus: AppointmentStatus
  onStatusChange: (status: AppointmentStatus, notes?: string) => void
}

const STATUS_ICONS: Record<AppointmentStatus, React.ReactNode> = {
  pending: <Clock className="w-5 h-5" />,
  confirmed: <CheckCircle2 className="w-5 h-5" />,
  completed: <CheckCircle2 className="w-5 h-5" />,
  cancelled: <XCircle className="w-5 h-5" />,
}

export function StatusChangeDialog({
  open,
  onOpenChange,
  currentStatus,
  onStatusChange,
}: StatusChangeDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus>(currentStatus)
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    onStatusChange(selectedStatus, notes)
    setIsLoading(false)
    setNotes('')
    onOpenChange(false)
  }

  const statuses = Object.keys(APPOINTMENT_STATUS_CONFIG) as AppointmentStatus[]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
            Change Appointment Status
          </DialogTitle>
          <DialogDescription>
            Select a new status for this appointment. You can add optional notes about the change.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Select Status</Label>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((status) => {
                const config = APPOINTMENT_STATUS_CONFIG[status]
                const isSelected = selectedStatus === status
                const isCurrent = currentStatus === status

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSelectedStatus(status)}
                    disabled={isCurrent}
                    className={`
                      relative flex items-center gap-2 p-3 rounded-lg border-2 transition-all
                      ${isSelected && !isCurrent
                        ? `${config.bgColor} ${config.borderColor} ${config.color}`
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }
                      ${isCurrent ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <span className={isSelected ? config.color : 'text-slate-500'}>
                      {STATUS_ICONS[status]}
                    </span>
                    <span className={`font-medium ${isSelected ? config.color : ''}`}>
                      {config.label}
                    </span>
                    {isCurrent && (
                      <span className="absolute top-1 right-1 text-[10px] px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-400">
                        Current
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status-notes" className="text-sm font-medium">
              Notes (Optional)
            </Label>
            <Textarea
              id="status-notes"
              placeholder="Add a note about this status change..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedStatus === currentStatus || isLoading}
            className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Status'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

