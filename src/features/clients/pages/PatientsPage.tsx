/**
 * PatientsPage Component
 * Page for managing patients
 */

import { PageHeader } from '@/components/shared/page-header'
import { UserCheck } from 'lucide-react'

export function PatientsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        description="Manage patient records and information"
        icon={UserCheck}
      />

      <div className="text-center py-12 text-muted-foreground">
        <UserCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">Patients Management</p>
        <p className="text-sm mt-2">Patient content will be displayed here</p>
      </div>
    </div>
  )
}

export default PatientsPage

