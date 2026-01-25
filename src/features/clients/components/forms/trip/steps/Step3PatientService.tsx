/**
 * Step 3: Patient & Service Information
 */

import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormCheckbox } from '../../FormCheckbox'
import { AddTripFormData, SERVICE_LEVEL_OPTIONS, EQUIPMENT_PACK_OPTIONS } from '../../../../schemas/addTripSchema'

// Mock data - in real app, these would come from API
const MOCK_ORGANIZATIONS = [
  'Cairo University Hospital',
  'Alexandria Medical Center',
  'Ministry of Health Office',
  'Mansoura General Hospital',
  'Aswan Medical Complex',
]

const MOCK_PATIENTS = [
  'Ahmed Mohamed Ali',
  'Fatima Hassan',
  'Mohamed Ibrahim',
  'Sara Ahmed',
  'Omar Khaled',
]

const LEVEL_OF_CARE_OPTIONS = [
  'Standard',
  'Advanced',
  'Critical',
  'Bariatric',
  'Isolation',
]

export function Step3PatientService() {
  const form = useFormContext<AddTripFormData>()
  const selectedOrganization = form.watch('organization')

  return (
    <div className="space-y-8">
      {/* Patient Information */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
            Patient Information
          </h3>
          <p className="text-sm text-muted-foreground">
            Select the organization and patient for this trip
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MOCK_ORGANIZATIONS.map((org) => (
                      <SelectItem key={org} value={org}>
                        {org}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="patient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient *</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  value={field.value}
                  disabled={!selectedOrganization}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={selectedOrganization ? "Select patient" : "Select organization first"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MOCK_PATIENTS.map((patient) => (
                      <SelectItem key={patient} value={patient}>
                        {patient}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {selectedOrganization ? 'Select a patient from the organization' : 'Please select an organization first'}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Service Information */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
            Service Information
          </h3>
          <p className="text-sm text-muted-foreground">
            Configure the service level and crew requirements
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="serviceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Level *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SERVICE_LEVEL_OPTIONS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="levelOfCare"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level of Care *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level of care" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LEVEL_OF_CARE_OPTIONS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="crewConfiguration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crew Configuration *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crew configuration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Driver Only">Driver Only</SelectItem>
                  <SelectItem value="Driver + Paramedic">Driver + Paramedic</SelectItem>
                  <SelectItem value="Driver + 2 Paramedics">Driver + 2 Paramedics</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Routine">Routine</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Equipment Pack */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
            Equipment Pack (Optional)
          </h3>
          <p className="text-sm text-muted-foreground">
            Select any additional equipment needed for this trip
          </p>
        </div>

        <FormField
          control={form.control}
          name="equipmentPack"
          render={() => (
            <FormItem>
              <div className="grid gap-3 md:grid-cols-2">
                {EQUIPMENT_PACK_OPTIONS.map((equipment) => (
                  <FormField
                    key={equipment.value}
                    control={form.control}
                    name="equipmentPack"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={equipment.value}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/50 transition-colors"
                        >
                          <FormControl>
                            <FormCheckbox
                              checked={field.value?.includes(equipment.value)}
                              onCheckedChange={(checked) => {
                                const currentValue = field.value || []
                                if (checked) {
                                  field.onChange([...currentValue, equipment.value])
                                } else {
                                  field.onChange(
                                    currentValue.filter((value: string) => value !== equipment.value)
                                  )
                                }
                              }}
                            />
                          </FormControl>
                          <div className="flex-1">
                            <FormLabel className="font-normal cursor-pointer text-base">
                              {equipment.label}
                            </FormLabel>
                          </div>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

