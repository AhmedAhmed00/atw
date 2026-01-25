/**
 * PatientOverview Component
 * Comprehensive overview dashboard for patient information
 */

import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Hash, 
  MapPin, 
  Activity, 
  Ruler, 
  AlertCircle,
  CreditCard,
  FileText,
  Receipt,
  ClipboardList,
  Users,
  Home,
  Stethoscope,
  Shield,
  FileCheck
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { InfoItem } from '@/components/shared/InfoItem'
import { SectionCard } from '@/components/shared/SectionCard'
import { ComplianceItem } from '@/components/shared/ComplianceItem'
import { cn } from '@/lib/utils'

interface PatientOverviewProps {
  patient: {
    id: string
    name: string
    nationalId: string
    condition: string
    region: string
    trips: number
    balance: number
    status: string
  }
}

interface PatientDetails {
  personal: {
    fullName: string
    gender: 'Male' | 'Female' | 'Other'
    phone: string
    dateOfBirth: string
    mrn: string
    email: string
  }
  medical: {
    mobilityStatus: string
    height: string
    baseline: string
    clinicalFlags: Array<{ label: string; severity: 'low' | 'medium' | 'high' }>
    equipmentNeeded: string[]
  }
  insurance: {
    payerName: string
    memberId: string
    plan: string
    authorizationNumber: string
    authorizationValidDate: string
  }
  summary: {
    totalTrips: number
    reports: number
    invoices: number
  }
  contact: {
    address: string
    emergencyContact: {
      name: string
      relationship: string
      phone: string
    }
    careTeam: Array<{ name: string; role: string }>
  }
  stats: {
    completedTrips: number
    upcomingTrips: number
    pendingInvoices: number
    totalSpent: number
  }
  compliance: {
    consentOnFile: boolean
    photoIdOnFile: boolean
    insuranceVerified: boolean
  }
  notes: string
}

