/**
 * Step 1: Basic Vehicle Information
 */

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FormCheckbox } from '@/features/clients/components/forms/FormCheckbox'
import { Controller } from 'react-hook-form'
import { AddVehicleFormData } from '../../../schemas/addVehicleSchema'
import { VEHICLE_CLASS_OPTIONS, BASE_LOCATION_OPTIONS } from '../../../schemas/addVehicleSchema'
// StepErrorSummary will be handled inline with individual field errors

export function Step1BasicInfo() {
  const {
    register,
    control,
    formState: { errors },
    trigger,
  } = useFormContext<AddVehicleFormData>()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
          Basic Vehicle Information
        </h2>
        <p className="text-muted-foreground mt-1">
          Enter the essential details about the vehicle
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Details</CardTitle>
          <CardDescription>Core vehicle identification and specifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vehicle ID */}
            <div className="space-y-2">
              <Label htmlFor="vehicleId">
                Vehicle ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="vehicleId"
                {...register('vehicleId')}
                className={errors.vehicleId ? 'border-red-500' : ''}
                onBlur={() => trigger('vehicleId')}
              />
              {errors.vehicleId && (
                <p className="text-sm text-red-500">{errors.vehicleId.message}</p>
              )}
            </div>

            {/* Vehicle Class */}
            <div className="space-y-2">
              <Label htmlFor="vehicleClass">
                Vehicle Class <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="vehicleClass"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={errors.vehicleClass ? 'border-red-500' : ''}
                      onBlur={() => trigger('vehicleClass')}
                    >
                      <SelectValue placeholder="Select vehicle class" />
                    </SelectTrigger>
                    <SelectContent>
                      {VEHICLE_CLASS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.vehicleClass && (
                <p className="text-sm text-red-500">{errors.vehicleClass.message}</p>
              )}
            </div>

            {/* Make */}
            <div className="space-y-2">
              <Label htmlFor="make">
                Make <span className="text-red-500">*</span>
              </Label>
              <Input
                id="make"
                {...register('make')}
                className={errors.make ? 'border-red-500' : ''}
                onBlur={() => trigger('make')}
              />
              {errors.make && (
                <p className="text-sm text-red-500">{errors.make.message}</p>
              )}
            </div>

            {/* Model */}
            <div className="space-y-2">
              <Label htmlFor="model">
                Model <span className="text-red-500">*</span>
              </Label>
              <Input
                id="model"
                {...register('model')}
                className={errors.model ? 'border-red-500' : ''}
                onBlur={() => trigger('model')}
              />
              {errors.model && (
                <p className="text-sm text-red-500">{errors.model.message}</p>
              )}
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label htmlFor="year">
                Year <span className="text-red-500">*</span>
              </Label>
              <Input
                id="year"
                type="number"
                {...register('year')}
                className={errors.year ? 'border-red-500' : ''}
                onBlur={() => trigger('year')}
              />
              {errors.year && (
                <p className="text-sm text-red-500">{errors.year.message}</p>
              )}
            </div>

            {/* VIN */}
            <div className="space-y-2">
              <Label htmlFor="vin">VIN</Label>
              <Input
                id="vin"
                {...register('vin')}
                className={errors.vin ? 'border-red-500' : ''}
              />
              {errors.vin && (
                <p className="text-sm text-red-500">{errors.vin.message}</p>
              )}
            </div>

            {/* Plate Number */}
            <div className="space-y-2">
              <Label htmlFor="plateNumber">
                Plate Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="plateNumber"
                {...register('plateNumber')}
                className={errors.plateNumber ? 'border-red-500' : ''}
                onBlur={() => trigger('plateNumber')}
              />
              {errors.plateNumber && (
                <p className="text-sm text-red-500">{errors.plateNumber.message}</p>
              )}
            </div>

            {/* Base Location */}
            <div className="space-y-2">
              <Label htmlFor="baseLocation">
                Base Location <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="baseLocation"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={errors.baseLocation ? 'border-red-500' : ''}
                      onBlur={() => trigger('baseLocation')}
                    >
                      <SelectValue placeholder="Select base location" />
                    </SelectTrigger>
                    <SelectContent>
                      {BASE_LOCATION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.baseLocation && (
                <p className="text-sm text-red-500">{errors.baseLocation.message}</p>
              )}
            </div>

            {/* Seating Capacity */}
            <div className="space-y-2">
              <Label htmlFor="seatingCapacity">Seating Capacity</Label>
              <Input
                id="seatingCapacity"
                type="number"
                {...register('seatingCapacity')}
                className={errors.seatingCapacity ? 'border-red-500' : ''}
              />
              {errors.seatingCapacity && (
                <p className="text-sm text-red-500">{errors.seatingCapacity.message}</p>
              )}
            </div>

            {/* Bariatric Capacity */}
            <div className="space-y-2">
              <Label htmlFor="bariatricCapacity">Bariatric Capacity (lbs)</Label>
              <Input
                id="bariatricCapacity"
                type="number"
                {...register('bariatricCapacity')}
                className={errors.bariatricCapacity ? 'border-red-500' : ''}
              />
              {errors.bariatricCapacity && (
                <p className="text-sm text-red-500">{errors.bariatricCapacity.message}</p>
              )}
            </div>

            {/* Insurance Expiry Date */}
            <div className="space-y-2">
              <Label htmlFor="insuranceExpiryDate">Insurance Expiry Date</Label>
              <Input
                id="insuranceExpiryDate"
                type="date"
                {...register('insuranceExpiryDate')}
                className={errors.insuranceExpiryDate ? 'border-red-500' : ''}
              />
              {errors.insuranceExpiryDate && (
                <p className="text-sm text-red-500">{errors.insuranceExpiryDate.message}</p>
              )}
            </div>

            {/* Registration Expiry Date */}
            <div className="space-y-2">
              <Label htmlFor="registrationExpiryDate">Registration Expiry Date</Label>
              <Input
                id="registrationExpiryDate"
                type="date"
                {...register('registrationExpiryDate')}
                className={errors.registrationExpiryDate ? 'border-red-500' : ''}
              />
              {errors.registrationExpiryDate && (
                <p className="text-sm text-red-500">{errors.registrationExpiryDate.message}</p>
              )}
            </div>
          </div>

          {/* Active Status */}
          <div className="space-y-2">
            <Controller
              name="activeStatus"
              control={control}
              render={({ field }) => (
                <FormCheckbox
                  id="activeStatus"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  label="Active Status"
                />
              )}
            />
          </div>

          {/* Has Lift or Ramp */}
          <div className="space-y-2">
            <Controller
              name="hasLiftOrRamp"
              control={control}
              render={({ field }) => (
                <FormCheckbox
                  id="hasLiftOrRamp"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  label="Has Lift or Ramp"
                />
              )}
            />
          </div>

          {/* ADA Compliant */}
          <div className="space-y-2">
            <Controller
              name="adaCompliant"
              control={control}
              render={({ field }) => (
                <FormCheckbox
                  id="adaCompliant"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  label="ADA Compliant"
                />
              )}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              rows={4}
              className={errors.notes ? 'border-red-500' : ''}
              placeholder="Additional notes about the vehicle..."
            />
            {errors.notes && (
              <p className="text-sm text-red-500">{errors.notes.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

