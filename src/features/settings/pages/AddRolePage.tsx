/**
 * AddRolePage Component
 * Full-page route for adding/editing roles
 */

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save } from 'lucide-react'
import { FormCheckbox } from '@/features/clients/components/forms/FormCheckbox'
import { Separator } from '@/components/ui/separator'

// Permission sections and their permissions
const PERMISSION_SECTIONS = {
  General: [
    'View Dashboard',
    'View Settings',
    'Manage Settings',
  ],
  HR: [
    'View Employees',
    'Add Employees',
    'Edit Employees',
    'Delete Employees',
    'View Shifts',
    'Edit Shifts',
    'View Attendance',
    'Edit Attendance',
    'View Tasks',
    'Edit Tasks',
  ],
  Fleet: [
    'View Vehicles',
    'Add Vehicles',
    'Edit Vehicles',
    'Delete Vehicles',
    'View Vehicle Maintenance',
    'Edit Vehicle Maintenance',
  ],
  Operations: [
    'View Trips',
    'Add Trips',
    'Edit Trips',
    'Delete Trips',
    'View Trip Reports',
    'Edit Trip Reports',
  ],
  Administration: [
    'View Institutions',
    'Add Institutions',
    'Edit Institutions',
    'Delete Institutions',
    'View Patients',
    'Add Patients',
    'Edit Patients',
    'Delete Patients',
    'View Invoices',
    'Add Invoices',
    'Edit Invoices',
    'Delete Invoices',
  ],
  Reports: [
    'View Reports',
    'Export Reports',
    'View Analytics',
    'View Financial Reports',
  ],
}

interface Role {
  id: string
  name: string
  permissions: string[]
}

// Mock data - in real app, this would come from API/state
const mockRoles: Role[] = [
  {
    id: 'r1',
    name: 'Administrator',
    permissions: ['All Permissions'],
  },
  {
    id: 'r2',
    name: 'Dispatcher',
    permissions: ['View Trips', 'Edit Trips', 'View Reports', 'View Fleet'],
  },
]

export function AddRolePage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: '',
    permissions: [] as string[],
  })

  const [isLoading, setIsLoading] = useState(false)

  // Load existing data if editing
  useEffect(() => {
    if (isEditing && id) {
      // In real app, fetch from API
      const existingRole = mockRoles.find((r) => r.id === id)
      if (existingRole) {
        setFormData({
          name: existingRole.name,
          permissions: existingRole.permissions,
        })
      }
    }
  }, [id, isEditing])

  const handlePermissionToggle = (permission: string) => {
    setFormData((prev) => {
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission]
      return { ...prev, permissions: newPermissions }
    })
  }

  const handleSelectAllInSection = (section: string) => {
    const sectionPermissions = PERMISSION_SECTIONS[section as keyof typeof PERMISSION_SECTIONS]
    const allSelected = sectionPermissions.every((perm) => formData.permissions.includes(perm))

    setFormData((prev) => {
      if (allSelected) {
        // Deselect all in section
        return {
          ...prev,
          permissions: prev.permissions.filter((p) => !sectionPermissions.includes(p)),
        }
      } else {
        // Select all in section
        const newPermissions = [...prev.permissions]
        sectionPermissions.forEach((perm) => {
          if (!newPermissions.includes(perm)) {
            newPermissions.push(perm)
          }
        })
        return { ...prev, permissions: newPermissions }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name?.trim()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In real app, save to API
    console.log('Saving role:', formData)

    setIsLoading(false)
    navigate('/settings/roles', { state: { tab: 'users-roles' } })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title={isEditing ? 'Edit Role' : 'Add Role'}
          description={isEditing ? 'Update role details and permissions' : 'Create a new role with permissions'}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/settings/roles', { state: { tab: 'users-roles' } })}
          className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Role Information</CardTitle>
            <CardDescription>
              Enter the role name and configure permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Name */}
            <div className="space-y-2">
              <Label htmlFor="roleName">
                Role Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="roleName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Supervisor, Manager"
                required
              />
            </div>

            <Separator />

            {/* Permissions Configuration */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">Permissions Configuration</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Select the permissions this role should have access to
                </p>
              </div>

              {Object.entries(PERMISSION_SECTIONS).map(([section, permissions]) => {
                const sectionPermissions = permissions
                const allSelected = sectionPermissions.every((perm) =>
                  formData.permissions.includes(perm)
                )
                const someSelected = sectionPermissions.some((perm) =>
                  formData.permissions.includes(perm)
                )

                return (
                  <Card key={section} className="border-l-4 border-l-[#09B0B6]">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{section}</CardTitle>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleSelectAllInSection(section)}
                          className="text-xs"
                        >
                          {allSelected ? 'Deselect All' : 'Select All'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {permissions.map((permission) => (
                          <FormCheckbox
                            key={permission}
                            id={`perm-${section}-${permission}`}
                            label={permission}
                            checked={formData.permissions.includes(permission)}
                            onCheckedChange={() => handlePermissionToggle(permission)}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Selected Permissions Summary */}
            {formData.permissions.length > 0 && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">
                  Selected Permissions ({formData.permissions.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.permissions.map((perm) => (
                    <span
                      key={perm}
                      className="text-xs px-2 py-1 bg-background rounded border"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/settings/roles', { state: { tab: 'users-roles' } })}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formData.name?.trim() || isLoading}
                className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
              >
                <Save className="h-4 w-4" />
                {isLoading ? 'Saving...' : isEditing ? 'Update Role' : 'Add Role'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default AddRolePage

