import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, User, Stethoscope, Mail, Phone, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getStatusConfig } from '../constants/appointment-status'
import { AppointmentCardProps } from '../types'

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const statusConfig = getStatusConfig(appointment.status)
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/appointments/details/${appointment.id}`)
  }

  return (
    <Card className="relative overflow-hidden bg-brand/20 transition-all duration-300 hover:shadow-lg cursor-pointer group" onClick={handleViewDetails}>
      {/* Status indicator bar */}
      <div className={`absolute top-0 left-0 w-1 h-full ${statusConfig.bgColor}`} />

      <div className="p-6 pl-8">
        <div className="flex items-start justify-between gap-4">
          {/* Patient Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <User className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
                  {appointment.patientName}
                </h3>
                <div className="mt-1 space-y-1">
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    {appointment.patientEmail}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" />
                    {appointment.patientPhone}
                  </p>
                </div>
              </div>

              <Badge
                className={`${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} border-2 font-semibold`}
              >
                {statusConfig.icon} {statusConfig.label}
              </Badge>
            </div>

            {/* Appointment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="p-2 rounded-lg bg-[rgb(var(--brand-primary))]/10">
                  <Calendar className="w-4 h-4 text-[rgb(var(--brand-primary))]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Date</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {new Date(appointment.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="p-2 rounded-lg bg-[rgb(var(--brand-primary))]/10">
                  <Clock className="w-4 h-4 text-[rgb(var(--brand-primary))]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Time</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {appointment.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="p-2 rounded-lg bg-[rgb(var(--brand-primary))]/10">
                  <Stethoscope className="w-4 h-4 text-[rgb(var(--brand-primary))]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Service</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {appointment.service}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="p-2 rounded-lg bg-[rgb(var(--brand-primary))]/10">
                  <User className="w-4 h-4 text-[rgb(var(--brand-primary))]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Doctor</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {appointment.doctor}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {appointment.notes && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Notes</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">{appointment.notes}</p>
              </div>
            )}

            {/* View Details Button */}
            <div className="pt-3 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleViewDetails()
                }}
                className="text-[rgb(var(--brand-primary))] hover:text-[rgb(var(--brand-secondary))] hover:bg-[rgb(var(--brand-primary))]/10 group-hover:bg-[rgb(var(--brand-primary))]/10"
              >
                View Details
                <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

