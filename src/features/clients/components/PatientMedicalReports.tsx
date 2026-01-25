/**
 * PatientMedicalReports Component
 * Displays post-trip medical reports with healthcare-grade UI
 */

import { 
  FileText, 
  Activity,
  Heart,
  Wind,
  Thermometer,
  Gauge,
  Droplet,
  AlertCircle,
  MapPin,
  CheckCircle2,
  ClipboardList,
  Pill,
  Stethoscope,
  FileCheck,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { SectionCard } from '@/components/shared/SectionCard'
import { InfoItem } from '@/components/shared/InfoItem'
import { generateMedicalReports, calculateReportStats, type MedicalReport } from '../data/mockMedicalReportsData'
import { cn } from '@/lib/utils'

interface PatientMedicalReportsProps {
  patientId: string
}

interface VitalCardProps {
  vital: {
    label: string
    value: string | number
    unit: string
    isAbnormal?: boolean
  }
  icon: typeof Activity
}

function VitalCard({ vital, icon: Icon }: VitalCardProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border-2 bg-card transition-all',
        vital.isAbnormal
          ? 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20'
          : 'border-slate-200 dark:border-slate-700 hover:border-[#09B0B6]/50 hover:shadow-sm'
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'p-2 rounded-md',
              vital.isAbnormal
                ? 'bg-red-100 dark:bg-red-900/30'
                : 'bg-[#09B0B6]/10 dark:bg-[#09B0B6]/20'
            )}
          >
            <Icon
              className={cn(
                'w-4 h-4',
                vital.isAbnormal
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-[#09B0B6]'
              )}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {vital.label}
          </span>
        </div>
        {vital.isAbnormal && (
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={cn(
            'text-2xl font-bold',
            vital.isAbnormal
              ? 'text-red-700 dark:text-red-400'
              : 'text-slate-900 dark:text-slate-100'
          )}
        >
          {vital.value}
        </span>
        <span className="text-sm text-muted-foreground ml-1">{vital.unit}</span>
      </div>
    </div>
  )
}

function MedicalReportCard({ report }: { report: MedicalReport }) {
  const reportDate = new Date(report.date)

  return (
    <Card className="border-t-4 border-t-[#09B0B6] hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#09B0B6]" />
              <CardTitle className="text-lg text-[#05647A] dark:text-[#09B0B6]">
                {report.tripName}
              </CardTitle>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5" />
                {report.tripId}
              </span>
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                {report.doctorName}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {reportDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="text-xs text-muted-foreground">
              {reportDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Vitals Section */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#09B0B6]" />
            Vital Signs
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <VitalCard vital={report.vitals.bloodPressure} icon={Gauge} />
            <VitalCard vital={report.vitals.heartRate} icon={Heart} />
            <VitalCard vital={report.vitals.oxygenLevel} icon={Wind} />
            <VitalCard vital={report.vitals.temperature} icon={Thermometer} />
            <VitalCard vital={report.vitals.respiratoryRate} icon={Activity} />
            <VitalCard vital={report.vitals.glucose} icon={Droplet} />
            <VitalCard vital={report.vitals.painLevel} icon={AlertCircle} />
          </div>
        </div>

        <Separator />

        {/* Medications & Procedures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Medications */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#09B0B6]" />
              Medications Administered
            </h3>
            <ul className="space-y-2">
              {report.medications.map((med, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-md bg-slate-50 dark:bg-slate-800/50"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#09B0B6] shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-medium">{med.name}</span>
                    <span className="text-muted-foreground ml-1">{med.dosage}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Procedures */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#09B0B6]" />
              Procedures Performed
            </h3>
            <ul className="space-y-2">
              {report.procedures.map((procedure, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-md bg-slate-50 dark:bg-slate-800/50"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#09B0B6] shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {procedure}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        {/* Trip Outcome */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#09B0B6]" />
            Trip Outcome
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InfoItem
              icon={MapPin}
              label="Destination"
              value={report.tripOutcome.destination}
            />
            <InfoItem
              icon={CheckCircle2}
              label="Arrival Condition"
              value={report.tripOutcome.arrivalCondition}
            />
            {report.tripOutcome.incidents && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Incidents</span>
                </div>
                <Badge
                  variant="outline"
                  className="border-yellow-300 bg-yellow-50 text-yellow-700 dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                >
                  {report.tripOutcome.incidents}
                </Badge>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Paramedic Notes */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-[#09B0B6]" />
            Paramedic Notes
          </h3>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {report.paramedicNotes}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PatientMedicalReports({ patientId }: PatientMedicalReportsProps) {
  const reports = generateMedicalReports(patientId, 8)
  const stats = calculateReportStats(reports)

  const summaryCards: StatsCardProps[] = [
    {
      title: 'Total Reports',
      value: stats.totalReports.toString(),
      icon: FileText,
      colorVariant: 'primary',
    },
    {
      title: 'Avg O₂ Level',
      value: `${stats.avgO2Level}%`,
      icon: Wind,
      colorVariant: 'info',
    },
    {
      title: 'Avg Heart Rate',
      value: `${stats.avgHeartRate} bpm`,
      icon: Heart,
      colorVariant: 'success',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <StatsCardGrid 
        cards={summaryCards} 
        columns={{ default: 1, sm: 2, lg: 3 }} 
      />

      {/* Reports List */}
      <div className="space-y-4">
        {reports.length === 0 ? (
          <SectionCard title="Medical Reports" icon={FileText}>
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No Medical Reports</p>
              <p className="text-sm mt-2">No medical reports available for this patient</p>
            </div>
          </SectionCard>
        ) : (
          reports.map((report) => (
            <MedicalReportCard key={report.id} report={report} />
          ))
        )}
      </div>
    </div>
  )
}

