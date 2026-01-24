import { Input } from '@/components/ui/input'
import { ReactNode } from 'react'

interface TableSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  filters?: ReactNode
}

export function TableSearch({ 
  value, 
  onChange, 
  placeholder = "Search all columns...",
  filters
}: TableSearchProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <Input
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        className="flex-1 min-w-[200px]"
      />
      {filters && (
        <div className="flex items-center gap-2 flex-wrap">
          {filters}
        </div>
      )}
    </div>
  )
}

