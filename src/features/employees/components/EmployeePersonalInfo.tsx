/**
 * EmployeePersonalInfo Component
 * Personal Information tab content for Employee Detail Page
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { User, Phone, Mail, MapPin, Calendar, Globe, Users, CreditCard, FileText, Shield, TestTube } from 'lucide-react'
import { Employee } from '../types'
import { cn } from '@/lib/utils'

interface EmployeePersonalInfoProps {
  employee: Employee
}

// Extended employee data for personal information
interface ExtendedEmployeeData {
  // Basic Details
  fullName: string
  dateOfBirth: string
  nationality: string
  gender: 'Male' | 'Female' | 'Other'
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed'
  socialSecurityNumber: string
  
  // Emergency Contact
  emergencyContact: {
    name: string
    image?: string
    relationship: string
    primaryPhone: string
    address: string
  }
  
  // Contact Information
  workEmail: string
  mobilePhone: string
  residentialAddress: string
  personalEmail: string
  workPhone: string
  
  // Driver's License
  driversLicense: {
    number: string
    state: string
    expiryDate: string
  }
  
  // Background & Screening
  backgroundCheckDate: string
  drugScreenDate: string
}

// Mock extended data - in real app, this would come from API
const getExtendedEmployeeData = (employee: Employee): ExtendedEmployeeData => {
  return {
    fullName: employee.name,
    dateOfBirth: '1985-06-15',
    nationality: 'Egyptian',
    gender: 'Female',
    maritalStatus: 'Married',
    socialSecurityNumber: '***-**-1234',
    emergencyContact: {
      name: 'John Johnson',
      relationship: 'Spouse',
      primaryPhone: '+1 (555) 987-6543',
      address: '123 Main Street, Cairo, Egypt',
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}Contact`,
    },
    workEmail: employee.email,
    mobilePhone: employee.phone || '+1 (555) 123-4567',
    residentialAddress: '456 Oak Avenue, Cairo, Egypt',
    personalEmail: employee.email.replace('@example.com', '@personal.com'),
    workPhone: '+1 (555) 111-2222',
    driversLicense: {
      number: 'DL-123456789',
      state: 'Cairo',
      expiryDate: '2026-12-31',
    },
    backgroundCheckDate: '2024-01-15',
    drugScreenDate: '2024-01-20',
  }
}

export function EmployeePersonalInfo({ employee }: EmployeePersonalInfoProps) {
  const data = getExtendedEmployeeData(employee)

  const InfoItem = ({ icon: Icon, label, value, className }: { icon: any; label: string; value: string | React.ReactNode; className?: string }) => (
    <div className={cn('flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors', className)}>
      <div className="p-2 rounded-lg bg-[#09B0B6]/10 text-[#09B0B6] shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
        <div className="text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Basic Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-[#09B0B6]" />
            Basic Details
          </CardTitle>
          <CardDescription>Personal identification and demographic information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={User} label="Full Name" value={data.fullName} />
            <InfoItem 
              icon={Calendar} 
              label="Date of Birth" 
              value={new Date(data.dateOfBirth).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} 
            />
            <InfoItem icon={Globe} label="Nationality" value={data.nationality} />
            <InfoItem 
              icon={Users} 
              label="Gender" 
              value={
                <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
                  {data.gender}
                </Badge>
              } 
            />
            <InfoItem 
              icon={Users} 
              label="Marital Status" 
              value={
                <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
                  {data.maritalStatus}
                </Badge>
              } 
            />
            <InfoItem icon={CreditCard} label="Social Security (SSN)" value={data.socialSecurityNumber} />
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#09B0B6]" />
            Emergency Contact
          </CardTitle>
          <CardDescription>Primary emergency contact information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border">
            <Avatar className="w-16 h-16 border-2 border-[#09B0B6]/20">
              <AvatarImage src={data.emergencyContact.image} alt={data.emergencyContact.name} />
              <AvatarFallback className="bg-linear-to-br from-[#09B0B6] to-[#05647A] text-white">
                {data.emergencyContact.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Contact Name</p>
                <p className="text-base font-semibold text-foreground">{data.emergencyContact.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{data.emergencyContact.relationship}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InfoItem 
                  icon={Phone} 
                  label="Primary Phone" 
                  value={data.emergencyContact.primaryPhone}
                  className="p-2 bg-background"
                />
                <InfoItem 
                  icon={MapPin} 
                  label="Address" 
                  value={data.emergencyContact.address}
                  className="p-2 bg-background"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#09B0B6]" />
            Contact Information
          </CardTitle>
          <CardDescription>Work and personal contact details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={Mail} label="Work Email" value={data.workEmail} />
            <InfoItem icon={Phone} label="Mobile Phone" value={data.mobilePhone} />
            <InfoItem icon={MapPin} label="Residential Address" value={data.residentialAddress} />
            <InfoItem icon={Mail} label="Personal Email" value={data.personalEmail} />
            <InfoItem icon={Phone} label="Work Phone" value={data.workPhone} />
          </div>
        </CardContent>
      </Card>

      {/* Driver's License Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#09B0B6]" />
            Driver's License Information
          </CardTitle>
          <CardDescription>License details and validity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoItem icon={FileText} label="License Number" value={data.driversLicense.number} />
            <InfoItem icon={MapPin} label="State" value={data.driversLicense.state} />
            <InfoItem 
              icon={Calendar} 
              label="Expiry Date" 
              value={
                <div>
                  <p className="text-sm font-medium">
                    {new Date(data.driversLicense.expiryDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                  {new Date(data.driversLicense.expiryDate) > new Date() ? (
                    <Badge variant="outline" className="mt-1 border-green-500 text-green-600 text-xs">
                      Valid
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="mt-1 border-red-500 text-red-600 text-xs">
                      Expired
                    </Badge>
                  )}
                </div>
              } 
            />
          </div>
        </CardContent>
      </Card>

      {/* Background & Screening */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#09B0B6]" />
            Background & Screening
          </CardTitle>
          <CardDescription>Security and compliance screening dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem 
              icon={Shield} 
              label="Background Check Date" 
              value={
                <div>
                  <p className="text-sm font-medium">
                    {new Date(data.backgroundCheckDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <Badge variant="outline" className="mt-1 border-green-500 text-green-600 text-xs">
                    Completed
                  </Badge>
                </div>
              } 
            />
            <InfoItem 
              icon={TestTube} 
              label="Drug Screen Date" 
              value={
                <div>
                  <p className="text-sm font-medium">
                    {new Date(data.drugScreenDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <Badge variant="outline" className="mt-1 border-green-500 text-green-600 text-xs">
                    Completed
                  </Badge>
                </div>
              } 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

