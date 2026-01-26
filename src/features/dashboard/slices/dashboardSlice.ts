import { createSlice } from '@reduxjs/toolkit'
import {
    FleetOverviewStats,
    HourlyTripData,
    WeeklyPerformanceData,
    MonthlyRevenueData,
    TopPerformer,
    FleetVehicle,
    Trip,
    VehicleHealth,
    SystemAlert,
} from '../types'
import {
    fleetOverviewStats,
    hourlyTripData,
    weeklyPerformanceData,
    monthlyRevenueData,
    topPerformers,
    fleetVehicles,
    trips,
    vehicleHealth,
    systemAlerts,
} from '../data/mockData'

export interface DashboardState {
    fleetOverviewStats: FleetOverviewStats
    hourlyTripData: HourlyTripData[]
    weeklyPerformanceData: WeeklyPerformanceData[]
    monthlyRevenueData: MonthlyRevenueData[]
    topPerformers: TopPerformer[]
    fleetVehicles: FleetVehicle[]
    trips: Trip[]
    vehicleHealth: VehicleHealth[]
    systemAlerts: SystemAlert[]
}

const initialState: DashboardState = {
    fleetOverviewStats,
    hourlyTripData,
    weeklyPerformanceData,
    monthlyRevenueData,
    topPerformers,
    fleetVehicles,
    trips,
    vehicleHealth,
    systemAlerts,
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
    },
})

export const {

} = dashboardSlice.actions



export default dashboardSlice.reducer

