/**
 * RoleRequirements Component
 * Dynamic array field for managing role requirements with add/remove functionality
 */

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Plus, Trash2 } from 'lucide-react'
import { RoleRequirement } from '../types'
import { availableRoles } from '../data/mockData'
import { cn } from '@/lib/utils'

interface RoleRequirementsProps {
  roleRequirements: RoleRequirement[]
  onChange: (requirements: RoleRequirement[]) => void
  disabled?: boolean
}

export function RoleRequirements({
  roleRequirements,
  onChange,
  disabled = false,
}: RoleRequirementsProps) {
  const handleAddRole = () => {
    if (disabled) return
    onChange([
      ...roleRequirements,
      {
        role: '',
        quantity: 1,
      },
    ])
  }

  const handleRemoveRole = (index: number) => {
    if (disabled) return
    onChange(roleRequirements.filter((_, i) => i !== index))
  }

  const handleRoleChange = (index: number, role: string) => {
    if (disabled) return
    const updated = [...roleRequirements]
    updated[index] = { ...updated[index], role }
    onChange(updated)
  }

  const handleQuantityChange = (index: number, quantity: number) => {
    if (disabled) return
    const updated = [...roleRequirements]
    updated[index] = { ...updated[index], quantity }
    onChange(updated)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Role Requirements</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddRole}
          disabled={disabled}
          className="h-7 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Role
        </Button>
      </div>

      {roleRequirements.length === 0 ? (
        <div className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md">
          No role requirements added. Click "Add Role" to get started.
        </div>
      ) : (
        <div className="space-y-3">
          {roleRequirements.map((requirement, index) => (
            <div
              key={index}
              className={cn(
                'flex items-end gap-3 p-3 rounded-md border',
                'border-input bg-card'
              )}
            >
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Role
                </Label>
                <Select
                  value={requirement.role}
                  onValueChange={(value) => handleRoleChange(index, value)}
                  disabled={disabled}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-24">
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Quantity
                </Label>
                <Input
                  type="number"
                  min="1"
                  value={requirement.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value) || 1)
                  }
                  disabled={disabled}
                  className="w-full"
                />
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveRole(index)}
                disabled={disabled || roleRequirements.length === 1}
                className="h-9 w-9 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

