/**
 * UsersRolesTab Component
 * Users & Roles Management
 */

import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Users, ArrowRight } from 'lucide-react'

export function UsersRolesTab() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
          Users & Roles
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage system users, roles, and permissions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* System Roles Card */}
        <Card className="border-t-4 border-t-[#09B0B6] hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#09B0B6]/10">
                <Shield className="w-6 h-6 text-[#09B0B6]" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl text-[#05647A] dark:text-[#09B0B6]">
                  System Roles
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  Manage roles and permissions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Create and manage system roles, configure permissions, and assign access levels 
              to control what users can do within the system.
            </p>
            <Button
              onClick={() => navigate('/settings/roles')}
              className="w-full gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              Manage Roles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* System Users Card */}
        <Card className="border-t-4 border-t-[#05647A] hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#05647A]/10">
                <Users className="w-6 h-6 text-[#05647A]" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl text-[#05647A] dark:text-[#09B0B6]">
                  System Users
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  Manage user accounts
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              View, create, and manage user accounts. Assign roles, set permissions, 
              and control access to system features.
            </p>
            <Button
              onClick={() => navigate('/settings/users')}
              className="w-full gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              Manage Users
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
