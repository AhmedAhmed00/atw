/**
 * FleetActivityProgress Component
 * Progress bars for fleet activity metrics
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Gauge, Navigation, Wrench } from 'lucide-react'

interface FleetActivity {
  averageSpeed: number
  movingVehicles: number
  maintenanceRate: number
  totalFleet: number
}

interface FleetActivityProgressProps {
  activity: FleetActivity
}

export function FleetActivityProgress({ activity }: FleetActivityProgressProps) {
  // Calculate percentages (assuming max values)
  const maxSpeed = 80 // mph
  const maxMoving = activity.totalFleet
  const speedPercentage = (activity.averageSpeed / maxSpeed) * 100
  const movingPercentage = (activity.movingVehicles / maxMoving) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Fleet Activity</CardTitle>
        <CardDescription>Real-time fleet performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Average Speed */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#09B0B6]" />
              <span className="text-sm font-medium">Average Speed</span>
            </div>
            <span className="text-sm font-semibold text-[#05647A] dark:text-[#09B0B6]">
              {activity.averageSpeed} mph
            </span>
          </div>
          <Progress value={speedPercentage} className="h-2" />
        </div>

        {/* Moving Vehicles */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#09B0B6]" />
              <span className="text-sm font-medium">Moving Vehicles</span>
            </div>
            <span className="text-sm font-semibold text-[#05647A] dark:text-[#09B0B6]">
              {activity.movingVehicles} / {activity.totalFleet}
            </span>
          </div>
          <Progress value={movingPercentage} className="h-2" />
        </div>

        {/* Maintenance Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#09B0B6]" />
              <span className="text-sm font-medium">Maintenance Rate</span>
            </div>
            <span className="text-sm font-semibold text-[#05647A] dark:text-[#09B0B6]">
              {activity.maintenanceRate.toFixed(1)}%
            </span>
          </div>
          <Progress value={activity.maintenanceRate} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

