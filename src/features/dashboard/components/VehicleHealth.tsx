import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { VehicleHealth as VehicleHealthType } from '../types'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle2, AlertCircle, Wrench, Gauge, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VehicleHealthProps {
  vehicles: VehicleHealthType[]
}

const statusConfig = {
  excellent: {
    label: 'Excellent',
    variant: 'default' as const,
    color: 'text-green-500',
    bgColor: 'bg-green-500',
    icon: CheckCircle2,
  },
  good: {
    label: 'Good',
    variant: 'default' as const,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
    icon: CheckCircle2,
  },
  warning: {
    label: 'Warning',
    variant: 'secondary' as const,
    color: 'text-[#63A7D8]',
    bgColor: 'bg-[#63A7D8]',
    icon: AlertTriangle,
  },
  critical: {
    label: 'Critical',
    variant: 'destructive' as const,
    color: 'text-red-500',
    bgColor: 'bg-red-500',
    icon: AlertCircle,
  },
}

export function VehicleHealth({ vehicles }: VehicleHealthProps) {
  return (
    <Card className="border-t-4 border-t-[#09B0B6]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
          Vehicle Health
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Health status and maintenance information for all vehicles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {vehicles.map((vehicle) => {
            const config = statusConfig[vehicle.status]
            const Icon = config.icon

            return (
              <div
                key={vehicle.id}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={cn('h-4 w-4', config.color)} />
                    <span className="font-semibold text-sm">{vehicle.vehicleId}</span>
                    <Badge variant={config.variant} className="text-xs">
                      {config.label}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Mileage</p>
                        <p className="font-medium">{vehicle.mileage.toLocaleString()} mi</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Last Service</p>
                        <p className="font-medium">{new Date(vehicle.lastMaintenance).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Next Service:</span>
                      <span className={cn(
                        'text-xs font-medium',
                        vehicle.status === 'critical' ? 'text-red-500' : 
                        vehicle.status === 'warning' ? 'text-[#63A7D8]' : 
                        'text-green-500'
                      )}>
                        {new Date(vehicle.nextService).toLocaleDateString()}
                      </span>
                    </div>

                    {vehicle.issues.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Issues:</p>
                        {vehicle.issues.map((issue, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-xs p-2 rounded bg-[#63A7D8]/20 dark:bg-[#63A7D8]/30 border border-[#63A7D8]/40 dark:border-[#63A7D8]/50"
                          >
                            <AlertTriangle className="h-3 w-3 text-[#63A7D8]" />
                            <span className="text-[#266BAC] dark:text-[#AADCF7]">{issue}</span>
                          </div>
                        ))}
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


