import { Employee, EmployeeStats, PendingApproval, PendingApprovalStats } from '../types'

export function calculateEmployeeStats(employees: Employee[]): EmployeeStats {
  return {
    total: employees.length,
    active: employees.filter(emp => emp.status === 'active').length,
    onLeave: employees.filter(emp => emp.status === 'on-leave').length,
    pendingApprovals: employees.filter(emp => emp.status === 'pending').length,
  }
}

export function calculatePendingApprovalStats(approvals: PendingApproval[]): PendingApprovalStats {
  return {
    pendingReview: approvals.filter(approval => approval.status === 'pending').length,
    partiallyApproved: approvals.filter(approval => approval.status === 'approved').length,
    totalPending: approvals.length,
  }
}

