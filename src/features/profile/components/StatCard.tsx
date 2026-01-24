import type { LucideIcon } from 'lucide-react'
import type { GradientConfig } from '@/lib/gradients'
import { AnimatedBorder } from './AnimatedBorder'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: number
  gradient: GradientConfig['gradient']
  prefix?: string
}

export function StatCard({ icon: Icon, label, value, gradient, prefix }: StatCardProps) {
  const formattedValue = value.toLocaleString()

  return (
    <div className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-1">
      <AnimatedBorder gradient={gradient} />

      <div className="p-6  grid grid-cols-2 gap-4">
        {/* Header: Icon and Label */}
        <div className="   ">
          <div
            className={`w-14 h-14   rounded-sm bg-linear-to-br ${gradient}
             shadow-lg flex items-center justify-center transform
              group-hover:rotate-6 transition-transform duration-500`}
          >
            <Icon className="w-7 h-7 text-white place-self-center" />
          </div>

        </div>

        {/* Value */}
        <div className="flex flex-col items-end ">
        <div className="flex items-baseline justify-end gap-1">

{prefix && (
  <span className={`text-2xl font-bold bg-linear-to-br ${gradient} bg-clip-text text-transparent`}>
    {prefix}
  </span>
)}
<span className={`text-3xl font-bold bg-linear-to-br ${gradient} bg-clip-text text-transparent`}>
  {formattedValue}
</span>
</div>
          <div className="flex-1  flex items-center justify-end">
            <p className="text-md  font-semibold text-muted-foreground   ">
              {label}
            </p>
          </div>
      


        </div>



      </div>
    </div>
  )
}

