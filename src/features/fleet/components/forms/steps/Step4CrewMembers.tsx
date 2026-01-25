/**
 * Step 4: Assign Crew Members
 */

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Controller } from 'react-hook-form'
import { AddVehicleFormData } from '../../../schemas/addVehicleSchema'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Mock crew members - in real app, this would come from API
const MOCK_CREW_MEMBERS = [
  { id: 'cm1', name: 'John Smith', certification: 'EMT-B', valid: true },
  { id: 'cm2', name: 'Sarah Johnson', certification: 'Paramedic', valid: true },
  { id: 'cm3', name: 'Michael Brown', certification: 'EMT-B', valid: true },
  { id: 'cm4', name: 'Emily Davis', certification: 'Paramedic', valid: true },
  { id: 'cm5', name: 'David Wilson', certification: 'EMT-B', valid: false }, // Invalid certification
  { id: 'cm6', name: 'Lisa Anderson', certification: 'Paramedic', valid: true },
]

export function Step4CrewMembers() {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddVehicleFormData>()

  // Filter only crew members with valid certifications
  const validCrewMembers = MOCK_CREW_MEMBERS.filter((cm) => cm.valid)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
          Assign Crew Members
        </h2>
        <p className="text-muted-foreground mt-1">
          Select crew members to assign to this vehicle
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Only crew members with valid certifications can be assigned to vehicles.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Available Crew Members</CardTitle>
          <CardDescription>
            Select crew members with valid certifications ({validCrewMembers.length} available)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {validCrewMembers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No crew members with valid certifications available.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <Controller
                name="crewMembers"
                control={control}
                render={({ field }) => {
                  const selectedIds = field.value || []
                  return (
                    <div className="space-y-3">
                      {validCrewMembers.map((member) => {
                        const isChecked = selectedIds.includes(member.id)
                        return (
                          <div
                            key={member.id}
                            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                          >
                            <Checkbox
                              id={`crew-${member.id}`}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...selectedIds, member.id])
                                } else {
                                  field.onChange(selectedIds.filter((id) => id !== member.id))
                                }
                              }}
                            />
                            <Label
                              htmlFor={`crew-${member.id}`}
                              className="flex-1 cursor-pointer"
                            >
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {member.certification}
                              </div>
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  )
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

