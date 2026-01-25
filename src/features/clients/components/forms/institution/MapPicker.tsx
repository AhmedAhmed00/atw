/**
 * MapPicker Component
 * Interactive map for selecting location coordinates
 */

import * as React from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { LatLng } from 'leaflet'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon in React Leaflet
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

interface MapPickerProps {
  latitude?: number
  longitude?: number
  onLocationChange: (lat: number, lng: number) => void
  address?: string
}

function LocationMarker({ onLocationChange }: { onLocationChange: (lat: number, lng: number) => void }) {
  const [position, setPosition] = React.useState<LatLng | null>(null)

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      setPosition(e.latlng)
      onLocationChange(lat, lng)
    },
  })

  return position === null ? null : <Marker position={position} />
}

export function MapPicker({ latitude, longitude, onLocationChange, address }: MapPickerProps) {
  const [mapCenter, setMapCenter] = React.useState<[number, number]>(
    latitude && longitude ? [latitude, longitude] : [30.0444, 31.2357] // Default to Cairo
  )

  React.useEffect(() => {
    if (latitude && longitude) {
      setMapCenter([latitude, longitude])
    }
  }, [latitude, longitude])

  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lat = parseFloat(e.target.value)
    if (!isNaN(lat) && lat >= -90 && lat <= 90) {
      setMapCenter([lat, mapCenter[1]])
      onLocationChange(lat, mapCenter[1])
    }
  }

  const handleLngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lng = parseFloat(e.target.value)
    if (!isNaN(lng) && lng >= -180 && lng <= 180) {
      setMapCenter([mapCenter[0], lng])
      onLocationChange(mapCenter[0], lng)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Location Selection
        </CardTitle>
        <CardDescription>
          Click on the map or enter coordinates to set the institution location
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[400px] w-full rounded-lg overflow-hidden border">
          <MapContainer
            center={mapCenter}
            zoom={latitude && longitude ? 15 : 10}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker onLocationChange={onLocationChange} />
            {latitude && longitude && (
              <Marker position={[latitude, longitude]} />
            )}
          </MapContainer>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              value={latitude?.toFixed(6) || ''}
              onChange={handleLatChange}
              placeholder="30.0444"
              min={-90}
              max={90}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              value={longitude?.toFixed(6) || ''}
              onChange={handleLngChange}
              placeholder="31.2357"
              min={-180}
              max={180}
            />
          </div>
        </div>

        {address && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">
              <strong>Address:</strong> {address}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

