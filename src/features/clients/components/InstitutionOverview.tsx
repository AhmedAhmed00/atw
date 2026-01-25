/**
 * InstitutionOverview Component
 * Comprehensive overview dashboard for institution information
 */

import { 
  Building2, 
  Phone, 
  Mail, 
  Calendar, 
  Hash, 
  MapPin, 
  Globe,
  FileText,
  ClipboardList,
  Users,
  DollarSign,
  CreditCard,
  Shield,
  FileCheck,
  Briefcase
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { InfoItem } from '@/components/shared/InfoItem'
import { SectionCard } from '@/components/shared/SectionCard'
import { ComplianceItem } from '@/components/shared/ComplianceItem'
import { cn } from '@/lib/utils'

interface InstitutionOverviewProps {
  institution: {
    id: string
    name: string
    type: string
    region: string
    trips: number
    balance: number
    status: string
  }
}

interface InstitutionDetails {
  basic: {
    name: string
    type: string
    commercialRegistration: string
    taxNumber: string
    establishmentDate: string
    governorate: string
    city: string
    fullAddress: string
  }
  contact: {
    phone: string
    email: string
    website: string
    fax: string
  }
  management: {
    generalManager: {
      name: string
      phone: string
      email: string
    }
    contactPerson: {
      name: string
      phone: string
      email: string
    }
  }
  contract: {
    contractNumber: string
    startDate: string
    endDate: string
    services: string[]
    status: string
  }
  summary: {
    totalTrips: number
    totalPatients: number
    totalRevenue: number
    outstandingDebt: number
  }
  stats: {
    completedTrips: number
    scheduledTrips: number
    activePatients: number
    totalSpent: number
  }
  compliance: {
    contractOnFile: boolean
    taxCertificateOnFile: boolean
    licenseVerified: boolean
  }
  notes: string
}

// Mock data generator
function generateInstitutionDetails(institution: InstitutionOverviewProps['institution']): InstitutionDetails {
  return {
    basic: {
      name: institution.name,
      type: institution.type,
      commercialRegistration: `CR-${institution.id.padStart(8, '0')}`,
      taxNumber: `TAX-${institution.id.padStart(10, '0')}`,
      establishmentDate: '2015-03-15',
      governorate: institution.region,
      city: institution.region === 'Cairo' ? 'Cairo' : 'Alexandria',
      fullAddress: `123 Medical Street, ${institution.region}, Egypt`,
    },
    contact: {
      phone: '+20 2 1234 5678',
      email: `contact@${institution.name.toLowerCase().replace(/\s+/g, '')}.com`,
      website: `www.${institution.name.toLowerCase().replace(/\s+/g, '')}.com`,
      fax: '+20 2 1234 5679',
    },
    management: {
      generalManager: {
        name: 'Dr. Ahmed Mohamed',
        phone: '+20 100 123 4567',
        email: 'gm@institution.com',
      },
      contactPerson: {
        name: 'Sarah Hassan',
        phone: '+20 100 123 4568',
        email: 'contact@institution.com',
      },
    },
    contract: {
      contractNumber: `CNT-${institution.id.padStart(6, '0')}`,
      startDate: '2023-01-01',
      endDate: '2025-12-31',
      services: ['BLS', 'ALS', 'CCT', 'Wheelchair Van'],
      status: 'Active',
    },
    summary: {
      totalTrips: institution.trips,
      totalPatients: Math.floor(institution.trips * 0.3),
      totalRevenue: Math.abs(institution.balance) + 50000,
      outstandingDebt: Math.max(0, institution.balance),
    },
    stats: {
      completedTrips: Math.floor(institution.trips * 0.85),
      scheduledTrips: Math.floor(institution.trips * 0.15),
      activePatients: Math.floor(institution.trips * 0.25),
      totalSpent: Math.abs(institution.balance) + 50000,
    },
    compliance: {
      contractOnFile: true,
      taxCertificateOnFile: true,
      licenseVerified: true,
    },
    notes: 'Regular communication preferred. Priority scheduling available for emergency cases.',
  }
}

export function InstitutionOverview({ institution }: InstitutionOverviewProps) {
  const details = generateInstitutionDetails(institution)

  // Summary stats cards
  const summaryCards: StatsCardProps[] = [
    {
      title: 'Total Trips',
      value: details.summary.totalTrips.toLocaleString(),
      icon: ClipboardList,
      trend: { value: 12, isPositive: true },
      description: 'All time trips',
    },
    {
      title: 'Total Patients',
      value: details.summary.totalPatients.toLocaleString(),
      icon: Users,
      trend: { value: 8, isPositive: true },
      description: 'Active patients',
    },
    {
      title: 'Total Revenue',
      value: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(details.summary.totalRevenue),
      icon: DollarSign,
      trend: { value: 15, isPositive: true },
      description: 'Lifetime revenue',
    },
    {
      title: 'Outstanding Debt',
      value: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(details.summary.outstandingDebt),
      icon: CreditCard,
      trend: details.summary.outstandingDebt > 0 ? { value: 5, isPositive: false } : undefined,
      description: 'Current balance',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Summary Stats Cards */}
      <StatsCardGrid cards={summaryCards} />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <SectionCard
          title="Basic Information"
          icon={Building2}
        >
          <div className="space-y-4">
            <InfoItem
              icon={Building2}
              label="Institution Name"
              value={details.basic.name}
            />
            <InfoItem
              icon={Briefcase}
              label="Type"
              value={details.basic.type}
            />
            <InfoItem
              icon={Hash}
              label="Commercial Registration"
              value={details.basic.commercialRegistration}
            />
            <InfoItem
              icon={Hash}
              label="Tax Number"
              value={details.basic.taxNumber}
            />
            <InfoItem
              icon={Calendar}
              label="Establishment Date"
              value={new Date(details.basic.establishmentDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            />
            <InfoItem
              icon={MapPin}
              label="Location"
              value={`${details.basic.city}, ${details.basic.governorate}`}
            />
            <InfoItem
              icon={MapPin}
              label="Full Address"
              value={details.basic.fullAddress}
            />
          </div>
        </SectionCard>

        {/* Contact Information */}
        <SectionCard
          title="Contact Information"
          icon={Phone}
        >
          <div className="space-y-4">
            <InfoItem
              icon={Phone}
              label="Phone"
              value={details.contact.phone}
            />
            <InfoItem
              icon={Mail}
              label="Email"
              value={details.contact.email}
            />
            <InfoItem
              icon={Globe}
              label="Website"
              value={details.contact.website}
            />
            <InfoItem
              icon={Phone}
              label="Fax"
              value={details.contact.fax}
            />
          </div>
        </SectionCard>
      </div>

      {/* Management & Contact Info */}
      <SectionCard
        title="Management & Contact Info"
        icon={Users}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" />
              General Manager
            </h4>
            <InfoItem
              icon={Users}
              label="Name"
              value={details.management.generalManager.name}
            />
            <InfoItem
              icon={Phone}
              label="Phone"
              value={details.management.generalManager.phone}
            />
            <InfoItem
              icon={Mail}
              label="Email"
              value={details.management.generalManager.email}
            />
          </div>

          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Contact Person
            </h4>
            <InfoItem
              icon={Users}
              label="Name"
              value={details.management.contactPerson.name}
            />
            <InfoItem
              icon={Phone}
              label="Phone"
              value={details.management.contactPerson.phone}
            />
            <InfoItem
              icon={Mail}
              label="Email"
              value={details.management.contactPerson.email}
            />
          </div>
        </div>
      </SectionCard>

      {/* Contract Information */}
      <SectionCard
        title="Contract Information"
        icon={FileText}
      >
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoItem
              icon={Hash}
              label="Contract Number"
              value={details.contract.contractNumber}
            />
            <InfoItem
              icon={Shield}
              label="Status"
              value={
                <Badge
                  variant={details.contract.status === 'Active' ? 'default' : 'secondary'}
                  className={cn(
                    details.contract.status === 'Active' && 'bg-green-500 hover:bg-green-600'
                  )}
                >
                  {details.contract.status}
                </Badge>
              }
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoItem
              icon={Calendar}
              label="Start Date"
              value={new Date(details.contract.startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            />
            <InfoItem
              icon={Calendar}
              label="End Date"
              value={new Date(details.contract.endDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Services Included
            </label>
            <div className="flex flex-wrap gap-2">
              {details.contract.services.map((service) => (
                <Badge
                  key={service}
                  variant="outline"
                  className="border-[#09B0B6] text-[#05647A] dark:text-[#09B0B6]"
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Quick Stats */}
      <SectionCard
        title="Quick Stats"
        icon={ClipboardList}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-4 h-4 text-[#09B0B6]" />
              <span className="text-sm font-medium text-muted-foreground">Completed Trips</span>
            </div>
            <p className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
              {details.stats.completedTrips}
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#09B0B6]" />
              <span className="text-sm font-medium text-muted-foreground">Scheduled Trips</span>
            </div>
            <p className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
              {details.stats.scheduledTrips}
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-[#09B0B6]" />
              <span className="text-sm font-medium text-muted-foreground">Active Patients</span>
            </div>
            <p className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
              {details.stats.activePatients}
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-[#09B0B6]" />
              <span className="text-sm font-medium text-muted-foreground">Total Spent</span>
            </div>
            <p className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
              }).format(details.stats.totalSpent)}
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Compliance */}
      <SectionCard
        title="Compliance"
        icon={Shield}
      >
        <div className="space-y-3">
          <ComplianceItem
            label="Contract on File"
            verified={details.compliance.contractOnFile}
          />
          <ComplianceItem
            label="Tax Certificate on File"
            verified={details.compliance.taxCertificateOnFile}
          />
          <ComplianceItem
            label="License Verified"
            verified={details.compliance.licenseVerified}
          />
        </div>
      </SectionCard>

      {/* Notes */}
      <SectionCard
        title="Notes"
        icon={FileText}
      >
        <p className="text-sm text-muted-foreground leading-relaxed">
          {details.notes}
        </p>
      </SectionCard>
    </div>
  )
}

