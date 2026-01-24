import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LayoutGrid, Clock, CheckCircle, CircleCheckBig, XCircle } from 'lucide-react'
import { TAB_CONFIGS } from '../constants/appointment-status'
import type { AppointmentsTabsProps, AppointmentStatus } from '../types'
import { AppointmentsSearch } from './AppointmentsSearch'

const TAB_ICONS = {
  all: LayoutGrid,
  pending: Clock,
  confirmed: CheckCircle,
  completed: CircleCheckBig,
  cancelled: XCircle,
} as const

export function AppointmentsTabs({
  searchQuery,
  setSearchQuery,
  activeTab,
  onTabChange,
  counts,
  children,
}: AppointmentsTabsProps) {
  return (
    <div>

    <Tabs  value={activeTab} onValueChange={(value) => onTabChange(value as AppointmentStatus | 'all')}>
      <div className='flex  items-center justify-between w-full gap-4'>
        
      <TabsList className=" justify-start h-auto p-1 bg-transparent rounded-xl flex-1  flex-wrap gap-2">
        {TAB_CONFIGS.map((tab) => {
          const Icon = TAB_ICONS[tab.value as keyof typeof TAB_ICONS]
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative border border-border px-6 py-3 rounded-lg font-semibold transition-all
               data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from)
                data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white
                 data-[state=active]:shadow-lg hover:bg-accent"
            >
              <div className="flex items-center justify-between w-full gap-4">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20 dark:bg-black/20">
                  {counts[tab.value as keyof typeof counts]}
                </span>
              </div>
            </TabsTrigger>
          )
        })}
        <div className='flex-1'>
         <AppointmentsSearch value={searchQuery} onChange={setSearchQuery} />
        </div>
      </TabsList>
      </div>
      <TabsContent value={activeTab} className="mt-0">
        {children}
      </TabsContent>
    </Tabs>
    </div>
  )
}

