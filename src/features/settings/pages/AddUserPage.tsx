/**
 * AddUserPage Component
 * Full-page route for adding/editing users
 */

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { FormCheckbox } from '@/features/clients/components/forms/FormCheckbox'
import { cn } from '@/lib/utils'

// Permission sections (same as in AddRolePage)
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

// Mock roles data - in real app, this would come from API
const mockRoles = [
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
  {
    id: 'r3',
    name: 'Driver',
    permissions: ['View Own Trips', 'Update Trip Status'],
  },
  {
    id: 'r4',
    name: 'Supervisor',
    permissions: ['View Reports', 'Edit Shifts', 'View Employees', 'View Fleet'],
  },
  {
    id: 'r5',
    name: 'Paramedic',
    permissions: ['View Own Trips', 'Update Trip Status', 'View Medical Reports'],
  },
]

interface User {
  id: string
  name: string
  email: string
  phone?: string
  password?: string
  status: 'Active' | 'Inactive'
  role: string
  permissions: string[]
}

// Mock users - in real app, this would come from API
const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+20 100 123 4567',
    status: 'Active',
    role: 'Administrator',
    permissions: ['All Permissions'],
  },
]

export function AddUserPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const isEditing = !!id

  const [formData, setFormData] = useState<{
    name: string
    email: string
    phone: string
    password: string
    status: 'Active' | 'Inactive'
    role: string
    permissions: string[]
  }>({
    name: '',
    email: '',
    phone: '',
    password: '',
    status: 'Active',
    role: '',
    permissions: [],
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [roleId, setRoleId] = useState<string>('')

  // Get permissions for selected role
  const selectedRole = mockRoles.find((r) => r.id === roleId)
  const rolePermissions = selectedRole?.permissions || []

  // Load existing data if editing
  useEffect(() => {
    if (isEditing && id) {
      // In real app, fetch from API
      const existingUser = mockUsers.find((u) => u.id === id)
      if (existingUser) {
        // Find the role ID from the role name
        const userRole = mockRoles.find((r) => r.name === existingUser.role)
        setRoleId(userRole?.id || '')
        setFormData({
          name: existingUser.name,
          email: existingUser.email,
          phone: existingUser.phone || '',
          password: '', // Don't load password
          status: existingUser.status as 'Active' | 'Inactive',
          role: existingUser.role,
          permissions: existingUser.permissions,
        })
      }
    }
  }, [id, isEditing])

  // Update permissions when role changes
  useEffect(() => {
    if (roleId && selectedRole) {
      if (selectedRole.permissions[0] === 'All Permissions') {
        // For Administrator role, select all permissions
        const allPermissions = Object.values(PERMISSION_SECTIONS).flat()
        setFormData((prev) => ({
          ...prev,
          role: selectedRole.name,
          permissions: allPermissions,
        }))
      } else {
        // For other roles, use role's permissions
        setFormData((prev) => ({
          ...prev,
          role: selectedRole.name,
          permissions: [...selectedRole.permissions],
        }))
      }
    } else if (!roleId) {
      // Clear permissions when no role is selected
      setFormData((prev) => ({
        ...prev,
        role: '',
        permissions: [],
      }))
    }
  }, [roleId, selectedRole])

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

    if (!formData.name?.trim() || !formData.email?.trim() || !formData.role) {
      return
    }

    if (!isEditing && !formData.password?.trim()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In real app, save to API
    console.log('Saving user:', { ...formData, password: '***' })

    setIsLoading(false)
    navigate('/settings/users', { state: { tab: 'users-roles' } })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title={isEditing ? 'Edit User' : 'Create New User'}
          description={isEditing ? 'Update user details and permissions' : 'Add a new user to the system'}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/settings/users', { state: { tab: 'users-roles' } })}
          className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic user account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="userName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="userName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  required
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="userEmail">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@example.com"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="userPhone">Phone Number</Label>
                <Input
                  id="userPhone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+20 XXX XXX XXXX"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="userPassword">
                  Password {!isEditing && <span className="text-red-500">*</span>}
                </Label>
                <div className="relative">
                  <Input
                    id="userPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={isEditing ? 'Leave blank to keep current password' : 'Enter password'}
                    required={!isEditing}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="userStatus">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as 'Active' | 'Inactive' })}
                >
                  <SelectTrigger id="userStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Role & Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Role & Permissions</CardTitle>
              <CardDescription>Assign role and configure permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Assign Role */}
              <div className="space-y-2">
                <Label htmlFor="userRole">
                  Assign Role <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={roleId}
                  onValueChange={(value) => {
                    setRoleId(value)
                  }}
                >
                  <SelectTrigger id="userRole">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRoles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedRole && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedRole.permissions[0] === 'All Permissions'
                      ? 'This role includes all permissions'
                      : `${selectedRole.permissions.length} permission${selectedRole.permissions.length !== 1 ? 's' : ''} included with this role`}
                  </p>
                )}
              </div>

              {/* Permissions Included with Role */}
              {formData.role && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-semibold">Permissions Included with Role</Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Permissions from <span className="font-medium text-[#05647A]">{formData.role}</span> role are pre-selected. You can modify them below.
                      </p>
                      {rolePermissions.length > 0 && rolePermissions[0] !== 'All Permissions' && (
                        <div className="mt-2 p-2 bg-[#09B0B6]/10 border border-[#09B0B6]/20 rounded-md">
                          <p className="text-xs font-medium text-[#05647A] mb-1">Role Permissions:</p>
                          <div className="flex flex-wrap gap-1">
                            {rolePermissions.map((perm) => (
                              <span
                                key={perm}
                                className="text-xs px-2 py-0.5 bg-[#09B0B6]/20 text-[#05647A] rounded border border-[#09B0B6]/30"
                              >
                                {perm}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {Object.entries(PERMISSION_SECTIONS).map(([section, permissions]) => {
                      const sectionPermissions = permissions
                      const allSelected = sectionPermissions.every((perm) =>
                        formData.permissions.includes(perm)
                      )

                      return (
                        <Card key={section} className="border-l-4 border-l-[#09B0B6]">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{section}</CardTitle>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleSelectAllInSection(section)}
                                className="text-xs h-7"
                              >
                                {allSelected ? 'Deselect All' : 'Select All'}
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                              {permissions.map((permission) => {
                                const isRolePermission = rolePermissions.includes(permission) || rolePermissions[0] === 'All Permissions'
                                return (
                                  <div
                                    key={permission}
                                    className={cn(
                                      'flex items-center gap-2 p-2 rounded-md transition-colors',
                                      isRolePermission && 'bg-[#09B0B6]/5 border border-[#09B0B6]/20'
                                    )}
                                  >
                                    <FormCheckbox
                                      id={`perm-${section}-${permission}`}
                                      label={permission}
                                      checked={formData.permissions.includes(permission)}
                                      onCheckedChange={() => handlePermissionToggle(permission)}
                                    />
                                    {isRolePermission && (
                                      <span className="text-xs text-[#09B0B6] font-medium ml-auto">
                                        From Role
                                      </span>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>

                  {/* Selected Permissions Summary */}
                  {formData.permissions.length > 0 && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs font-medium mb-2">
                        Selected Permissions ({formData.permissions.length})
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {formData.permissions.slice(0, 5).map((perm) => (
                          <span
                            key={perm}
                            className="text-xs px-2 py-0.5 bg-background rounded border"
                          >
                            {perm}
                          </span>
                        ))}
                        {formData.permissions.length > 5 && (
                          <span className="text-xs px-2 py-0.5 bg-background rounded border">
                            +{formData.permissions.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/settings/users', { state: { tab: 'users-roles' } })}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!formData.name?.trim() || !formData.email?.trim() || !formData.role || (!isEditing && !formData.password?.trim()) || isLoading}
            className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
          >
            <Save className="h-4 w-4" />
            {isLoading ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddUserPage

