/**
 * Add Note Dialog Component
 * Allows adding notes to a support ticket
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
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { MessageSquarePlus, Loader2 } from 'lucide-react'

interface AddNoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddNote: (message: string, isInternal: boolean) => void
}

export function AddNoteDialog({ open, onOpenChange, onAddNote }: AddNoteDialogProps) {
  const [message, setMessage] = useState('')
  const [isInternal, setIsInternal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!message.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    onAddNote(message.trim(), isInternal)
    setMessage('')
    setIsInternal(false)
    setIsSubmitting(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquarePlus className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
            Add Note
          </DialogTitle>
          <DialogDescription>
            Add a note or response to this ticket. Internal notes are only visible to staff.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="note-message">Message</Label>
            <Textarea
              id="note-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your note or response..."
              rows={5}
              className="resize-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="internal-note"
              checked={isInternal}
              onCheckedChange={(checked) => setIsInternal(checked as boolean)}
            />
            <label
              htmlFor="internal-note"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mark as internal note
              <span className="text-muted-foreground ml-1 font-normal">
                (not visible to client)
              </span>
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || isSubmitting}
            className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Note'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

