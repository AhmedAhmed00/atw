/**
 * TasksTable Component
 * Displays tasks in a table format
 */

import { Task } from '../types'
import { DataTable } from '@/components/shared/table'
import { tasksColumns } from './TasksTableColumns'
import { Card, CardContent } from '@/components/ui/card'
import { DateFilter, SortSelector } from './index'
import { DateFilter as DateFilterType, SortOption } from '../types'

interface TasksTableProps {
  tasks: Task[]
  dateFilter: DateFilterType
  onDateFilterChange: (filter: DateFilterType) => void
  sortOption: SortOption
  onSortChange: (sort: SortOption) => void
}

export function TasksTable({ 
  tasks, 
  dateFilter, 
  onDateFilterChange, 
  sortOption, 
  onSortChange 
}: TasksTableProps) {
  return (
    <Card className="border-none bg-transparent shadow-none hover:shadow-none">
      <CardContent className="px-0">
        <DataTable 
          columns={tasksColumns} 
          data={tasks}
          filters={
            <>
              <DateFilter value={dateFilter} onChange={onDateFilterChange} />
              <SortSelector value={sortOption} onChange={onSortChange} />
            </>
          }
        />
      </CardContent>
    </Card>
  )
}

