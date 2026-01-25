/**
 * Step 5: Vehicle Credentials
 */

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Lock } from 'lucide-react'
import { AddVehicleFormData } from '../../../schemas/addVehicleSchema'
// StepErrorSummary will be handled inline with individual field errors

export function Step5Credentials() {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<AddVehicleFormData>()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
          Vehicle Credentials
        </h2>
        <p className="text-muted-foreground mt-1">
          Create login credentials for vehicle access to the app
        </p>
      </div>

      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> These credentials will allow the vehicle to access the
          application. Make sure to keep them secure.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Access Credentials</CardTitle>
          <CardDescription>
            Create login credentials for vehicle access to the app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">
                Username <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                {...register('username')}
                className={errors.username ? 'border-red-500' : ''}
                onBlur={() => trigger('username')}
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className={errors.password ? 'border-red-500' : ''}
                onBlur={() => trigger('password')}
                placeholder="Enter password (min. 8 characters)"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

