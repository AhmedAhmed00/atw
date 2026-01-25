/**
 * Trip Detail Page
 * Displays comprehensive information about a specific trip
 */

import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft, 
  Phone,
  MapPin,
  Car,
  Users,
  Clock,
  Gauge,
  Navigation,
  CheckCircle2,
  Circle,
  FileText,
  MessageSquare,
  Paperclip,
  Wrench,
  Receipt,
  AlertCircle,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Droplet,
  Pill,
  Stethoscope,
  Image as ImageIcon,
  FileDown,
  Eye,
  XCircle,
  Image,
  Mic,
  Video,
  Send,
  Play,
  Upload,
  File,
  FileImage,
  FileVideo,
  FileAudio,
  FileSpreadsheet,
  X
} from 'lucide-react'
import { mockTripDetails } from '../data/mockTripDetails'
import { trips } from '../data/mockTripsData'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in React-Leaflet
delete (Icon.Default.prototype as any)._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export function TripDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [signatureImageError, setSignatureImageError] = useState(false)

  const tripDetail = id ? mockTripDetails[id] : null
  const trip = id ? trips.find(t => t.id === id) : null

  if (!tripDetail || !trip) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Trip Not Found</h2>
          <p className="text-muted-foreground">The trip you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/operations/trips')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Trips
          </Button>
        </div>
      </div>
    )
  }

  const statusConfig = {
    'Completed': { className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700', icon: CheckCircle2 },
    'En Route': { className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300 dark:border-blue-700', icon: Navigation },
    'Pending': { className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700', icon: Clock },
    'Delayed': { className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700', icon: AlertCircle },
  }
  const statusInfo = statusConfig[tripDetail.status]
  const StatusIcon = statusInfo.icon

  const priorityConfig = {
    'Routine': { className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300 dark:border-blue-700' },
    'Urgent': { className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-300 dark:border-orange-700' },
    'Emergency': { className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700' },
  }
  const priorityInfo = priorityConfig[tripDetail.priority]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/operations/trips')}
              className="border-[#09B0B6] text-[#09B0B6] hover:bg-[#09B0B6] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-[#103454] dark:text-white">
                {tripDetail.tripId}
              </h1>
              <p className="text-muted-foreground mt-1">
                {trip.pickupLocation} → {trip.dropoffLocation}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn('flex items-center gap-1', statusInfo.className)}>
            <StatusIcon className="h-3 w-3" />
            {tripDetail.status}
          </Badge>
          <Badge variant="outline" className={cn('flex items-center gap-1', priorityInfo.className)}>
            {tripDetail.priority} Priority
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto p-1.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl gap-2 border-0">
          <TabsTrigger 
            value="overview" 
            className="relative border-0 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] 
              data-[state=active]:text-white
              data-[state=active]:shadow-lg data-[state=active]:shadow-[#09B0B6]/25
              hover:bg-slate-200/50 dark:hover:bg-slate-700/50
              data-[state=active]:hover:from-[#09B0B6] data-[state=active]:hover:to-[#05647A]
              flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger 
            value="medical-report" 
            className="relative border-0 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] 
              data-[state=active]:text-white
              data-[state=active]:shadow-lg data-[state=active]:shadow-[#09B0B6]/25
              hover:bg-slate-200/50 dark:hover:bg-slate-700/50
              data-[state=active]:hover:from-[#09B0B6] data-[state=active]:hover:to-[#05647A]
              flex items-center justify-center gap-2"
          >
            <Stethoscope className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Medical Report</span>
          </TabsTrigger>
          <TabsTrigger 
            value="vehicle-inspection" 
            className="relative border-0 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] 
              data-[state=active]:text-white
              data-[state=active]:shadow-lg data-[state=active]:shadow-[#09B0B6]/25
              hover:bg-slate-200/50 dark:hover:bg-slate-700/50
              data-[state=active]:hover:from-[#09B0B6] data-[state=active]:hover:to-[#05647A]
              flex items-center justify-center gap-2"
          >
            <Car className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Vehicle Inspection</span>
          </TabsTrigger>
          <TabsTrigger 
            value="communication" 
            className="relative border-0 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] 
              data-[state=active]:text-white
              data-[state=active]:shadow-lg data-[state=active]:shadow-[#09B0B6]/25
              hover:bg-slate-200/50 dark:hover:bg-slate-700/50
              data-[state=active]:hover:from-[#09B0B6] data-[state=active]:hover:to-[#05647A]
              flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Communication</span>
          </TabsTrigger>
          <TabsTrigger 
            value="attachments" 
            className="relative border-0 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] 
              data-[state=active]:text-white
              data-[state=active]:shadow-lg data-[state=active]:shadow-[#09B0B6]/25
              hover:bg-slate-200/50 dark:hover:bg-slate-700/50
              data-[state=active]:hover:from-[#09B0B6] data-[state=active]:hover:to-[#05647A]
              flex items-center justify-center gap-2"
          >
            <Paperclip className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Attachments</span>
          </TabsTrigger>
          <TabsTrigger 
            value="equipment-invoice" 
            className="relative border-0 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              data-[state=active]:bg-linear-to-r data-[state=active]:from-[#09B0B6] data-[state=active]:to-[#05647A] 
              data-[state=active]:text-white
              data-[state=active]:shadow-lg data-[state=active]:shadow-[#09B0B6]/25
              hover:bg-slate-200/50 dark:hover:bg-slate-700/50
              data-[state=active]:hover:from-[#09B0B6] data-[state=active]:hover:to-[#05647A]
              flex items-center justify-center gap-2"
          >
            <Receipt className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Equipment & Invoice</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Trip Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Trip Timeline</CardTitle>
              <CardDescription>Complete timeline of trip events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tripDetail.timeline.map((event, index) => {
                  const isLast = index === tripDetail.timeline.length - 1
                  const isCompleted = event.status === 'completed'
                  const isInProgress = event.status === 'in-progress'
                  
                  return (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center border-2',
                          isCompleted ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-400 dark:text-green-400' :
                          isInProgress ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-400' :
                          'bg-gray-100 border-gray-300 text-gray-400 dark:bg-gray-800 dark:border-gray-600'
                        )}>
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : isInProgress ? (
                            <Clock className="h-5 w-5" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                        </div>
                        {!isLast && (
                          <div className={cn(
                            'w-0.5 flex-1 mt-2',
                            isCompleted ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-700'
                          )} />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{event.event}</p>
                            {event.location && (
                              <p className="text-sm text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3 inline mr-1" />
                                {event.location}
                              </p>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(event.timestamp), 'MMM dd, yyyy HH:mm')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Full Name</span>
                  <p className="font-medium">{tripDetail.patient.fullName}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Age</span>
                  <p className="font-medium">{tripDetail.patient.age} years</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Gender</span>
                  <p className="font-medium">{tripDetail.patient.gender}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Contact Phone</span>
                  <p className="font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#09B0B6]" />
                    {tripDetail.patient.contactPhone}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Emergency Contact</span>
                  <p className="font-medium">{tripDetail.patient.emergencyContact.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {tripDetail.patient.emergencyContact.relationship} • {tripDetail.patient.emergencyContact.phone}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Mobility Status</span>
                  <p className="font-medium">{tripDetail.patient.mobilityStatus}</p>
                </div>
              </div>

              <Separator />

              <div>
                <span className="text-sm text-muted-foreground mb-2 block">Chronic Conditions</span>
                <div className="flex flex-wrap gap-2">
                  {tripDetail.patient.chronicConditions.length > 0 ? (
                    tripDetail.patient.chronicConditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-300 dark:border-orange-700">
                        {condition}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">None</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-sm text-muted-foreground mb-2 block">Allergies</span>
                <div className="flex flex-wrap gap-2">
                  {tripDetail.patient.allergies.length > 0 ? (
                    tripDetail.patient.allergies.map((allergy, index) => (
                      <Badge key={index} variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700">
                        {allergy}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">None</span>
                  )}
                </div>
              </div>

              {tripDetail.patient.preTransportNotes && (
                <div>
                  <span className="text-sm text-muted-foreground mb-2 block">Pre-Transport Notes</span>
                  <p className="text-sm bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    {tripDetail.patient.preTransportNotes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vehicle & Crew Assignment */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle & Crew Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Car className="h-5 w-5 text-[#09B0B6]" />
                  Vehicle
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg border bg-card">
                  <div>
                    <span className="text-sm text-muted-foreground">Vehicle ID</span>
                    <p className="font-medium">{tripDetail.vehicle.vehicleId}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Make & Model</span>
                    <p className="font-medium">{tripDetail.vehicle.make} {tripDetail.vehicle.model}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Class</span>
                    <p className="font-medium">{tripDetail.vehicle.class}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#09B0B6]" />
                  Crew Members
                </h4>
                <div className="space-y-3">
                  {tripDetail.crew.map((member) => (
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
              </div>
            </CardContent>
          </Card>

          {/* Live Location & Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Location</CardTitle>
                <CardDescription>Real-time GPS tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] rounded-lg overflow-hidden border">
                  <MapContainer
                    center={[tripDetail.liveTracking.currentLocation.lat, tripDetail.liveTracking.currentLocation.lng]}
                    zoom={13}
                    className="w-full h-full z-0"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[tripDetail.liveTracking.currentLocation.lat, tripDetail.liveTracking.currentLocation.lng]}
                    >
                      <Popup>
                        <div className="p-2">
                          <div className="font-semibold text-sm mb-1">{tripDetail.tripId}</div>
                          <div className="text-xs text-muted-foreground">
                            Current Location
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tracking Information</CardTitle>
                <CardDescription>GPS and odometer data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                    <Navigation className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">GPS Distance</p>
                      <p className="font-medium text-lg">{tripDetail.liveTracking.gpsDistance.toFixed(1)} km</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                    <Gauge className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Odometer Start</p>
                      <p className="font-medium text-lg">{tripDetail.liveTracking.odometerStart.toLocaleString()} mi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                    <Gauge className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Odometer Current</p>
                      <p className="font-medium text-lg">{tripDetail.liveTracking.odometerCurrent.toLocaleString()} mi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                    <Clock className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Waiting Time</p>
                      <p className="font-medium text-lg">{tripDetail.liveTracking.waitingTime} minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                    <Clock className="h-5 w-5 text-[#09B0B6] mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                      <p className="font-medium text-lg">
                        {format(new Date(tripDetail.liveTracking.estimatedArrival), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Medical Report Tab */}
        <TabsContent value="medical-report">
          {tripDetail.medicalReport ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Medical Report</CardTitle>
                    <CardDescription>
                      {format(new Date(tripDetail.medicalReport.date), 'MMM dd, yyyy HH:mm')} • {tripDetail.medicalReport.doctorName}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Vitals Section */}
                <div>
                  <h4 className="font-medium mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-[#09B0B6]" />
                    Vitals
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 rounded-lg border bg-card">
                      <div className="flex items-center gap-2 mb-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-xs text-muted-foreground">Blood Pressure</span>
                      </div>
                      <p className="font-medium">{tripDetail.medicalReport.vitals.bp}</p>
                    </div>
                    <div className="p-3 rounded-lg border bg-card">
                      <div className="flex items-center gap-2 mb-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-xs text-muted-foreground">Heart Rate</span>
                      </div>
                      <p className="font-medium">{tripDetail.medicalReport.vitals.hr} bpm</p>
                    </div>
                    <div className="p-3 rounded-lg border bg-card">
                      <div className="flex items-center gap-2 mb-1">
                        <Wind className="h-4 w-4 text-blue-500" />
                        <span className="text-xs text-muted-foreground">O₂ Level</span>
                      </div>
                      <p className="font-medium">{tripDetail.medicalReport.vitals.o2}%</p>
                    </div>
                    <div className="p-3 rounded-lg border bg-card">
                      <div className="flex items-center gap-2 mb-1">
                        <Thermometer className="h-4 w-4 text-orange-500" />
                        <span className="text-xs text-muted-foreground">Temperature</span>
                      </div>
                      <p className="font-medium">{tripDetail.medicalReport.vitals.temperature}°C</p>
                    </div>
                    <div className="p-3 rounded-lg border bg-card">
                      <div className="flex items-center gap-2 mb-1">
                        <Wind className="h-4 w-4 text-blue-500" />
                        <span className="text-xs text-muted-foreground">Respiratory Rate</span>
                      </div>
                      <p className="font-medium">{tripDetail.medicalReport.vitals.respiratoryRate} /min</p>
                    </div>
                    <div className="p-3 rounded-lg border bg-card">
                      <div className="flex items-center gap-2 mb-1">
                        <Droplet className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-muted-foreground">Glucose</span>
                      </div>
                      <p className="font-medium">{tripDetail.medicalReport.vitals.glucose} mg/dL</p>
                    </div>
                    <div className="p-3 rounded-lg border bg-card">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="h-4 w-4 text-purple-500" />
                        <span className="text-xs text-muted-foreground">Pain Level</span>
                      </div>
                      <p className="font-medium">{tripDetail.medicalReport.vitals.painLevel}/10</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Medications Administered */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Pill className="h-5 w-5 text-[#09B0B6]" />
                    Medications Administered
                  </h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {tripDetail.medicalReport.medicationsAdministered.map((med, index) => (
                      <li key={index} className="text-sm">{med}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Procedures Performed */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-[#09B0B6]" />
                    Procedures Performed
                  </h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {tripDetail.medicalReport.proceduresPerformed.map((procedure, index) => (
                      <li key={index} className="text-sm">{procedure}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Trip Outcome */}
                <div>
                  <h4 className="font-medium mb-3">Trip Outcome Details</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Destination: </span>
                      <span className="font-medium">{tripDetail.medicalReport.tripOutcome.destination}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Arrival Condition: </span>
                      <span className="font-medium">{tripDetail.medicalReport.tripOutcome.arrivalCondition}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Incidents: </span>
                      <span className="font-medium">{tripDetail.medicalReport.tripOutcome.incidents}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Paramedic Notes */}
                <div>
                  <h4 className="font-medium mb-3">Paramedic Notes</h4>
                  <p className="text-sm whitespace-pre-wrap bg-muted p-4 rounded-lg">
                    {tripDetail.medicalReport.paramedicNotes}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No medical report available for this trip.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Vehicle Inspection Tab */}
        <TabsContent value="vehicle-inspection" className="space-y-6">
          {tripDetail.vehicleInspection ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Pre-Trip Vehicle Inspection</CardTitle>
                      <CardDescription>
                        {format(new Date(tripDetail.vehicleInspection.date), 'MMM dd, yyyy HH:mm')} • Inspector: {tripDetail.vehicleInspection.inspector}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={tripDetail.vehicleInspection.status === 'Pass' ? 'default' : 'destructive'}
                      className={cn(
                        tripDetail.vehicleInspection.status === 'Pass' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700'
                      )}
                    >
                      {tripDetail.vehicleInspection.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge className="h-4 w-4 text-[#09B0B6]" />
                        <span className="text-sm text-muted-foreground">Odometer Reading</span>
                      </div>
                      <p className="font-medium text-lg">{tripDetail.vehicleInspection.odometerReading.toLocaleString()} mi</p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplet className="h-4 w-4 text-[#09B0B6]" />
                        <span className="text-sm text-muted-foreground">Fuel Level</span>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium text-lg">{tripDetail.vehicleInspection.fuelLevel}%</p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={cn(
                              'h-2 rounded-full transition-all',
                              tripDetail.vehicleInspection.fuelLevel > 50 ? 'bg-green-500' :
                              tripDetail.vehicleInspection.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                            )}
                            style={{ width: `${tripDetail.vehicleInspection.fuelLevel}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center gap-2 mb-2">
                        <Car className="h-4 w-4 text-[#09B0B6]" />
                        <span className="text-sm text-muted-foreground">Exterior Condition</span>
                      </div>
                      <p className="font-medium text-lg">{tripDetail.vehicleInspection.exteriorCondition}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Tire Pressure & Condition */}
                  <div>
                    <h4 className="font-medium mb-4 flex items-center gap-2">
                      <Car className="h-5 w-5 text-[#09B0B6]" />
                      Tire Pressure & Condition
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 rounded-lg border bg-card">
                        <p className="text-xs text-muted-foreground mb-1">Front Left</p>
                        <p className="font-medium">{tripDetail.vehicleInspection.tirePressure.frontLeft} PSI</p>
                      </div>
                      <div className="p-3 rounded-lg border bg-card">
                        <p className="text-xs text-muted-foreground mb-1">Front Right</p>
                        <p className="font-medium">{tripDetail.vehicleInspection.tirePressure.frontRight} PSI</p>
                      </div>
                      <div className="p-3 rounded-lg border bg-card">
                        <p className="text-xs text-muted-foreground mb-1">Rear Left</p>
                        <p className="font-medium">{tripDetail.vehicleInspection.tirePressure.rearLeft} PSI</p>
                      </div>
                      <div className="p-3 rounded-lg border bg-card">
                        <p className="text-xs text-muted-foreground mb-1">Rear Right</p>
                        <p className="font-medium">{tripDetail.vehicleInspection.tirePressure.rearRight} PSI</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-sm text-muted-foreground">Overall Tire Condition: </span>
                      <Badge variant="outline" className={cn(
                        tripDetail.vehicleInspection.tireCondition === 'Good' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700'
                          : tripDetail.vehicleInspection.tireCondition === 'Fair'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700'
                      )}>
                        {tripDetail.vehicleInspection.tireCondition}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Lights & Signals */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-[#09B0B6]" />
                        Lights
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(tripDetail.vehicleInspection.lights).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                            <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            {value ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-4 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-[#09B0B6]" />
                        Signals
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(tripDetail.vehicleInspection.signals).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                            <span className="text-sm capitalize">{key}</span>
                            {value ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Other Checks */}
                  <div>
                    <h4 className="font-medium mb-4 flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-[#09B0B6]" />
                      Other Checks
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {Object.entries(tripDetail.vehicleInspection.otherChecks).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                          <span className="text-sm capitalize">{key}</span>
                          {value ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {tripDetail.vehicleInspection.issues.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2 text-red-600 dark:text-red-400">
                          <AlertCircle className="h-5 w-5" />
                          Issues Found
                        </h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          {tripDetail.vehicleInspection.issues.map((issue, index) => (
                            <li key={index} className="text-sm text-red-600 dark:text-red-400">{issue}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {tripDetail.vehicleInspection.notes && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">Inspection Notes</h4>
                        <p className="text-sm whitespace-pre-wrap bg-muted p-4 rounded-lg">
                          {tripDetail.vehicleInspection.notes}
                        </p>
                      </div>
                    </>
                  )}

                  {tripDetail.vehicleInspection.inspectionPhotos && tripDetail.vehicleInspection.inspectionPhotos.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <ImageIcon className="h-5 w-5 text-[#09B0B6]" />
                          Inspection Photos
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {tripDetail.vehicleInspection.inspectionPhotos.map((photo, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-video rounded-lg border bg-muted overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(photo, '_blank')}
                                className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Wrench className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No vehicle inspection report available for this trip.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Communication</CardTitle>
              <CardDescription>Real-time messaging for this trip</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages Area */}
              <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-muted/30">
                {tripDetail.communication.length > 0 ? (
                  tripDetail.communication.map((comm) => {
                    const isInbound = comm.direction === 'inbound'
                    return (
                      <div
                        key={comm.id}
                        className={cn(
                          'flex gap-3',
                          isInbound ? 'justify-start' : 'justify-end'
                        )}
                      >
                        {isInbound && (
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              {comm.from.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={cn(
                          'flex flex-col max-w-[70%]',
                          isInbound ? 'items-start' : 'items-end'
                        )}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-muted-foreground">
                              {isInbound ? comm.from : comm.to}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(comm.timestamp), 'HH:mm')}
                            </span>
                            {comm.type === 'call' && (
                              <Phone className="h-3 w-3 text-muted-foreground" />
                            )}
                            {comm.type === 'sms' && (
                              <MessageSquare className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                          <div className={cn(
                            'rounded-lg p-3 space-y-2',
                            isInbound
                              ? 'bg-white dark:bg-gray-800 border'
                              : 'bg-[#09B0B6] text-white'
                          )}>
                            {comm.content && (
                              <p className={cn(
                                'text-sm whitespace-pre-wrap',
                                isInbound ? 'text-foreground' : 'text-white'
                              )}>
                                {comm.content}
                              </p>
                            )}
                            
                            {/* Attachments */}
                            {comm.attachments && comm.attachments.length > 0 && (
                              <div className="space-y-2 mt-2">
                                {comm.attachments.map((attachment) => (
                                  <div
                                    key={attachment.id}
                                    className={cn(
                                      'rounded-lg overflow-hidden border',
                                      isInbound
                                        ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                        : 'bg-white/10 border-white/20'
                                    )}
                                  >
                                    {attachment.type === 'photo' && (
                                      <div className="relative group">
                                        <div className="aspect-video bg-muted flex items-center justify-center">
                                          <ImageIcon className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                        <div className="p-2 flex items-center justify-between">
                                          <div className="flex-1 min-w-0">
                                            <p className={cn(
                                              'text-xs font-medium truncate',
                                              isInbound ? 'text-foreground' : 'text-white'
                                            )}>
                                              {attachment.name}
                                            </p>
                                            {attachment.size && (
                                              <p className={cn(
                                                'text-xs truncate',
                                                isInbound ? 'text-muted-foreground' : 'text-white/70'
                                              )}>
                                                {(attachment.size / 1024).toFixed(1)} KB
                                              </p>
                                            )}
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => window.open(attachment.url, '_blank')}
                                            className={cn(
                                              'h-7 w-7 p-0',
                                              isInbound
                                                ? 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                : 'hover:bg-white/20 text-white'
                                            )}
                                          >
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                    {attachment.type === 'audio' && (
                                      <div className="p-3 flex items-center gap-3">
                                        <div className={cn(
                                          'p-2 rounded-full',
                                          isInbound
                                            ? 'bg-blue-100 dark:bg-blue-900/30'
                                            : 'bg-white/20'
                                        )}>
                                          <Mic className={cn(
                                            'h-5 w-5',
                                            isInbound ? 'text-blue-600' : 'text-white'
                                          )} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className={cn(
                                            'text-xs font-medium truncate',
                                            isInbound ? 'text-foreground' : 'text-white'
                                          )}>
                                            {attachment.name}
                                          </p>
                                          {attachment.size && (
                                            <p className={cn(
                                              'text-xs truncate',
                                              isInbound ? 'text-muted-foreground' : 'text-white/70'
                                            )}>
                                              {(attachment.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                          )}
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => window.open(attachment.url, '_blank')}
                                          className={cn(
                                            'h-8 w-8 p-0',
                                            isInbound
                                              ? 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                              : 'hover:bg-white/20 text-white'
                                          )}
                                        >
                                          <Play className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )}
                                    {attachment.type === 'video' && (
                                      <div className="relative group">
                                        <div className="aspect-video bg-muted flex items-center justify-center">
                                          <Video className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                        <div className="p-2 flex items-center justify-between">
                                          <div className="flex-1 min-w-0">
                                            <p className={cn(
                                              'text-xs font-medium truncate',
                                              isInbound ? 'text-foreground' : 'text-white'
                                            )}>
                                              {attachment.name}
                                            </p>
                                            {attachment.size && (
                                              <p className={cn(
                                                'text-xs truncate',
                                                isInbound ? 'text-muted-foreground' : 'text-white/70'
                                              )}>
                                                {(attachment.size / 1024 / 1024).toFixed(2)} MB
                                              </p>
                                            )}
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => window.open(attachment.url, '_blank')}
                                            className={cn(
                                              'h-7 w-7 p-0',
                                              isInbound
                                                ? 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                : 'hover:bg-white/20 text-white'
                                            )}
                                          >
                                            <Play className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        {!isInbound && (
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="bg-[#09B0B6] text-white">
                              {comm.to.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    )
                  })
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No messages yet. Start a conversation below.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input Area */}
              <div className="border-t p-4 bg-background">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        title="Attach Photo"
                      >
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        title="Attach Audio"
                      >
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        title="Attach Video"
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Type your message..."
                      className="min-h-[80px] resize-none"
                      rows={3}
                    />
                  </div>
                  <Button
                    className="bg-[#09B0B6] hover:bg-[#05647A] text-white h-[80px] px-6"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attachments Tab */}
        <TabsContent value="attachments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Attachments</CardTitle>
                  <CardDescription>All files attached to this trip</CardDescription>
                </div>
                <Button
                  onClick={() => {
                    // TODO: Implement file upload
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.multiple = true
                    input.onchange = (e) => {
                      const files = (e.target as HTMLInputElement).files
                      if (files) {
                        console.log('Files selected:', files)
                        // Handle file upload here
                      }
                    }
                    input.click()
                  }}
                  className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                >
                  <Upload className="h-4 w-4" />
                  Upload File
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {tripDetail.attachments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tripDetail.attachments.map((attachment) => {
                    // Determine file type icon
                    const getFileIcon = () => {
                      const ext = attachment.name.split('.').pop()?.toLowerCase()
                      if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext || '')) {
                        return FileImage
                      }
                      if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(ext || '')) {
                        return FileVideo
                      }
                      if (['mp3', 'wav', 'ogg', 'aac', 'flac'].includes(ext || '')) {
                        return FileAudio
                      }
                      if (['xls', 'xlsx', 'csv'].includes(ext || '')) {
                        return FileSpreadsheet
                      }
                      return FileText
                    }
                    const FileIcon = getFileIcon()
                    
                    // Get file size in appropriate unit
                    const getFileSize = () => {
                      const sizeInKB = attachment.size / 1024
                      if (sizeInKB < 1024) {
                        return `${sizeInKB.toFixed(1)} KB`
                      }
                      return `${(sizeInKB / 1024).toFixed(2)} MB`
                    }

                    return (
                      <Card key={attachment.id} className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-[#09B0B6]/50">
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-[#09B0B6]/10 to-[#05647A]/10 group-hover:from-[#09B0B6]/20 group-hover:to-[#05647A]/20 transition-colors">
                              <FileIcon className="h-6 w-6 text-[#09B0B6]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-sm font-semibold mb-1 line-clamp-2 group-hover:text-[#09B0B6] transition-colors">
                                {attachment.name}
                              </CardTitle>
                              <CardDescription className="text-xs flex items-center gap-2">
                                <Badge variant="outline" className="text-xs border-[#09B0B6]/30 text-[#05647A]">
                                  {attachment.type}
                                </Badge>
                                <span className="text-muted-foreground">•</span>
                                <span>{getFileSize()}</span>
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-0">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Uploaded {format(new Date(attachment.uploadDate), 'MMM dd, yyyy HH:mm')}</span>
                          </div>
                          <div className="flex items-center gap-2 pt-2 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(attachment.fileUrl, '_blank')}
                              className="flex-1 gap-2 hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] hover:border-[#09B0B6]"
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a')
                                link.href = attachment.fileUrl
                                link.download = attachment.name
                                link.click()
                              }}
                              className="flex-1 gap-2 hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] hover:border-[#09B0B6]"
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
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="p-4 rounded-full bg-[#09B0B6]/10 mb-4">
                    <Paperclip className="h-12 w-12 text-[#09B0B6]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No attachments yet</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md">
                    Upload files, documents, images, or other attachments related to this trip.
                  </p>
                  <Button
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.multiple = true
                      input.onchange = (e) => {
                        const files = (e.target as HTMLInputElement).files
                        if (files) {
                          console.log('Files selected:', files)
                          // Handle file upload here
                        }
                      }
                      input.click()
                    }}
                    className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Your First File
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Equipment & Invoice Tab */}
        <TabsContent value="equipment-invoice" className="space-y-6">
          {/* Equipment Table */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment & Supplies</CardTitle>
              <CardDescription>Items used during this trip</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-sm">Item</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Category</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">Quantity</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">Duration (hrs)</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">Unit Price</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tripDetail.equipment.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-medium">{item.item}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-muted-foreground">{item.category}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm">{item.quantity}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm">{item.duration.toFixed(1)}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm">${item.unitPrice.toFixed(2)}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-medium">${item.total.toFixed(2)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Patient Signature */}
          {tripDetail.patientSignature && (
            <Card>
              <CardHeader>
                <CardTitle>Patient Signature</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Signature Image */}
                {tripDetail.patientSignature.signatureImage && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">Signature</span>
                    <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
                      <div className="flex items-center justify-center min-h-[150px]">
                        {signatureImageError ? (
                          <div className="flex flex-col items-center justify-center text-center p-4">
                            <FileText className="h-12 w-12 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Signature image not available</p>
                          </div>
                        ) : (
                          <img
                            src={tripDetail.patientSignature.signatureImage}
                            alt={`Signature of ${tripDetail.patientSignature.signedBy}`}
                            className="max-w-full max-h-[200px] object-contain"
                            onError={() => setSignatureImageError(true)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Signature Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <span className="text-sm text-muted-foreground">Signed By</span>
                    <p className="font-medium mt-1">{tripDetail.patientSignature.signedBy}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Date</span>
                    <p className="font-medium mt-1">
                      {format(new Date(tripDetail.patientSignature.date), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Verified</span>
                    <div className="mt-1">
                      {tripDetail.patientSignature.verified ? (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Invoice Summary */}
          {tripDetail.invoice && (
            <Card>
              <CardHeader>
                <CardTitle>Invoice Summary</CardTitle>
                <CardDescription>Invoice #{tripDetail.invoice.invoiceNumber}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Equipment & Supplies Subtotal</span>
                    <span className="font-medium">${tripDetail.invoice.equipmentSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Base Service Charge</span>
                    <span className="font-medium">${tripDetail.invoice.baseServiceCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <span className="text-sm text-muted-foreground">Mileage</span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {tripDetail.invoice.mileage.toFixed(1)} miles × ${tripDetail.invoice.mileageRate.toFixed(2)}/mile
                      </p>
                    </div>
                    <span className="font-medium">${tripDetail.invoice.mileageCharge.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-lg font-semibold">Grand Total</span>
                    <span className="text-lg font-bold text-[#09B0B6]">
                      ${tripDetail.invoice.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className="mt-1">
                      <Badge 
                        variant={tripDetail.invoice.status === 'Paid' ? 'default' : tripDetail.invoice.status === 'Overdue' ? 'destructive' : 'secondary'}
                        className={cn(
                          tripDetail.invoice.status === 'Paid' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700'
                            : tripDetail.invoice.status === 'Overdue'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700'
                        )}
                      >
                        {tripDetail.invoice.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Due Date</span>
                    <p className="font-medium mt-1">{format(new Date(tripDetail.invoice.dueDate), 'MMM dd, yyyy')}</p>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2">
                    <FileDown className="h-4 w-4" />
                    Download Invoice
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Receipt className="h-4 w-4" />
                    View Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TripDetailPage

