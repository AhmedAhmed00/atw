/**
 * Support Module
 * Displays support tickets and allows management
 */

import { useState, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { lazy, Suspense } from 'react'
import { DataTable } from '@/components/shared/table' 
import { HeadsetIcon, TicketPlus, CalendarIcon, X, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { supportTicketColumns, SupportTicketDetails } from './components'
import { mockSupportTickets } from './data/mockSupport'
import { TICKET_STATUS_CONFIG } from './types'
import type { TicketStatus, SupportTicket } from './types'
import { cn } from '@/lib/utils'

// Lazy load the dialog form to reduce initial bundle size
const AddTicketDialog = lazy(() => import('./components/AddTicketDialog').then(m => ({ default: m.AddTicketDialog })))

type StatusFilter = TicketStatus | 'all'

function SupportTicketsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)
  const [showAddTicketDialog, setShowAddTicketDialog] = useState(false)
  const [tickets, setTickets] = useState<SupportTicket[]>(mockSupportTickets)

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      // Status filter
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
      
      // Date from filter
      const ticketDate = new Date(ticket.createdAt)
      const matchesDateFrom = !dateFrom || ticketDate >= dateFrom
      
      // Date to filter (include the entire end day)
      const matchesDateTo = !dateTo || ticketDate <= new Date(dateTo.getTime() + 24 * 60 * 60 * 1000 - 1)
      
      return matchesStatus && matchesDateFrom && matchesDateTo
    })
  }, [tickets, statusFilter, dateFrom, dateTo])

  // Statistics
  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'open').length,
    inProgress: tickets.filter((t) => t.status === 'in_progress').length,
    resolved: tickets.filter((t) => t.status === 'resolved').length,
  }

  const handleAddTicket = (ticketData: Partial<SupportTicket>, attachments: File[]) => {
    const newTicket: SupportTicket = {
      id: `ticket-${Date.now()}`,
      ticketNumber: `TKT-${new Date().getFullYear()}-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: ticketData.subject || '',
      description: ticketData.description || '',
      ticketType: ticketData.ticketType || 'general',
      status: 'open',
      priority: 'medium',
      clientName: 'Admin User', // In real app, get from auth
      clientEmail: 'admin@All The way.com',
      userType: 'staff',
      responsibleEmployee: 'Unassigned',
      responsibleEmployeeId: '',
      attachments: attachments.map((file, index) => ({
        id: `attach-${Date.now()}-${index}`,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        url: URL.createObjectURL(file), // In real app, upload to server
        uploadedAt: new Date().toISOString(),
      })),
      communicationLog: [
        {
          id: `log-${Date.now()}`,
          senderName: 'System',
          senderRole: 'system',
          message: 'Ticket created',
          date: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setTickets((prev) => [newTicket, ...prev])
  }

  const clearFilters = () => {
    setStatusFilter('all')
    setDateFrom(undefined)
    setDateTo(undefined)
  }

  const hasActiveFilters = statusFilter !== 'all' || dateFrom || dateTo

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-slate-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tickets</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800">
                <HeadsetIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open</p>
                <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <TicketPlus className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#63A7D8]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-[#63A7D8]">{stats.inProgress}</p>
              </div>
              <div className="p-3 rounded-full bg-[#63A7D8]/20 dark:bg-[#63A7D8]/30">
                <HeadsetIcon className="h-5 w-5 text-[#63A7D8]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.resolved}</p>
              </div>
              <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <HeadsetIcon className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4">
            {/* Title and Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
                Support Tickets
              </CardTitle>
              <Button
                onClick={() => setShowAddTicketDialog(true)}
                className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
              >
                <TicketPlus className="mr-2 h-4 w-4" />
                Add Ticket
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-end gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              

              {/* Status Filter */}
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Status</Label>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as StatusFilter)}
                >
                  <SelectTrigger className="w-[150px] h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {(Object.keys(TICKET_STATUS_CONFIG) as TicketStatus[]).map((status) => (
                      <SelectItem key={status} value={status}>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              'w-2 h-2 rounded-full',
                              status === 'open' && 'bg-blue-500',
                              status === 'in_progress' && 'bg-amber-500',
                              status === 'resolved' && 'bg-emerald-500',
                              status === 'closed' && 'bg-slate-500'
                            )}
                          />
                          {TICKET_STATUS_CONFIG[status].label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date From */}
              <div className="space-y-1.5">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[150px] h-9 justify-start text-left font-normal',
                        !dateFrom && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, 'MMM d, yyyy') : 'From date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date To */}
              <div className="space-y-1.5">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[150px] h-9 justify-start text-left font-normal',
                        !dateTo && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, 'MMM d, yyyy') : 'To date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      disabled={(date) => (dateFrom ? date < dateFrom : false)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                >
                  <X className="mr-1 h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
              <HeadsetIcon className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400">
                No tickets found with the selected filters
              </p>
              <Button
                variant="link"
                onClick={clearFilters}
                className="text-[rgb(var(--brand-primary))] mt-2"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <DataTable columns={supportTicketColumns} data={filteredTickets} />
          )}
        </CardContent>
      </Card>

      {/* Add Ticket Dialog - Lazy Loaded */}
      {showAddTicketDialog && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
            <div className="text-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#09B0B6]" />
              <p className="text-sm text-muted-foreground">Loading form...</p>
            </div>
          </div>
        }>
          <AddTicketDialog
            open={showAddTicketDialog}
            onOpenChange={setShowAddTicketDialog}
            onAddTicket={handleAddTicket}
          />
        </Suspense>
      )}
    </div>
  )
}

export default function SupportModule() {
  return (
    <Routes>
      <Route index element={<SupportTicketsPage />} />
      <Route path="details/:id" element={<SupportTicketDetails />} />
    </Routes>
  )
}
