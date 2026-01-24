import { lazy, Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/shared/table'
import { ServiceStatsCards, serviceColumns } from './components'
import { mockServices } from './data/mockServices'
import { calculateServiceStats } from './data/calculateStats'
import { PageHeader } from '@/components/shared/page-header'
import { Briefcase, Loader2 } from 'lucide-react'
import { AddServiceFormData } from './schemas/service-schema'

// Lazy load the dialog form to reduce initial bundle size
const AddServiceDialog = lazy(() => import('./components/AddServiceDialog').then(m => ({ default: m.AddServiceDialog })))

export function ServicesPage() {
  const stats = calculateServiceStats(mockServices)

  const handleAddService = (data: AddServiceFormData) => {
    console.log('New service data:', data)
    // TODO: Add service to the database/state
    // For now, we'll just log the data
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <PageHeader
          title="Services Management"
          description="Manage your healthcare services, pricing, and availability"
          icon={Briefcase}
        />
        <Suspense fallback={
          <div className="flex items-center gap-2 px-4 py-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        }>
          <AddServiceDialog onSubmit={handleAddService} />
        </Suspense>
      </div>

      {/* Stats Cards */}
      <ServiceStatsCards stats={stats} />

      {/* Services Table */}
      <Card className="border-none bg-transparent shadow-none hover:shadow-none">
        {/* <CardHeader className='p-0'>
          <CardTitle className="text-[#05647A]">Services Directory</CardTitle>
          <CardDescription>
            A comprehensive list of all healthcare services with search, filtering, and pagination
          </CardDescription>
        </CardHeader> */}
        <CardContent className='px-0 '>
          <DataTable columns={serviceColumns} data={mockServices} />
        </CardContent>
      </Card>
    </div>
  )
}

export default ServicesPage

