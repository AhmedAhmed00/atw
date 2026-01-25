/**
 * PatientDetailPage Component
 * Page for viewing individual patient details
 */

import { useParams, useNavigate } from 'react-router'
import { ArrowLeft, User, Hash, Activity, FileText, Receipt, ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { patients } from '../data/mockPatientsData'
import { PatientOverview } from '../components/PatientOverview'
import { PatientTrips } from '../components/PatientTrips'
import { PatientMedicalReports } from '../components/PatientMedicalReports'
import { PatientInvoices } from '../components/PatientInvoices'
import { cn } from '@/lib/utils'

export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Find the patient
  const patient = patients.find((p) => p.id === id)

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800">
          <User className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Patient Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          The patient you're looking for doesn't exist.
        </p>
        <Button
          variant="outline"
          onClick={() => navigate('/clients/patients')}
          className="mt-2"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Patients
        </Button>
      </div>
    )
  }

  // Mock data for patient details
  const patientDetails = {
    name: patient.name,
    referenceNumber: `REF-${patient.id.padStart(6, '0')}`,
    age: Math.floor(Math.random() * 50) + 30, // Random age between 30-80
    phoneNumber: '+20 100 123 4567',
    wheelchair: Math.random() > 0.5, // Random wheelchair requirement
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`, // Generate avatar based on name
  }

  const statusVariants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', className?: string }> = {
    'Good Standing': { variant: 'default', className: 'bg-green-500 hover:bg-green-600' },
    'Active': { variant: 'default', className: 'bg-blue-500 hover:bg-blue-600' },
    'Suspended': { variant: 'secondary', className: 'bg-yellow-500 hover:bg-yellow-600' },
    'Outstanding Debt': { variant: 'destructive' },
  }
  const statusVariant = statusVariants[patient.status] || { variant: 'outline' }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Patient Details
          </h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
            <Hash className="w-4 h-4" />
            {patientDetails.referenceNumber}
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/clients/patients')}
          className="shrink-0 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Patient Header Card with Gradient */}
      <Card className="relative overflow-hidden border-none shadow-lg">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-[#09B0B6] to-[#05647A] opacity-10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDksIDE3NiwgMTgyLCAwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20" />
        
        <CardContent className="relative pt-8 ">
          {/* Patient Image and Name Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
            {/* Patient Avatar */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-[#09B0B6]/20 rounded-full blur-xl" />
              <Avatar className="relative w-24 h-24 md:w-32 md:h-32 border-4 border-white dark:border-slate-800 shadow-lg">
                <AvatarImage 
                  src={patientDetails.image} 
                  alt={patientDetails.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-linear-to-br from-[#09B0B6] to-[#05647A] text-white text-2xl md:text-3xl font-bold">
                  {patientDetails.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            
            {/* Patient Name and Reference */}
            <div className="flex-1 space-y-2">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#05647A] dark:text-[#09B0B6]">
                  {patientDetails.name}
                </h2>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Hash className="w-3 h-3" />
                  {patientDetails.referenceNumber}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="border-[#09B0B6] text-[#05647A] dark:text-[#09B0B6]">
                  {patient.condition}
                </Badge>
                <Badge
                  variant={statusVariant.variant}
                  className={cn(statusVariant.className, "px-3 py-1")}
                >
                  {patient.status}
                </Badge>
                
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Activity className="w-3 h-3 mr-1" />
                    Wheelchair Required
                  </Badge>
           
              </div>
            </div>
          </div>



   
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full grid grid-cols-4 h-auto p-1.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl gap-2 border-0">
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
            value="trips"
            className="relative border-0 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] 
              data-[state=active]:text-white
              data-[state=active]:shadow-lg data-[state=active]:shadow-[#09B0B6]/25
              hover:bg-slate-200/50 dark:hover:bg-slate-700/50
              data-[state=active]:hover:from-[#09B0B6] data-[state=active]:hover:to-[#05647A]
              flex items-center justify-center gap-2"
          >
            <ClipboardList className="w-4 h-4 shrink-0" />
            <span>Trips</span>
          </TabsTrigger>
          <TabsTrigger 
            value="medical-reports"
            className="relative border-0 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] 
              data-[state=active]:text-white
              data-[state=active]:shadow-lg data-[state=active]:shadow-[#09B0B6]/25
              hover:bg-slate-200/50 dark:hover:bg-slate-700/50
              data-[state=active]:hover:from-[#09B0B6] data-[state=active]:hover:to-[#05647A]
              flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Medical Reports</span>
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
          <PatientOverview patient={patient} />
        </TabsContent>

        <TabsContent value="trips" className="mt-6">
          <PatientTrips patientId={patient.id} patientName={patientDetails.name} />
        </TabsContent>

        <TabsContent value="medical-reports" className="mt-6">
          <PatientMedicalReports patientId={patient.id} />
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <PatientInvoices patientId={patient.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PatientDetailPage

