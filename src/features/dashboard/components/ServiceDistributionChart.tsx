import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const servicesData = [
  { name: 'General Consultation', value: 145, color: '#09B0B6' },
  { name: 'Cardiology', value: 98, color: '#05647A' },
  { name: 'Dental Care', value: 87, color: '#60a5fa' },
  { name: 'Laboratory Tests', value: 124, color: '#38bdf8' },
  { name: 'Radiology', value: 65, color: '#0ea5e9' },
]

export function ServiceDistributionChart() {
  return (
    <Card className="border-t-4 border-t-[#09B0B6]">
      <CardHeader>
        <CardTitle className="text-[#05647A] dark:text-[#09B0B6]">Service Distribution</CardTitle>
        <CardDescription>Appointments by service type</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={servicesData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(props: any) => {
                const { name, percent } = props
                return name ? `${name}: ${(percent * 100).toFixed(0)}%` : ''
              }}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {servicesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

