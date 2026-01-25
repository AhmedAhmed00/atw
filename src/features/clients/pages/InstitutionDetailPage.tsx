/**
 * InstitutionDetailPage Component
 * Page for viewing individual institution details
 */

import { useParams, useNavigate } from 'react-router'
import { ArrowLeft, Building2, Users, Route, Plus, FileText, Receipt, Hash, FileCheck } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { institutions } from '../data/mockInstitutionsData'
import { DataTable } from '@/components/shared/table'
import { patientColumns } from '../components/PatientTableColumns'
import { patients } from '../data/mockPatientsData'
import { InstitutionOverview } from '../components/InstitutionOverview'
import { InstitutionContract } from '../components/InstitutionContract'
import { InstitutionInvoices } from '../components/InstitutionInvoices'
import { cn } from '@/lib/utils'

// Mock trips data - in real app, this would come from API
const mockTrips = [
  {
    id: 't1',
    patient: 'Ahmed Mohamed Ali',
    dateTime: '2024-01-15 10:30',
    route: 'Cairo → Alexandria',
    service: 'ALS',
    driver: 'Ibrahim Hassan',
    vehicle: 'Ambulance #101',
    amount: 450.00,
    status: 'Completed',
  },
  {
    id: 't2',
    patient: 'Fatima Hassan',
    dateTime: '2024-01-16 14:00',
    route: 'Cairo → Giza',
    service: 'BLS',
    driver: 'Khaled Ali',
    vehicle: 'Ambulance #102',
    amount: 320.00,
    status: 'Scheduled',
  },
]

type Trip = {
  id: string
  patient: string
  dateTime: string
  route: string
  service: string
  driver: string
  vehicle: string
  amount: number
  status: string
}

