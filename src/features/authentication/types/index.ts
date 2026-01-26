export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'doctor' | 'staff'
}

export interface LoginCredentials {
  email: string
  password: string
}

