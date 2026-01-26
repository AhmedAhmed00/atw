/**
 * Patients API Service
 * API calls for patient-related operations
 */

import { apiClient } from './client'
import { mockPatientsData } from '@/features/clients/data/mockPatientsData'
import { logger } from '@/utils/logger'

// In development, use mock data. In production, use real API
const USE_MOCK_DATA = import.meta.env.DEV

export interface Patient {
  id: string
  name: string
  nationalId: string
  condition: string
  region: string
  trips: number
  balance: number
  status: string
  [key: string]: unknown
}

export interface CreatePatientData {
  // Add patient creation fields
  [key: string]: unknown
}

export interface UpdatePatientData {
  // Add patient update fields
  [key: string]: unknown
}

class PatientsService {
  async getAll(): Promise<Patient[]> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for getAll patients')
      await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay
      return mockPatientsData
    }

    try {
      const response = await apiClient.get<Patient[]>('/patients')
      return response.data
    } catch (error) {
      logger.error('Failed to fetch patients', error)
      throw error
    }
  }

  async getById(id: string): Promise<Patient> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for getById patient', { id })
      await new Promise((resolve) => setTimeout(resolve, 300))
      const patient = mockPatientsData.find((p) => p.id === id)
      if (!patient) {
        throw new Error('Patient not found')
      }
      return patient as Patient
    }

    try {
      const response = await apiClient.get<Patient>(`/patients/${id}`)
      return response.data
    } catch (error) {
      logger.error('Failed to fetch patient', { id, error })
      throw error
    }
  }

  async create(data: CreatePatientData): Promise<Patient> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for create patient', data)
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        id: `patient-${Date.now()}`,
        ...data,
      } as Patient
    }

    try {
      const response = await apiClient.post<Patient>('/patients', data)
      return response.data
    } catch (error) {
      logger.error('Failed to create patient', { data, error })
      throw error
    }
  }

  async update(id: string, data: UpdatePatientData): Promise<Patient> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for update patient', { id, data })
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        id,
        ...data,
      } as Patient
    }

    try {
      const response = await apiClient.put<Patient>(`/patients/${id}`, data)
      return response.data
    } catch (error) {
      logger.error('Failed to update patient', { id, data, error })
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for delete patient', { id })
      await new Promise((resolve) => setTimeout(resolve, 300))
      return
    }

    try {
      await apiClient.delete(`/patients/${id}`)
    } catch (error) {
      logger.error('Failed to delete patient', { id, error })
      throw error
    }
  }

  async export(format: 'csv' | 'excel' = 'excel'): Promise<Blob> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for export patients', { format })
      await new Promise((resolve) => setTimeout(resolve, 500))
      // Return mock blob
      return new Blob(['Mock export data'], { type: 'application/vnd.ms-excel' })
    }

    try {
      const response = await fetch(`${apiClient['baseURL']}/patients/export?format=${format}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return await response.blob()
    } catch (error) {
      logger.error('Failed to export patients', { format, error })
      throw error
    }
  }

  async import(file: File): Promise<{ success: number; failed: number }> {
    if (USE_MOCK_DATA) {
      logger.debug('Using mock data for import patients', { fileName: file.name })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { success: 10, failed: 0 }
    }

    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await apiClient.post<{ success: number; failed: number }>('/patients/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      logger.error('Failed to import patients', { fileName: file.name, error })
      throw error
    }
  }
}

export const patientsService = new PatientsService()

