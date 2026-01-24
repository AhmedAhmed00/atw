/**
 * AppointmentDetails Component
 * Displays comprehensive appointment information with tabs
 */

import { useState, useMemo } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Stethoscope,
  FileText,
  MessageSquare,
  Upload,
  RefreshCw,
  Hash,
  Cake,
  UserCircle,
  DollarSign,
  Timer,
  FileDown,
  Save,
  Loader2,
} from 'lucide-react'
import { mockAppointments } from '../data/mockAppointments'
import { getStatusConfig } from '../constants/appointment-status'
import { StatusChangeDialog } from './StatusChangeDialog'
import { UploadAnalysisDialog } from './UploadAnalysisDialog'
import { ConversationTab } from './ConversationTab'
import type { AppointmentStatus, AnalysisResult, ConversationMessage } from '../types'

export function AppointmentDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  // Get initial tab from URL query param (e.g., ?tab=conversation)
  const initialTab = searchParams.get('tab') || 'details'

  // Find the appointment
  const appointment = useMemo(() => {
    return mockAppointments.find((apt) => apt.id === id)
  }, [id])

  // Local state for editable fields
  const [status, setStatus] = useState<AppointmentStatus>(appointment?.status || 'pending')
  const [doctorNotes, setDoctorNotes] = useState(appointment?.doctorNotes || '')
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>(
    appointment?.analysisResults || []
  )
  const [conversation, setConversation] = useState<ConversationMessage[]>(
    appointment?.conversation || []
  )

  // Dialog states
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [isSavingNotes, setIsSavingNotes] = useState(false)

  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800">
          <FileText className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Appointment Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          The appointment you're looking for doesn't exist.
        </p>
        <Button
          variant="outline"
          onClick={() => navigate('/appointments')}
          className="mt-2"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Appointments
        </Button>
      </div>
    )
  }

  const statusConfig = getStatusConfig(status)

  const handleStatusChange = (newStatus: AppointmentStatus, notes?: string) => {
    setStatus(newStatus)
    if (notes) {
      setDoctorNotes((prev) => (prev ? `${prev}\n\n[Status changed to ${newStatus}]: ${notes}` : `[Status changed to ${newStatus}]: ${notes}`))
    }
  }

  const handleUploadAnalysis = (result: AnalysisResult) => {
    setAnalysisResults((prev) => [...prev, result])
  }

  const handleSendMessage = (message: string) => {
    const newMessage: ConversationMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'admin-current',
      senderName: 'Dr. Admin',
      senderRole: 'admin',
      message,
      timestamp: new Date().toISOString(),
      isRead: true,
    }
    setConversation((prev) => [...prev, newMessage])
  }

  const handleSaveNotes = async () => {
    setIsSavingNotes(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsSavingNotes(false)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const calculateAge = (birthdate: string) => {
    const birth = new Date(birthdate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/appointments')}
            className="shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Appointment Details
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
              <Hash className="w-4 h-4" />
              {appointment.orderNumber}
            </p>
          </div>
        </div>
        <Badge
          className={`${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} border-2 font-semibold text-sm px-4 py-1.5`}
        >
          {statusConfig.icon} {statusConfig.label}
        </Badge>
      </div>

      <Tabs defaultValue={initialTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-flex">
          <TabsTrigger value="details" className="gap-2">
            <FileText className="w-4 h-4" />
            Details
          </TabsTrigger>
          <TabsTrigger value="conversation" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Conversation
            {conversation.filter((m) => !m.isRead).length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-[rgb(var(--brand-primary))] text-white">
                {conversation.filter((m) => !m.isRead).length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient Information */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Full Name
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {appointment.patientName}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      Phone Number
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {appointment.patientPhone}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
                      <Cake className="w-3 h-3" />
                      Birthdate
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {formatDate(appointment.patientBirthdate)}
                      <span className="text-sm font-normal text-slate-500 ml-2">
                        ({calculateAge(appointment.patientBirthdate)} years old)
                      </span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
                      <UserCircle className="w-3 h-3" />
                      Gender
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
                      {appointment.patientGender}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointment Info */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Date
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {formatDate(appointment.date)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Time
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {appointment.time}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Doctor
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {appointment.doctor}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Details */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
                Service Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    Service Name
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {appointment.serviceDetails.name}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    Duration
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {appointment.serviceDetails.duration}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    Price
                  </p>
                  <p className="font-semibold text-[rgb(var(--brand-primary))]">
                    ${appointment.serviceDetails.price.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    Status
                  </p>
                  <Badge
                    className={`${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} border font-medium`}
                  >
                    {statusConfig.label}
                  </Badge>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                  Description
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  {appointment.serviceDetails.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions Row */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setShowStatusDialog(true)}
              className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
            >
              <RefreshCw className="mr-2 w-4 h-4" />
              Change Status
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowUploadDialog(true)}
              className="border-[rgb(var(--brand-primary))] text-[rgb(var(--brand-primary))] hover:bg-[rgb(var(--brand-primary))]/10"
            >
              <Upload className="mr-2 w-4 h-4" />
              Upload Analysis Result
            </Button>
          </div>

          {/* Doctor Notes */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
                Doctor Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doctor-notes" className="text-sm font-medium">
                  Add or edit notes for this appointment
                </Label>
                <Textarea
                  id="doctor-notes"
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  placeholder="Enter your notes about this appointment..."
                  rows={5}
                  className="resize-none"
                />
              </div>
              <Button
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
              >
                {isSavingNotes ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 w-4 h-4" />
                    Save Notes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
                Analysis Results
                {analysisResults.length > 0 && (
                  <span className="text-sm font-normal text-slate-500">
                    ({analysisResults.length} file{analysisResults.length !== 1 ? 's' : ''})
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysisResults.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                  <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">
                    No analysis results uploaded yet
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setShowUploadDialog(true)}
                    className="text-[rgb(var(--brand-primary))] mt-2"
                  >
                    <Upload className="mr-2 w-4 h-4" />
                    Upload your first result
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {analysisResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[rgb(var(--brand-primary))]/10">
                          <FileText className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {result.fileName}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Uploaded by {result.uploadedBy} on{' '}
                            {new Date(result.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <FileDown className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversation">
          <ConversationTab messages={conversation} onSendMessage={handleSendMessage} />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <StatusChangeDialog
        open={showStatusDialog}
        onOpenChange={setShowStatusDialog}
        currentStatus={status}
        onStatusChange={handleStatusChange}
      />
      <UploadAnalysisDialog
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
        onUpload={handleUploadAnalysis}
      />
    </div>
  )
}

