import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Patient } from '@/features/clients/data/mockPatientsData'
import { patients } from '@/features/clients/data/mockPatientsData'

interface PatientsState {
  patients: Patient[]
  selectedPatient: Patient | null
  filters: {
    status: string | null
    condition: string | null
    region: string | null
  }
  searchQuery: string
  isLoading: boolean
  error: string | null
}

// Async thunk to fetch patients (in real app, this would be an API call)
export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      return patients
    } catch (error) {
      return rejectWithValue('Failed to fetch patients')
    }
  }
)

const initialState: PatientsState = {
  patients: [],
  selectedPatient: null,
  filters: {
    status: null,
    condition: null,
    region: null,
  },
  searchQuery: '',
  isLoading: false,
  error: null,
}

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setSelectedPatient: (state, action: PayloadAction<Patient | null>) => {
      state.selectedPatient = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.status = action.payload
    },
    setConditionFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.condition = action.payload
    },
    setRegionFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.region = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    clearFilters: (state) => {
      state.filters = {
        status: null,
        condition: null,
        region: null,
      }
      state.searchQuery = ''
    },
    updatePatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.patients[index] = action.payload
      }
      if (state.selectedPatient?.id === action.payload.id) {
        state.selectedPatient = action.payload
      }
    },
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.patients.unshift(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.isLoading = false
        state.patients = action.payload
        state.error = null
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const {
  setSelectedPatient,
  setStatusFilter,
  setConditionFilter,
  setRegionFilter,
  setSearchQuery,
  clearFilters,
  updatePatient,
  addPatient,
} = patientsSlice.actions

// Selectors
export const selectAllPatients = (state: { patients: PatientsState }) =>
  state.patients.patients

export const selectSelectedPatient = (state: { patients: PatientsState }) =>
  state.patients.selectedPatient

export const selectFilteredPatients = (state: { patients: PatientsState }) => {
  const { patients, filters, searchQuery } = state.patients
  return patients.filter((patient) => {
    const matchesStatus = !filters.status || patient.status === filters.status
    const matchesCondition =
      !filters.condition || patient.condition === filters.condition
    const matchesRegion = !filters.region || patient.region === filters.region
    const matchesSearch =
      !searchQuery ||
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.nationalId.includes(searchQuery)

    return matchesStatus && matchesCondition && matchesRegion && matchesSearch
  })
}

export default patientsSlice.reducer

