/**
 * API Services Barrel Export
 */

export { apiClient } from './client'
export type { ApiResponse, ApiError } from './client'

export { patientsService } from './patients'
export type { Patient, CreatePatientData, UpdatePatientData } from './patients'

export { institutionsService } from './institutions'
export type { Institution } from './institutions'

