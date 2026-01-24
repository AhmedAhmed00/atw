import { ColumnDef } from '@tanstack/react-table'
import { ReactNode } from 'react'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filters?: ReactNode
}

export interface SortableHeaderProps {
  column: any
  children: React.ReactNode
}

