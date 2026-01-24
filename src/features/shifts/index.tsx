/**
 * ShiftsPage Component
 * Main shifts management page with tabs and view toggles
 */

import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Calendar, Plus, Table2, CalendarDays } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShiftsTable, ShiftsCalendarView, SwapRequestsTable, ShiftsStatsCards } from './components'
import { mockShifts, mockSwapRequests } from './data/mockData'
import { useNavigate } from 'react-router-dom'

type ViewMode = 'table' | 'calendar'

export function ShiftsPage() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [activeTab, setActiveTab] = useState('all-shifts')

  return (
    <div className="space-y-6">
      <PageHeader
        title="Shifts Management"
        description="Manage employee shifts, schedules, and swap requests"
        icon={Calendar}
        action={{
          label: 'Create New Shift',
          icon: Plus,
          onClick: () => navigate('/shifts/new'),
        }}
      />

      {/* Stats Cards */}
      <ShiftsStatsCards shifts={mockShifts} swapRequests={mockSwapRequests} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="all-shifts">All Shifts</TabsTrigger>
            <TabsTrigger value="swap-requests">Swap Requests</TabsTrigger>
          </TabsList>
          
          {/* View Toggle - Only show for All Shifts tab */}
          {activeTab === 'all-shifts' && (
            <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className={`gap-2 ${
                  viewMode === 'table'
                    ? 'bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90'
                    : 'hover:bg-accent'
                }`}
              >
                <Table2 className="h-4 w-4" />
                Table
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('calendar')}
                className={`gap-2 ${
                  viewMode === 'calendar'
                    ? 'bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90'
                    : 'hover:bg-accent'
                }`}
              >
                <CalendarDays className="h-4 w-4" />
                Calendar
              </Button>
            </div>
          )}
        </div>

        {/* All Shifts Tab */}
        <TabsContent value="all-shifts" className="space-y-4">

          {/* Table or Calendar View */}
          {viewMode === 'table' ? (
            <Card className="border-none bg-transparent shadow-none hover:shadow-none">
              <CardContent className="px-0">
                <ShiftsTable shifts={mockShifts} />
              </CardContent>
            </Card>
          ) : (
            <Card className="border-t-4 border-t-[#05647A]">
              <CardHeader>
                <CardTitle className="text-lg text-[#05647A]">Shifts Calendar</CardTitle>
                <CardDescription>
                  View shifts in a monthly calendar view
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ShiftsCalendarView shifts={mockShifts} />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Swap Requests Tab */}
        <TabsContent value="swap-requests" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Manage and review employee shift swap requests
            </div>
            <Button
              onClick={() => navigate('/shifts/swap-request/new')}
              variant="outline"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              New Swap Request
            </Button>
          </div>
          
          <Card className="border-none bg-transparent shadow-none hover:shadow-none">
            <CardContent className="px-0">
              <SwapRequestsTable swapRequests={mockSwapRequests} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ShiftsPage