// Mock data generator
function generatePatientDetails(patient: PatientOverviewProps['patient']): PatientDetails {
  return {
    personal: {
      fullName: patient.name,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      phone: '+20 100 123 4567',
      dateOfBirth: new Date(1950 + Math.floor(Math.random() * 50), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      mrn: `MRN-${patient.id.padStart(6, '0')}`,
      email: `${patient.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    },
    medical: {
      mobilityStatus: Math.random() > 0.5 ? 'Ambulatory' : 'Wheelchair Required',
      height: `${Math.floor(Math.random() * 30) + 150} cm`,
      baseline: 'Stable',
      clinicalFlags: [
        { label: 'Diabetes', severity: 'medium' as const },
        { label: 'Hypertension', severity: 'low' as const },
        ...(Math.random() > 0.7 ? [{ label: 'Allergies', severity: 'high' as const }] : []),
      ],
      equipmentNeeded: ['Wheelchair', 'Oxygen Tank', 'IV Stand'],
    },
    insurance: {
      payerName: 'National Health Insurance',
      memberId: `INS-${patient.id.padStart(8, '0')}`,
      plan: 'Premium Plan',
      authorizationNumber: `AUTH-${Date.now().toString().slice(-8)}`,
      authorizationValidDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    summary: {
      totalTrips: patient.trips,
      reports: Math.floor(patient.trips * 0.7),
      invoices: Math.floor(patient.trips * 0.9),
    },
    contact: {
      address: `123 Medical Street, ${patient.region}, Egypt`,
      emergencyContact: {
        name: 'Emergency Contact Name',
        relationship: 'Spouse',
        phone: '+20 100 987 6543',
      },
      careTeam: [
        { name: 'Dr. Ahmed Hassan', role: 'Primary Physician' },
        { name: 'Nurse Fatima Ali', role: 'Case Manager' },
      ],
    },
    stats: {
      completedTrips: Math.floor(patient.trips * 0.85),
      upcomingTrips: Math.floor(patient.trips * 0.15),
      pendingInvoices: Math.floor(patient.trips * 0.1),
      totalSpent: patient.balance,
    },
    compliance: {
      consentOnFile: true,
      photoIdOnFile: true,
      insuranceVerified: true,
    },
    notes: 'Patient requires regular dialysis treatment three times per week. Transportation must be wheelchair accessible. Patient prefers morning appointments.',
  }
}

export function PatientOverview({ patient }: PatientOverviewProps) {
  const details = generatePatientDetails(patient)

  const severityColors = {
    low: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
    high: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  }

  // Patient Summary Cards
  const summaryCards: StatsCardProps[] = [
    {
      title: 'Total Trips',
      value: details.summary.totalTrips.toString(),
      icon: ClipboardList,
      colorVariant: 'primary',
      description: 'All time trips',
    },
    {
      title: 'Reports',
      value: details.summary.reports.toString(),
      icon: FileText,
      colorVariant: 'info',
      description: 'Medical reports',
    },
    {
      title: 'Invoices',
      value: details.summary.invoices.toString(),
      icon: Receipt,
      colorVariant: 'success',
      description: 'Total invoices',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Patient Summary Cards */}
      <div>
        <h2 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5" />
          Patient Summary
        </h2>
        <StatsCardGrid 
          cards={summaryCards} 
          columns={{ default: 1, sm: 2, lg: 3 }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <SectionCard title="Personal Information" icon={User}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem icon={User} label="Full Name" value={details.personal.fullName} />
            <InfoItem icon={User} label="Gender" value={details.personal.gender} />
            <InfoItem icon={Phone} label="Phone" value={details.personal.phone} />
            <InfoItem icon={Calendar} label="Date of Birth" value={new Date(details.personal.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
            <InfoItem icon={Hash} label="MRN" value={details.personal.mrn} />
            <InfoItem icon={Mail} label="Email" value={details.personal.email} />
          </div>
        </SectionCard>

        {/* Medical Information */}
        <SectionCard title="Medical Information" icon={Stethoscope}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem icon={Activity} label="Mobility Status" value={details.medical.mobilityStatus} />
              <InfoItem icon={Ruler} label="Height" value={details.medical.height} />
              <InfoItem icon={FileText} label="Baseline" value={details.medical.baseline} />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Clinical Flags</p>
              <div className="flex flex-wrap gap-2">
                {details.medical.clinicalFlags.map((flag, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className={cn("border-2 font-medium", severityColors[flag.severity])}
                  >
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {flag.label}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Equipment Needed</p>
              <div className="flex flex-wrap gap-2">
                {details.medical.equipmentNeeded.map((equipment, idx) => (
                  <Badge key={idx} variant="outline" className="border-[#09B0B6] text-[#05647A] dark:text-[#09B0B6]">
                    {equipment}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Insurance Information */}
        <SectionCard title="Insurance Information" icon={Shield}>
            <div className="grid grid-cols-1 gap-4">
              <InfoItem icon={Shield} label="Payer Name" value={details.insurance.payerName} />
              <InfoItem icon={Hash} label="Member ID" value={details.insurance.memberId} />
              <InfoItem icon={CreditCard} label="Plan" value={details.insurance.plan} />
              <InfoItem icon={Hash} label="Authorization Number" value={details.insurance.authorizationNumber} />
              <InfoItem icon={Calendar} label="Authorization Valid Date" value={new Date(details.insurance.authorizationValidDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
            </div>
        </SectionCard>

        {/* Contact & Address */}
        <SectionCard title="Contact & Address" icon={Home}>
            <InfoItem icon={MapPin} label="Address" value={details.contact.address} />
            
            <Separator />
            
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Emergency Contact</p>
              <div className="p-3 rounded-lg border bg-muted/50">
                <p className="font-semibold text-sm">{details.contact.emergencyContact.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{details.contact.emergencyContact.relationship}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Phone className="w-3 h-3" />
                  {details.contact.emergencyContact.phone}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Care Team</p>
              <div className="space-y-2">
                {details.contact.careTeam.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg border bg-card">
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
        </SectionCard>

        {/* Compliance */}
        <SectionCard title="Compliance" icon={FileCheck}>
          <div className="space-y-3">
            <ComplianceItem label="Consent on File" verified={details.compliance.consentOnFile} />
            <ComplianceItem label="Photo ID on File" verified={details.compliance.photoIdOnFile} />
            <ComplianceItem label="Insurance Verified" verified={details.compliance.insuranceVerified} />
          </div>
        </SectionCard>
      </div>

      {/* Notes */}
      <SectionCard title="Notes" icon={FileText}>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
            {details.notes}
          </p>
        </div>
      </SectionCard>
    </div>
  )
}

