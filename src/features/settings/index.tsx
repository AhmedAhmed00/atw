/**
 * Settings Page
 * Main settings module for system configuration
 */

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building2, ShieldCheck, ImageIcon, Bell, Settings as SettingsIcon } from 'lucide-react'
import { HCPDataSection, PasswordSection, LogoSection, NotificationsSection } from './components'
import { mockHCPData, mockNotificationPreferences } from './data/mockSettings'
import type { HCPData, NotificationPreferences } from './types'

export function SettingsPage() {
  const [hcpData, setHCPData] = useState<HCPData>(mockHCPData)
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(
    mockNotificationPreferences
  )

  const handleHCPDataSave = (data: Partial<HCPData>) => {
    setHCPData((prev) => ({ ...prev, ...data }))
    console.log('HCP Data saved:', data)
  }

  const handlePasswordSave = (data: { currentPassword: string; newPassword: string }) => {
    console.log('Password updated:', data)
  }

  const handleLogoUpload = (file: File) => {
    // In a real app, upload to server and get URL
    const url = URL.createObjectURL(file)
    setHCPData((prev) => ({ ...prev, logo: url }))
    console.log('Logo uploaded:', file.name)
  }

  const handleLogoRemove = () => {
    setHCPData((prev) => ({ ...prev, logo: undefined }))
    console.log('Logo removed')
  }

  const handleNotificationsSave = (preferences: NotificationPreferences) => {
    setNotificationPreferences(preferences)
    console.log('Notification preferences saved:', preferences)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent flex items-center gap-3">
          <SettingsIcon className="h-8 w-8 text-[rgb(var(--brand-primary))]" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Customize system preferences and control operational configurations
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="hcp-data" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 lg:w-auto">
          <TabsTrigger value="hcp-data" className="gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">HCP Data</span>
            <span className="sm:hidden">HCP</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
            <span className="sm:hidden">Security</span>
          </TabsTrigger>
          <TabsTrigger value="branding" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Branding</span>
            <span className="sm:hidden">Logo</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
            <span className="sm:hidden">Alerts</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hcp-data" className="space-y-6">
          <HCPDataSection data={hcpData} onSave={handleHCPDataSave} />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <PasswordSection onSave={handlePasswordSave} />
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <LogoSection
            currentLogo={hcpData.logo}
            onUpload={handleLogoUpload}
            onRemove={handleLogoRemove}
          />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationsSection
            preferences={notificationPreferences}
            onSave={handleNotificationsSave}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsPage

