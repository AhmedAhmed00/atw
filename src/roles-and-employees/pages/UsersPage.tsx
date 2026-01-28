/**
 * UsersPage Component
 * System Users Management
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Plus, MoreVertical, Edit, Trash2, Users, ArrowLeft, Shield } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
  lastLogin?: string
}

const mockUsers: User[] = [
  { id: 'u1', name: 'John Smith', email: 'john.smith@example.com', role: 'Administrator', status: 'Active', lastLogin: '2024-01-20T10:30:00' },
  { id: 'u2', name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Dispatcher', status: 'Active', lastLogin: '2024-01-20T09:15:00' },
  { id: 'u3', name: 'Michael Brown', email: 'michael.b@example.com', role: 'Driver', status: 'Active', lastLogin: '2024-01-19T16:45:00' },
  { id: 'u4', name: 'Emily Davis', email: 'emily.d@example.com', role: 'Paramedic', status: 'Active', lastLogin: '2024-01-20T08:00:00' },
]

export function UsersPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>(mockUsers)

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'User',
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-[#09B0B6] text-white text-xs">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role = row.getValue('role') as string
        return (
          <Badge variant="outline" className="border-[#09B0B6] text-[#05647A]">
            <Shield className="w-3 h-3 mr-1" />
            {role}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <Badge
            variant="default"
            className={status === 'Active' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Login',
      cell: ({ row }) => {
        const lastLogin = row.getValue('lastLogin') as string | undefined
        if (!lastLogin) return <span className="text-muted-foreground">—</span>
        const date = new Date(lastLogin)
        return (
          <div className="text-sm">
            {date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
            <div className="text-xs text-muted-foreground">
              {date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/settings/users/${user.id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(user.id)}
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
          title="System Users"
          description="Manage user accounts"
          icon={Users}
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
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-sm text-muted-foreground">
            {users.length} user{users.length !== 1 ? 's' : ''} in the system
          </p>
        </div>
        <Button
          onClick={() => navigate('/settings/users/new')}
          className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Create New User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>List of all system users and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={users} />
        </CardContent>
      </Card>
    </div>
  )
}

export default UsersPage

