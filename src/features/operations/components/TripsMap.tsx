/**
 * TripsMap Component
 * Leaflet map component for displaying trip locations
 */

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon, LatLngBounds } from 'leaflet'
import { Badge } from '@/components/ui/badge'
import { Trip } from '../data/mockTripsData'
import { memo } from 'react'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in React-Leaflet
delete (Icon.Default.prototype as any)._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface TripsMapProps {
  trips: Array<Trip & { location: { lat: number; lng: number } }>
  center: [number, number]
  bounds: LatLngBounds | null
  statusColors: Record<string, string>
}

// Create custom icons for different trip statuses
const createCustomIcon = (color: string) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="${color}" stroke="white" stroke-width="3"/>
        <circle cx="16" cy="16" r="6" fill="white"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

export const TripsMap = memo(function TripsMap({ trips, center, bounds, statusColors }: TripsMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={bounds ? undefined : 10}
      bounds={bounds || undefined}
      boundsOptions={{ padding: [20, 20] }}
      className="w-full h-full z-0 rounded-lg"
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {trips.map((trip) => {
        const color = statusColors[trip.status] || '#6b7280'
        return (
          <Marker
            key={trip.id}
            position={[trip.location.lat, trip.location.lng]}
            icon={createCustomIcon(color)}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="font-semibold text-sm mb-1">{trip.tripId}</div>
                <div className="text-xs text-muted-foreground mb-2">{trip.patient}</div>
                <Badge variant="outline" className="text-xs mb-2">
                  {trip.status}
                </Badge>
                <div className="mt-2 pt-2 border-t text-xs">
                  <div className="text-muted-foreground">
                    From: {trip.pickupLocation}
                  </div>
                  <div className="text-muted-foreground">
                    To: {trip.dropoffLocation}
                  </div>
                  <div className="text-muted-foreground">
                    Service: {trip.service}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
})

