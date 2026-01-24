import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart, Cell } from 'recharts'
import { TopPerformer } from '../types'

interface TopPerformersChartProps {
  data: TopPerformer[]
}

const COLORS = ['#09B0B6', '#05647A', '#266BAC', '#3DCCD0', '#63A7D8', '#86E2DD', '#AADCF7']

export function TopPerformersChart({ data }: TopPerformersChartProps) {
  return (
    <Card className="border-t-4 border-t-[#09B0B6]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
          Top Performers
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Top drivers by trips and revenue
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 ">
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={300} minHeight={250}>
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
              <XAxis 
                type="number"
                stroke="#6b7280"
                className="dark:stroke-slate-400"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                dataKey="name" 
                type="category"
                stroke="#6b7280"
                className="dark:stroke-slate-400"
                style={{ fontSize: '12px' }}
                width={100}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                labelStyle={{ color: '#05647A', fontWeight: 600 }}
                formatter={(value: number | undefined) => value ? value.toLocaleString() : ''}
              />
              <Bar dataKey="trips" radius={[0, 8, 8, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {data.map((performer, index) => (
              <div
                key={performer.id}
                className="p-3 rounded-lg border bg-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{performer.name}</span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs">{performer.rating}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Trips: {performer.trips}</div>
                  <div>Revenue: ${performer.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </CardContent>
    </Card>
  )
}

