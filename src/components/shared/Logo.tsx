/**
 * Logo Component
 * Reusable "All The Way" logo component for the application
 */

import { useTheme } from '@/components/theme-provider'
import { Ambulance } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'default' | 'sidebar' | 'login' | 'header'
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ variant = 'default', className, showText = true, size = 'md' }: LogoProps) {
  const { theme } = useTheme()
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  // Size configurations
  const sizeConfig = {
    sm: {
      icon: 'w-8 h-8',
      iconSize: 'h-5 w-5',
      badge: 'w-3 h-3',
      badgeBorder: 'border',
      text: 'text-base',
      subtitle: 'text-[9px]',
    },
    md: {
      icon: 'w-10 h-10',
      iconSize: 'h-6 w-6',
      badge: 'w-4 h-4',
      badgeBorder: 'border-2',
      text: 'text-lg',
      subtitle: 'text-[10px]',
    },
    lg: {
      icon: 'w-16 h-16',
      iconSize: 'h-8 w-8',
      badge: 'w-5 h-5',
      badgeBorder: 'border-2',
      text: 'text-2xl',
      subtitle: 'text-xs',
    },
  }

  const config = sizeConfig[size]

  if (variant === 'login') {
    return (
      <div className={cn('flex flex-col items-center gap-3', className)}>
        <div className="relative shrink-0">
          <div className={cn('rounded-xl bg-linear-to-br from-[#09B0B6] to-[#05647A] flex items-center justify-center shadow-lg', config.icon)}>
            <Ambulance className={cn('text-white', config.iconSize)} strokeWidth={2.5} />
          </div>
          <div className={cn('absolute -top-1 -right-1 rounded-full bg-[#FE3533] flex items-center justify-center', config.badge, config.badgeBorder, 'border-white dark:border-slate-900')}>
            <svg width={size === 'lg' ? '10' : size === 'md' ? '8' : '6'} height={size === 'lg' ? '10' : size === 'md' ? '8' : '6'} viewBox="0 0 10 10" fill="none" className="text-white">
              <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        {showText && (
          <div className="flex flex-col items-center">
            <span className={cn('font-bold leading-tight text-[#103454] dark:text-white', config.text)}>
              All The Way
            </span>
            <span className={cn('font-medium uppercase tracking-wider text-[#05647A] dark:text-[#86E2DD]', config.subtitle)}>
              Medical Company
            </span>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'sidebar') {
    return (
      <div className={cn('flex items-center gap-3 px-1.5 pt-4 pb-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2', className)}>
        <div className="relative shrink-0">
          <div className={cn('rounded-lg bg-linear-to-br from-[#09B0B6] to-[#05647A] flex items-center justify-center shadow-lg', config.icon)}>
            <Ambulance className={cn('text-white', config.iconSize)} strokeWidth={2.5} />
          </div>
          <div className={cn('absolute -top-1 -right-1 rounded-full bg-[#FE3533] flex items-center justify-center', config.badge, config.badgeBorder, 'border-white dark:border-[#103454]')}>
            <svg width={size === 'lg' ? '10' : size === 'md' ? '8' : '6'} height={size === 'lg' ? '10' : size === 'md' ? '8' : '6'} viewBox="0 0 8 8" fill="none" className="text-white">
              <path d="M4 1V7M1 4H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        {showText && (
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className={cn('font-bold leading-tight', config.text, isDark ? 'text-white' : 'text-[#103454]')}>
              All The Way
            </span>
            <span className={cn('font-medium uppercase tracking-wider', config.subtitle, isDark ? 'text-[#86E2DD]' : 'text-[#05647A]')}>
              Medical Company
            </span>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'header') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="relative shrink-0">
          <div className={cn('rounded-lg bg-linear-to-br from-[#09B0B6] to-[#05647A] flex items-center justify-center shadow-lg', config.icon)}>
            <Ambulance className={cn('text-white', config.iconSize)} strokeWidth={2.5} />
          </div>
          <div className={cn('absolute -top-1 -right-1 rounded-full bg-[#FE3533] flex items-center justify-center', config.badge, config.badgeBorder, 'border-white dark:border-slate-900')}>
            <svg width={size === 'lg' ? '10' : size === 'md' ? '8' : '6'} height={size === 'lg' ? '10' : size === 'md' ? '8' : '6'} viewBox="0 0 8 8" fill="none" className="text-white">
              <path d="M4 1V7M1 4H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        {showText && (
          <div className="flex flex-col">
            <span className={cn('font-bold leading-tight text-[#103454] dark:text-white', config.text)}>
              All The Way
            </span>
            <span className={cn('font-medium uppercase tracking-wider text-[#05647A] dark:text-[#86E2DD]', config.subtitle)}>
              Medical Company
            </span>
          </div>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative shrink-0">
        <div className={cn('rounded-lg bg-linear-to-br from-[#09B0B6] to-[#05647A] flex items-center justify-center shadow-lg', config.icon)}>
          <Ambulance className={cn('text-white', config.iconSize)} strokeWidth={2.5} />
        </div>
        <div className={cn('absolute -top-1 -right-1 rounded-full bg-[#FE3533] flex items-center justify-center', config.badge, config.badgeBorder, 'border-white dark:border-slate-900')}>
          <svg width={size === 'lg' ? '10' : size === 'md' ? '8' : '6'} height={size === 'lg' ? '10' : size === 'md' ? '8' : '6'} viewBox="0 0 8 8" fill="none" className="text-white">
            <path d="M4 1V7M1 4H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn('font-bold leading-tight text-[#103454] dark:text-white', config.text)}>
            All The Way
          </span>
          <span className={cn('font-medium uppercase tracking-wider text-[#05647A] dark:text-[#86E2DD]', config.subtitle)}>
            Medical Company
          </span>
        </div>
      )}
    </div>
  )
}

