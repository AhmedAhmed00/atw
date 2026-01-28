/**
 * VehicleTypesTab Component
 * Vehicle Type Configuration
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Plus, MoreVertical, Edit, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface VehicleType {
  id: string
  name: string
  description: string
  maximumCapacity: string
  status: 'Active' | 'Inactive'
  requiredCertifications: string[]
  requiredEquipment: string[]
}

// Available certifications (from CertificationsTab)
const AVAILABLE_CERTIFICATIONS = [
  'EMT-Basic',
  'Paramedic',
  'CPR Certification',
  'Advanced Life Support',
  'Basic Life Support (BLS)',
  'Advanced Life Support (ALS)',
  'Standard Driver License',
  'Heavy Vehicle License',
  'Wheelchair Transport',
  'Stretcher Transport',
  'Critical Care Transport (CCT)',
]

// Available equipment
const AVAILABLE_EQUIPMENT = [
  'Oxygen Cylinders',
  'Ventilator',
  'Defibrillator',
  'Basic Emergency Equipment',
  'Bariatric Equipment',
  'Vital Signs Monitor',
  'Electric Stretcher',
  'Wheelchair Lift',
]

const mockVehicleTypes: VehicleType[] = [
  {
    id: 'vt1',
    name: 'Type II Ambulance',
    description: 'Standard ambulance with basic life support',
    maximumCapacity: '2 patients',
    status: 'Active',
    requiredCertifications: ['EMT-Basic', 'Standard Driver License'],
    requiredEquipment: ['Oxygen Cylinders', 'Basic Emergency Equipment', 'Vital Signs Monitor'],
  },
  {
    id: 'vt2',
    name: 'Type I Ambulance',
    description: 'Advanced ambulance with advanced life support',
    maximumCapacity: '2 patients',
    status: 'Active',
    requiredCertifications: ['Paramedic', 'Advanced Life Support (ALS)', 'Standard Driver License'],
    requiredEquipment: ['Oxygen Cylinders', 'Ventilator', 'Defibrillator', 'Vital Signs Monitor'],
  },
  {
    id: 'vt3',
    name: 'BLS',
    description: 'Basic Life Support vehicle',
    maximumCapacity: '1 patient',
    status: 'Active',
    requiredCertifications: ['Basic Life Support (BLS)', 'Standard Driver License'],
    requiredEquipment: ['Oxygen Cylinders', 'Basic Emergency Equipment'],
  },
  {
    id: 'vt4',
    name: 'WAV',
    description: 'Wheelchair Accessible Vehicle',
    maximumCapacity: '2 wheelchairs',
    status: 'Active',
    requiredCertifications: ['Wheelchair Transport', 'Standard Driver License'],
    requiredEquipment: ['Wheelchair Lift', 'Basic Emergency Equipment'],
  },
]

export function VehicleTypesTab() {
  const navigate = useNavigate()
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>(mockVehicleTypes)

  const handleAdd = () => {
    navigate('/settings/vehicle-types/new')
  }

  const handleEdit = (type: VehicleType) => {
    navigate(`/settings/vehicle-types/${type.id}/edit`)
  }

  const handleDelete = (id: string) => {
    setVehicleTypes(vehicleTypes.filter((vt) => vt.id !== id))
  }

  const columns: ColumnDef<VehicleType>[] = [
    {
      accessorKey: 'name',
      header: 'Vehicle Type',
      cell: ({ row }) => (
        <div className="font-medium text-[#05647A]">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'maximumCapacity',
      header: 'Max Capacity',
    },
    {
      accessorKey: 'requiredCertifications',
      header: 'Certifications',
      cell: ({ row }) => {
        const certs = row.getValue('requiredCertifications') as string[]
        if (!certs || certs.length === 0) return <span className="text-muted-foreground">—</span>
        return (
          <div className="flex flex-wrap gap-1">
            {certs.slice(0, 2).map((cert) => (
              <Badge key={cert} variant="outline" className="text-xs">
                {cert}
              </Badge>
            ))}
            {certs.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{certs.length - 2}
              </Badge>
            )}
          </div>
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
      id: 'actions',
      cell: ({ row }) => {
        const type = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(type)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(type.id)}
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
            Vehicle Type Configuration
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage vehicle types available in the system
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Vehicle Type
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Types</CardTitle>
          <CardDescription>List of all configured vehicle types</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={vehicleTypes} />
        </CardContent>
      </Card>
    </div>
  )
}

