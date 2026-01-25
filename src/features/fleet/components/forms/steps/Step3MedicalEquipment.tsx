/**
 * Step 3: Medical Equipment
 */

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FormCheckbox } from '@/features/clients/components/forms/FormCheckbox'
import { Controller } from 'react-hook-form'
import { AddVehicleFormData } from '../../../schemas/addVehicleSchema'
import { StepErrorSummary } from '@/features/clients/components/forms/StepErrorSummary'

export function Step3MedicalEquipment() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<AddVehicleFormData>()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
          Medical Equipment
        </h2>
        <p className="text-muted-foreground mt-1">
          Select the medical equipment available in this vehicle
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medical Equipment Inventory</CardTitle>
          <CardDescription>Check all equipment that is available in this vehicle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Controller
              name="stretcher"
              control={control}
              render={({ field }) => (
                <FormCheckbox
                  id="stretcher"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  label="Stretcher"
                />
              )}
            />

            <Controller
              name="aed"
              control={control}
              render={({ field }) => (
                <FormCheckbox
                  id="aed"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  label="AED (Automated External Defibrillator)"
                />
              )}
            />

            <Controller
              name="suctionUnit"
              control={control}
              render={({ field }) => (
                <FormCheckbox
                  id="suctionUnit"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  label="Suction Unit"
                />
              )}
            />

            <Controller
              name="oxygenSystem"
              control={control}
              render={({ field }) => (
                <FormCheckbox
                  id="oxygenSystem"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  label="Oxygen System"
                />
              )}
            />

            <Controller
              name="firstAidKit"
              control={control}
              render={({ field }) => (
                <FormCheckbox
                  id="firstAidKit"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  label="First Aid Kit"
                />
              )}
            />

            <Controller
              name="immobilizationEquipment"
              control={control}
              render={({ field }) => (
                <FormCheckbox
                  id="immobilizationEquipment"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  label="Immobilization Equipment"
                />
              )}
            />
          </div>

          {/* Other Equipment */}
          <div className="space-y-2 pt-4 border-t">
            <Label htmlFor="otherEquipment">Other Equipment</Label>
            <Textarea
              id="otherEquipment"
              {...register('otherEquipment')}
              rows={3}
              className={errors.otherEquipment ? 'border-red-500' : ''}
              placeholder="List any other medical equipment..."
            />
            {errors.otherEquipment && (
              <p className="text-sm text-red-500">{errors.otherEquipment.message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

