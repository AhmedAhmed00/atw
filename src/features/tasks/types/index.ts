/**
 * Task Management Types
 */

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'overdue'
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'
export type TaskCategory = 'active-response' | 'vehicle-maintenance' | 'shift' | 'alert' | 'other'

export interface Task {
  id: string
  title: string
  description?: string
  assignedCrew: string[]
  dueDate: string // ISO date string
  shiftDate?: string // ISO date string for shift-related tasks
  status: TaskStatus
  priority: TaskPriority
  category: TaskCategory
  createdAt: string
  updatedAt: string
  completedAt?: string
}

export interface TaskStats {
  activeResponses: number
  vehicleMaintenance: number
  completedShifts: number
  criticalAlerts: number
}

export type SortOption = 'urgency' | 'date' | 'priority' | 'status'
export type DateFilter = 'all' | 'today' | 'this-week' | 'this-month' | 'custom'
