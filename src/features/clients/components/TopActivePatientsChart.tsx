import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart, Cell } from 'recharts'
import { TopActivePatient } from '../data/mockPatientsData'

interface TopActivePatientsChartProps {
  data: TopActivePatient[]
}

const COLORS = ['#09B0B6', '#05647A', '#266BAC', '#3DCCD0', '#63A7D8']

export function TopActivePatientsChart({ data }: TopActivePatientsChartProps) {
  return (
    <Card className="border-t-4 border-t-[#09B0B6]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
          Top Active Patients
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Top patients by trips completed
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2" style={{ padding: '0px' }}>
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={400} minHeight={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
              <XAxis 
                dataKey="name"
                stroke="#6b7280"
                className="dark:stroke-slate-400"
                style={{ fontSize: '12px' }}
                angle={0}
                textAnchor="middle"
                dy={10}
                height={38}
              />
              <YAxis 
                type="number"
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
                formatter={(value: number | undefined) => value ? value.toLocaleString() : ''}
              />
              <Bar dataKey="trips" radius={[10, 10, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

