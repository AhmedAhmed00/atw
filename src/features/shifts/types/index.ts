export type ShiftType = 'open' | 'closed'
export type ShiftStatus = 'draft' | 'published' | 'filled' | 'completed' | 'cancelled'
export type VehicleType = 'ambulance' | 'van' | 'truck' | 'car' | 'none'
export type SwapRequestStatus = 'pending' | 'approved' | 'rejected'

export interface RoleRequirement {
  role: string
  quantity: number
}

export interface VehicleRequirement {
  vehicleType: VehicleType
}

export interface Shift {
  id: string
  shiftType: ShiftType
  shiftDate: string // ISO date string
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  workLocation: string
  hasVehicleRequirements: boolean
  vehicleTypes: VehicleType[]
  roleRequirements: RoleRequirement[]
  status: ShiftStatus
  // Open shift specific
  availableEmployees?: string[] // Employee IDs
  instructions?: string
  // Closed shift specific
  scheduleDetails?: string
  assignedEmployees?: string[] // Employee IDs
}

export interface SwapRequest {
  id: string
  employeeId: string
  employeeName: string
  currentShiftId: string
  currentShiftDate: string
  currentShiftTime: string
  proposedDate: string
  proposedStartTime: string
  proposedEndTime: string
  reason: string
  status: SwapRequestStatus
  submittedDate: string
  reviewedDate?: string
  reviewerId?: string
  reviewerName?: string
}

export interface Employee {
  id: string
  name: string
  jobTitle: string
  certifications: string[]
  vehicleTypes: VehicleType[] // Vehicles employee can operate
}
