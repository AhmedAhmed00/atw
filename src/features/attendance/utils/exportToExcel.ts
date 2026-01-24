/**
 * Export Attendance to Excel/CSV
 * Utility function to export attendance records to Excel-compatible format
 */

import { Attendance } from '../types'
import { mockEmployees } from '@/features/employees/data/mockEmployees'

/**
 * Converts attendance records to CSV format
 * CSV files can be opened directly in Excel
 */
export function exportAttendanceToCSV(attendance: Attendance[]): void {
  // Get employee names map for lookup
  const employeeMap = new Map(mockEmployees.map(emp => [emp.id, emp.name]))

  // CSV Headers
  const headers = [
    'Employee Name',
    'Date',
    'Clock In',
    'Clock Out',
    'Breaks (minutes)',
    'Total Hours',
    'Overtime (hours)',
    'Status',
    'Reason / Notes',
  ]

  // Convert attendance records to CSV rows
  const rows = attendance.map((record) => {
    const employeeName = employeeMap.get(record.employeeId) || record.employeeName
    const breaksTotal = record.breaks.reduce((sum, b) => sum + b.duration, 0)
    
    return [
      employeeName,
      new Date(record.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      record.clockIn || 'N/A',
      record.clockOut || 'N/A',
      breaksTotal.toString(),
      record.totalHours.toFixed(1),
      record.overtime.toFixed(1),
      record.status.charAt(0).toUpperCase() + record.status.slice(1).replace('-', ' '),
      (record.reason || record.notes || '').replace(/,/g, ';'), // Replace commas to avoid CSV issues
    ]
  })

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n')

  // Add BOM for UTF-8 to ensure Excel opens it correctly
  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })

  // Create download link
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  
  // Generate filename with current date
  const now = new Date()
  const dateStr = now.toISOString().split('T')[0]
  link.setAttribute('download', `attendance-report-${dateStr}.csv`)
  
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Clean up
  URL.revokeObjectURL(url)
}

/**
 * Exports attendance to Excel format using SheetJS (xlsx library)
 * This requires the xlsx package to be installed: npm install xlsx
 * 
 * For now, we'll use CSV export which Excel can open directly.
 * To use true Excel format, uncomment this function and install xlsx:
 * 
 * import * as XLSX from 'xlsx'
 * 
 * export function exportAttendanceToExcel(attendance: Attendance[]): void {
 *   const employeeMap = new Map(mockEmployees.map(emp => [emp.id, emp.name]))
 *   
 *   const worksheetData = attendance.map((record) => {
 *     const employeeName = employeeMap.get(record.employeeId) || record.employeeName
 *     const breaksTotal = record.breaks.reduce((sum, b) => sum + b.duration, 0)
 *     
 *     return {
 *       'Employee Name': employeeName,
 *       'Date': new Date(record.date).toLocaleDateString(),
 *       'Clock In': record.clockIn || 'N/A',
 *       'Clock Out': record.clockOut || 'N/A',
 *       'Breaks (minutes)': breaksTotal,
 *       'Total Hours': record.totalHours,
 *       'Overtime (hours)': record.overtime,
 *       'Status': record.status,
 *       'Reason / Notes': record.reason || record.notes || '',
 *     }
 *   })
 *   
 *   const worksheet = XLSX.utils.json_to_sheet(worksheetData)
 *   const workbook = XLSX.utils.book_new()
 *   XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance')
 *   
 *   const dateStr = new Date().toISOString().split('T')[0]
 *   XLSX.writeFile(workbook, `attendance-report-${dateStr}.xlsx`)
 * }
 */

/**
 * Main export function - currently uses CSV format
 * CSV files can be opened directly in Excel
 */
export function exportAttendanceToExcel(attendance: Attendance[]): void {
  exportAttendanceToCSV(attendance)
}

