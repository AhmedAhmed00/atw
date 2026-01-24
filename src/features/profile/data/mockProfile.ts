import type { ProfileData } from '../types'

export const mockProfileData: ProfileData = {
  // Basic Information
  fullName: "Dr. Sarah Johnson",
  serviceProviderType: "Medical Practitioner",
  specialization: "Cardiology",
  bio: "Experienced cardiologist with over 12 years of practice, specializing in interventional cardiology and preventive heart care.",
  
  // Contact Information
  email: "sarah.johnson@healix.com",
  phone: "+1 (555) 123-4567",
  address: "123 Medical Plaza, Suite 500, San Francisco, CA 94102",
  
  // Professional Information
  licenseNumber: "MD-CA-2011-45892",
  yearsOfExperience: 12,
  certifications: [
    "Board Certified in Cardiology",
    "Advanced Cardiac Life Support (ACLS)",
    "Interventional Cardiology Certification"
  ],
  
  // Financial Information
  bankAccountName: "Dr. Sarah Johnson Professional Account",
  bankAccount: "****-****-****-5678",
  commissionRate: 15,
  paymentTerms: "Net 30 days",
  
  // Practice Statistics
  statistics: {
    totalBookings: 1248,
    thisMonth: 89,
    totalRevenue: 324500,
    services: 8
  }
}

