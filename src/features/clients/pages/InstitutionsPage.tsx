/**
 * InstitutionsPage Component
 * Page for managing institutions
 */

import { PageHeader } from '@/components/shared/page-header'
import { Building2 } from 'lucide-react'

export function InstitutionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutions"
        description="Manage healthcare institutions and organizations"
        icon={Building2}
      />

      <div className="text-center py-12 text-muted-foreground">
        <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">Institutions Management</p>
        <p className="text-sm mt-2">Institution content will be displayed here</p>
      </div>
    </div>
  )
}

export default InstitutionsPage

