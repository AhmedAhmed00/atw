/**
 * LiveFleetTracking Component
 * Map view showing real-time vehicle locations
 */

import { useMemo, lazy, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Car, Clock, Loader2 } from 'lucide-react'
import { LatLngBounds } from 'leaflet'
import { Vehicle } from '../data/mockVehiclesData'

// Lazy load the map component
const FleetMap = lazy(() => import('./FleetMap').then(m => ({ default: m.FleetMap })))

interface LiveFleetTrackingProps {
  vehicles: Vehicle[]
}

const statusColors: Record<string, string> = {
  Active: '#22c55e', // green-500
  'On the Move': '#3b82f6', // blue-500
  Maintenance: '#eab308', // yellow-500
  Inactive: '#6b7280', // gray-500
}

// Mock location data for vehicles - in real app, this would come from GPS tracking
const mockLocations: Record<string, { lat: number; lng: number }> = {
  v1: { lat: 30.0444, lng: 31.2357 }, // Cairo
  v2: { lat: 30.0444, lng: 31.2357 }, // Cairo
  v3: { lat: 31.2001, lng: 29.9187 }, // Alexandria
  v4: { lat: 30.0444, lng: 31.2357 }, // Cairo
  v5: { lat: 31.0409, lng: 31.3785 }, // Mansoura
  v6: { lat: 30.0444, lng: 31.2357 }, // Cairo
  v7: { lat: 31.2001, lng: 29.9187 }, // Alexandria
  v8: { lat: 30.0444, lng: 31.2357 }, // Cairo
  v9: { lat: 30.0444, lng: 31.2357 }, // Cairo
  v10: { lat: 31.2001, lng: 29.9187 }, // Alexandria
}

export function LiveFleetTracking({ vehicles }: LiveFleetTrackingProps) {
  // Calculate center and bounds from vehicle locations
  const { center, bounds } = useMemo(() => {
    const vehiclesWithLocations = vehicles
      .map(v => ({
        ...v,
        location: mockLocations[v.id] || { lat: 30.0444, lng: 31.2357 },
      }))
      .filter(v => v.location)

    if (vehiclesWithLocations.length === 0) {
      return {
        center: [30.0444, 31.2357] as [number, number], // Cairo default
        bounds: null as LatLngBounds | null,
      }
    }

    const lats = vehiclesWithLocations.map(v => v.location.lat)
    const lngs = vehiclesWithLocations.map(v => v.location.lng)
    
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

  const vehiclesWithLocations = vehicles.map(v => ({
    ...v,
    location: mockLocations[v.id] || { lat: 30.0444, lng: 31.2357 },
  }))

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
                vehicles={vehiclesWithLocations}
                center={center}
                bounds={bounds}
                statusColors={statusColors}
              />
            </Suspense>
          </div>

          {/* Vehicle List */}
          <div className="px-6 pb-6">
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {vehiclesWithLocations.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: statusColors[vehicle.status] || '#6b7280' }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-sm">{vehicle.vehicleId}</span>
                        <Badge variant="outline" className="text-xs">
                          {vehicle.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {vehicle.model} • {vehicle.baseLocation}
                      </p>
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
}

