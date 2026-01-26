/**
 * useTableFilters Hook
 * Manages table filtering state and logic
 */

import { useState, useMemo } from 'react'

export interface FilterConfig<T> {
  [key: string]: {
    value: string | string[] | null
    filterFn: (item: T, value: string | string[]) => boolean
  }
}

export function useTableFilters<T>(
  data: T[],
  filterConfig: FilterConfig<T>
) {
  const [filters, setFilters] = useState<Record<string, string | string[] | null>>({})

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return true
        }

        const config = filterConfig[key]
        if (!config) return true

        return config.filterFn(item, value)
      })
    })
  }, [data, filters, filterConfig])

  const setFilter = (key: string, value: string | string[] | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const clearFilter = (key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      delete newFilters[key]
      return newFilters
    })
  }

  const clearAllFilters = () => {
    setFilters({})
  }

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== null && value !== '' && (!Array.isArray(value) || value.length > 0)
  )

  return {
    filteredData,
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
  }
}

