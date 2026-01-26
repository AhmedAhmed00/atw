import { LatLngBounds } from "leaflet"
import { FleetVehicle } from "../types"

const DEFAULT_CENTER: [number, number] = [40.7128, -74.0060] // New York City
export const VEHICLE_LIST_MAX_HEIGHT = 300


export function calculateMapBounds(vehicles: FleetVehicle[]): {
    center: [number, number]
    bounds: LatLngBounds | null
} {
    if (vehicles.length === 0) {
        return {
            center: DEFAULT_CENTER,
            bounds: null,
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
        center: [centerLat, centerLng],
        bounds,
    }
}