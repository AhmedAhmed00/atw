export interface ProfileData {
  // Basic Information
  fullName: string
  serviceProviderType: string
  specialization: string
  avatar?: string
  bio?: string
  
  // Contact Information
  email: string
  phone: string
  address: string
  
  // Professional Information
  licenseNumber: string
  yearsOfExperience: number
  certifications?: string[]
  
  // Financial Information
  bankAccountName: string
  bankAccount: string
  commissionRate: number
  paymentTerms: string
  
  // Practice Statistics
  statistics: {
    totalBookings: number
    thisMonth: number
    totalRevenue: number
    services: number
  }
}

