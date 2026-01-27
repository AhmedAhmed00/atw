/**
 * PatientsPage Component
 * Page for managing patients
 */

import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { UserCheck, Upload, Download, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/table'
import {
  PatientStatsCards,
  MedicalConditionsChart,
  PatientStatusOverviewChart,
  TopActivePatientsChart,
  patientColumns,
} from '../components'
import {
  patientStats,
  medicalConditionDistribution,
  patientStatusOverview,
  topActivePatients,
  patients,
} from '../data/mockPatientsData'
import { TableWrapper } from '@/components/shared/table/TableWrapper'

export function PatientsPage() {
  const navigate = useNavigate()

  const handleAddPatient = () => {
    navigate('/clients/patients/new')
  }

  const handleImport = () => {
    // TODO: Implement import functionality
    console.log('Import patients')
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export patients')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Individual Patients"
          description="Personal medical transport clients management"
          icon={UserCheck}
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
            onClick={handleAddPatient}
            className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <PatientStatsCards stats={patientStats} />

      {/* Charts Section */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <MedicalConditionsChart data={medicalConditionDistribution} />
        <PatientStatusOverviewChart data={patientStatusOverview} />
      </div>

      {/* Top Active Patients Chart */}
      <TopActivePatientsChart data={topActivePatients} />

      {/* Patients Table */}
      <TableWrapper title='Patients' description='Manage your patients' >
        <DataTable columns={patientColumns} data={patients} />
      </TableWrapper>
    </div>
  )
}

export default PatientsPage

