export const MAP_HEIGHT = 500

export const LIVE_FLEET_TRACKING_STATUS_COLORS = {
    active: '#22c55e', // green-500
    idle: '#eab308', // yellow-500
    maintenance: '#63A7D8', // blue from healthcare palette
    offline: '#6b7280', // gray-500
} as const

export const LIVE_FLEET_TRACKING_STATUS_LABELS = {
    active: 'Active',
    idle: 'Idle',
    maintenance: 'Maintenance',
    offline: 'Offline',
} as const
