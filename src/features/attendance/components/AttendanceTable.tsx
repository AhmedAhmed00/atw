/**
 * AttendanceTable Component
 * Displays attendance records in a table format
 */

import { Attendance } from '../types'
import { DataTable } from '@/components/shared/table'
import { attendanceColumns } from './AttendanceTableColumns'

interface AttendanceTableProps {
  attendance: Attendance[]
}

export function AttendanceTable({ attendance }: AttendanceTableProps) {
  return <DataTable columns={attendanceColumns} data={attendance} />
}

