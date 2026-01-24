/**
 * Communication Timeline Component
 * Displays the communication log as a vertical timeline
 */

import { cn } from '@/lib/utils'
import { MessageSquare, Bot, User, Stethoscope, Shield, Users } from 'lucide-react'
import type { CommunicationLog, UserType } from '../types'

const ROLE_CONFIG: Record<UserType | 'system', { icon: React.ElementType; color: string; bgColor: string }> = {
  patient: {
    icon: User,
    color: 'text-[rgb(var(--brand-primary))]',
    bgColor: 'bg-[rgb(var(--brand-primary))]/10',
  },
  doctor: {
    icon: Stethoscope,
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-100 dark:bg-violet-900/30',
  },
  admin: {
    icon: Shield,
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-100 dark:bg-rose-900/30',
  },
  staff: {
    icon: Users,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  system: {
    icon: Bot,
    color: 'text-slate-500 dark:text-slate-400',
    bgColor: 'bg-slate-100 dark:bg-slate-800',
  },
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

interface TimelineItemProps {
  log: CommunicationLog
  isLast: boolean
}

function TimelineItem({ log, isLast }: TimelineItemProps) {
  const config = ROLE_CONFIG[log.senderRole]
  const Icon = config.icon

  return (
    <div className="flex gap-4">
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <div className={cn('p-2 rounded-full', config.bgColor)}>
          <Icon className={cn('h-4 w-4', config.color)} />
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-700 my-2" />
        )}
      </div>

      {/* Content */}
      <div className={cn('flex-1 pb-6', isLast && 'pb-0')}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {log.senderName}
            </span>
            {log.isInternal && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium">
                Internal Note
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatDate(log.date)}
          </span>
        </div>
        <div
          className={cn(
            'p-4 rounded-lg',
            log.senderRole === 'system'
              ? 'bg-slate-50 dark:bg-slate-800/50 italic text-sm text-slate-600 dark:text-slate-400'
              : log.isInternal
              ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
              : 'bg-slate-50 dark:bg-slate-800/50'
          )}
        >
          <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
            {log.message}
          </p>
        </div>
      </div>
    </div>
  )
}

interface CommunicationTimelineProps {
  logs: CommunicationLog[]
}

export function CommunicationTimeline({ logs }: CommunicationTimelineProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
        <MessageSquare className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
        <p className="text-slate-500 dark:text-slate-400">
          No communication history yet
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {logs.map((log, index) => (
        <TimelineItem key={log.id} log={log} isLast={index === logs.length - 1} />
      ))}
    </div>
  )
}

