import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Users, Clock, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/shared/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  EmployeeStatsCards,
  employeeColumns,
  PendingApprovalsCards,
  getPendingApprovalsColumns,
} from './components'
import { RejectApprovalDialog } from './components/RejectApprovalDialog'
import { mockEmployees, mockPendingApprovals } from './data/mockEmployees'
import { calculateEmployeeStats, calculatePendingApprovalStats } from './data/calculateStats'
import { PendingApproval } from './types'

export function EmployeesPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [selectedApproval, setSelectedApproval] = useState<PendingApproval | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const activeTab = searchParams.get('tab') || 'all-employees'

  const employeeStats = calculateEmployeeStats(mockEmployees)
  const pendingApprovalStats = calculatePendingApprovalStats(mockPendingApprovals)

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value })
  }

  const handleAddEmployee = () => {
    navigate('/employees/new')
  }

  const handleRejectClick = (approval: PendingApproval) => {
    setSelectedApproval(approval)
    setRejectDialogOpen(true)
  }

  const handleRejectConfirm = async (reason: string) => {
    if (!selectedApproval) return

    setIsProcessing(true)
    // TODO: Implement reject logic with reason
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Rejecting approval:', selectedApproval.id, 'Reason:', reason)
    setIsProcessing(false)
    setRejectDialogOpen(false)
    setSelectedApproval(null)
  }

  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case 'certification':
        return 'Certification'
      case 'department-transfer':
        return 'Department Transfer'
      case 'shift-change':
        return 'Shift Change'
      case 'leave':
        return 'Leave Request'
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="Employee Registry"
          description="Manage employee records, shifts, and departmental statuses"
          icon={Users}
        />
        <Button
          onClick={handleAddEmployee}
          className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add New Employee
        </Button>
      </div>

      {/* Stats Cards */}
      <EmployeeStatsCards stats={employeeStats} />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="w-full justify-start h-auto p-1 bg-transparent rounded-xl flex-wrap gap-2">
          <TabsTrigger
            value="all-employees"
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <Users className="h-4 w-4" />
            All Employees
          </TabsTrigger>
          <TabsTrigger
            value="pending-approvals"
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <Clock className="h-4 w-4" />
            Pending Approvals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-employees" className="space-y-4">
          <Card className="border-none bg-transparent shadow-none hover:shadow-none">
            <CardContent className="px-0">
              <DataTable columns={employeeColumns} data={mockEmployees} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending-approvals" className="space-y-4">
          {/* Pending Approvals Stats Cards */}
          <PendingApprovalsCards stats={pendingApprovalStats} />

          {/* Pending Approvals Table */}
          <Card className="border-none bg-transparent shadow-none hover:shadow-none">
            <CardContent className="px-0">
              <DataTable
                columns={getPendingApprovalsColumns({ navigate, onReject: handleRejectClick })}
                data={mockPendingApprovals}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reject Approval Dialog */}
      {selectedApproval && (
        <RejectApprovalDialog
          open={rejectDialogOpen}
          onOpenChange={setRejectDialogOpen}
          onConfirm={handleRejectConfirm}
          employeeName={selectedApproval.employeeName}
          requestType={getRequestTypeLabel(selectedApproval.requestType)}
          isLoading={isProcessing}
        />
      )}
    </div>
  )
}

export default EmployeesPage

