import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { MonthlyRevenueTrendChartProps } from '../types'



export function MonthlyRevenueTrendChart({ data }: MonthlyRevenueTrendChartProps) {
  return (
    <Card className="border-t-4 border-t-[#09B0B6]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
          Monthly Revenue Trend
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Revenue growth over the past 8 months
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={300} minHeight={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#09B0B6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#09B0B6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
            <XAxis
              dataKey="month"
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
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#09B0B6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

