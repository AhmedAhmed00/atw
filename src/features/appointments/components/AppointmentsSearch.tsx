import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { AppointmentsSearchProps } from '../types'

export function AppointmentsSearch({ value, onChange }: AppointmentsSearchProps) {
  return (
    <div className="relative  border border-border  rounded-lg shadow-none bg-input/30 hover:bg-input/50 transition-colors duration-300   ">
      <div className="absolute  left-3 top-1/2 -translate-y-1/2 p-1  bg-[rgb(var(--brand-primary))]/10">
        <Search className="w-4 h-4 text-[rgb(var(--brand-primary))]" />
      </div>
      <Input
        type="text"
        placeholder="Search by appointment ?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-11 h-[44px] shadow-none text-base border-2 focus:border-[rgb(var(--brand-primary))] transition-colors"
      />
    </div>
  )
}

