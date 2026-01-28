/**
 * CompanyInfoTab Component
 * Company Information settings
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { useState } from 'react'

export function CompanyInfoTab() {
  const [logo, setLogo] = useState<File | null>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogo(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
          Company Information
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage your organization's basic information and branding
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
          <CardDescription>Basic company information and identification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" placeholder="Enter company name" />
            </div>

            {/* Commercial Registration */}
            <div className="space-y-2">
              <Label htmlFor="commercialRegistration">Commercial Registration</Label>
              <Input id="commercialRegistration" placeholder="Enter commercial registration number" />
            </div>

            {/* Tax Number */}
            <div className="space-y-2">
              <Label htmlFor="taxNumber">Tax Number</Label>
              <Input id="taxNumber" placeholder="Enter tax number" />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input id="email" type="email" placeholder="company@example.com" required />
            </div>

            {/* Primary Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="primaryPhone">Primary Phone Number</Label>
              <Input id="primaryPhone" type="tel" placeholder="+20 XXX XXX XXXX" />
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" placeholder="https://www.example.com" />
            </div>

            {/* Emergency Hotline */}
            <div className="space-y-2">
              <Label htmlFor="emergencyHotline">Emergency Hotline</Label>
              <Input id="emergencyHotline" type="tel" placeholder="+20 XXX XXX XXXX" />
            </div>

            {/* Technical Support Phone */}
            <div className="space-y-2">
              <Label htmlFor="technicalSupportPhone">Technical Support Phone</Label>
              <Input id="technicalSupportPhone" type="tel" placeholder="+20 XXX XXX XXXX" />
            </div>
          </div>

          {/* Company Address */}
          <div className="space-y-2">
            <Label htmlFor="companyAddress">Company Address</Label>
            <Input id="companyAddress" placeholder="Enter full company address" />
          </div>

          {/* Company Logo */}
          <div className="space-y-2">
            <Label htmlFor="companyLogo">Company Logo</Label>
            <div className="flex items-center gap-4">
              {logo && (
                <div className="relative w-24 h-24 border rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(logo)}
                    alt="Company logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <Input
                  id="companyLogo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('companyLogo')?.click()}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {logo ? 'Change Logo' : 'Upload Logo'}
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 200x200px, PNG or JPG
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

