/**
 * NotificationPopover Component
 * Displays notifications in a popover dropdown
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Bell,
  ShoppingCart,
  MessageSquare,
  Calendar,
  CreditCard,
  Settings,
  Check,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Notification, NotificationType } from './types'
import { mockNotifications } from './mockNotifications'

const TYPE_CONFIG: Record<NotificationType, { icon: React.ElementType; color: string; bgColor: string }> = {
  order: {
    icon: ShoppingCart,
    color: 'text-[rgb(var(--brand-primary))]',
    bgColor: 'bg-[rgb(var(--brand-primary))]/10',
  },
  message: {
    icon: MessageSquare,
    color: 'text-[rgb(var(--brand-secondary))]',
    bgColor: 'bg-[rgb(var(--brand-secondary))]/10',
  },
  appointment: {
    icon: Calendar,
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-100 dark:bg-violet-900/30',
  },
  payment: {
    icon: CreditCard,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  system: {
    icon: Settings,
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-100 dark:bg-slate-800',
  },
}

function formatTimeAgo(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

interface NotificationItemProps {
  notification: Notification
  onClick: (notification: Notification) => void
}

function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const config = TYPE_CONFIG[notification.type]
  const Icon = config.icon

  return (
    <button
      onClick={() => onClick(notification)}
      className={cn(
        'w-full text-left p-3 rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50',
        !notification.isRead && 'bg-[rgb(var(--brand-primary))]/5'
      )}
    >
      <div className="flex gap-3">
        <div className={cn('p-2 rounded-lg shrink-0 self-start flex items-center justify-center', config.bgColor)}>
          <Icon className={cn('h-4 w-4 shrink-0', config.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={cn(
              'font-medium text-sm truncate',
              !notification.isRead && 'text-slate-900 dark:text-slate-100'
            )}>
              {notification.title}
            </p>
            {!notification.isRead && (
              <span className="w-2 h-2 rounded-full bg-[rgb(var(--brand-primary))] shrink-0 mt-1.5" />
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
            {notification.message}
          </p>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(notification.timestamp)}
            </span>
            {notification.link && (
              <span className="text-xs text-[rgb(var(--brand-primary))] flex items-center">
                View <ChevronRight className="h-3 w-3" />
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

export function NotificationPopover() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const handleNotificationClick = (notification: Notification) => {
    handleMarkAsRead(notification.id)
    setOpen(false)
    if (notification.link) {
      navigate(notification.link)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-[rgb(var(--brand-primary))] text-white text-xs font-medium flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[380px] p-0"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="font-semibold text-lg">Notifications</h3>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-[rgb(var(--brand-primary))] hover:text-[rgb(var(--brand-primary))] hover:bg-[rgb(var(--brand-primary))]/10"
            >
              <Check className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-3">
                <Bell className="h-8 w-8 text-slate-400" />
              </div>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                No notifications
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                You're all caught up!
              </p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {/* Unread Section */}
              {unreadCount > 0 && (
                <>
                  <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    New
                  </p>
                  {notifications
                    .filter((n) => !n.isRead)
                    .map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onClick={handleNotificationClick}
                      />
                    ))}
                  <Separator className="my-2" />
                </>
              )}

              {/* Read Section */}
              {notifications.some((n) => n.isRead) && (
                <>
                  <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Earlier
                  </p>
                  {notifications
                    .filter((n) => n.isRead)
                    .map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onClick={handleNotificationClick}
                      />
                    ))}
                </>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-2">
          <Button
            variant="ghost"
            className="w-full text-[rgb(var(--brand-primary))] hover:text-[rgb(var(--brand-primary))] hover:bg-[rgb(var(--brand-primary))]/10"
            onClick={() => {
              setOpen(false)
              navigate('/settings')
            }}
          >
            Notification Settings
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

