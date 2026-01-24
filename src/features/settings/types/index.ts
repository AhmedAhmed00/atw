/**
 * Settings Module Types
 */

export interface HCPData {
  id: string
  name: string
  address: string
  phoneNumber: string
  email: string
  logo?: string
}

export interface PasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface NotificationPreferences {
  newOrderNotification: boolean
  paymentConfirmationNotification: boolean
  dailySummaryEmail: boolean
}

export interface SettingsData {
  hcp: HCPData
  notifications: NotificationPreferences
}

