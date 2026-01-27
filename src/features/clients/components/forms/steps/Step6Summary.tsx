/**
 * Step 6: Patient Summary & Confirmation
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
import { Textarea } from '@/components/ui/textarea'
import { AddPatientFormData } from '../../../schemas/addPatientSchema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { InfoItem } from '@/components/ui/InfoItem'
import { User, Calendar, Hash, Activity, Heart, Ruler, Weight, Building2, Phone, MapPin, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Step6Summary() {
  const form = useFormContext<AddPatientFormData>()
  const formValues = form.watch()

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6] mb-2">
          Review Patient Information
        </h3>
        <p className="text-sm text-muted-foreground">
          Please review all information before submitting. You can go back to make changes if needed.
        </p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-4 h-4" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <InfoItem
            icon={User}
            label="Full Name"
            value={`${formValues.firstName} ${formValues.lastName}`}
          />
          <InfoItem
            icon={Calendar}
            label="Date of Birth"
            value={formatDate(formValues.dateOfBirth)}
          />
          <InfoItem
            icon={Activity}
            label="Gender"
            value={formValues.gender || 'N/A'}
          />
          <InfoItem
            icon={Hash}
            label="Medical Record Number"
            value={formValues.medicalRecordNumber}
          />
        </CardContent>
      </Card>

      {/* Medical Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Medical Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <InfoItem
            icon={Activity}
            label="Mobility Status"
            value={formValues.mobilityStatus || 'N/A'}
          />
          <InfoItem
            icon={Heart}
            label="Baseline O₂ Level"
            value={formValues.baselineO2Level ? `${formValues.baselineO2Level}%` : 'N/A'}
          />
          <InfoItem
            icon={Ruler}
            label="Height"
            value={formValues.height ? `${formValues.height} cm` : 'N/A'}
          />
          <InfoItem
            icon={Weight}
            label="Weight"
            value={formValues.weight ? `${formValues.weight} kg` : 'N/A'}
          />
          {formValues.clinicalFlags && formValues.clinicalFlags.length > 0 && (
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase">Clinical Flags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {formValues.clinicalFlags.map((flag: string) => (
                  <Badge key={flag} variant="outline" className="border-[#09B0B6] text-[#05647A]">
                    {flag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Insurance Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Insurance Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <InfoItem
            icon={Building2}
            label="Payer Name"
            value={formValues.payerName || 'N/A'}
          />
          <InfoItem
            icon={Hash}
            label="Member ID"
            value={formValues.payerMemberId || 'N/A'}
          />
          <InfoItem
            icon={Building2}
            label="Plan"
            value={formValues.payerPlan || 'N/A'}
          />
          <InfoItem
            icon={CheckCircle2}
            label="Prior Authorization"
            value={formValues.priorAuthorization || 'N/A'}
          />
          {formValues.priorAuthorization === 'Yes' && (
            <>
              <InfoItem
                icon={Hash}
                label="Authorization Number"
                value={formValues.authorizationNumber || 'N/A'}
              />
              <InfoItem
                icon={Calendar}
                label="Authorization Period"
                value={
                  formValues.authorizationStartDate && formValues.authorizationEndDate
                    ? `${formatDate(formValues.authorizationStartDate)} - ${formatDate(formValues.authorizationEndDate)}`
                    : 'N/A'
                }
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Accessibility & Equipment */}
      {(formValues.accessibilityConstraints?.length > 0 ||
        formValues.equipmentNeeded?.length > 0 ||
        formValues.interpreterRequired === 'Yes' ||
        formValues.escortRequired === 'Yes') && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Accessibility & Equipment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formValues.accessibilityConstraints && formValues.accessibilityConstraints.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase mb-2 block">
                    Accessibility Constraints
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {formValues.accessibilityConstraints.map((constraint: string) => (
                      <Badge key={constraint} variant="outline">
                        {constraint}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {formValues.equipmentNeeded && formValues.equipmentNeeded.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase mb-2 block">
                    Equipment Needed
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {formValues.equipmentNeeded.map((equipment: string) => (
                      <Badge key={equipment} variant="outline" className="border-[#09B0B6] text-[#05647A]">
                        {equipment}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                {formValues.interpreterRequired === 'Yes' && (
                  <InfoItem
                    icon={Phone}
                    label="Interpreter Required"
                    value={formValues.preferredLanguage || 'N/A'}
                  />
                )}
                {formValues.escortRequired === 'Yes' && (
                  <InfoItem
                    icon={User}
                    label="Escort Required"
                    value="Yes"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        )}

      {/* Contact & Address */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Contact & Address
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <InfoItem
            icon={User}
            label="Emergency Contact"
            value={formValues.emergencyContactName || 'N/A'}
          />
          <InfoItem
            icon={Phone}
            label="Emergency Phone"
            value={formValues.emergencyContactPhone || 'N/A'}
          />
          <InfoItem
            icon={MapPin}
            label="Address"
            value={
              formValues.addressLine1
                ? `${formValues.addressLine1}${formValues.addressLine2 ? `, ${formValues.addressLine2}` : ''}, ${formValues.city}, ${formValues.state} ${formValues.postalCode}`
                : 'N/A'
            }
            className="md:col-span-2"
          />
        </CardContent>
      </Card>

      {/* Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2
              className={cn(
                'w-4 h-4',
                formValues.consentOnFile ? 'text-green-600' : 'text-muted-foreground'
              )}
            />
            <span className="text-sm font-medium">
              Consent on File: {formValues.consentOnFile ? 'Verified' : 'Pending'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2
              className={cn(
                'w-4 h-4',
                formValues.photoIdOnFile ? 'text-green-600' : 'text-muted-foreground'
              )}
            />
            <span className="text-sm font-medium">
              Photo ID on File: {formValues.photoIdOnFile ? 'Verified' : 'Pending'}
            </span>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Additional Notes */}
      <FormField
        control={form.control}
        name="additionalNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any additional notes or comments about this patient..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Optional notes or comments to include with the patient record
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

