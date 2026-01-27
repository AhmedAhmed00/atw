/**
 * Base Map Component
 * Reusable Leaflet map wrapper
 */

import { MapContainer, TileLayer, MapContainerProps } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ReactNode } from 'react'

// Fix for default marker icons in React-Leaflet
if (typeof window !== 'undefined') {
  delete (Icon.Default.prototype as any)._getIconUrl
  Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  })
}

interface BaseMapProps extends Omit<MapContainerProps, 'children'> {
  children: ReactNode
  className?: string
  showTileLayer?: boolean
  tileLayerUrl?: string
  tileLayerAttribution?: string
}

export function BaseMap({
  children,
  className = 'h-[400px] w-full rounded-lg',
  showTileLayer = true,
  tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileLayerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  ...mapProps
}: BaseMapProps) {
  return (
    <MapContainer
      className={className}
      style={{ height: '100%', width: '100%' }}
      {...mapProps}
    >
      {showTileLayer && (
        <TileLayer
          url={tileLayerUrl}
          attribution={tileLayerAttribution}
        />
      )}
      {children}
    </MapContainer>
  )
}

