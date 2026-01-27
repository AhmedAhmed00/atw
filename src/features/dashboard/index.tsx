import {
  FleetOverviewCards,
  HourlyTripVolumeChart,
  WeeklyPerformanceChart,
  MonthlyRevenueTrendChart,
  TopPerformersChart,
  LiveFleetTracking,
  TripStatus,
  VehicleHealth,
  SystemAlerts
} from './components'
import { useAppSelector } from '@/core/store/hooks'
import {
  selectFleetOverviewStats,
  selectHourlyTripData,
  selectWeeklyPerformanceData,
  selectMonthlyRevenueData,
  selectTopPerformers,
  selectFleetVehicles,
  selectTrips,
  selectVehicleHealth,
  selectSystemAlerts,
} from './slices/selectore'

export function DashboardPage() {
  const fleetOverviewStats = useAppSelector(selectFleetOverviewStats)
  const hourlyTripData = useAppSelector(selectHourlyTripData)
  const weeklyPerformanceData = useAppSelector(selectWeeklyPerformanceData)
  const monthlyRevenueData = useAppSelector(selectMonthlyRevenueData)
  const topPerformers = useAppSelector(selectTopPerformers)
  const fleetVehicles = useAppSelector(selectFleetVehicles)
  const trips = useAppSelector(selectTrips)
  const vehicleHealth = useAppSelector(selectVehicleHealth)
  const systemAlerts = useAppSelector(selectSystemAlerts)

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1
          style={{
            fontSize: '38px',
          }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold 
          tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) pb-1 bg-clip-text text-transparent">
          Real-time Operations Dashboard - All Systems Online
        </h1>
        <p
          style={{
            fontSize: '22px',
          }}

          className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
          Real-time monitoring and analytics for your fleet operations.
        </p>
      </div>

      {/* Overview Cards */}
      <FleetOverviewCards stats={fleetOverviewStats} />

      {/* Charts Section - Top Row */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <HourlyTripVolumeChart data={hourlyTripData} />
        <WeeklyPerformanceChart data={weeklyPerformanceData} />
      </div>

      {/* Charts Section - Middle Row */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <MonthlyRevenueTrendChart data={monthlyRevenueData} />
        <TopPerformersChart data={topPerformers} />
      </div>

      {/* Live Fleet Tracking - Full Width */}
      <LiveFleetTracking vehicles={fleetVehicles} />

      {/* Trip Status, Vehicle Health and System Alerts */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
        <TripStatus trips={trips} />
        <VehicleHealth vehicles={vehicleHealth} />
        <SystemAlerts alerts={systemAlerts} />
      </div>
    </div>
  )
}

export default DashboardPage

