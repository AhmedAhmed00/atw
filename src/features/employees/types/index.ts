export interface Employee {
  id: string
  name: string
  email: string
  jobTitle: string
  status: 'active' | 'on-leave' | 'pending'
  certifications: string[]
  currentShift: string | null
  department: string
  avatar?: string
  phone?: string
  hireDate: string
}

export interface EmployeeStats {
  total: number
  active: number
  onLeave: number
  pendingApprovals: number
}

export interface PendingApproval {
  id: string
  employeeId: string
  employeeName: string
  jobTitle: string
  requestType: 'leave' | 'certification' | 'shift-change' | 'department-transfer'
  status: 'pending' | 'approved' | 'rejected'
  submittedDate: string
  reviewDate?: string
  reviewer?: string
  details: string
  avatar?: string
}

export interface PendingApprovalStats {
  pendingReview: number
  partiallyApproved: number
  totalPending: number
}
