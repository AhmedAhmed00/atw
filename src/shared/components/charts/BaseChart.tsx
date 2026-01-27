/**
 * Base Chart Component
 * Reusable wrapper for chart components
 */

import { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ResponsiveContainer } from 'recharts'

interface BaseChartProps {
  title: string
  description?: string
  isLoading?: boolean
  error?: string | null
  children: ReactNode
  className?: string
  headerAction?: ReactNode
}

export function BaseChart({
  title,
  description,
  isLoading = false,
  error,
  children,
  className,
  headerAction,
}: BaseChartProps) {
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          {description && <Skeleton className="h-4 w-64 mt-2" />}
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {headerAction}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {children}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

