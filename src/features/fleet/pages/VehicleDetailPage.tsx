/**
 * Vehicle Detail Page
 * Displays comprehensive information about a specific vehicle
 */

import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AddMaintenanceRecordDialog } from '../components/AddMaintenanceRecordDialog'
import { SendToMaintenanceDialog } from '../components/SendToMaintenanceDialog'
import { vehicles } from '../data/mockVehiclesData'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  Edit, 
  Printer,
  Download,
  Wrench,
  Car,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  AlertCircle,
  FileDown,
  Eye,
  Calendar,
  DollarSign,
  Gauge,
  User,
  Building2,
  Image as ImageIcon,
  AlertTriangle
} from 'lucide-react'
import { mockVehicleDetails } from '../data/mockVehicleDetails'
import { vehicles } from '../data/mockVehiclesData'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface MaintenanceLogEntry {
  id: string
  name: string
  description: string
  technician: string
  serviceProvider: string
  nextServiceDue: string
  performedBy: string
  notes: string
  date: string
  cost?: number
  mileage?: number
}

interface InspectionReport {
  id: string
  name: string
  status: 'Pass' | 'Fail' | 'Pending'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  driverName: string
  date: string
  kms: number
  issuesFound: string
  actionRequired: string
  inspectionPhotos: string[]
}

interface Document {
  id: string
  name: string
  type: 'Registration Certificate' | 'Insurance Certificate' | 'Inspection Report' | 'Other'
  uploadDate: string
  expiryDate?: string
  fileUrl: string
}

