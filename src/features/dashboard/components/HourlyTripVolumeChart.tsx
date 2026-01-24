import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart } from 'recharts'
import { HourlyTripData } from '../types'

interface HourlyTripVolumeChartProps {
  data: HourlyTripData[]
}

export function HourlyTripVolumeChart({ data }: HourlyTripVolumeChartProps) {
  return (
    <Card className="border-t-4 border-t-[#09B0B6]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
          Hourly Trip Volume (24h)
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Trip distribution over the last 24 hours
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={300} minHeight={250}>
          <BarChart data={data}>
            <defs>
              <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#09B0B6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#05647A" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
            <XAxis 
              dataKey="hour" 
              stroke="#6b7280"
              className="dark:stroke-slate-400"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              className="dark:stroke-slate-400"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              labelStyle={{ color: '#05647A', fontWeight: 600 }}
            />
            <Bar 
              dataKey="trips" 
              fill="url(#colorTrips)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

