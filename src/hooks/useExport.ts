/**
 * useExport Hook
 * Handles data export functionality (CSV, Excel)
 */

import { useState } from 'react'
import { logger } from '@/utils/logger'

export type ExportFormat = 'csv' | 'excel'

interface ExportOptions {
  filename?: string
  headers?: string[]
}

export function useExport<T extends Record<string, unknown>>() {
  const [isExporting, setIsExporting] = useState(false)

  const exportToCSV = async (
    data: T[],
    options: ExportOptions = {}
  ): Promise<void> => {
    setIsExporting(true)
    try {
      const { filename = 'export', headers } = options

      // Get headers from first object if not provided
      const csvHeaders = headers || Object.keys(data[0] || {})

      // Create CSV content
      const csvContent = [
        csvHeaders.join(','),
        ...data.map((row) =>
          csvHeaders.map((header) => {
            const value = row[header]
            // Escape commas and quotes
            const stringValue = String(value ?? '')
            if (stringValue.includes(',') || stringValue.includes('"')) {
              return `"${stringValue.replace(/"/g, '""')}"`
            }
            return stringValue
          }).join(',')
        ),
      ].join('\n')

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${filename}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      logger.info('Data exported to CSV', { filename, rowCount: data.length })
    } catch (error) {
      logger.error('Failed to export to CSV', error)
      throw error
    } finally {
      setIsExporting(false)
    }
  }

  const exportToExcel = async (
    data: T[],
    options: ExportOptions = {}
  ): Promise<void> => {
    setIsExporting(true)
    try {
      // For Excel export, we'd typically use a library like xlsx
      // For now, we'll create a simple CSV that Excel can open
      await exportToCSV(data, { ...options, filename: options.filename || 'export' })
      logger.info('Data exported to Excel format', { filename: options.filename, rowCount: data.length })
    } catch (error) {
      logger.error('Failed to export to Excel', error)
      throw error
    } finally {
      setIsExporting(false)
    }
  }

  const exportData = async (
    data: T[],
    format: ExportFormat = 'excel',
    options: ExportOptions = {}
  ): Promise<void> => {
    if (format === 'csv') {
      await exportToCSV(data, options)
    } else {
      await exportToExcel(data, options)
    }
  }

  return {
    exportData,
    exportToCSV,
    exportToExcel,
    isExporting,
  }
}

