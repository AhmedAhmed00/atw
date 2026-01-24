import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FleetVehicle } from '../types'
import { Badge } from '@/components/ui/badge'
import { Truck, Clock, Loader2 } from '@/lib/icons'
import { useMemo, lazy, Suspense, memo } from 'react'
import { LatLngBounds } from 'leaflet'

// Lazy load the entire map component to reduce initial bundle size
const FleetMap = lazy(() => import('./FleetMap').then(m => ({ default: m.FleetMap })))

interface LiveFleetTrackingProps {
  vehicles: FleetVehicle[]
}

const statusColors = {
  active: '#22c55e', // green-500
  idle: '#eab308', // yellow-500
  maintenance: '#63A7D8', // blue from healthcare palette
  offline: '#6b7280', // gray-500
}

const statusLabels = {
  active: 'Active',
  idle: 'Idle',
  maintenance: 'Maintenance',
  offline: 'Offline',
}

export const LiveFleetTracking = memo(function LiveFleetTracking({ vehicles }: LiveFleetTrackingProps) {
  // Calculate center and bounds from vehicle locations
  const { center, bounds } = useMemo(() => {
    if (vehicles.length === 0) {
      return {
        center: [40.7128, -74.0060] as [number, number],
        bounds: null as LatLngBounds | null,
      }
    }

    const lats = vehicles.map(v => v.location.lat)
    const lngs = vehicles.map(v => v.location.lng)
    
    const centerLat = (Math.max(...lats) + Math.min(...lats)) / 2
    const centerLng = (Math.max(...lngs) + Math.min(...lngs)) / 2
    
    const bounds = new LatLngBounds(
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)]
    )

    return {
      center: [centerLat, centerLng] as [number, number],
      bounds,
    }
  }, [vehicles])

  return (
    <Card className="border-t-4 border-t-[#09B0B6] w-full">
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
          <div className="w-full h-[500px] relative">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
                <div className="text-center space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#09B0B6]" />
                  <p className="text-sm text-muted-foreground">Loading map...</p>
                </div>
              </div>
            }>
              <FleetMap
                vehicles={vehicles}
                center={center}
                bounds={bounds}
                statusColors={statusColors}
                statusLabels={statusLabels}
              />
            </Suspense>
          </div>

          {/* Vehicle List */}
          <div className="px-6 pb-6">
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: statusColors[vehicle.status] }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-sm">{vehicle.vehicleId}</span>
                        <Badge variant="outline" className="text-xs">
                          {statusLabels[vehicle.status]}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {vehicle.driver}
                      </p>
                      {vehicle.currentTrip && (
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            To: {vehicle.currentTrip.destination} • ETA: {vehicle.currentTrip.eta}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})
