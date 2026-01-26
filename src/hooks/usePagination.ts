/**
 * usePagination Hook
 * Manages pagination state and logic
 */

import { useState, useMemo } from 'react'
import { APP_CONFIG } from '@/constants/config'

export interface UsePaginationOptions {
  initialPage?: number
  initialPageSize?: number
}

export function usePagination<T>(
  data: T[],
  options: UsePaginationOptions = {}
) {
  const { initialPage = 1, initialPageSize = APP_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE } = options

  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    return data.slice(startIndex, endIndex)
  }, [data, page, pageSize])

  const totalPages = Math.ceil(data.length / pageSize)
  const totalItems = data.length

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const goToFirstPage = () => {
    setPage(1)
  }

  const goToLastPage = () => {
    setPage(totalPages)
  }

  const changePageSize = (newPageSize: number) => {
    setPageSize(newPageSize)
    setPage(1) // Reset to first page when changing page size
  }

  return {
    paginatedData,
    page,
    pageSize,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    changePageSize,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}

