/**
 * Step 8: Summary & Confirmation
 * Full Registration Form - Step 8
 */

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, FileText } from 'lucide-react'
import { FullRegistrationFormData } from '../../../schemas/fullRegistrationSchema'

const roleLabels: Record<string, string> = {
  driver: 'Driver',
  emt: 'EMT',
  paramedic: 'Paramedic',
  rn: 'RN',
  dispatcher: 'Dispatcher',
  supervisor: 'Supervisor',
}

const hrStatusLabels: Record<string, string> = {
  active: 'Active',
  pending: 'Pending',
  'on-leave': 'On Leave',
  suspended: 'Suspended',
}

const employmentTypeLabels: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  contract: 'Contract',
  temporary: 'Temporary',
}

export function Step8Summary() {
  const form = useFormContext<FullRegistrationFormData>()
  const formData = form.watch()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#09B0B6]" />
            Registration Summary
          </CardTitle>
          <CardDescription>Review all information before submitting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Role */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Role</h3>
            <p className="text-base">{roleLabels[formData.primaryRole] || formData.primaryRole}</p>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">First Name</p>
                <p className="text-base">{formData.firstName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Name</p>
                <p className="text-base">{formData.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-base">{formData.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-base">{formData.phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Homebase/Work Location</p>
                <p className="text-base">{formData.homebase || 'N/A'}</p>
              </div>
            </div>
            {formData.shiftAvailabilityNotes && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-1">Shift Availability Notes</p>
                <p className="text-sm text-muted-foreground">{formData.shiftAvailabilityNotes}</p>
              </div>
            )}
          </div>

          {/* Driver License */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Driver License</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">License Number</p>
                <p className="text-base">{formData.driverLicense?.number}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">State</p>
                <p className="text-base">{formData.driverLicense?.state}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Expiry Date</p>
                <p className="text-base">
                  {formData.driverLicense?.expiryDate
                    ? new Date(formData.driverLicense.expiryDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* EVOC Certification */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">EVOC Certification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Certification Number</p>
                <p className="text-base">{formData.evocCertification?.certificationNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Expiry Date</p>
                <p className="text-base">
                  {formData.evocCertification?.expiryDate
                    ? new Date(formData.evocCertification.expiryDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>
            {formData.evocCertification?.file && (
              <div className="mt-2">
                <Badge variant="outline" className="gap-1">
                  <FileText className="w-3 h-3" />
                  {formData.evocCertification.file.name}
                </Badge>
              </div>
            )}
          </div>

          {/* Medical License (if EMT) */}
          {formData.step4MedicalLicense && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Medical License</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">License Number</p>
                  <p className="text-base">{formData.step4MedicalLicense.medicalLicenseNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Issuing State</p>
                  <p className="text-base">{formData.step4MedicalLicense.issuingState}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Expiry Date</p>
                  <p className="text-base">
                    {formData.step4MedicalLicense.expiryDate
                      ? new Date(formData.step4MedicalLicense.expiryDate).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Certifications */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Certifications</h3>
            <div className="space-y-2">
              {formData.cpr && (
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">CPR</span>
                  <span className="text-xs text-muted-foreground">
                    Expires: {formData.cpr.expiryDate ? new Date(formData.cpr.expiryDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              )}
              {formData.acls && (
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">ACLS</span>
                  <span className="text-xs text-muted-foreground">
                    Expires: {formData.acls.expiryDate ? new Date(formData.acls.expiryDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              )}
              {formData.pals && (
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">PALS</span>
                  <span className="text-xs text-muted-foreground">
                    Expires: {formData.pals.expiryDate ? new Date(formData.pals.expiryDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Compliance */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Compliance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Background Check Date</p>
                <p className="text-base">
                  {formData.backgroundCheck?.date
                    ? new Date(formData.backgroundCheck.date).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Drug Screening Date</p>
                <p className="text-base">
                  {formData.drugScreening?.date
                    ? new Date(formData.drugScreening.date).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Immunization on File</p>
                <Badge variant={formData.immunization?.onFile ? 'default' : 'secondary'}>
                  {formData.immunization?.onFile ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
          </div>

          {/* HR & Notes */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">HR & Notes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">HR Status</p>
                <p className="text-base">{hrStatusLabels[formData.hrStatus] || formData.hrStatus}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Employment Type</p>
                <p className="text-base">
                  {employmentTypeLabels[formData.employmentType] || formData.employmentType}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Hire Date</p>
                <p className="text-base">
                  {formData.hireDate ? new Date(formData.hireDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
            {formData.administrativeNotes && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-1">Administrative Notes</p>
                <p className="text-sm text-muted-foreground">{formData.administrativeNotes}</p>
              </div>
            )}
            {formData.additionalInformation && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-1">Additional Information</p>
                <p className="text-sm text-muted-foreground">{formData.additionalInformation}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

