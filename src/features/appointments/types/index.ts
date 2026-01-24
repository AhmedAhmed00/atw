

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export type Gender = 'male' | 'female' | 'other'

export interface ServiceDetails {
  name: string
  description: string
  duration: string
  price: number
}

export interface AnalysisResult {
  id: string
  fileName: string
  fileUrl: string
  uploadedAt: string
  uploadedBy: string
}

export interface ConversationMessage {
  id: string
  senderId: string
  senderName: string
  senderRole: 'doctor' | 'staff' | 'admin'
  message: string
  timestamp: string
  isRead: boolean
}

export interface Appointment {
  id: string
  orderNumber: string
  patientName: string
  patientEmail: string
  patientPhone: string
  patientBirthdate: string
  patientGender: Gender
  date: string
  time: string
  service: string
  serviceDetails: ServiceDetails
  doctor: string
  status: AppointmentStatus
  notes?: string
  doctorNotes?: string
  analysisResults?: AnalysisResult[]
  conversation?: ConversationMessage[]
  createdAt: string
}
export interface AppointmentCardProps {
  appointment: Appointment
}



export interface AppointmentFilters {
  status?: AppointmentStatus | 'all'
  search?: string
  dateFrom?: string
  dateTo?: string
}
export interface AppointmentListProps {
  appointments: Appointment[]
  emptyMessage?: string
}
export interface AppointmentsSearchProps {
  value: string
  onChange: (value: string) => void
}
export interface AppointmentsTabsProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeTab: AppointmentStatus | 'all'
  onTabChange: (tab: AppointmentStatus | 'all') => void
  counts: Record<AppointmentStatus | 'all', number>
  children: React.ReactNode
}

