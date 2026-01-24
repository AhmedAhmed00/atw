import { Appointment } from '../types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Calendar, Clock } from 'lucide-react'

interface ConfirmedAppointmentsProps {
  appointments: Appointment[]
}

export function ConfirmedAppointments({ appointments }: ConfirmedAppointmentsProps) {
  return (
    <Card className="border-t-4 border-t-[#05647A] dark:border-t-[#09B0B6]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-linear-to-br from-[#05647A] to-[#09B0B6] 
            shadow-lg shadow-[#09B0B6]/20 dark:shadow-[#09B0B6]/30">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-[#05647A] dark:text-[#09B0B6]">
              Confirmed Appointments
            </CardTitle>
            <CardDescription>
              {appointments.length} confirmed appointments ready
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {appointments.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <CheckCircle2 className="h-10 w-10 mx-auto mb-2 opacity-50 
                text-[#05647A] dark:text-[#09B0B6]" />
              <p className="text-sm">No confirmed appointments</p>
            </div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 rounded-lg 
                  bg-linear-to-r from-[#09B0B6]/10 to-[#05647A]/10 
                  dark:from-[#09B0B6]/5 dark:to-[#05647A]/5
                  border border-[#09B0B6]/20 
                  dark:border-[#09B0B6]/20
                  hover:border-[#09B0B6]/40 
                  dark:hover:border-[#09B0B6]/30
                  hover:shadow-md hover:shadow-[#09B0B6]/10
                  dark:hover:shadow-[#09B0B6]/20
                  transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full 
                    bg-linear-to-br from-[#05647A] to-[#09B0B6] 
                    flex items-center justify-center text-white text-sm font-semibold
                    shadow-lg shadow-[#09B0B6]/20 dark:shadow-[#09B0B6]/30">
                    {appointment.patientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-[#05647A]/80 dark:text-[#09B0B6]">
                      {appointment.patientName}
                    </p>
                    <p className="text-xs text-[#05647A] dark:text-[#09B0B6]">
                      {appointment.service}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-[#05647A] dark:text-[#09B0B6] mb-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(appointment.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#05647A]/80 dark:text-[#09B0B6]/80">
                    <Clock className="h-3 w-3" />
                    {appointment.time}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

