import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/authentication/slices/authSlice'
import patientsReducer from './slices/patientsSlice'
import tripsReducer from './slices/tripsSlice'
import dashboardReducer from '@/features/dashboard/slices/dashboardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer,
    trips: tripsReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


