/**
 * Add Trip Page
 * Full-page route for adding a new trip
 */

import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddTripForm } from '../components/forms/trip/AddTripForm'
import { AddTripFormData } from '../schemas/addTripSchema'

export function AddTripPage() {
  const navigate = useNavigate()
  const { institutionId } = useParams<{ institutionId?: string }>()

  const handleCancel = () => {
    if (institutionId) {
      navigate(`/clients/institutions/${institutionId}`)
    } else {
      navigate('/clients/institutions')
    }
  }

  const handleSubmit = async (data: AddTripFormData) => {
    try {
      // TODO: Implement API call to add trip
      console.log('Adding new trip:', data)
      // Example: await api.addTrip({ ...data, institutionId })
    } catch (error) {
      console.error('Error adding trip:', error)
      throw error
    }
  }

  const handleViewAllTrips = () => {
    // TODO: Navigate to trips list page
    navigate('/clients/institutions')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Add New Trip
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete the multi-step form to create a new trip
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

      <AddTripForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onViewAllTrips={handleViewAllTrips}
        institutionId={institutionId}
      />
    </div>
  )
}

export default AddTripPage

