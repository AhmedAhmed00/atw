import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const appointmentsData = [
  { day: 'Mon', confirmed: 32, pending: 8, cancelled: 3 },
  { day: 'Tue', confirmed: 28, pending: 12, cancelled: 2 },
  { day: 'Wed', confirmed: 35, pending: 6, cancelled: 4 },
  { day: 'Thu', confirmed: 40, pending: 10, cancelled: 1 },
  { day: 'Fri', confirmed: 38, pending: 9, cancelled: 5 },
  { day: 'Sat', confirmed: 25, pending: 5, cancelled: 2 },
  { day: 'Sun', confirmed: 18, pending: 3, cancelled: 1 },
]

export function AppointmentsChart() {
  return (
    <Card className="border-t-4 border-t-[#05647A]">
      <CardHeader>
        <CardTitle className="text-[#05647A] dark:text-[#09B0B6]">Weekly Appointments</CardTitle>
        <CardDescription>Appointment status by day of the week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={appointmentsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
            <XAxis 
              dataKey="day" 
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
              cursor={{ fill: 'rgba(59, 193, 207, 0.1)' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar dataKey="confirmed" fill="#09B0B6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="pending" fill="#05647A" radius={[8, 8, 0, 0]} />
            <Bar dataKey="cancelled" fill="#94a3b8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

