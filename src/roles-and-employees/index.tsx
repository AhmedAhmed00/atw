/**
 * Settings Page
 * Main settings module for system configuration
 */

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building2, Globe, Clock, Car, Award, Users, Settings as SettingsIcon } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { CompanyInfoTab } from './components/CompanyInfoTab'
import { RegionalTab } from './components/RegionalTab'
import { WorkSettingsTab } from './components/WorkSettingsTab'
import { VehicleTypesTab } from './components/VehicleTypesTab'
import { CertificationsTab } from './components/CertificationsTab'
import { UsersRolesTab } from './components/UsersRolesTab'

export function SettingsPage() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('company-info')

  useEffect(() => {
    const tabFromState = (location.state as { tab?: string })?.tab
    if (tabFromState) {
      setActiveTab(tabFromState)
    }
  }, [location.state])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="System configuration and preferences"
        icon={SettingsIcon}
      />

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full justify-start h-auto p-1 bg-transparent rounded-xl flex-wrap gap-2">
          <TabsTrigger 
            value="company-info" 
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <Building2 className="h-4 w-4" />
            Company Info
          </TabsTrigger>
          <TabsTrigger 
            value="regional" 
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <Globe className="h-4 w-4" />
            Regional
          </TabsTrigger>
          <TabsTrigger 
            value="work-settings" 
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <Clock className="h-4 w-4" />
            Work Settings
          </TabsTrigger>
          <TabsTrigger 
            value="vehicle-types" 
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <Car className="h-4 w-4" />
            Vehicle Types
          </TabsTrigger>
          <TabsTrigger 
            value="certifications" 
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <Award className="h-4 w-4" />
            Certifications
          </TabsTrigger>
          <TabsTrigger 
            value="users-roles" 
            className="gap-2 relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <Users className="h-4 w-4" />
            Users & Roles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company-info" className="space-y-6">
          <CompanyInfoTab />
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <RegionalTab />
        </TabsContent>

        <TabsContent value="work-settings" className="space-y-6">
          <WorkSettingsTab />
        </TabsContent>

        <TabsContent value="vehicle-types" className="space-y-6">
          <VehicleTypesTab />
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <CertificationsTab />
        </TabsContent>

        <TabsContent value="users-roles" className="space-y-6">
          <UsersRolesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsPage

