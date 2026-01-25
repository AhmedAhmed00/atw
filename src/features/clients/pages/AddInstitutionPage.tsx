/**
 * Add Institution Page
 * Full-page route for adding a new medical institution
 */

import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddInstitutionForm } from '../components/forms/institution/AddInstitutionForm'
import { AddInstitutionFormData } from '../schemas/addInstitutionSchema'

export function AddInstitutionPage() {
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('/clients/institutions')
  }

  const handleSubmit = async (data: AddInstitutionFormData) => {
    try {
      // TODO: Implement API call to add institution
      console.log('Adding new institution:', data)
      // Example: await api.addInstitution(data)
    } catch (error) {
      console.error('Error adding institution:', error)
      throw error
    }
  }

  const handleViewAllInstitutions = () => {
    navigate('/clients/institutions')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Add New Medical Institution
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete the multi-step form to add a new medical institution to the system
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

      <AddInstitutionForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onViewAllInstitutions={handleViewAllInstitutions}
      />
    </div>
  )
}

export default AddInstitutionPage

