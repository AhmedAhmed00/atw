/**
 * CertificationsTab Component
 * Certification Management
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Plus, MoreVertical, Edit, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Certification {
  id: string
  name: string
  applicableFor: string
  validityPeriod: string
  equipmentRequirements: string
  status: 'Active' | 'Inactive'
}

const mockCertifications: Certification[] = [
  {
    id: 'cert1',
    name: 'EMT-Basic',
    applicableFor: 'Paramedics',
    validityPeriod: '2 years',
    equipmentRequirements: 'AED, First Aid Kit',
    status: 'Active',
  },
  {
    id: 'cert2',
    name: 'Paramedic',
    applicableFor: 'Paramedics',
    validityPeriod: '3 years',
    equipmentRequirements: 'Advanced Life Support Equipment',
    status: 'Active',
  },
  {
    id: 'cert3',
    name: 'CPR Certification',
    applicableFor: 'All Staff',
    validityPeriod: '1 year',
    equipmentRequirements: 'CPR Manikin',
    status: 'Active',
  },
]

const APPLICABLE_FOR_OPTIONS = [
  'All Staff',
  'Paramedics',
  'Drivers',
  'Medical Staff',
  'Administrative',
]

export function CertificationsTab() {
  const [certifications, setCertifications] = useState<Certification[]>(mockCertifications)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCert, setEditingCert] = useState<Certification | null>(null)
  const [formData, setFormData] = useState<Partial<Certification>>({
    name: '',
    applicableFor: '',
    validityPeriod: '',
    equipmentRequirements: '',
    status: 'Active',
  })

  const handleAdd = () => {
    setEditingCert(null)
    setFormData({
      name: '',
      applicableFor: '',
      validityPeriod: '',
      equipmentRequirements: '',
      status: 'Active',
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (cert: Certification) => {
    setEditingCert(cert)
    setFormData(cert)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setCertifications(certifications.filter((c) => c.id !== id))
  }

  const handleSave = () => {
    if (editingCert) {
      setCertifications(
        certifications.map((c) =>
          c.id === editingCert.id ? { ...c, ...formData } : c
        )
      )
    } else {
      setCertifications([
        ...certifications,
        {
          id: `cert${Date.now()}`,
          ...formData,
        } as Certification,
      ])
    }
    setIsDialogOpen(false)
    setFormData({
      name: '',
      applicableFor: '',
      validityPeriod: '',
      equipmentRequirements: '',
      status: 'Active',
    })
  }

  const columns: ColumnDef<Certification>[] = [
    {
      accessorKey: 'name',
      header: 'Certification Name',
      cell: ({ row }) => (
        <div className="font-medium text-[#05647A]">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'applicableFor',
      header: 'Applicable For',
    },
    {
      accessorKey: 'validityPeriod',
      header: 'Validity Period',
    },
    {
      accessorKey: 'equipmentRequirements',
      header: 'Equipment Requirements',
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
      id: 'actions',
      cell: ({ row }) => {
        const cert = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(cert)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(cert.id)}
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
            Certification Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Configure certification types and validity requirements
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAdd}
              className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Add Certification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingCert ? 'Edit' : 'Add'} Certification</DialogTitle>
              <DialogDescription>
                {editingCert ? 'Update certification details' : 'Create a new certification type'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="certName">Certification Name</Label>
                <Input
                  id="certName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., EMT-Basic, Paramedic"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applicableFor">Applicable For</Label>
                <Select
                  value={formData.applicableFor}
                  onValueChange={(value) => setFormData({ ...formData, applicableFor: value })}
                >
                  <SelectTrigger id="applicableFor">
                    <SelectValue placeholder="Select applicable group" />
                  </SelectTrigger>
                  <SelectContent>
                    {APPLICABLE_FOR_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="validityPeriod">Validity Period</Label>
                <Input
                  id="validityPeriod"
                  value={formData.validityPeriod}
                  onChange={(e) => setFormData({ ...formData, validityPeriod: e.target.value })}
                  placeholder="e.g., 2 years, 1 year"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipmentRequirements">Equipment Requirements</Label>
                <Input
                  id="equipmentRequirements"
                  value={formData.equipmentRequirements}
                  onChange={(e) => setFormData({ ...formData, equipmentRequirements: e.target.value })}
                  placeholder="e.g., AED, First Aid Kit"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certStatus">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as 'Active' | 'Inactive' })}
                >
                  <SelectTrigger id="certStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                >
                  {editingCert ? 'Update' : 'Add'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
          <CardDescription>List of all certification types</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={certifications} />
        </CardContent>
      </Card>
    </div>
  )
}

