/**
 * Change Status Dialog Component
 * Allows changing the status of a support ticket
 */

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RefreshCw, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TicketStatus } from '../types'
import { TICKET_STATUS_CONFIG } from '../types'

interface ChangeStatusDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentStatus: TicketStatus
  onStatusChange: (newStatus: TicketStatus, note?: string) => void
}

const STATUS_OPTIONS: TicketStatus[] = ['open', 'in_progress', 'resolved', 'closed']

export function ChangeStatusDialog({
  open,
  onOpenChange,
  currentStatus,
  onStatusChange,
}: ChangeStatusDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus>(currentStatus)
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (selectedStatus === currentStatus) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    onStatusChange(selectedStatus, note.trim() || undefined)
    setNote('')
    setIsSubmitting(false)
    onOpenChange(false)
  }

  // Reset state when dialog opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setSelectedStatus(currentStatus)
      setNote('')
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
            Change Ticket Status
          </DialogTitle>
          <DialogDescription>
            Update the status of this support ticket.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Current Status</Label>
            <div
              className={cn(
                'px-3 py-2 rounded-md border text-sm font-medium',
                TICKET_STATUS_CONFIG[currentStatus].bgColor,
                TICKET_STATUS_CONFIG[currentStatus].color,
                TICKET_STATUS_CONFIG[currentStatus].borderColor
              )}
            >
              {TICKET_STATUS_CONFIG[currentStatus].label}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-status">New Status</Label>
            <Select
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value as TicketStatus)}
            >
              <SelectTrigger id="new-status">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => {
                  const config = TICKET_STATUS_CONFIG[status]
                  return (
                    <SelectItem key={status} value={status}>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'w-2 h-2 rounded-full',
                            status === 'open' && 'bg-blue-500',
                            status === 'in_progress' && 'bg-amber-500',
                            status === 'resolved' && 'bg-emerald-500',
                            status === 'closed' && 'bg-slate-500'
                          )}
                        />
                        {config.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status-note">
              Note <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Textarea
              id="status-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note about this status change..."
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedStatus === currentStatus || isSubmitting}
            className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
          >
            {isSubmitting ? (
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

