export interface Service {
  id: string
  name: string
  category: string
  description: string
  price: number
  duration: number // in minutes
  status: 'active' | 'inactive' | 'draft'
  provider: string
  bookings: number
  createdAt: string
  updatedAt: string
}

export interface ServiceStats {
  total: number
  active: number
  inactive: number
  totalRevenue: number
  averagePrice: number
  totalBookings: number
}

