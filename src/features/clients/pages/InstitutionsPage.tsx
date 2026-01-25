/**
 * InstitutionsPage Component
 * Page for managing institutions
 */

import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Building2, Upload, Download, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/shared/table'
import {
  InstitutionStatsCards,
  DistributionByTypeChart,
  StatusOverviewChart,
  InstitutionTopPerformersChart,
  institutionColumns,
} from '../components'
import {
  institutionStats,
  distributionByType,
  statusOverview,
  topPerformers,
  institutions,
} from '../data/mockInstitutionsData'

export function InstitutionsPage() {
  const navigate = useNavigate()

  const handleAddInstitution = () => {
    navigate('/clients/institutions/new')
  }

  const handleImport = () => {
    // TODO: Implement import functionality
    console.log('Import institutions')
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export institutions')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Medical Institutions"
          description="Service requesters and partners management"
          icon={Building2}
        />
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <Button
            variant="outline"
            onClick={handleImport}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={handleAddInstitution}
            className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Institution
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <InstitutionStatsCards stats={institutionStats} />

      {/* Charts Section */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <DistributionByTypeChart data={distributionByType} />
        <StatusOverviewChart data={statusOverview} />
      </div>

      {/* Top Performers Chart */}
      <InstitutionTopPerformersChart data={topPerformers} />

      {/* Institutions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
            Institutions
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Complete list of all medical institutions and their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={institutionColumns} data={institutions} />
        </CardContent>
      </Card>
    </div>
  )
}

export default InstitutionsPage

