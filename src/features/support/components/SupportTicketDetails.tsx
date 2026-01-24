/**
 * Support Ticket Details Component
 * Displays comprehensive ticket information with communication timeline
 */

import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Hash,
  User,
  Mail,
  Phone,
  UserCog,
  FileText,
  MessageSquarePlus,
  RefreshCw,
  ExternalLink,
  Clock,
  AlertTriangle,
} from 'lucide-react'
import { mockSupportTickets } from '../data/mockSupport'
import { CommunicationTimeline } from './CommunicationTimeline'
import { AddNoteDialog } from './AddNoteDialog'
import { ChangeStatusDialog } from './ChangeStatusDialog'
import type { TicketStatus, CommunicationLog } from '../types'
import { TICKET_STATUS_CONFIG, USER_TYPE_CONFIG, PRIORITY_CONFIG, TICKET_TYPE_CONFIG } from '../types'
import { cn } from '@/lib/utils'

export function SupportTicketDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Find the ticket
  const ticket = useMemo(() => {
    return mockSupportTickets.find((t) => t.id === id)
  }, [id])

  // Local state
  const [status, setStatus] = useState<TicketStatus>(ticket?.status || 'open')
  const [communicationLog, setCommunicationLog] = useState<CommunicationLog[]>(
    ticket?.communicationLog || []
  )
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
  const [showStatusDialog, setShowStatusDialog] = useState(false)

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800">
          <FileText className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Ticket Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          The support ticket you're looking for doesn't exist.
        </p>
        <Button
          variant="outline"
          onClick={() => navigate('/support')}
          className="mt-2"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Support
        </Button>
      </div>
    )
  }

  const statusConfig = TICKET_STATUS_CONFIG[status]
  const userTypeConfig = USER_TYPE_CONFIG[ticket.userType]
  const priorityConfig = PRIORITY_CONFIG[ticket.priority]

  const handleAddNote = (message: string, isInternal: boolean) => {
    const newLog: CommunicationLog = {
      id: `log-${Date.now()}`,
      senderName: 'Admin User', // In real app, get from auth context
      senderRole: 'staff',
      message,
      date: new Date().toISOString(),
      isInternal,
    }
    setCommunicationLog((prev) => [...prev, newLog])
  }

  const handleStatusChange = (newStatus: TicketStatus, note?: string) => {
    setStatus(newStatus)
    
    // Add system log for status change
    const systemLog: CommunicationLog = {
      id: `log-${Date.now()}`,
      senderName: 'System',
      senderRole: 'system',
      message: `Status changed from "${TICKET_STATUS_CONFIG[status].label}" to "${TICKET_STATUS_CONFIG[newStatus].label}"${note ? `: ${note}` : ''}`,
      date: new Date().toISOString(),
    }
    setCommunicationLog((prev) => [...prev, systemLog])
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/support')}
            className="shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Support Ticket
            </h1>
            <p className="text-sm text-[rgb(var(--brand-primary))] font-mono font-medium flex items-center gap-2 mt-1">
              <Hash className="w-4 h-4" />
              {ticket.ticketNumber}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={cn(
              'font-medium',
              priorityConfig.bgColor,
              priorityConfig.color
            )}
          >
            <AlertTriangle className="w-3 h-3 mr-1" />
            {priorityConfig.label} Priority
          </Badge>
          <Badge
            className={cn(
              'font-semibold border-2',
              statusConfig.bgColor,
              statusConfig.color,
              statusConfig.borderColor
            )}
          >
            {statusConfig.label}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Ticket Info */}
        <div className="space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Name
                </p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {ticket.clientName}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Email
                </p>
                <p className="font-medium text-slate-700 dark:text-slate-300 break-all">
                  {ticket.clientEmail}
                </p>
              </div>

              {ticket.clientPhone && (
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Phone
                  </p>
                  <p className="font-medium text-slate-700 dark:text-slate-300">
                    {ticket.clientPhone}
                  </p>
                </div>
              )}

              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  User Type
                </p>
                <Badge className={cn('font-medium', userTypeConfig.color, 'bg-slate-100 dark:bg-slate-800')}>
                  {userTypeConfig.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Details */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
                Ticket Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Subject
                </p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {ticket.subject}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Ticket Type
                </p>
                <Badge className={cn('font-medium', TICKET_TYPE_CONFIG[ticket.ticketType].bgColor, TICKET_TYPE_CONFIG[ticket.ticketType].color)}>
                  {TICKET_TYPE_CONFIG[ticket.ticketType].label}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <UserCog className="w-3 h-3" />
                  Responsible Employee
                </p>
                <p className="font-medium text-slate-700 dark:text-slate-300">
                  {ticket.responsibleEmployee}
                </p>
              </div>

              {ticket.relatedOrderId && (
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Related Order
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-[rgb(var(--brand-primary))] font-medium"
                    onClick={() => {
                      // Navigate to order details if needed
                      console.log('Navigate to order:', ticket.relatedOrderId)
                    }}
                  >
                    {ticket.relatedOrderId}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              )}

              <Separator />

              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Created
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {formatDate(ticket.createdAt)}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Last Updated
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {formatDate(ticket.updatedAt)}
                </p>
              </div>

              {ticket.resolvedAt && (
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Resolved
                  </p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    {formatDate(ticket.resolvedAt)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => setShowAddNoteDialog(true)}
              className="w-full bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
            >
              <MessageSquarePlus className="mr-2 w-4 h-4" />
              Add Note
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowStatusDialog(true)}
              className="w-full border-[rgb(var(--brand-primary))] text-[rgb(var(--brand-primary))] hover:bg-[rgb(var(--brand-primary))]/10"
            >
              <RefreshCw className="mr-2 w-4 h-4" />
              Change Status
            </Button>
          </div>
        </div>

        {/* Right Column - Communication Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
              Communication Log
              <span className="text-sm font-normal text-slate-500">
                ({communicationLog.length} {communicationLog.length === 1 ? 'entry' : 'entries'})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CommunicationTimeline logs={communicationLog} />
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <AddNoteDialog
        open={showAddNoteDialog}
        onOpenChange={setShowAddNoteDialog}
        onAddNote={handleAddNote}
      />
      <ChangeStatusDialog
        open={showStatusDialog}
        onOpenChange={setShowStatusDialog}
        currentStatus={status}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}

