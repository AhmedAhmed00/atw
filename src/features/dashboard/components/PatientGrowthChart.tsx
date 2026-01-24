import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const patientData = [
  { month: 'Jan', new: 28, returning: 95 },
  { month: 'Feb', new: 35, returning: 110 },
  { month: 'Mar', new: 32, returning: 98 },
  { month: 'Apr', new: 42, returning: 123 },
  { month: 'May', new: 38, returning: 110 },
  { month: 'Jun', new: 48, returning: 130 },
  { month: 'Jul', new: 52, returning: 143 },
  { month: 'Aug', new: 45, returning: 137 },
]

export function PatientGrowthChart() {
  return (
    <Card className="border-t-4 border-t-[#05647A]">
      <CardHeader>
        <CardTitle className="text-[#05647A] dark:text-[#09B0B6]">Patient Growth</CardTitle>
        <CardDescription>New vs returning patients over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={patientData}>
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
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
              iconType="circle"
            />
            <Line 
              type="monotone" 
              dataKey="new" 
              stroke="#09B0B6" 
              strokeWidth={3}
              dot={{ fill: '#09B0B6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="returning" 
              stroke="#05647A" 
              strokeWidth={3}
              dot={{ fill: '#05647A', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

