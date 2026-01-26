/**
 * Institutions API Service
 */

import { apiClient } from './client'
import { mockInstitutionsData } from '@/features/clients/data/mockInstitutionsData'
import { logger } from '@/utils/logger'

const USE_MOCK_DATA = import.meta.env.DEV

export interface Institution {
  id: string
  name: string
  type: string
  region: string
  trips: number
  balance: number
  status: string
  [key: string]: unknown
}

class InstitutionsService {
  async getAll(): Promise<Institution[]> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for getAll institutions')
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockInstitutionsData.institutions
    }

    try {
      const response = await apiClient.get<Institution[]>('/institutions')
      return response.data
    } catch (error) {
      logger.error('Failed to fetch institutions', error)
      throw error
    }
  }

  async getById(id: string): Promise<Institution> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for getById institution', { id })
      await new Promise((resolve) => setTimeout(resolve, 300))
      const institution = mockInstitutionsData.institutions.find((i) => i.id === id)
      if (!institution) {
        throw new Error('Institution not found')
      }
      return institution as Institution
    }

    try {
      const response = await apiClient.get<Institution>(`/institutions/${id}`)
      return response.data
    } catch (error) {
      logger.error('Failed to fetch institution', { id, error })
      throw error
    }
  }

  async create(data: unknown): Promise<Institution> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for create institution', data)
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        id: `institution-${Date.now()}`,
        ...data,
      } as Institution
    }

    try {
      const response = await apiClient.post<Institution>('/institutions', data)
      return response.data
    } catch (error) {
      logger.error('Failed to create institution', { data, error })
      throw error
    }
  }

  async update(id: string, data: unknown): Promise<Institution> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for update institution', { id, data })
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { id, ...data } as Institution
    }

    try {
      const response = await apiClient.put<Institution>(`/institutions/${id}`, data)
      return response.data
    } catch (error) {
      logger.error('Failed to update institution', { id, data, error })
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for delete institution', { id })
      await new Promise((resolve) => setTimeout(resolve, 300))
      return
    }

    try {
      await apiClient.delete(`/institutions/${id}`)
    } catch (error) {
      logger.error('Failed to delete institution', { id, error })
      throw error
    }
  }

  async export(format: 'csv' | 'excel' = 'excel'): Promise<Blob> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for export institutions', { format })
      await new Promise((resolve) => setTimeout(resolve, 500))
      return new Blob(['Mock export data'], { type: 'application/vnd.ms-excel' })
    }

    try {
      const response = await fetch(`${apiClient['baseURL']}/institutions/export?format=${format}`, {
        method: 'GET',
      })
      return await response.blob()
    } catch (error) {
      logger.error('Failed to export institutions', { format, error })
      throw error
    }
  }

  async import(file: File): Promise<{ success: number; failed: number }> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for import institutions', { fileName: file.name })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { success: 10, failed: 0 }
    }

    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await apiClient.post<{ success: number; failed: number }>('/institutions/import', formData)
      return response.data
    } catch (error) {
      logger.error('Failed to import institutions', { fileName: file.name, error })
      throw error
    }
  }
}

export const institutionsService = new InstitutionsService()

