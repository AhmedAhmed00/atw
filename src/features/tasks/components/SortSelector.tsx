/**
 * SortSelector Component
 * Sort tasks by urgency or date
 */

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { ArrowUpDown } from 'lucide-react'
import { SortOption } from '../types'

interface SortSelectorProps {
  value: SortOption
  onChange: (sort: SortOption) => void
}

export function SortSelector({ value, onChange }: SortSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="sort-selector" className="text-sm font-medium flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4" />
        Sort by:
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="sort-selector" className="w-[180px]">
          <SelectValue placeholder="Select sort option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="urgency">Urgency</SelectItem>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="priority">Priority</SelectItem>
          <SelectItem value="status">Status</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

