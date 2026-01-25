/**
 * ReviewEmployeePage Component
 * Review page for pending employee approvals with tabs for Personal Information, Job Information, and Certifications
 */

import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, CheckCircle2, XCircle, User, Briefcase, Award } from 'lucide-react'
import { mockPendingApprovals } from '../data/mockEmployees'
import { EmployeePersonalInfo } from '../components/EmployeePersonalInfo'
import { EmployeeJobInfo } from '../components/EmployeeJobInfo'
import { EmployeeCertifications } from '../components/EmployeeCertifications'
import { RejectApprovalDialog } from '../components/RejectApprovalDialog'
import { mockEmployees } from '../data/mockEmployees'
import { cn } from '@/lib/utils'

export function ReviewEmployeePage() {
  const navigate = useNavigate()
  const { approvalId } = useParams<{ approvalId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'personal-info'
  const [isProcessing, setIsProcessing] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value })
  }

  const approval = mockPendingApprovals.find((a) => a.id === approvalId)
  const employee = approval ? mockEmployees.find((e) => e.id === approval.employeeId) : null

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

  if (!approval || !employee) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <PageHeader
            title="Approval Not Found"
            description="The approval you are looking for does not exist"
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
      </div>
    )
  }

  const handleApprove = async () => {
    setIsProcessing(true)
    // TODO: Implement approve logic
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Approving:', approval.id)
    setIsProcessing(false)
    navigate('/employees')
  }

  const handleRejectClick = () => {
    setShowRejectDialog(true)
  }

  const handleRejectConfirm = async (reason: string) => {
    setIsProcessing(true)
    // TODO: Implement reject logic with reason
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Rejecting:', approval.id, 'Reason:', reason)
    setIsProcessing(false)
    setShowRejectDialog(false)
    navigate('/employees')
  }

  const handleBack = () => {
    navigate('/employees')
  }

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-[#09B0B6]">
            <AvatarImage src={employee.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`} alt={employee.name} />
            <AvatarFallback className="bg-linear-to-br from-[#09B0B6] to-[#05647A] text-white text-xl font-bold">
              {getInitials(employee.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Review Employee: {employee.name}
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
              <span>Request Type: </span>
              <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
                {approval.requestType === 'certification' ? 'Certification' :
                 approval.requestType === 'department-transfer' ? 'Department Transfer' :
                 approval.requestType === 'shift-change' ? 'Shift Change' : 'Leave Request'}
              </Badge>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleApprove}
            disabled={isProcessing}
            className="gap-2 text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
          >
            <CheckCircle2 className="h-4 w-4" />
            Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRejectClick}
            disabled={isProcessing}
            className="gap-2 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleBack}
            className="shrink-0 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Request Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>Information about the pending approval request</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Details</p>
              <p className="text-sm mt-1">{approval.details}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Submitted Date</p>
              <p className="text-sm mt-1">
                {new Date(approval.submittedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            {approval.reviewer && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reviewer</p>
                <p className="text-sm mt-1">{approval.reviewer}</p>
              </div>
            )}
            {approval.reviewDate && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Review Date</p>
                <p className="text-sm mt-1">
                  {new Date(approval.reviewDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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
        </TabsList>

        <TabsContent value="personal-info" className="space-y-4">
          <EmployeePersonalInfo employee={employee} />
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleRejectClick}
              disabled={isProcessing}
              className="gap-2 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isProcessing}
              className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              <CheckCircle2 className="h-4 w-4" />
              Approve
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="job-info" className="space-y-4">
          <EmployeeJobInfo employee={employee} />
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleRejectClick}
              disabled={isProcessing}
              className="gap-2 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isProcessing}
              className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              <CheckCircle2 className="h-4 w-4" />
              Approve
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <EmployeeCertifications employee={employee} />
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleRejectClick}
              disabled={isProcessing}
              className="gap-2 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isProcessing}
              className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              <CheckCircle2 className="h-4 w-4" />
              Approve
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Reject Approval Dialog */}
      <RejectApprovalDialog
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
        onConfirm={handleRejectConfirm}
        employeeName={employee?.name}
        requestType={approval ? getRequestTypeLabel(approval.requestType) : undefined}
        isLoading={isProcessing}
      />
    </div>
  )
}

export default ReviewEmployeePage

