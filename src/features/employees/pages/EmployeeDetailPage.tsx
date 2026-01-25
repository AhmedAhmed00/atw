/**
 * EmployeeDetailPage Component
 * View detailed information about a specific employee
 */

import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  Hash,
  Printer,
  Download,
  Upload,
  Edit,
  User,
  Briefcase,
  Award,
  TrendingUp,
  Calendar,
  Clock,
  CheckSquare,
  Route,
  ClipboardCheck,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { mockEmployees } from '../data/mockEmployees'
import { EmployeePersonalInfo } from '../components/EmployeePersonalInfo'
import { EmployeeJobInfo } from '../components/EmployeeJobInfo'
import { EmployeeCertifications } from '../components/EmployeeCertifications'
import { EmployeePerformance } from '../components/EmployeePerformance'
import { EmployeeShifts } from '../components/EmployeeShifts'
import { EmployeeAvailability } from '../components/EmployeeAvailability'
import { EmployeeTasks } from '../components/EmployeeTasks'
import { EmployeeTrips } from '../components/EmployeeTrips'
import { EmployeeAttendance } from '../components/EmployeeAttendance'

export function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'personal-info'

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value })
  }

  // Find employee by ID
  const employee = mockEmployees.find((emp) => emp.id === id)

  // Generate employee ID if not exists
  const employeeId = employee?.id ? `EMP-${employee.id.split('-')[1]?.toUpperCase() || employee.id.slice(-3).toUpperCase()}` : 'N/A'

  if (!employee) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Employee Not Found
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              The employee you're looking for doesn't exist
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/employees')}
            className="shrink-0 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  // Status configuration
  const statusConfig: Record<string, { label: string; className: string }> = {
    active: {
      label: 'Active',
      className: 'bg-green-500 hover:bg-green-600 text-white',
    },
    inactive: {
      label: 'Inactive',
      className: 'bg-gray-500 hover:bg-gray-600 text-white',
    },
    'on-leave': {
      label: 'On Leave',
      className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    },
    pending: {
      label: 'Pending',
      className: 'bg-blue-500 hover:bg-blue-600 text-white',
    },
    suspended: {
      label: 'Suspended',
      className: 'bg-red-500 hover:bg-red-600 text-white',
    },
  }

  const status = statusConfig[employee.status] || statusConfig.active

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export employee data:', employee.id)
  }

  const handleImport = () => {
    // TODO: Implement import functionality
    console.log('Import employee data')
  }

  const handleEditProfile = () => {
    // TODO: Navigate to edit employee page
    console.log('Edit employee profile:', employee.id)
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Employee Avatar */}
          <Avatar className="w-16 h-16 border-4 border-white dark:border-slate-800 shadow-lg">
            <AvatarImage src={employee.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`} alt={employee.name} />
            <AvatarFallback className="bg-linear-to-br from-[#09B0B6] to-[#05647A] text-white text-xl font-bold">
              {employee.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {employee.name}
            </h1>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Hash className="w-4 h-4" />
                {employeeId}
              </p>
              <Badge className={cn('font-semibold', status.className)}>
                {status.label}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleImport}
            className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20"
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEditProfile}
            className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/employees')}
            className="shrink-0 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="w-full justify-start h-auto p-1 bg-transparent rounded-xl flex-wrap gap-2">
          <TabsTrigger
            value="personal-info"
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <User className="h-4 w-4" />
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="job-info"
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <Briefcase className="h-4 w-4" />
            Job Information
          </TabsTrigger>
          <TabsTrigger
            value="certifications"
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <Award className="h-4 w-4" />
            Certifications
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <TrendingUp className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="shifts"
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <Calendar className="h-4 w-4" />
            Shifts
          </TabsTrigger>
          <TabsTrigger
            value="availability"
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <Clock className="h-4 w-4" />
            Availability
          </TabsTrigger>
          <TabsTrigger
            value="tasks"
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <CheckSquare className="h-4 w-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger
            value="trips"
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <Route className="h-4 w-4" />
            Trips
          </TabsTrigger>
          <TabsTrigger
            value="attendance"
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <ClipboardCheck className="h-4 w-4" />
            Attendance
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal-info" className="space-y-4">
          <EmployeePersonalInfo employee={employee} />
        </TabsContent>

        {/* Job Information Tab */}
        <TabsContent value="job-info" className="space-y-4">
          <EmployeeJobInfo employee={employee} />
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-4">
          <EmployeeCertifications employee={employee} />
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <EmployeePerformance employee={employee} />
        </TabsContent>

        {/* Shifts Tab */}
        <TabsContent value="shifts" className="space-y-4">
          <EmployeeShifts employee={employee} />
        </TabsContent>

        {/* Availability Tab */}
        <TabsContent value="availability" className="space-y-4">
          <EmployeeAvailability employee={employee} />
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <EmployeeTasks employee={employee} />
        </TabsContent>

        {/* Trips Tab */}
        <TabsContent value="trips" className="space-y-4">
          <EmployeeTrips employee={employee} />
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <EmployeeAttendance employee={employee} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EmployeeDetailPage

