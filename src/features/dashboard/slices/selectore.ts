import { DashboardState } from "./dashboardSlice"

// Selectors
export const selectFleetOverviewStats = (state: { dashboard: DashboardState }) =>
    state.dashboard.fleetOverviewStats

export const selectHourlyTripData = (state: { dashboard: DashboardState }) =>
    state.dashboard.hourlyTripData

export const selectWeeklyPerformanceData = (state: { dashboard: DashboardState }) =>
    state.dashboard.weeklyPerformanceData

export const selectMonthlyRevenueData = (state: { dashboard: DashboardState }) =>
    state.dashboard.monthlyRevenueData

export const selectTopPerformers = (state: { dashboard: DashboardState }) =>
    state.dashboard.topPerformers

export const selectFleetVehicles = (state: { dashboard: DashboardState }) =>
    state.dashboard.fleetVehicles

export const selectTrips = (state: { dashboard: DashboardState }) => state.dashboard.trips

export const selectVehicleHealth = (state: { dashboard: DashboardState }) =>
    state.dashboard.vehicleHealth

export const selectSystemAlerts = (state: { dashboard: DashboardState }) =>
    state.dashboard.systemAlerts