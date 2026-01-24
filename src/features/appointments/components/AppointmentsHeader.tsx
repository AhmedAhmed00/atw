import { Calendar, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ViewMode = 'grid' | 'calendar'

interface AppointmentsHeaderProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export function AppointmentsHeader({ viewMode, onViewModeChange }: AppointmentsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-primary">
              Patient Appointments Management 
            </h1>
          </div>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className={`gap-2 ${
              viewMode === 'grid'
                ? 'bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90'
                : 'hover:bg-accent'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Grid View
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('calendar')}
            className={`gap-2 ${
              viewMode === 'calendar'
                ? 'bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90'
                : 'hover:bg-accent'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Calendar View
          </Button>
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-400 ml-[60px] mt-2">
        Track and manage patient appointments
      </p>
    </div>
  )
}

