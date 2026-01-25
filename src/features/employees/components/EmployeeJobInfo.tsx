/**
 * EmployeeJobInfo Component
 * Job Information tab content for Employee Detail Page
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Briefcase,
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  Building2,
  CreditCard,
  FileText,
  Heart,
  MapPin,
  Car,
  Clock,
  FileCheck,
  Download,
} from 'lucide-react'
import { Employee } from '../types'
import { cn } from '@/lib/utils'

interface EmployeeJobInfoProps {
  employee: Employee
}

// Extended employee data for job information
interface JobInformationData {
  // Role & Position Information
  jobTitle: string
  employeeId: string
  department: string
  team: string
  directManager: string
  employmentStatus: 'Full-Time' | 'Part-Time' | 'Contract' | 'Temporary'

  // Timeline Information
  yearsOfService: number
  hireDate: string
  probationEndDate: string
  lastPromotionDate: string

  // Compensation Information
  baseSalary: number
  allowances: number
  totalPackage: number

  // Bank Information
  bankName: string
  paymentMethod: 'Direct Deposit' | 'Check' | 'Wire Transfer'
  accountNumber: string
  payCycle: 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Semi-Monthly'

  // Benefits & Deductions
  healthPlan: string
  annualLeave: number
  monthlyDeduction: number
  contribution401k: number

  // Work Details
  homeBase: string
  hrStatus: string
  vehicleType: string
  shiftAvailabilityNotes: string
  notes: string

  // Contract Terms
  contractType: 'Permanent' | 'Fixed-Term' | 'Probationary' | 'Contract'
  noticePeriod: string
  terminationDate: string | null
  contractDocumentUrl: string
}

// Mock job information data - in real app, this would come from API
const getJobInformationData = (employee: Employee): JobInformationData => {
  const hireDate = new Date(employee.hireDate)
  const yearsOfService = Math.floor((new Date().getTime() - hireDate.getTime()) / (1000 * 60 * 60 * 24 * 365))
  const probationEndDate = new Date(hireDate)
  probationEndDate.setMonth(probationEndDate.getMonth() + 3)

  return {
    jobTitle: employee.jobTitle,
    employeeId: `EMP-${employee.id.split('-')[1]?.toUpperCase() || employee.id.slice(-3).toUpperCase()}`,
    department: employee.department,
    team: 'Emergency Response Team',
    directManager: 'Dr. Ahmed Mohamed',
    employmentStatus: 'Full-Time',
    yearsOfService,
    hireDate: employee.hireDate,
    probationEndDate: probationEndDate.toISOString().split('T')[0],
    lastPromotionDate: '2023-06-15',
    baseSalary: 75000,
    allowances: 12000,
    totalPackage: 87000,
    bankName: 'National Bank of Egypt',
    paymentMethod: 'Direct Deposit',
    accountNumber: '****1234',
    payCycle: 'Monthly',
    healthPlan: 'Premium Health Plan',
    annualLeave: 21,
    monthlyDeduction: 500,
    contribution401k: 3000,
    homeBase: 'Station Alpha - Cairo',
    hrStatus: 'Active',
    vehicleType: 'Type II Ambulance',
    shiftAvailabilityNotes: 'Available for day and night shifts. Prefers weekends off when possible.',
    notes: 'Excellent performance record. Certified in advanced life support.',
    contractType: 'Permanent',
    noticePeriod: '30 days',
    terminationDate: null,
    contractDocumentUrl: '/documents/contracts/emp-001-contract.pdf',
  }
}

export function EmployeeJobInfo({ employee }: EmployeeJobInfoProps) {
  const data = getJobInformationData(employee)

  const InfoItem = ({
    icon: Icon,
    label,
    value,
    className,
  }: {
    icon: any
    label: string
    value: string | React.ReactNode
    className?: string
  }) => (
    <div className={cn('flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors', className)}>
      <div className="p-2 rounded-lg bg-[#09B0B6]/10 text-[#09B0B6] shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Role & Position Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#09B0B6]" />
            Role & Position Information
          </CardTitle>
          <CardDescription>Current role, department, and organizational structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={Briefcase} label="Job Title" value={data.jobTitle} />
            <InfoItem icon={UserCheck} label="Employee ID" value={data.employeeId} />
            <InfoItem icon={Building2} label="Department" value={data.department} />
            <InfoItem icon={Users} label="Team" value={data.team} />
            <InfoItem icon={UserCheck} label="Direct Manager" value={data.directManager} />
            <InfoItem
              icon={Briefcase}
              label="Employment Status"
              value={
                <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
                  {data.employmentStatus}
                </Badge>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Timeline Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#09B0B6]" />
            Timeline Information
          </CardTitle>
          <CardDescription>Employment history and key dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              icon={Calendar}
              label="Years of Service"
              value={
                <div>
                  <span className="text-sm font-medium">{data.yearsOfService}</span>
                  <span className="text-xs text-muted-foreground ml-1">years</span>
                </div>
              }
            />
            <InfoItem
              icon={Calendar}
              label="Hire Date"
              value={new Date(data.hireDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            />
            <InfoItem
              icon={Calendar}
              label="Probation End"
              value={
                <div>
                  <p className="text-sm font-medium">
                    {new Date(data.probationEndDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  {new Date(data.probationEndDate) < new Date() ? (
                    <Badge variant="outline" className="mt-1 border-green-500 text-green-600 text-xs">
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="mt-1 border-yellow-500 text-yellow-600 text-xs">
                      Active
                    </Badge>
                  )}
                </div>
              }
            />
            <InfoItem
              icon={Calendar}
              label="Last Promotion"
              value={new Date(data.lastPromotionDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Compensation Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#09B0B6]" />
            Compensation Information
          </CardTitle>
          <CardDescription>Salary and compensation package details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoItem icon={DollarSign} label="Base Salary" value={formatCurrency(data.baseSalary)} />
            <InfoItem icon={DollarSign} label="Allowances" value={formatCurrency(data.allowances)} />
            <InfoItem
              icon={DollarSign}
              label="Total Package"
              value={
                <span className="text-base font-bold text-[#05647A]">{formatCurrency(data.totalPackage)}</span>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Bank Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#09B0B6]" />
            Bank Information
          </CardTitle>
          <CardDescription>Payment and banking details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={Building2} label="Bank Name" value={data.bankName} />
            <InfoItem
              icon={CreditCard}
              label="Payment Method"
              value={
                <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
                  {data.paymentMethod}
                </Badge>
              }
            />
            <InfoItem icon={CreditCard} label="Account Number" value={data.accountNumber} />
            <InfoItem
              icon={Calendar}
              label="Pay Cycle"
              value={
                <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
                  {data.payCycle}
                </Badge>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Benefits & Deductions Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#09B0B6]" />
            Benefits & Deductions Information
          </CardTitle>
          <CardDescription>Employee benefits and payroll deductions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={Heart} label="Health Plan" value={data.healthPlan} />
            <InfoItem
              icon={Calendar}
              label="Annual Leave"
              value={
                <div>
                  <span className="text-sm font-medium">{data.annualLeave}</span>
                  <span className="text-xs text-muted-foreground ml-1">days</span>
                </div>
              }
            />
            <InfoItem icon={DollarSign} label="Monthly Deduction" value={formatCurrency(data.monthlyDeduction)} />
            <InfoItem icon={DollarSign} label="401k Contribution" value={formatCurrency(data.contribution401k)} />
          </div>
        </CardContent>
      </Card>

      {/* Work Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#09B0B6]" />
            Work Details
          </CardTitle>
          <CardDescription>Operational and work-related information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={MapPin} label="Home Base/Station" value={data.homeBase} />
              <InfoItem
                icon={UserCheck}
                label="HR Status"
                value={
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    {data.hrStatus}
                  </Badge>
                }
              />
              <InfoItem icon={Car} label="Vehicle Type" value={data.vehicleType} />
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#09B0B6]/10 text-[#09B0B6] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Shift Availability Notes</p>
                  <p className="text-sm text-foreground">{data.shiftAvailabilityNotes}</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#09B0B6]/10 text-[#09B0B6] shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm text-foreground">{data.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contract Terms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#09B0B6]" />
            Contract Terms
          </CardTitle>
          <CardDescription>Employment contract details and documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoItem
                icon={FileText}
                label="Contract Type"
                value={
                  <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
                    {data.contractType}
                  </Badge>
                }
              />
              <InfoItem icon={Calendar} label="Notice Period" value={data.noticePeriod} />
              <InfoItem
                icon={Calendar}
                label="Termination Date"
                value={data.terminationDate ? new Date(data.terminationDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }) : (
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    Active
                  </Badge>
                )}
              />
            </div>
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6]"
                onClick={() => {
                  // TODO: Implement view contract functionality
                  console.log('View signed contract:', data.contractDocumentUrl)
                }}
              >
                <Download className="h-4 w-4" />
                View Signed Contract
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

