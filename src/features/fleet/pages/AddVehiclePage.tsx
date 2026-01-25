/**
 * Add Vehicle Page
 * Full-page route for adding a new vehicle
 */

import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Car, ArrowLeft } from 'lucide-react'
import { AddVehicleForm } from '../components/forms/AddVehicleForm'

export function AddVehiclePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="Add New Vehicle"
          description="Register a new vehicle in the fleet"
          icon={Car}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/fleet/vehicles')}
          className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      <AddVehicleForm />
    </div>
  )
}

export default AddVehiclePage

