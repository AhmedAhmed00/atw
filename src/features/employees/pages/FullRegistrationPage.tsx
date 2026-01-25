/**
 * Full Registration Page
 * Full-page route for complete employee registration
 */

import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { ArrowLeft, UserPlus } from 'lucide-react'
import { FullRegistrationForm } from '../components/forms/fullRegistration/FullRegistrationForm'
import { FullRegistrationFormData } from '../schemas/fullRegistrationSchema'

export function FullRegistrationPage() {
  const navigate = useNavigate()

  const handleSubmit = async (data: FullRegistrationFormData) => {
    // TODO: Implement API call to submit employee registration
    console.log('Submitting full registration:', data)
    await new Promise((resolve) => setTimeout(resolve, 1500))
  }

  const handleCancel = () => {
    navigate('/employees')
  }

  const handleViewAllEmployees = () => {
    navigate('/employees')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="Full Employee Registration"
          description="Complete registration form for new employees"
          icon={UserPlus}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/employees')}
          className="shrink-0 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      <FullRegistrationForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onViewAllEmployees={handleViewAllEmployees}
      />
    </div>
  )
}

export default FullRegistrationPage

