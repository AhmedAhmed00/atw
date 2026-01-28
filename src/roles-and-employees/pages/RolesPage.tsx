/**
 * RolesPage Component
 * System Roles Management
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Plus, MoreVertical, Edit, Trash2, Shield, ArrowLeft } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Role {
  id: string
  name: string
  permissions: string[]
  userCount: number
}

const mockRoles: Role[] = [
  {
    id: 'r1',
    name: 'Administrator',
    permissions: ['All Permissions'],
    userCount: 2,
  },
  {
    id: 'r2',
    name: 'Dispatcher',
    permissions: ['View Trips', 'Edit Trips', 'View Reports', 'View Fleet'],
    userCount: 5,
  },
  {
    id: 'r3',
    name: 'Driver',
    permissions: ['View Own Trips', 'Update Trip Status'],
    userCount: 12,
  },
  {
    id: 'r4',
    name: 'Supervisor',
    permissions: ['View Reports', 'Edit Shifts', 'View Employees', 'View Fleet'],
    userCount: 3,
  },
]

export function RolesPage() {
  const navigate = useNavigate()
  const [roles, setRoles] = useState<Role[]>(mockRoles)

  const handleDelete = (id: string) => {
    setRoles(roles.filter((r) => r.id !== id))
  }

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: 'name',
      header: 'Role Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#09B0B6]" />
          <div className="font-medium text-[#05647A]">{row.getValue('name')}</div>
        </div>
      ),
    },
    {
      accessorKey: 'permissions',
      header: 'Permissions',
      cell: ({ row }) => {
        const permissions = row.getValue('permissions') as string[]
        if (!permissions || permissions.length === 0) return <span className="text-muted-foreground">—</span>
        if (permissions[0] === 'All Permissions') {
          return <Badge variant="default" className="bg-[#09B0B6] text-white">All Permissions</Badge>
        }
        return (
          <div className="flex flex-wrap gap-1">
            {permissions.slice(0, 3).map((perm) => (
              <Badge key={perm} variant="outline" className="text-xs">
                {perm}
              </Badge>
            ))}
            {permissions.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{permissions.length - 3}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'userCount',
      header: 'Users',
      cell: ({ row }) => (
        <Badge variant="secondary">{row.getValue('userCount')} users</Badge>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const role = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/settings/roles/${role.id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(role.id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="System Roles"
          description="Manage roles and permissions"
          icon={Shield}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/settings', { state: { tab: 'users-roles' } })}
          className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Roles</h3>
          <p className="text-sm text-muted-foreground">
            {roles.length} role{roles.length !== 1 ? 's' : ''} configured
          </p>
        </div>
        <Button
          onClick={() => navigate('/settings/roles/new')}
          className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Role
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Roles</CardTitle>
          <CardDescription>List of all system roles and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={roles} />
        </CardContent>
      </Card>
    </div>
  )
}

export default RolesPage

