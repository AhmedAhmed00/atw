import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SystemAlert } from '../types'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, AlertTriangle, Info, CheckCircle2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

interface SystemAlertsProps {
  alerts: SystemAlert[]
  onResolve?: (id: string) => void
}

const alertConfig = {
  error: {
    label: 'Error',
    variant: 'destructive' as const,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    borderColor: 'border-red-200 dark:border-red-900',
    icon: AlertCircle,
  },
  warning: {
    label: 'Warning',
    variant: 'secondary' as const,
    color: 'text-[#63A7D8]',
    bgColor: 'bg-[#63A7D8]/20 dark:bg-[#63A7D8]/30',
    borderColor: 'border-[#63A7D8]/40 dark:border-[#63A7D8]/50',
    icon: AlertTriangle,
  },
  info: {
    label: 'Info',
    variant: 'default' as const,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-200 dark:border-blue-900',
    icon: Info,
  },
  success: {
    label: 'Success',
    variant: 'default' as const,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    borderColor: 'border-green-200 dark:border-green-900',
    icon: CheckCircle2,
  },
}

export function SystemAlerts({ alerts, onResolve }: SystemAlertsProps) {
  const unresolvedAlerts = alerts.filter(alert => !alert.resolved)
  const resolvedAlerts = alerts.filter(alert => alert.resolved)

  return (
    <Card className="border-t-4 border-t-[#09B0B6]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
          System Alerts
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          {unresolvedAlerts.length} active alert{unresolvedAlerts.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Unresolved Alerts */}
          {unresolvedAlerts.length > 0 && (
            <div className="space-y-2">
              {unresolvedAlerts.map((alert) => {
                const config = alertConfig[alert.type]
                const Icon = config.icon

                return (
                  <div
                    key={alert.id}
                    className={cn(
                      'p-4 rounded-lg border',
                      config.bgColor,
                      config.borderColor
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <Icon className={cn('h-5 w-5 mt-0.5', config.color)} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm">{alert.title}</h4>
                            <Badge variant={config.variant} className="text-xs">
                              {config.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {alert.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      {onResolve && (
                        <button
                          onClick={() => onResolve(alert.id)}
                          className="p-1 rounded-md hover:bg-background/50 transition-colors"
                          aria-label="Resolve alert"
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Resolved Alerts */}
          {resolvedAlerts.length > 0 && (
            <div className="space-y-2 mt-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Resolved ({resolvedAlerts.length})
              </h4>
              {resolvedAlerts.map((alert) => {
                const config = alertConfig[alert.type]

                return (
                  <div
                    key={alert.id}
                    className="p-3 rounded-lg border bg-muted/30 opacity-60"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        Resolved
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                )
              })}
            </div>
          )}

          {alerts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-500" />
              <p className="text-sm">No alerts at this time</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

