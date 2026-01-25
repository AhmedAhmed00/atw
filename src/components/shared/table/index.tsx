import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from '@tanstack/react-table'
import { useState } from 'react'
import { TableSearch } from './TableSearch'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { TablePagination } from './TablePagination'
import type { DataTableProps } from './types'

export function DataTable<TData, TValue>({
  columns,
  data,
  filters,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  return (
    <div className="space-y-4">
      <TableSearch
        value={globalFilter}
        onChange={setGlobalFilter}
        filters={filters}
      />

      <div className="rounded-md border">
        <table className="w-full">
          <TableHeader headerGroups={table.getHeaderGroups()} />
          <TableBody
            rows={table.getRowModel().rows}
            columnsCount={columns.length}
          />
        </table>
      </div>

      <TablePagination table={table} />
    </div>
  )
}

// Re-export subcomponents
export { TableSearch } from './TableSearch'
export { TableHeader } from './TableHeader'
export { TableBody } from './TableBody'
export { TablePagination } from './TablePagination'
export { SortableHeader } from './SortableHeader'
export type { DataTableProps, SortableHeaderProps } from './types'

