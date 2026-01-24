import { ColumnDef } from '@tanstack/react-table'
import { User } from '@/types/user'
import { fakeUsers } from '@/data/fakeUsers'
import { DataTable, SortableHeader } from '@/components/shared/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column}>Name</SortableHeader>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('name')}</div>
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortableHeader column={column}>Email</SortableHeader>,
    cell: ({ row }) => {
      return <div className="text-muted-foreground">{row.getValue('email')}</div>
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <SortableHeader column={column}>Role</SortableHeader>,
  },
  {
    accessorKey: 'department',
    header: ({ column }) => <SortableHeader column={column}>Department</SortableHeader>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge
          variant={
            status === 'active'
              ? 'default'
              : status === 'inactive'
              ? 'secondary'
              : 'outline'
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'joinDate',
    header: ({ column }) => <SortableHeader column={column}>Join Date</SortableHeader>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('joinDate'))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: 'salary',
    header: ({ column }) => <SortableHeader column={column}>Salary</SortableHeader>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('salary'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
]

function UsersTable() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Users Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your team members and their roles with TanStack Table
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>
            A list of all employees with sorting, filtering, and pagination
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={fakeUsers} />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fakeUsers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {fakeUsers.filter((u) => u.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(
                fakeUsers.reduce((acc, user) => acc + user.salary, 0) / fakeUsers.length
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UsersTable

