/**
 * Add Patient Dialog
 * Dialog wrapper for the Add Patient multi-step form
 */

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AddPatientForm } from './forms/AddPatientForm'
import { AddPatientFormData } from '../schemas/addPatientSchema'

interface AddPatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: AddPatientFormData) => Promise<void> | void
}

export function AddPatientDialog({ open, onOpenChange, onSubmit }: AddPatientDialogProps) {
  const handleSubmit = async (data: AddPatientFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data)
      } else {
        // Default behavior: log to console
        console.log('Patient data submitted:', data)
        // Here you would typically call an API to save the patient
        // await api.addPatient(data)
      }
      // Close dialog on successful submission
      onOpenChange(false)
    } catch (error) {
      console.error('Error submitting patient:', error)
      // Error handling - you might want to show a toast notification here
      throw error // Re-throw to let the form handle it
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#05647A] dark:text-[#09B0B6]">
            Add New Patient
          </DialogTitle>
          <DialogDescription>
            Complete the multi-step form to add a new patient to the system. All required fields are marked with an asterisk (*).
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <AddPatientForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

