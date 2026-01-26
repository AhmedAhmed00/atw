import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'doctor' | 'staff'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const STATIC_USERS = [
  {
    id: '1',
    email: 'admin@alltheway.com',
    password: 'admin123',
    name: 'Dr. Admin',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'doctor@All The way.com',
    password: 'doctor123',
    name: 'Dr. Smith',
    role: 'doctor' as const,
  },
]

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const foundUser = STATIC_USERS.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    )

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      }
      // Save to localStorage
      localStorage.setItem('All The way_user', JSON.stringify(userData))
      return userData
    }

    return rejectWithValue('Invalid email or password')
  }
)

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

// Load user from localStorage on initialization
const loadUserFromStorage = (): User | null => {
  if (typeof window === 'undefined') return null
  const storedUser = localStorage.getItem('All The way_user')
  if (storedUser) {
    try {
      return JSON.parse(storedUser)
    } catch (error) {
      localStorage.removeItem('All The way_user')
      return null
    }
  }
  return null
}

// Initialize with user from localStorage
const initialUser = loadUserFromStorage()

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    user: initialUser,
    isAuthenticated: !!initialUser,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('All The way_user')
    },
    clearError: (state) => {
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })
  },
})

export const { logout, clearError, setLoading } = authSlice.actions
export default authSlice.reducer

