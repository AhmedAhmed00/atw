/**
 * API Client
 * Centralized API client for making HTTP requests
 */

import { APP_CONFIG } from '@/constants/config'
import { logger } from '@/utils/logger'

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  status?: number
  errors?: Record<string, string[]>
}

class ApiClient {
  private baseURL: string
  private timeout: number

  constructor() {
    this.baseURL = APP_CONFIG.API.BASE_URL
    this.timeout = APP_CONFIG.API.TIMEOUT
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const token = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.USER)
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      }

      if (token) {
        try {
          const user = JSON.parse(token)
          if (user.token) {
            headers['Authorization'] = `Bearer ${user.token}`
          }
        } catch {
          // Token is not JSON, ignore
        }
      }

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw {
          message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          errors: errorData.errors,
        } as ApiError
      }

      const data = await response.json()
      return {
        data,
        success: true,
      }
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw {
          message: 'Request timeout',
          status: 408,
        } as ApiError
      }

      if ((error as ApiError).status) {
        throw error
      }

      logger.error('API request failed', { endpoint, error })
      throw {
        message: (error as Error).message || 'An unexpected error occurred',
        status: 500,
      } as ApiError
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()

