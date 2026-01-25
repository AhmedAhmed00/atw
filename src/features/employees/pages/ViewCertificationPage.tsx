/**
 * ViewCertificationPage Component
 * Full-page route for viewing certification details
 */

import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Download, Edit, Award, Calendar, CheckCircle2, AlertCircle, XCircle, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockEmployees } from '../data/mockEmployees'

interface Certification {
  id: string
  name: string
  issueDate: string
  expiryDate: string
  status: 'Valid' | 'Expiring Soon' | 'Expired'
  issuingAuthority?: string
  certificateNumber?: string
  fileUrl?: string
}

// Mock function to get certification data - in real app, this would come from API
const getCertificationData = (employeeId: string, certificationId: string): Certification | null => {
  const employee = mockEmployees.find((emp) => emp.id === employeeId)
  if (!employee) return null

  // Generate mock certification data
  const issueDate = new Date()
  issueDate.setFullYear(issueDate.getFullYear() - 1)
  const expiryDate = new Date(issueDate)
  expiryDate.setFullYear(expiryDate.getFullYear() + 2)

  let status: 'Valid' | 'Expiring Soon' | 'Expired' = 'Valid'
  const daysUntilExpiry = Math.floor((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  if (daysUntilExpiry < 0) {
    status = 'Expired'
  } else if (daysUntilExpiry < 90) {
    status = 'Expiring Soon'
  }

  return {
    id: certificationId,
    name: 'Advanced Cardiac Life Support (ACLS)',
    issueDate: issueDate.toISOString().split('T')[0],
    expiryDate: expiryDate.toISOString().split('T')[0],
    status,
    issuingAuthority: 'American Heart Association',
    certificateNumber: 'ACLS-2023-001',
    fileUrl: '/certificates/sample-certificate.pdf',
  }
}

export function ViewCertificationPage() {
  const navigate = useNavigate()
  const { employeeId, certificationId } = useParams<{ employeeId: string; certificationId: string }>()

  if (!employeeId || !certificationId) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <PageHeader
            title="Certification Not Found"
            description="The certification you are looking for does not exist"
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

  const certification = getCertificationData(employeeId, certificationId)

  if (!certification) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <PageHeader
            title="Certification Not Found"
            description="The certification you are looking for does not exist"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(`/employees/${employeeId}`)}
            className="shrink-0 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Valid':
        return {
          icon: CheckCircle2,
          className: 'bg-green-500 hover:bg-green-600 text-white',
          label: 'Valid',
        }
      case 'Expiring Soon':
        return {
          icon: AlertCircle,
          className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          label: 'Expiring Soon',
        }
      case 'Expired':
        return {
          icon: XCircle,
          className: 'bg-red-500 hover:bg-red-600 text-white',
          label: 'Expired',
        }
      default:
        return {
          icon: CheckCircle2,
          className: 'bg-gray-500 hover:bg-gray-600 text-white',
          label: status,
        }
    }
  }

  const statusConfig = getStatusConfig(certification.status)
  const StatusIcon = statusConfig.icon

  const issueDate = new Date(certification.issueDate)
  const expiryDate = new Date(certification.expiryDate)
  const daysUntilExpiry = Math.floor((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const handleBack = () => {
    navigate(`/employees/${employeeId}`)
  }

  const handleEdit = () => {
    // TODO: Navigate to edit page when implemented
    console.log('Edit certification:', certification.id)
  }

  const handleDownload = () => {
    if (certification.fileUrl) {
      // TODO: Implement file download
      console.log('Downloading file:', certification.fileUrl)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-[#09B0B6]/10">
            <Award className="w-6 h-6 text-[#09B0B6]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {certification.name}
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
              {certification.certificateNumber && (
                <>
                  <span>Certificate #: {certification.certificateNumber}</span>
                  <span>•</span>
                </>
              )}
              <Badge className={cn('font-semibold gap-1', statusConfig.className)}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </Badge>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {certification.fileUrl && (
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleEdit} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
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

      {/* Certification Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-[#09B0B6]" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Certification Name</p>
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-1">
                {certification.name}
              </p>
            </div>
            {certification.certificateNumber && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certificate Number</p>
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-1">
                  {certification.certificateNumber}
                </p>
              </div>
            )}
            {certification.issuingAuthority && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Issuing Authority</p>
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-1">
                  {certification.issuingAuthority}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dates & Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#09B0B6]" />
              Dates & Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Issue Date</p>
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-1">
                {issueDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Expiry Date</p>
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-1">
                {expiryDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {daysUntilExpiry >= 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  {daysUntilExpiry} days remaining
                </p>
              )}
              {daysUntilExpiry < 0 && (
                <p className="text-xs text-red-600 font-medium mt-1">
                  Expired {Math.abs(daysUntilExpiry)} days ago
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge className={cn('font-semibold gap-1 mt-1', statusConfig.className)}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File Attachment */}
      {certification.fileUrl && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#09B0B6]" />
              Attached File
            </CardTitle>
            <CardDescription>Download the certification document</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#09B0B6]/10">
                  <FileText className="w-5 h-5 text-[#09B0B6]" />
                </div>
                <div>
                  <p className="text-sm font-medium">Certificate Document</p>
                  <p className="text-xs text-muted-foreground">PDF Document</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ViewCertificationPage

