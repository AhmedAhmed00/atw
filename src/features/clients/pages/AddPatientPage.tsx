/**
 * Add Patient Page
 * Full-page route for adding a new patient
 */

import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddPatientForm } from '../components/forms/AddPatientForm'
import { AddPatientFormData } from '../schemas/addPatientSchema'

export function AddPatientPage() {
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('/clients/patients')
  }

  const handleSubmit = async (data: AddPatientFormData) => {
    try {
      // TODO: Implement API call to add patient
      console.log('Adding new patient:', data)
      // Example: await api.addPatient(data)
      
      // Don't navigate automatically - let the success page handle it
    } catch (error) {
      console.error('Error adding patient:', error)
      // Error handling - you might want to show an error notification here
      throw error // Re-throw to let the form handle it
    }
  }

  const handleViewAllPatients = () => {
    navigate('/clients/patients')
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Add New Patient
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete the multi-step form to add a new patient to the system
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCancel}
          className="shrink-0 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Form */}
      <AddPatientForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel}
        onViewAllPatients={handleViewAllPatients}
      />
    </div>
  )
}

export default AddPatientPage

