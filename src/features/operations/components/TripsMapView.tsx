/**
 * TripsMapView Component
 * Map view showing trip locations
 */

import { useMemo, lazy, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Route, Loader2 } from 'lucide-react'
import { LatLngBounds } from 'leaflet'
import { Trip } from '../data/mockTripsData'

// Lazy load the map component
const TripsMap = lazy(() => import('./TripsMap').then(m => ({ default: m.TripsMap })))

interface TripsMapViewProps {
  trips: Trip[]
}

const statusColors: Record<string, string> = {
  Completed: '#22c55e', // green-500
  'En Route': '#3b82f6', // blue-500
  Pending: '#eab308', // yellow-500
  Delayed: '#ef4444', // red-500
}

export function TripsMapView({ trips }: TripsMapViewProps) {
  // Calculate center and bounds from trip locations
  const { center, bounds } = useMemo(() => {
    const tripsWithLocations = trips.filter(t => t.location)

    if (tripsWithLocations.length === 0) {
      return {
        center: [30.0444, 31.2357] as [number, number], // Cairo default
        bounds: null as LatLngBounds | null,
      }
    }

    const lats = tripsWithLocations.map(t => t.location!.lat)
    const lngs = tripsWithLocations.map(t => t.location!.lng)
    
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
  }, [trips])

  const tripsWithLocations = trips.filter(t => t.location)

  return (
    <Card className="border-t-4 border-t-[#09B0B6] w-full">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
          Trips on Map
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Real-time location of all active trips
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
              <TripsMap
                trips={tripsWithLocations}
                center={center}
                bounds={bounds}
                statusColors={statusColors}
              />
            </Suspense>
          </div>

          {/* Trip List */}
          <div className="px-6 pb-6">
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {tripsWithLocations.map((trip) => (
                <div
                  key={trip.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: statusColors[trip.status] || '#6b7280' }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Route className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-sm">{trip.tripId}</span>
                        <Badge variant="outline" className="text-xs">
                          {trip.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {trip.patient} • {trip.service}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {trip.pickupLocation} → {trip.dropoffLocation}
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

