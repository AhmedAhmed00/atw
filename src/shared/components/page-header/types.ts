import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

export interface PageHeaderProps {
  title: string
  description?: string
  icon?: LucideIcon
  action?: {
    label: string
    icon?: LucideIcon
    onClick: () => void
  }
  children?: ReactNode
}

