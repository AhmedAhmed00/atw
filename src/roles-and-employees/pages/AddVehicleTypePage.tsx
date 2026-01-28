/**
 * AddVehicleTypePage Component
 * Full-page route for adding/editing vehicle types
 */

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MultiSelect } from '@/features/clients/components/forms/MultiSelect'
import { ArrowLeft, Save } from 'lucide-react'

// Available certifications
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

interface VehicleType {
  id: string
  name: string
  description: string
  maximumCapacity: string
  status: 'Active' | 'Inactive'
  requiredCertifications: string[]
  requiredEquipment: string[]
}

// Mock data - in real app, this would come from API/state
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
]

export function AddVehicleTypePage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const isEditing = !!id

  const [formData, setFormData] = useState<Partial<VehicleType>>({
    name: '',
    description: '',
    maximumCapacity: '',
    status: 'Active',
    requiredCertifications: [],
    requiredEquipment: [],
  })

  const [isLoading, setIsLoading] = useState(false)

  // Load existing data if editing
  useEffect(() => {
    if (isEditing && id) {
      // In real app, fetch from API
      const existingType = mockVehicleTypes.find((vt) => vt.id === id)
      if (existingType) {
        setFormData({
          name: existingType.name,
          description: existingType.description,
          maximumCapacity: existingType.maximumCapacity,
          status: existingType.status,
          requiredCertifications: existingType.requiredCertifications,
          requiredEquipment: existingType.requiredEquipment,
        })
      }
    }
  }, [id, isEditing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name?.trim()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In real app, save to API
    console.log('Saving vehicle type:', formData)

    setIsLoading(false)
    navigate('/settings', { state: { tab: 'vehicle-types' } })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title={isEditing ? 'Edit Vehicle Type' : 'Add Vehicle Type'}
          description={isEditing ? 'Update vehicle type details' : 'Create a new vehicle type'}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/settings', { state: { tab: 'vehicle-types' } })}
          className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Type Information</CardTitle>
            <CardDescription>
              Enter the details for the vehicle type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Type Name */}
            <div className="space-y-2">
              <Label htmlFor="typeName">
                Type Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="typeName"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Type II Ambulance"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="typeDescription">Description</Label>
              <Input
                id="typeDescription"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description"
              />
            </div>

            {/* Maximum Capacity */}
            <div className="space-y-2">
              <Label htmlFor="maximumCapacity">Maximum Capacity</Label>
              <Input
                id="maximumCapacity"
                value={formData.maximumCapacity || ''}
                onChange={(e) => setFormData({ ...formData, maximumCapacity: e.target.value })}
                placeholder="e.g., 2 patients, 1 patient"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="typeStatus">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as 'Active' | 'Inactive' })}
              >
                <SelectTrigger id="typeStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Required Certifications */}
            <div className="space-y-2">
              <Label htmlFor="requiredCertifications">Required Certifications</Label>
              <MultiSelect
                options={AVAILABLE_CERTIFICATIONS.map((cert) => ({
                  value: cert,
                  label: cert,
                }))}
                value={formData.requiredCertifications || []}
                onChange={(selected) =>
                  setFormData({ ...formData, requiredCertifications: selected })
                }
                placeholder="Select certifications..."
              />
            </div>

            {/* Required Equipment */}
            <div className="space-y-2">
              <Label htmlFor="requiredEquipment">Required Equipment</Label>
              <MultiSelect
                options={AVAILABLE_EQUIPMENT.map((equip) => ({
                  value: equip,
                  label: equip,
                }))}
                value={formData.requiredEquipment || []}
                onChange={(selected) =>
                  setFormData({ ...formData, requiredEquipment: selected })
                }
                placeholder="Select equipment..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/settings', { state: { tab: 'vehicle-types' } })}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formData.name?.trim() || isLoading}
                className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
              >
                <Save className="h-4 w-4" />
                {isLoading ? 'Saving...' : isEditing ? 'Update Vehicle Type' : 'Add Vehicle Type'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default AddVehicleTypePage

