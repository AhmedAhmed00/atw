/**
 * AttendancePage Component
 * Main attendance management page with table and calendar views
 */

import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { ClipboardCheck, Table2, CalendarDays, Plus, FileDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  AttendanceTable,
  AttendanceCalendarView,
  PeriodFilter,
  filterAttendanceByPeriod,
  type PeriodFilterType,
} from './components'
import { mockAttendance } from './data/mockData'
import { exportAttendanceToExcel } from './utils/exportToExcel'

type ViewMode = 'table' | 'calendar'

export function AttendancePage() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [periodFilter, setPeriodFilter] = useState<PeriodFilterType>('all')

  // Filter attendance based on selected period
  const filteredAttendance = useMemo(() => {
    return filterAttendanceByPeriod(mockAttendance, periodFilter)
  }, [periodFilter])

  const handleExportReport = () => {
    exportAttendanceToExcel(filteredAttendance)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Employee Attendance"
          description="Track and manage employee attendance records"
          icon={ClipboardCheck}
        />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate('/attendance/adjustment')}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Manual Adjustment
          </Button>
          <Button
            onClick={handleExportReport}
            className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
          >
            <FileDown className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* View Toggle and Period Filter */}
      <div className="flex items-center justify-between gap-4">
        <PeriodFilter value={periodFilter} onChange={setPeriodFilter} />
        
        <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('table')}
            className="gap-2"
          >
            <Table2 className="h-4 w-4" />
            Table View
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('calendar')}
            className="gap-2"
          >
            <CalendarDays className="h-4 w-4" />
            Calendar View
          </Button>
        </div>
      </div>

      {/* Table or Calendar View */}
      {viewMode === 'table' ? (
        <Card className="border-none bg-transparent shadow-none hover:shadow-none">
          <CardContent className="px-0">
            <AttendanceTable attendance={filteredAttendance} />
          </CardContent>
        </Card>
      ) : (
        <Card className="border-t-4 border-t-[#05647A]">
          <CardContent>
            <AttendanceCalendarView attendance={filteredAttendance} />
          </CardContent>
        </Card>
      )}

    </div>
  )
}

export default AttendancePage
