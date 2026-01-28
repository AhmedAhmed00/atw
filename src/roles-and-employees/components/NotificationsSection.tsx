/**
 * Notifications Section Component
 * Manages notification preferences
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Bell, ShoppingCart, CreditCard, Mail, Save, Loader2, CheckCircle2 } from 'lucide-react'
import type { NotificationPreferences } from '../types'

interface NotificationsSectionProps {
  preferences: NotificationPreferences
  onSave: (preferences: NotificationPreferences) => void
}

interface NotificationOption {
  id: keyof NotificationPreferences
  label: string
  description: string
  icon: React.ReactNode
}

const notificationOptions: NotificationOption[] = [
  {
    id: 'newOrderNotification',
    label: 'New Order Notifications',
    description: 'Receive notifications when a new order is placed',
    icon: <ShoppingCart className="h-5 w-5 text-[rgb(var(--brand-primary))]" />,
  },
  {
    id: 'paymentConfirmationNotification',
    label: 'Payment Confirmation Notifications',
    description: 'Receive notifications when a payment is confirmed',
    icon: <CreditCard className="h-5 w-5 text-[rgb(var(--brand-secondary))]" />,
  },
  {
    id: 'dailySummaryEmail',
    label: 'Daily Summary Email',
    description: 'Receive a daily summary of activities via email',
    icon: <Mail className="h-5 w-5 text-[rgb(var(--status-warning))]" />,
  },
]

export function NotificationsSection({ preferences, onSave }: NotificationsSectionProps) {
  const [localPreferences, setLocalPreferences] = useState<NotificationPreferences>(preferences)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleToggle = (id: keyof NotificationPreferences) => {
    setLocalPreferences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setShowSuccess(false)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    onSave(localPreferences)
    setIsSaving(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const hasChanges = JSON.stringify(localPreferences) !== JSON.stringify(preferences)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Bell className="h-5 w-5 text-[rgb(var(--brand-primary))]" />
          Notifications & Preferences
        </CardTitle>
        <CardDescription>
          Configure how you receive notifications and alerts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {showSuccess && (
          <Alert className="border-green-500 bg-green-50 dark:bg-green-950/30">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Notification preferences saved successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {notificationOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                  {option.icon}
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor={option.id}
                    className="text-base font-medium cursor-pointer"
                  >
                    {option.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
              <Switch
                id={option.id}
                checked={localPreferences[option.id]}
                onCheckedChange={() => handleToggle(option.id)}
                className="data-[state=checked]:bg-[rgb(var(--brand-primary))]"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

