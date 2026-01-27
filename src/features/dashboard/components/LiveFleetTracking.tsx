import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LiveFleetTrackingProps, VehicleListItemProps } from '../types'
import { Badge } from '@/components/ui/badge'
import { Truck, Clock } from '@/lib/icons'
import { useMemo, lazy, Suspense, memo } from 'react'
import MapLoader from '@/components/shared/maps/MapLoader'
import { VehicleList } from './VehicleList'
import { LIVE_FLEET_TRACKING_STATUS_COLORS, LIVE_FLEET_TRACKING_STATUS_LABELS, MAP_HEIGHT } from '../constants'
import { calculateMapBounds } from '../utlies'
const FleetMap = lazy(() => import('./FleetMap').then(m => ({ default: m.FleetMap })))



export const VehicleListItem = memo(function VehicleListItem({ vehicle }: VehicleListItemProps) {
  const statusColor = LIVE_FLEET_TRACKING_STATUS_COLORS[vehicle.status]
  const statusLabel = LIVE_FLEET_TRACKING_STATUS_LABELS[vehicle.status]

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: statusColor }}
          aria-label={`Status: ${statusLabel}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Truck className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="font-semibold text-sm">{vehicle.vehicleId}</span>
            <Badge variant="outline" className="text-xs">
              {statusLabel}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {vehicle.driver}
          </p>
          {vehicle.currentTrip && (
            <div className="flex items-center gap-2 mt-1">
              <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground">
                To: {vehicle.currentTrip.destination} • ETA: {vehicle.currentTrip.eta}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})



// Main component
export const LiveFleetTracking = memo(function LiveFleetTracking({ vehicles }: LiveFleetTrackingProps) {
  const { center, bounds } = useMemo(() => calculateMapBounds(vehicles), [vehicles])

  return (
    // <Card className="border-t-4 border-t-[#09B0B6] w-full">
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
          Live Fleet Tracking
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Real-time location and status of all vehicles
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-4">
          {/* Map - Full Width - Lazy Loaded */}
          <div className="w-full relative" style={{ height: `${MAP_HEIGHT}px` }}>
            <Suspense fallback={<MapLoader />}>
              <FleetMap
                vehicles={vehicles}
                center={center}
                bounds={bounds}
                statusColors={LIVE_FLEET_TRACKING_STATUS_COLORS}
                statusLabels={LIVE_FLEET_TRACKING_STATUS_LABELS}
              />
            </Suspense>
          </div>

          {/* Vehicle List */}
          <VehicleList vehicles={vehicles} />
        </div>
      </CardContent>
    </Card>
  )
})
