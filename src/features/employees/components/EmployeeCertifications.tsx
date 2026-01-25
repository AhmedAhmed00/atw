/**
 * EmployeeCertifications Component
 * Certifications tab content for Employee Detail Page
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import {
  Award,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Calendar,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Employee } from '../types'
import { cn } from '@/lib/utils'

interface EmployeeCertificationsProps {
  employee: Employee
}

interface Certification {
  id: string
  name: string
  issueDate: string
  expiryDate: string
  status: 'Valid' | 'Expiring Soon' | 'Expired'
  issuingAuthority?: string
  certificateNumber?: string
}

// Mock certifications data - in real app, this would come from API
const getCertificationsData = (employee: Employee): Certification[] => {
  const baseCertifications = employee.certifications.map((cert, index) => {
    const issueDate = new Date()
    issueDate.setFullYear(issueDate.getFullYear() - (index + 1))
    const expiryDate = new Date(issueDate)
    expiryDate.setFullYear(expiryDate.getFullYear() + 2)

    let status: 'Valid' | 'Expiring Soon' | 'Expired' = 'Valid'
    const daysUntilExpiry = Math.floor((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    if (daysUntilExpiry < 0) {
      status = 'Expired'
    } else if (daysUntilExpiry < 90) {
      status = 'Expiring Soon'
    }

    return {
      id: `cert-${employee.id}-${index}`,
      name: cert,
      issueDate: issueDate.toISOString().split('T')[0],
      expiryDate: expiryDate.toISOString().split('T')[0],
      status,
      issuingAuthority: 'National Medical Board',
      certificateNumber: `CERT-${cert}-${employee.id.slice(-3)}`,
    }
  })

  // Add some additional certifications
  return [
    ...baseCertifications,
    {
      id: `cert-${employee.id}-extra-1`,
      name: 'Advanced Cardiac Life Support (ACLS)',
      issueDate: '2023-01-15',
      expiryDate: '2025-01-15',
      status: 'Valid' as const,
      issuingAuthority: 'American Heart Association',
      certificateNumber: 'ACLS-2023-001',
    },
    {
      id: `cert-${employee.id}-extra-2`,
      name: 'Pediatric Advanced Life Support (PALS)',
      issueDate: '2022-06-20',
      expiryDate: '2024-06-20',
      status: 'Expired' as const,
      issuingAuthority: 'American Heart Association',
      certificateNumber: 'PALS-2022-045',
    },
  ]
}

export function EmployeeCertifications({ employee }: EmployeeCertificationsProps) {
  const navigate = useNavigate()
  const [certifications] = useState<Certification[]>(getCertificationsData(employee))

  const handleAddCertification = () => {
    navigate(`/employees/${employee.id}/certifications/new`)
  }

  const handleView = (certification: Certification) => {
    navigate(`/employees/${employee.id}/certifications/${certification.id}`)
  }

  const handleEdit = (certification: Certification) => {
    // TODO: Open edit certification dialog/form
    console.log('Edit certification:', certification.id)
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Valid':
        return {
          icon: CheckCircle2,
          className: 'bg-green-500 hover:bg-green-600 text-white',
          label: 'Valid',
        }
      case 'Expiring Soon':
        return {
          icon: AlertCircle,
          className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          label: 'Expiring Soon',
        }
      case 'Expired':
        return {
          icon: XCircle,
          className: 'bg-red-500 hover:bg-red-600 text-white',
          label: 'Expired',
        }
      default:
        return {
          icon: CheckCircle2,
          className: 'bg-gray-500 hover:bg-gray-600 text-white',
          label: status,
        }
    }
  }

  const columns: ColumnDef<Certification>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const cert = row.original
        return (
          <div>
            <div className="font-medium text-[#05647A]">{cert.name}</div>
            {cert.certificateNumber && (
              <div className="text-xs text-muted-foreground mt-1">{cert.certificateNumber}</div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'issueDate',
      header: 'Issue Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('issueDate'))
        return (
          <div className="text-sm">
            {date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        )
      },
    },
    {
      accessorKey: 'expiryDate',
      header: 'Expiry Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('expiryDate'))
        const isExpired = date < new Date()
        return (
          <div className="text-sm">
            <div className={cn(isExpired && 'text-red-600 font-medium')}>
              {date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            {!isExpired && (
              <div className="text-xs text-muted-foreground mt-1">
                {Math.floor((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
              </div>
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
        const config = getStatusConfig(status)
        const Icon = config.icon

        return (
          <Badge className={cn('font-semibold gap-1', config.className)}>
            <Icon className="w-3 h-3" />
            {config.label}
          </Badge>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const certification = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleView(certification)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(certification)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
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
          <h3 className="text-lg font-semibold">Certifications</h3>
          <p className="text-sm text-muted-foreground">
            {certifications.length} certification{certifications.length !== 1 ? 's' : ''} on record
          </p>
        </div>
        <Button
          onClick={handleAddCertification}
          className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Certification
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="w-4 h-4 text-[#09B0B6]" />
            All Certifications
          </CardTitle>
          <CardDescription>List of all certifications and licenses for this employee</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={certifications} />
        </CardContent>
      </Card>
    </div>
  )
}

