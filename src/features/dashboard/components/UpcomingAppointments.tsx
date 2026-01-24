import { Appointment } from '../types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, ChevronRight } from 'lucide-react'

interface UpcomingAppointmentsProps {
  appointments: Appointment[]
}

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-linear-to-r from-[rgb(var(--status-success))] to-[rgb(var(--status-success-dark))] text-white'
      case 'pending':
        return 'bg-linear-to-r from-[rgb(var(--status-warning))] to-[rgb(var(--status-warning-dark))] text-white'
      case 'cancelled':
        return 'bg-linear-to-r from-[rgb(var(--status-danger))] to-[rgb(var(--status-danger-dark))] text-white'
      default:
        return 'bg-linear-to-r from-[var(--brand-gradient-from)] to-[var(--brand-gradient-to)] text-white'
    }
  }

  return (
    <Card className="border-t-4 border-t-[rgb(var(--brand-primary))] dark:border-t-[rgb(var(--brand-primary))]/80">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg md:text-xl text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))]">
              Upcoming Appointments
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Your scheduled appointments for the next few days
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="w-fit hover:bg-[rgb(var(--brand-primary))]/10 hover:text-[rgb(var(--brand-secondary))] 
              dark:hover:bg-[rgb(var(--brand-primary))]/20 dark:hover:text-[rgb(var(--brand-primary))]"
          >
            View All
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50 
                text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))]" />
              <p>No upcoming appointments</p>
            </div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border 
                  bg-linear-to-br from-white to-slate-50 
                  dark:from-slate-900/50 dark:to-slate-800/50
                  dark:border-slate-700
                  hover:shadow-md hover:shadow-[rgb(var(--brand-primary))]/10 
                  dark:hover:shadow-[rgb(var(--brand-primary))]/20
                  hover:border-[rgb(var(--brand-primary))]/30
                  dark:hover:border-[rgb(var(--brand-primary))]/50
                  transition-all duration-300"
              >
                <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full 
                    bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) 
                    flex items-center justify-center text-white font-semibold text-sm
                    shadow-lg shadow-[rgb(var(--brand-primary))]/20">
                    {appointment.patientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-semibold text-sm sm:text-base text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))] truncate">
                        {appointment.patientName}
                      </h4>
                      <Badge className={getStatusColor(appointment.status) + ' text-xs'}>
                        {appointment.status}
                      </Badge>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                      {appointment.service}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-[rgb(var(--brand-secondary))]/60 dark:text-[rgb(var(--brand-primary))]/60" />
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-[rgb(var(--brand-secondary))]/60 dark:text-[rgb(var(--brand-primary))]/60" />
                        {appointment.time}
                      </div>
                      <div className="flex items-center gap-1 truncate">
                        <User className="h-3 w-3 shrink-0 text-[rgb(var(--brand-secondary))]/60 dark:text-[rgb(var(--brand-primary))]/60" />
                        <span className="truncate">{appointment.doctor}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 w-full sm:w-auto text-xs sm:text-sm
                    hover:bg-[rgb(var(--brand-primary))]/10 hover:text-[rgb(var(--brand-secondary))]
                    dark:hover:bg-[rgb(var(--brand-primary))]/20 dark:hover:text-[rgb(var(--brand-primary))]"
                >
                  Details
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

