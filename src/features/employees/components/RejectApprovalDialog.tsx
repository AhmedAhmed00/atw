/**
 * RejectApprovalDialog Component
 * Dialog for entering rejection reason when rejecting an approval
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
import { XCircle, AlertTriangle } from 'lucide-react'

interface RejectApprovalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (reason: string) => void
  employeeName?: string
  requestType?: string
  isLoading?: boolean
}

export function RejectApprovalDialog({
  open,
  onOpenChange,
  onConfirm,
  employeeName,
  requestType,
  isLoading = false,
}: RejectApprovalDialogProps) {
  const [rejectionReason, setRejectionReason] = useState('')
  const [error, setError] = useState('')

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setRejectionReason('')
      setError('')
    }
    onOpenChange(isOpen)
  }

  const handleSubmit = () => {
    if (!rejectionReason.trim()) {
      setError('Rejection reason is required')
      return
    }

    if (rejectionReason.trim().length < 10) {
      setError('Rejection reason must be at least 10 characters')
      return
    }

    setError('')
    onConfirm(rejectionReason.trim())
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            Reject Approval
          </DialogTitle>
          <DialogDescription>
            {employeeName && requestType ? (
              <>
                Please provide a reason for rejecting{' '}
                <span className="font-semibold">{employeeName}'s</span>{' '}
                <span className="font-semibold">{requestType}</span> request.
              </>
            ) : (
              'Please provide a reason for rejecting this approval request.'
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="rejection-reason">
              Rejection Reason <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="rejection-reason"
              value={rejectionReason}
              onChange={(e) => {
                setRejectionReason(e.target.value)
                setError('')
              }}
              placeholder="Enter the reason for rejection..."
              rows={5}
              className={`resize-none ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              disabled={isLoading}
            />
            {error && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {rejectionReason.length}/500 characters (minimum 10 characters required)
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !rejectionReason.trim() || rejectionReason.trim().length < 10}
            className="gap-2 bg-red-600 hover:bg-red-700 text-white"
          >
            <XCircle className="h-4 w-4" />
            {isLoading ? 'Rejecting...' : 'Confirm Rejection'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

