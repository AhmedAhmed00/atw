/**
 * FleetMap Component
 * Leaflet map component for displaying vehicle locations
 */

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon, LatLngBounds } from 'leaflet'
import { Badge } from '@/components/ui/badge'
import { Vehicle } from '../data/mockVehiclesData'
import { memo } from 'react'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in React-Leaflet
delete (Icon.Default.prototype as any)._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface FleetMapProps {
  vehicles: Array<Vehicle & { location: { lat: number; lng: number } }>
  center: [number, number]
  bounds: LatLngBounds | null
  statusColors: Record<string, string>
}

// Create custom icons for different vehicle statuses
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

export const FleetMap = memo(function FleetMap({ vehicles, center, bounds, statusColors }: FleetMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={bounds ? undefined : 13}
      bounds={bounds || undefined}
      boundsOptions={{ padding: [20, 20] }}
      className="w-full h-full z-0 rounded-lg"
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehicles.map((vehicle) => {
        const icon = createCustomIcon(statusColors[vehicle.status] || '#6b7280')
        return (
          <Marker
            key={vehicle.id}
            position={[vehicle.location.lat, vehicle.location.lng]}
            icon={icon}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="font-semibold text-sm mb-1">{vehicle.vehicleId}</div>
                <div className="text-xs text-muted-foreground mb-2">{vehicle.model}</div>
                <Badge variant="outline" className="text-xs mb-2">
                  {vehicle.status}
                </Badge>
                <div className="mt-2 pt-2 border-t text-xs">
                  <div className="text-muted-foreground">
                    Location: {vehicle.baseLocation}
                  </div>
                  <div className="text-muted-foreground">
                    Class: {vehicle.class}
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

