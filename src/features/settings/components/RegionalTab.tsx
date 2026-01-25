/**
 * RegionalTab Component
 * Regional & Localization Settings
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'Arabic' },
  { value: 'fr', label: 'French' },
]

const TIMEZONES = [
  { value: 'Africa/Cairo', label: 'Africa/Cairo (GMT+2)' },
  { value: 'UTC', label: 'UTC (GMT+0)' },
  { value: 'America/New_York', label: 'America/New_York (GMT-5)' },
]

const DATE_FORMATS = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
]

const TIME_FORMATS = [
  { value: '12h', label: '12 Hour (AM/PM)' },
  { value: '24h', label: '24 Hour' },
]

const CURRENCIES = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EGP', label: 'EGP (E£)' },
  { value: 'EUR', label: 'EUR (€)' },
]

const DISTANCE_UNITS = [
  { value: 'miles', label: 'Miles' },
  { value: 'kilometers', label: 'Kilometers' },
]

export function RegionalTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#05647A] dark:text-[#09B0B6]">
          Regional & Localization Settings
        </h2>
        <p className="text-muted-foreground mt-1">
          Configure language, timezone, and regional preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Localization Preferences</CardTitle>
          <CardDescription>Set default language, timezone, and format preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Default Language */}
            <div className="space-y-2">
              <Label htmlFor="defaultLanguage">Default Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="defaultLanguage">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Zone */}
            <div className="space-y-2">
              <Label htmlFor="timeZone">Time Zone</Label>
              <Select defaultValue="Africa/Cairo">
                <SelectTrigger id="timeZone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Format */}
            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select defaultValue="DD/MM/YYYY">
                <SelectTrigger id="dateFormat">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  {DATE_FORMATS.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Format */}
            <div className="space-y-2">
              <Label htmlFor="timeFormat">Time Format</Label>
              <Select defaultValue="24h">
                <SelectTrigger id="timeFormat">
                  <SelectValue placeholder="Select time format" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_FORMATS.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Currency */}
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="EGP">
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((curr) => (
                    <SelectItem key={curr.value} value={curr.value}>
                      {curr.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Distance Unit */}
            <div className="space-y-2">
              <Label htmlFor="distanceUnit">Distance Unit</Label>
              <Select defaultValue="kilometers">
                <SelectTrigger id="distanceUnit">
                  <SelectValue placeholder="Select distance unit" />
                </SelectTrigger>
                <SelectContent>
                  {DISTANCE_UNITS.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

