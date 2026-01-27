import { LucideIcon } from 'lucide-react'

export type ColorVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info'

export interface StatsCardProps {
  title: string
  value: string | number
  icon?: LucideIcon
  colorVariant?: ColorVariant
  trend?: {
    value: number
    label?: string
    isPositive?: boolean
  }
  description?: string
  isLoading?: boolean
}

export interface StatsCardGridProps {
  cards: StatsCardProps[]
  columns?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

