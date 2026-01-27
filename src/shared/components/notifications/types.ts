/**
 * Notification Types
 */

export type NotificationType = 'order' | 'message' | 'appointment' | 'payment' | 'system'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  isRead: boolean
  link?: string
  data?: {
    orderId?: string
    appointmentId?: string
    patientName?: string
    patientAvatar?: string
  }
}

