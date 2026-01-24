/**
 * Support Module Types
 */

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type UserType = 'patient' | 'doctor' | 'admin' | 'staff'
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TicketType = 'technical' | 'billing' | 'appointment' | 'general' | 'feedback' | 'complaint'

export interface CommunicationLog {
  id: string
  senderName: string
  senderRole: UserType | 'system'
  message: string
  date: string
  isInternal?: boolean // Internal notes not visible to client
}

export interface TicketAttachment {
  id: string
  fileName: string
  fileSize: number
  fileType: string
  url: string
  uploadedAt: string
}

export interface SupportTicket {
  id: string
  ticketNumber: string
  subject: string
  description: string
  ticketType: TicketType
  status: TicketStatus
  priority: TicketPriority
  clientName: string
  clientEmail: string
  clientPhone?: string
  userType: UserType
  responsibleEmployee: string
  responsibleEmployeeId: string
  relatedOrderId?: string
  attachments?: TicketAttachment[]
  communicationLog: CommunicationLog[]
  createdAt: string
  updatedAt: string
  resolvedAt?: string
}

export interface TicketStatusConfig {
  label: string
  color: string
  bgColor: string
  borderColor: string
}

export const TICKET_STATUS_CONFIG: Record<TicketStatus, TicketStatusConfig> = {
  open: {
    label: 'Open',
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  in_progress: {
    label: 'In Progress',
    color: 'text-[#266BAC] dark:text-[#AADCF7]',
    bgColor: 'bg-[#63A7D8]/20 dark:bg-[#63A7D8]/30',
    borderColor: 'border-[#63A7D8]/40 dark:border-[#63A7D8]/50',
  },
  resolved: {
    label: 'Resolved',
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
  },
  closed: {
    label: 'Closed',
    color: 'text-slate-700 dark:text-slate-400',
    bgColor: 'bg-slate-100 dark:bg-slate-800',
    borderColor: 'border-slate-200 dark:border-slate-700',
  },
}

export const USER_TYPE_CONFIG: Record<UserType, { label: string; color: string }> = {
  patient: { label: 'Patient', color: 'text-[rgb(var(--brand-primary))]' },
  doctor: { label: 'Doctor', color: 'text-violet-600 dark:text-violet-400' },
  admin: { label: 'Admin', color: 'text-rose-600 dark:text-rose-400' },
  staff: { label: 'Staff', color: 'text-slate-600 dark:text-slate-400' },
}

export const PRIORITY_CONFIG: Record<TicketPriority, { label: string; color: string; bgColor: string }> = {
  low: { label: 'Low', color: 'text-slate-600', bgColor: 'bg-slate-100 dark:bg-slate-800' },
  medium: { label: 'Medium', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  high: { label: 'High', color: 'text-[#63A7D8]', bgColor: 'bg-[#63A7D8]/20 dark:bg-[#63A7D8]/30' },
  urgent: { label: 'Urgent', color: 'text-rose-600', bgColor: 'bg-rose-100 dark:bg-rose-900/30' },
}

export const TICKET_TYPE_CONFIG: Record<TicketType, { label: string; color: string; bgColor: string }> = {
  technical: { label: 'Technical', color: 'text-violet-600', bgColor: 'bg-violet-100 dark:bg-violet-900/30' },
  billing: { label: 'Billing', color: 'text-emerald-600', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
  appointment: { label: 'Appointment', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  general: { label: 'General', color: 'text-slate-600', bgColor: 'bg-slate-100 dark:bg-slate-800' },
  feedback: { label: 'Feedback', color: 'text-[#63A7D8]', bgColor: 'bg-[#63A7D8]/20 dark:bg-[#63A7D8]/30' },
  complaint: { label: 'Complaint', color: 'text-rose-600', bgColor: 'bg-rose-100 dark:bg-rose-900/30' },
}

