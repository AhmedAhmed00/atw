import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trip } from '../types'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, CheckCircle2, XCircle, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TripStatusProps {
  trips: Trip[]
}

const statusConfig = {
  scheduled: {
    label: 'Scheduled',
    variant: 'secondary' as const,
    icon: Calendar,
  },
  'in-progress': {
    label: 'In Progress',
    variant: 'default' as const,
    icon: MapPin,
  },
  completed: {
    label: 'Completed',
    variant: 'default' as const,
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'destructive' as const,
    icon: XCircle,
  },
}

export function TripStatus({ trips }: TripStatusProps) {
  return (
    <Card className="border-t-4 border-t-[#09B0B6]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
          Trip Status
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Current and recent trip information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {trips.map((trip) => {
            const config = statusConfig[trip.status]
            const Icon = config.icon

            return (
              <div
                key={trip.id}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={cn('h-4 w-4', trip.status === 'completed' ? 'text-green-500' : trip.status === 'cancelled' ? 'text-red-500' : 'text-blue-500')} />
                    <span className="font-semibold text-sm">Trip #{trip.id.split('-')[1]}</span>
                    <Badge variant={config.variant} className="text-xs">
                      {config.label}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{trip.vehicleId}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Patient:</span>
                    <span className="text-muted-foreground">{trip.patient}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Driver:</span>
                    <span className="text-muted-foreground">{trip.driver}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">From</p>
                        <p className="text-sm">{trip.origin}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">To</p>
                        <p className="text-sm">{trip.destination}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Scheduled: {trip.scheduledTime}
                      </span>
                    </div>
                    {trip.estimatedArrival && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-blue-500" />
                        <span className="text-xs text-blue-600 dark:text-blue-400">
                          ETA: {trip.estimatedArrival}
                        </span>
                      </div>
                    )}
                    {trip.actualArrival && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-600 dark:text-green-400">
                          Arrived: {trip.actualArrival}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

