import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon, LatLngBounds } from 'leaflet'
import { Badge } from '@/components/ui/badge'
import { FleetVehicle } from '../types'
import { memo } from 'react'

interface FleetMapProps {
  vehicles: FleetVehicle[]
  center: [number, number]
  bounds: LatLngBounds | null
  statusColors: Record<string, string>
  statusLabels: Record<string, string>
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

export const FleetMap = memo(function FleetMap({ vehicles, center, bounds, statusColors, statusLabels }: FleetMapProps) {
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
        const icon = createCustomIcon(statusColors[vehicle.status])
        return (
          <Marker
            key={vehicle.id}
            position={[vehicle.location.lat, vehicle.location.lng]}
            icon={icon}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="font-semibold text-sm mb-1">{vehicle.vehicleId}</div>
                <div className="text-xs text-muted-foreground mb-2">{vehicle.driver}</div>
                <Badge variant="outline" className="text-xs mb-2">
                  {statusLabels[vehicle.status]}
                </Badge>
                {vehicle.currentTrip && (
                  <div className="mt-2 pt-2 border-t text-xs">
                    <div className="font-medium">Current Trip:</div>
                    <div className="text-muted-foreground">
                      To: {vehicle.currentTrip.destination}
                    </div>
                    <div className="text-muted-foreground">
                      ETA: {vehicle.currentTrip.eta}
                    </div>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
})

