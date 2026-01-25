import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { PatientTrip } from '@/features/clients/components/PatientTrips'

interface TripsState {
  trips: PatientTrip[]
  filters: {
    status: string | null
    dateFrom: string | null
    dateTo: string | null
    driver: string | null
    vehicle: string | null
  }
  searchQuery: string
  isLoading: boolean
  error: string | null
}

// Async thunk to fetch trips (in real app, this would be an API call)
export const fetchTrips = createAsyncThunk(
  'trips/fetchTrips',
  async (patientId?: string, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      // In real app, this would fetch from API
      // For now, return empty array - will be populated by components
      return [] as PatientTrip[]
    } catch (error) {
      return rejectWithValue('Failed to fetch trips')
    }
  }
)

const initialState: TripsState = {
  trips: [],
  filters: {
    status: null,
    dateFrom: null,
    dateTo: null,
    driver: null,
    vehicle: null,
  },
  searchQuery: '',
  isLoading: false,
  error: null,
}

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setTrips: (state, action: PayloadAction<PatientTrip[]>) => {
      state.trips = action.payload
    },
    addTrip: (state, action: PayloadAction<PatientTrip>) => {
      state.trips.unshift(action.payload)
    },
    updateTrip: (state, action: PayloadAction<PatientTrip>) => {
      const index = state.trips.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        state.trips[index] = action.payload
      }
    },
    updateTripStatus: (
      state,
      action: PayloadAction<{ id: string; status: PatientTrip['status'] }>
    ) => {
      const trip = state.trips.find((t) => t.id === action.payload.id)
      if (trip) {
        trip.status = action.payload.status
      }
    },
    setStatusFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.status = action.payload
    },
    setDateRangeFilter: (
      state,
      action: PayloadAction<{ from: string | null; to: string | null }>
    ) => {
      state.filters.dateFrom = action.payload.from
      state.filters.dateTo = action.payload.to
    },
    setDriverFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.driver = action.payload
    },
    setVehicleFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.vehicle = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    clearFilters: (state) => {
      state.filters = {
        status: null,
        dateFrom: null,
        dateTo: null,
        driver: null,
        vehicle: null,
      }
      state.searchQuery = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.isLoading = false
        state.trips = action.payload
        state.error = null
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const {
  setTrips,
  addTrip,
  updateTrip,
  updateTripStatus,
  setStatusFilter,
  setDateRangeFilter,
  setDriverFilter,
  setVehicleFilter,
  setSearchQuery,
  clearFilters,
} = tripsSlice.actions

// Selectors
export const selectAllTrips = (state: { trips: TripsState }) => state.trips.trips

export const selectFilteredTrips = (state: { trips: TripsState }) => {
  const { trips, filters, searchQuery } = state.trips
  return trips.filter((trip) => {
    const matchesStatus = !filters.status || trip.status === filters.status
    const matchesDriver = !filters.driver || trip.driver === filters.driver
    const matchesVehicle = !filters.vehicle || trip.vehicle === filters.vehicle
    const matchesSearch =
      !searchQuery ||
      trip.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.service.toLowerCase().includes(searchQuery.toLowerCase())

    // Date filtering
    let matchesDate = true
    if (filters.dateFrom || filters.dateTo) {
      const tripDate = new Date(trip.dateTime)
      if (filters.dateFrom) {
        const fromDate = new Date(filters.dateFrom)
        matchesDate = matchesDate && tripDate >= fromDate
      }
      if (filters.dateTo) {
        const toDate = new Date(filters.dateTo)
        toDate.setHours(23, 59, 59, 999) // End of day
        matchesDate = matchesDate && tripDate <= toDate
      }
    }

    return matchesStatus && matchesDriver && matchesVehicle && matchesSearch && matchesDate
  })
}

export default tripsSlice.reducer

