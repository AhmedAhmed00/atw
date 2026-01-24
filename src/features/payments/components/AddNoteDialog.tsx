/**
 * AddNoteDialog Component
 * Dialog for adding notes to transactions
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
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { StickyNote, Loader2, CheckCircle2 } from 'lucide-react'

interface AddNoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transactionId: string
  currentNote?: string
  onSave: (note: string) => void
}

export function AddNoteDialog({
  open,
  onOpenChange,
  transactionId,
  currentNote = '',
  onSave,
}: AddNoteDialogProps) {
  const [note, setNote] = useState(currentNote)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = async () => {
    if (!note.trim()) return

    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    onSave(note.trim())
    setIsSaving(false)
    setShowSuccess(true)

    // Auto-close after success
    setTimeout(() => {
      setShowSuccess(false)
      onOpenChange(false)
    }, 1000)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setNote(currentNote)
      setShowSuccess(false)
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
            {currentNote ? 'Edit Note' : 'Add Note'}
          </DialogTitle>
          <DialogDescription>
            Add a note to transaction <span className="font-mono font-medium">{transactionId}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="note" className="text-sm font-medium">
              Note
            </Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter your note here..."
              rows={4}
              className="resize-none"
              disabled={isSaving || showSuccess}
            />
            <p className="text-xs text-muted-foreground">
              {note.length}/500 characters
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!note.trim() || isSaving || showSuccess}
            className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : showSuccess ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Saved!
              </>
            ) : (
              'Save Note'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