const tripColumns: ColumnDef<Trip>[] = [
  {
    accessorKey: 'patient',
    header: 'Patient',
  },
  {
    accessorKey: 'dateTime',
    header: 'Date & Time',
  },
  {
    accessorKey: 'route',
    header: 'Route',
  },
  {
    accessorKey: 'service',
    header: 'Service',
  },
  {
    accessorKey: 'driver',
    header: 'Driver',
  },
  {
    accessorKey: 'vehicle',
    header: 'Vehicle',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => `$${(row.getValue('amount') as number).toFixed(2)}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge
          variant={status === 'Completed' ? 'default' : 'secondary'}
          className={cn(
            status === 'Completed' && 'bg-green-500 hover:bg-green-600',
            status === 'Scheduled' && 'bg-blue-500 hover:bg-blue-600'
          )}
        >
          {status}
        </Badge>
      )
    },
  },
]

export function InstitutionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Find the institution
  const institution = institutions.find((inst) => inst.id === id)

  if (!institution) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800">
          <Building2 className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Institution Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          The institution you're looking for doesn't exist.
        </p>
        <Button
          variant="outline"
          onClick={() => navigate('/clients/institutions')}
          className="mt-2"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Institutions
        </Button>
      </div>
    )
  }

  // Filter patients for this institution (mock - in real app, this would be filtered by institutionId)
  const institutionPatients = patients.slice(0, 5) // Mock: show first 5 patients

  const statusVariants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', className?: string }> = {
    'Good Standing': { variant: 'default', className: 'bg-green-500 hover:bg-green-600' },
    'Active': { variant: 'default', className: 'bg-blue-500 hover:bg-blue-600' },
    'Suspended': { variant: 'secondary', className: 'bg-yellow-500 hover:bg-yellow-600' },
    'Outstanding Debt': { variant: 'destructive' },
  }
  const statusVariant = statusVariants[institution.status] || { variant: 'outline' }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Institution Details
          </h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
            <Hash className="w-4 h-4" />
            {`INST-${institution.id.padStart(6, '0')}`}
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/clients/institutions')}
          className="shrink-0 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Institution Header Card with Gradient */}
      <Card className="relative overflow-hidden border-none shadow-lg">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-[#09B0B6] to-[#05647A] opacity-10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDksIDE3NiwgMTgyLCAwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20" />
        
        <CardContent className="relative pt-8">
          {/* Institution Image and Name Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
            {/* Institution Avatar */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-[#09B0B6]/20 rounded-full blur-xl" />
              <Avatar className="relative w-24 h-24 md:w-32 md:h-32 border-4 border-white dark:border-slate-800 shadow-lg">
                <AvatarImage 
                  src={`https://api.dicebear.com/7.x/shapes/svg?seed=${institution.name}`}
                  alt={institution.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-linear-to-br from-[#09B0B6] to-[#05647A] text-white text-2xl md:text-3xl font-bold">
                  {institution.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            
            {/* Institution Name and Reference */}
            <div className="flex-1 space-y-2">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#05647A] dark:text-[#09B0B6]">
                  {institution.name}
                </h2>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Hash className="w-3 h-3" />
                  {`INST-${institution.id.padStart(6, '0')}`}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="border-[#09B0B6] text-[#05647A] dark:text-[#09B0B6]">
                  {institution.type}
                </Badge>
                <Badge
                  variant={statusVariant.variant}
                  className={cn(statusVariant.className, "px-3 py-1")}
                >
                  {institution.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full grid grid-cols-5 h-auto p-1.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl gap-2 border-0">
          <TabsTrigger 
            value="overview" 
            className="relative border-0 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] 
              data-[state=active]:text-white
              data-[state=active]:shadow-lg data-[state=active]:shadow-[#09B0B6]/25
              hover:bg-slate-200/50 dark:hover:bg-slate-700/50
              data-[state=active]:hover:from-[#09B0B6] data-[state=active]:hover:to-[#05647A]
              flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger 
            value="patients" 
            className="relative border-0 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] 
              data-[state=active]:text-white
              data-[state=active]:shadow-lg data-[state=active]:shadow-[#09B0B6]/25
              hover:bg-slate-200/50 dark:hover:bg-slate-700/50
              data-[state=active]:hover:from-[#09B0B6] data-[state=active]:hover:to-[#05647A]
              flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Patients</span>
          </TabsTrigger>
          <TabsTrigger 
            value="trips"
            className="relative border-0 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] 
              data-[state=active]:text-white
              data-[state=active]:shadow-lg data-[state=active]:shadow-[#09B0B6]/25
              hover:bg-slate-200/50 dark:hover:bg-slate-700/50
              data-[state=active]:hover:from-[#09B0B6] data-[state=active]:hover:to-[#05647A]
              flex items-center justify-center gap-2"
          >
            <Route className="w-4 h-4 shrink-0" />
            <span>Trips</span>
          </TabsTrigger>
          <TabsTrigger 
            value="contract"
            className="relative border-0 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] 
              data-[state=active]:text-white
              data-[state=active]:shadow-lg data-[state=active]:shadow-[#09B0B6]/25
              hover:bg-slate-200/50 dark:hover:bg-slate-700/50
              data-[state=active]:hover:from-[#09B0B6] data-[state=active]:hover:to-[#05647A]
              flex items-center justify-center gap-2"
          >
            <FileCheck className="w-4 h-4 shrink-0" />
            <span>Contract</span>
          </TabsTrigger>
          <TabsTrigger 
            value="invoices"
            className="relative border-0 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] 
              data-[state=active]:text-white
              data-[state=active]:shadow-lg data-[state=active]:shadow-[#09B0B6]/25
              hover:bg-slate-200/50 dark:hover:bg-slate-700/50
              data-[state=active]:hover:from-[#09B0B6] data-[state=active]:hover:to-[#05647A]
              flex items-center justify-center gap-2"
          >
            <Receipt className="w-4 h-4 shrink-0" />
            <span>Invoices</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <InstitutionOverview institution={institution} />
        </TabsContent>

        <TabsContent value="patients" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6]">
                  Patients
                </h3>
                <Button
                  onClick={() => navigate('/clients/patients/new')}
                  className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                >
                  <Plus className="w-4 h-4" />
                  Add Patient
                </Button>
              </div>
              <DataTable columns={patientColumns} data={institutionPatients} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trips" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6]">
                  Trips
                </h3>
                <Button
                  onClick={() => navigate(`/clients/institutions/${id}/trips/new`)}
                  className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                >
                  <Plus className="w-4 h-4" />
                  Add New Trip
                </Button>
              </div>
              <DataTable columns={tripColumns} data={mockTrips} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contract" className="mt-6">
          <InstitutionContract institutionId={id || ''} />
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <InstitutionInvoices institutionId={id || ''} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default InstitutionDetailPage

