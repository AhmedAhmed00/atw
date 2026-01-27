/**
 * SectionCard Component
 * Reusable card component with consistent styling for sections
 */

import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SectionCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  children,
  className,
  headerClassName,
  contentClassName,
}: SectionCardProps) {
  return (
    <Card className={cn("border-t-4 border-t-[#09B0B6]", className)}>
      <CardHeader className={headerClassName}>
        <CardTitle className={cn("text-lg flex items-center gap-2 text-[#05647A] dark:text-[#09B0B6]", Icon && "flex items-center gap-2")}>
          {Icon && <Icon className="w-5 h-5" />}
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-xs md:text-sm">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className={contentClassName}>
        {children}
      </CardContent>
    </Card>
  )
}

