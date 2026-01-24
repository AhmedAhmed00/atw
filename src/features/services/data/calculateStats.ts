import { Service, ServiceStats } from '../types'

export function calculateServiceStats(services: Service[]): ServiceStats {
  const total = services.length
  const active = services.filter((s) => s.status === 'active').length
  const inactive = services.filter((s) => s.status === 'inactive').length
  
  const totalRevenue = services.reduce((sum, service) => {
    return sum + service.price * service.bookings
  }, 0)
  
  const averagePrice = services.length > 0 
    ? services.reduce((sum, s) => sum + s.price, 0) / services.length 
    : 0
  
  const totalBookings = services.reduce((sum, s) => sum + s.bookings, 0)
  
  return {
    total,
    active,
    inactive,
    totalRevenue,
    averagePrice,
    totalBookings,
  }
}

