/**
 * Mock Settings Data
 */

import type { HCPData, NotificationPreferences } from '../types'

export const mockHCPData: HCPData = {
  id: 'hcp-001',
  name: 'All The way Healthcare Center',
  address: '123 Medical Plaza, Suite 200, Los Angeles, CA 90001',
  phoneNumber: '+12125551234',
  email: 'admin@All The way.com',
  logo: '/Logos-All The way.png',
}

export const mockNotificationPreferences: NotificationPreferences = {
  newOrderNotification: true,
  paymentConfirmationNotification: true,
  dailySummaryEmail: false,
}

