import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { GRADIENTS } from '@/lib/gradients'
import { StatsCardProps, ColorVariant } from './types'
import { cn } from '@/lib/utils'

const colorConfig: Record<ColorVariant, {
  gradient: string
  bgGradient: string
  iconBg: string
  iconColor: string
  border: string
  shadow: string
  text: string
}> = {
  primary: {
    gradient: GRADIENTS.primary.gradient,
    bgGradient: GRADIENTS.primary.bgGradient,
    iconBg: `bg-linear-to-br ${GRADIENTS.primary.gradient}`,
    iconColor: 'text-white',
    border: 'border-l-[rgb(var(--brand-primary))]',
    shadow: 'hover:shadow-[rgb(var(--brand-primary))]/20',
    text: GRADIENTS.primary.gradient,
  },
  secondary: {
    gradient: GRADIENTS.secondary.gradient,
    bgGradient: GRADIENTS.secondary.bgGradient,
    iconBg: `bg-linear-to-br ${GRADIENTS.secondary.gradient}`,
    iconColor: 'text-white',
    border: 'border-l-[rgb(var(--brand-secondary))]',
    shadow: 'hover:shadow-[rgb(var(--brand-secondary))]/20',
    text: GRADIENTS.secondary.gradient,
  },
  success: {
    gradient: GRADIENTS.success.gradient,
    bgGradient: GRADIENTS.success.bgGradient,
    iconBg: `bg-linear-to-br ${GRADIENTS.success.gradient}`,
    iconColor: 'text-white',
    border: 'border-l-emerald-500',
    shadow: 'hover:shadow-emerald-500/20',
    text: GRADIENTS.success.gradient,
  },
  warning: {
    gradient: GRADIENTS.warning.gradient,
    bgGradient: GRADIENTS.warning.bgGradient,
    iconBg: `bg-linear-to-br ${GRADIENTS.warning.gradient}`,
    iconColor: 'text-white',
    border: 'border-l-[#63A7D8]',
    shadow: 'hover:shadow-[#63A7D8]/20',
    text: GRADIENTS.warning.gradient,
  },
  danger: {
    gradient: GRADIENTS.danger.gradient,
    bgGradient: GRADIENTS.danger.bgGradient,
    iconBg: `bg-linear-to-br ${GRADIENTS.danger.gradient}`,
    iconColor: 'text-white',
    border: 'border-l-red-500',
    shadow: 'hover:shadow-red-500/20',
    text: GRADIENTS.danger.gradient,
  },
  info: {
    gradient: GRADIENTS.info.gradient,
    bgGradient: GRADIENTS.info.bgGradient,
    iconBg: `bg-linear-to-br ${GRADIENTS.info.gradient}`,
    iconColor: 'text-white',
    border: 'border-l-blue-500',
    shadow: 'hover:shadow-blue-500/20',
    text: GRADIENTS.info.gradient,
  },
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  colorVariant = 'primary',
  trend,
  description,
  isLoading = false,
}: StatsCardProps) {
  const colors = colorConfig[colorVariant]

  if (isLoading) {
    return (
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-3 w-32" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        'relative overflow-hidden border-l-3 transition-all duration-300 ',
        'hover:shadow-lg ',
        colors.border,
        colors.shadow
      )}
    >
      {/* Gradient Background */}
      <div
        className={cn(
          'absolute inset-0 bg-linear-to-br',
          colors.bgGradient
        )}
      />

      <CardHeader className="relative p-3 py-4 flex flex-row justify-between items-center space-y-0 pb-0">
        <div className="space-y-1">
          <p className="text-[17px] font-medium text-muted-foreground">{title}</p>
        </div>
        {Icon && (
          <div
            className={cn(
              'p-2.5 rounded-sm flex items-center justify-center',
              colors.iconBg
            )}
          >
            <Icon className={cn('h-5 w-5', colors.iconColor)} />
          </div>
        )}
      </CardHeader>

      <CardContent className="relative">
        <div className="space-y-2">
          <div
            className={cn(
              'text-4xl font-bold bg-linear-to-r bg-clip-text text-transparent',
              colors.text
            )}
          >
            {value}
          </div>

          {(trend || description) && (
            <div className="flex items-center gap-2 text-[13px]">
              {trend && (
                <div
                  className={cn(
                    'flex items-center gap-1 font-medium',
                    trend.isPositive !== false
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  )}
                >
                  {trend.isPositive !== false ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>
                    {trend.value > 0 ? '+' : ''}
                    {trend.value}%
                  </span>
                  {trend.label && (
                    <span className="text-muted-foreground ml-1">
                      {trend.label}
                    </span>
                  )}
                </div>
              )}
              {description && !trend && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