export function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('vehicle-info')
  const [addMaintenanceOpen, setAddMaintenanceOpen] = useState(false)
  const [sendToMaintenanceOpen, setSendToMaintenanceOpen] = useState(false)

  const vehicleDetail = id ? mockVehicleDetails[id] : null
  const vehicle = id ? vehicles.find(v => v.id === id) : null

  if (!vehicleDetail || !vehicle) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Vehicle Not Found</h2>
          <p className="text-muted-foreground">The vehicle you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/fleet/vehicles')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Vehicles
          </Button>
        </div>
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    // TODO: Implement export logic
    console.log('Export vehicle data')
  }

  const handleSendToMaintenance = () => {
    setSendToMaintenanceOpen(true)
  }

  const handleSendToMaintenanceConfirm = (data: { mode: 'automatic' | 'manual'; vehicleIds?: string[] }) => {
    if (data.mode === 'automatic') {
      // Send all available vehicles to maintenance
      const availableVehicles = vehicles.filter((v) => v.status !== 'Maintenance')
      console.log('Sending all vehicles to maintenance:', availableVehicles.map((v) => v.id))
      // TODO: Implement API call to send vehicles to maintenance
    } else {
      // Send selected vehicles to maintenance
      console.log('Sending selected vehicles to maintenance:', data.vehicleIds)
      // TODO: Implement API call to send selected vehicles to maintenance
      // After successful operation, refresh the vehicle details or navigate back
      if (data.vehicleIds?.includes(id || '')) {
        // If this vehicle was sent to maintenance, you might want to refresh or show a message
        console.log('This vehicle has been sent to maintenance')
      }
    }
  }

  const handleEdit = () => {
    navigate(`/fleet/vehicles/${id}/edit`)
  }

  const handleAddMaintenanceRecord = (data: {
    maintenanceType: string
    date: string
    mileageAtService: string
    technicianName: string
    serviceProvider: string
    nextServiceDueDate: string
    description: string
    additionalNotes?: string
  }) => {
    console.log('Adding maintenance record:', data)
    // TODO: Implement API call to add maintenance record
    // After successful addition, refresh the vehicle details
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/fleet/vehicles')}
              className="border-[#09B0B6] text-[#09B0B6] hover:bg-[#09B0B6] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-[#103454] dark:text-white">
                {vehicleDetail.vehicleId}
              </h1>
              <p className="text-muted-foreground mt-1">
                {vehicleDetail.make} {vehicleDetail.model} • {vehicleDetail.year}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="gap-2"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            onClick={handleSendToMaintenance}
            className="gap-2"
          >
            <Wrench className="h-4 w-4" />
            Send to Maintenance
          </Button>
          <Button
            variant="outline"
            onClick={handleEdit}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Vehicle Class</CardDescription>
            <CardTitle className="text-lg flex items-center gap-2">
              <Car className="h-4 w-4 text-[#09B0B6]" />
              {vehicleDetail.vehicleClass}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Base Location</CardDescription>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#09B0B6]" />
              {vehicleDetail.baseLocation}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Assigned Crew</CardDescription>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4 text-[#09B0B6]" />
              {vehicleDetail.assignedCrew.length} Members
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full justify-start border-b bg-transparent p-0 h-auto gap-1">
          <TabsTrigger 
            value="vehicle-info" 
            className="rounded-t-lg border-b-2 border-transparent data-[state=active]:border-[#09B0B6] data-[state=active]:bg-[#09B0B6]/10 data-[state=active]:text-[#09B0B6] px-6 py-3 font-medium transition-all"
          >
            Vehicle Info
          </TabsTrigger>
          <TabsTrigger 
            value="maintenance-log" 
            className="rounded-t-lg border-b-2 border-transparent data-[state=active]:border-[#09B0B6] data-[state=active]:bg-[#09B0B6]/10 data-[state=active]:text-[#09B0B6] px-6 py-3 font-medium transition-all"
          >
            Maintenance Log
          </TabsTrigger>
          <TabsTrigger 
            value="inspection-reports" 
            className="rounded-t-lg border-b-2 border-transparent data-[state=active]:border-[#09B0B6] data-[state=active]:bg-[#09B0B6]/10 data-[state=active]:text-[#09B0B6] px-6 py-3 font-medium transition-all"
          >
            Inspection Reports
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className="rounded-t-lg border-b-2 border-transparent data-[state=active]:border-[#09B0B6] data-[state=active]:bg-[#09B0B6]/10 data-[state=active]:text-[#09B0B6] px-6 py-3 font-medium transition-all"
          >
            Documents
          </TabsTrigger>
        </TabsList>

        {/* Vehicle Info Tab */}
        <TabsContent value="vehicle-info" className="space-y-6">
          {/* Vehicle Information */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Make</span>
                  <p className="font-medium">{vehicleDetail.make}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Model</span>
                  <p className="font-medium">{vehicleDetail.model}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Year</span>
                  <p className="font-medium">{vehicleDetail.year}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Plate Number</span>
                  <p className="font-medium">{vehicleDetail.plateNumber}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">VIN</span>
                  <p className="font-medium font-mono text-sm">{vehicleDetail.vin}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Seating Capacity</span>
                  <p className="font-medium">{vehicleDetail.seatingCapacity}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">ADA Compliant</span>
                  <p className="font-medium">
                    {vehicleDetail.adaCompliant ? (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="outline">No</Badge>
                    )}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Bariatric Capacity</span>
                  <p className="font-medium">{vehicleDetail.bariatricCapacity} lbs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Equipment */}
          <Card>
            <CardHeader>
              <CardTitle>Medical Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(vehicleDetail.medicalEquipment).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    {value ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                ))}
              </div>
              {vehicleDetail.otherEquipment && (
                <div className="mt-4 pt-4 border-t">
                  <span className="text-sm text-muted-foreground">Other Equipment:</span>
                  <p className="mt-1">{vehicleDetail.otherEquipment}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assigned Crew Members */}
          <Card>
            <CardHeader>
              <CardTitle>Assigned Crew Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vehicleDetail.assignedCrew.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#09B0B6] text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role} • {member.certification}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance & Documentation */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance & Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Insurance Policy Number</span>
                  <p className="font-medium">{vehicleDetail.insurancePolicyNumber}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Insurance Expiry Date</span>
                  <p className="font-medium">{format(new Date(vehicleDetail.insuranceExpiryDate), 'MMM dd, yyyy')}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Registration Expiry Date</span>
                  <p className="font-medium">{format(new Date(vehicleDetail.registrationExpiryDate), 'MMM dd, yyyy')}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Last Sanitize Date</span>
                  <p className="font-medium">{format(new Date(vehicleDetail.lastSanitizeDate), 'MMM dd, yyyy')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Devices & Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Devices & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Telematics Device ID</span>
                  <p className="font-medium font-mono text-sm">{vehicleDetail.telematicsDeviceId}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">GPS Device ID</span>
                  <p className="font-medium font-mono text-sm">{vehicleDetail.gpsDeviceId}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Dashcam ID</span>
                  <p className="font-medium font-mono text-sm">{vehicleDetail.dashcamId}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* General Notes */}
          {vehicleDetail.generalNotes && (
            <Card>
              <CardHeader>
                <CardTitle>General Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{vehicleDetail.generalNotes}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Maintenance Log Tab */}
        <TabsContent value="maintenance-log" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Maintenance History</h3>
              <p className="text-sm text-muted-foreground">Complete maintenance log for this vehicle</p>
            </div>
            <Button
              onClick={() => setAddMaintenanceOpen(true)}
              className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              <Wrench className="h-4 w-4" />
              Add Maintenance Record
            </Button>
          </div>
          
          <div className="space-y-4">
            {vehicleDetail.maintenanceLog.map((log) => (
              <Card key={log.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{log.name}</CardTitle>
                      <CardDescription className="mt-1">{log.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-4">
                      {format(new Date(log.date), 'MMM dd, yyyy')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Technician</p>
                        <p className="font-medium">{log.technician}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Service Provider</p>
                        <p className="font-medium">{log.serviceProvider}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Performed By</p>
                        <p className="font-medium">{log.performedBy}</p>
                      </div>
                    </div>
                    {log.cost && (
                      <div className="flex items-start gap-3">
                        <DollarSign className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Cost</p>
                          <p className="font-medium">${log.cost.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                    {log.mileage && (
                      <div className="flex items-start gap-3">
                        <Gauge className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Mileage</p>
                          <p className="font-medium">{log.mileage.toLocaleString()} mi</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Next Service Due</p>
                        <p className="font-medium">{format(new Date(log.nextServiceDue), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                  </div>
                  
                  {log.notes && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Notes</p>
                      <p className="text-sm">{log.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Inspection Reports Tab */}
        <TabsContent value="inspection-reports" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Inspection Reports</h3>
              <p className="text-sm text-muted-foreground">All inspection reports for this vehicle</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {vehicleDetail.inspectionReports.map((report) => {
              const statusConfig = {
                'Pass': { className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700', icon: CheckCircle2 },
                'Fail': { className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700', icon: XCircle },
                'Pending': { className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700', icon: Clock },
              }
              const statusInfo = statusConfig[report.status]
              const StatusIcon = statusInfo.icon
              
              const priorityConfig = {
                'Low': { className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300 dark:border-blue-700' },
                'Medium': { className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700' },
                'High': { className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-300 dark:border-orange-700' },
                'Critical': { className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700' },
              }
              const priorityInfo = priorityConfig[report.priority]
              
              return (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{report.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className={cn('flex items-center gap-1', statusInfo.className)}>
                            <StatusIcon className="h-3 w-3" />
                            {report.status}
                          </Badge>
                          <Badge variant="outline" className={cn('flex items-center gap-1', priorityInfo.className)}>
                            {report.priority} Priority
                          </Badge>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-4">
                        {format(new Date(report.date), 'MMM dd, yyyy')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Driver Name</p>
                          <p className="font-medium">{report.driverName}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Gauge className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Kilometers</p>
                          <p className="font-medium">{report.kms.toLocaleString()} km</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Inspection Date</p>
                          <p className="font-medium">{format(new Date(report.date), 'MMM dd, yyyy')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          <p className="text-sm font-medium text-muted-foreground">Issues Found</p>
                        </div>
                        <p className="text-sm bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                          {report.issuesFound}
                        </p>
                      </div>
                      
                      {report.actionRequired && report.actionRequired !== 'None' && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <p className="text-sm font-medium text-muted-foreground">Action Required</p>
                          </div>
                          <p className="text-sm bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                            {report.actionRequired}
                          </p>
                        </div>
                      )}
                      
                      {report.inspectionPhotos && report.inspectionPhotos.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <ImageIcon className="h-4 w-4 text-[#09B0B6]" />
                            <p className="text-sm font-medium text-muted-foreground">Inspection Photos</p>
                            <Badge variant="outline" className="ml-2">
                              {report.inspectionPhotos.length} Photo{report.inspectionPhotos.length > 1 ? 's' : ''}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {report.inspectionPhotos.map((photo, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(photo, '_blank')}
                                className="gap-2"
                              >
                                <ImageIcon className="h-4 w-4" />
                                Photo {index + 1}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Documents</h3>
              <p className="text-sm text-muted-foreground">All documents related to this vehicle</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicleDetail.documents.map((doc) => {
              const typeConfig = {
                'Registration Certificate': { 
                  className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300 dark:border-blue-700',
                  icon: FileText
                },
                'Insurance Certificate': { 
                  className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700',
                  icon: FileText
                },
                'Inspection Report': { 
                  className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-300 dark:border-purple-700',
                  icon: FileText
                },
                'Other': { 
                  className: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-300 dark:border-gray-700',
                  icon: FileText
                },
              }
              const typeInfo = typeConfig[doc.type] || typeConfig.Other
              const DocIcon = typeInfo.icon
              
              return (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className={cn('p-2 rounded-lg', typeInfo.className)}>
                        <DocIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base mb-1 line-clamp-2">{doc.name}</CardTitle>
                        <Badge variant="outline" className={cn('text-xs', typeInfo.className)}>
                          {doc.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Upload Date</span>
                        <span className="font-medium">{format(new Date(doc.uploadDate), 'MMM dd, yyyy')}</span>
                      </div>
                      {doc.expiryDate && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Expiry Date</span>
                          <span className={cn(
                            'font-medium',
                            new Date(doc.expiryDate) < new Date() ? 'text-red-600' : ''
                          )}>
                            {format(new Date(doc.expiryDate), 'MMM dd, yyyy')}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(doc.fileUrl, '_blank')}
                        className="flex-1 gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(doc.fileUrl, '_blank')}
                        className="flex-1 gap-2"
                      >
                        <FileDown className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Maintenance Record Dialog */}
      <AddMaintenanceRecordDialog
        open={addMaintenanceOpen}
        onOpenChange={setAddMaintenanceOpen}
        onConfirm={handleAddMaintenanceRecord}
      />

      {/* Send to Maintenance Dialog */}
      <SendToMaintenanceDialog
        open={sendToMaintenanceOpen}
        onOpenChange={setSendToMaintenanceOpen}
        vehicles={vehicles}
        onConfirm={handleSendToMaintenanceConfirm}
        initialVehicleId={id}
      />
    </div>
  )
}

export default VehicleDetailPage

