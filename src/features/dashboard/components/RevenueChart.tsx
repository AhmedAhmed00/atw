import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 45000, appointments: 120 },
  { month: 'Feb', revenue: 52000, appointments: 145 },
  { month: 'Mar', revenue: 48000, appointments: 130 },
  { month: 'Apr', revenue: 61000, appointments: 165 },
  { month: 'May', revenue: 55000, appointments: 148 },
  { month: 'Jun', revenue: 67000, appointments: 178 },
  { month: 'Jul', revenue: 72000, appointments: 195 },
  { month: 'Aug', revenue: 68000, appointments: 182 },
]

export function RevenueChart() {
  return (
    <Card className="border-t-4 border-t-[#09B0B6]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">Revenue Overview</CardTitle>
        <CardDescription className="text-xs md:text-sm">Monthly revenue and appointment trends</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={250} minHeight={200}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#09B0B6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#09B0B6" stopOpacity={0}/>
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

