import { PageHeader } from '@/components/shared/page-header'
import { Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/shared/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  EmployeeStatsCards,
  employeeColumns,
  PendingApprovalsCards,
  pendingApprovalsColumns,
} from './components'
import { mockEmployees, mockPendingApprovals } from './data/mockEmployees'
import { calculateEmployeeStats, calculatePendingApprovalStats } from './data/calculateStats'

export function EmployeesPage() {
  const employeeStats = calculateEmployeeStats(mockEmployees)
  const pendingApprovalStats = calculatePendingApprovalStats(mockPendingApprovals)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Registry"
        description="Manage employee records, shifts, and departmental statuses"
        icon={Users}
      />

      {/* Stats Cards */}
      <EmployeeStatsCards stats={employeeStats} />

      {/* Tabs */}
      <Tabs defaultValue="all-employees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-employees">All Employees</TabsTrigger>
          <TabsTrigger value="pending-approvals">Pending Approvals</TabsTrigger>
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
              <DataTable columns={pendingApprovalsColumns} data={mockPendingApprovals} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EmployeesPage

