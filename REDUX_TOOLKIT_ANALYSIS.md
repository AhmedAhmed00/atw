# Redux Toolkit Integration Analysis

## Current State Management

Your project currently uses:
- **React Context API** for authentication (`AuthContext`)
- **React Context** for calendar state (`CalendarContext`)
- **React Query** (`@tanstack/react-query`) for server state
- **Local State** (`useState`) in components
- **Mock Data** in static files

## Parts That Should Use Redux Toolkit

### 🔴 **HIGH PRIORITY** - Strong Candidates for Redux Toolkit

#### 1. **Authentication State** (`src/contexts/AuthContext.tsx`)
**Why:**
- Currently using Context API
- Used across entire application
- Needs to persist across page refreshes
- Multiple components need access (sidebar, protected routes, etc.)

**Redux Benefits:**
- Better DevTools support
- Time-travel debugging
- Middleware for token refresh, logging
- Easier to test

**Implementation:**
```typescript
// store/slices/authSlice.ts
- user state
- isAuthenticated
- isLoading
- login action (async thunk)
- logout action
- refreshToken action
```

---

#### 2. **Patient Data** (`src/features/clients/`)
**Why:**
- Shared across multiple pages (PatientsPage, PatientDetailPage)
- Needs to be updated from multiple places
- Filtering, sorting, pagination state
- Currently using mock data that could be centralized

**Redux Benefits:**
- Single source of truth
- Avoid prop drilling
- Cache patient data across navigation
- Optimistic updates

**Implementation:**
```typescript
// store/slices/patientsSlice.ts
- patients list
- selected patient
- filters (status, condition, region)
- pagination
- fetchPatients thunk
- updatePatient thunk
- addPatient thunk
```

---

#### 3. **Trips Data** (`src/features/clients/components/PatientTrips.tsx`)
**Why:**
- Shared between dashboard and patient detail pages
- Real-time updates needed (live tracking)
- Complex state (filters, status, scheduling)
- Currently regenerated on each render

**Redux Benefits:**
- Centralized trip management
- Real-time sync across components
- Optimistic updates for status changes
- Better performance (avoid regenerating data)

**Implementation:**
```typescript
// store/slices/tripsSlice.ts
- trips list
- active trips
- scheduled trips
- filters (date, status, driver, vehicle)
- fetchTrips thunk
- updateTripStatus thunk
- createTrip thunk
```

---

#### 4. **Appointments** (`src/features/appointments/`)
**Why:**
- Complex state management (status changes, conversations)
- Shared between calendar and list views
- Real-time updates needed
- Multiple filters and sorting options

**Redux Benefits:**
- Sync between calendar and list views
- Optimistic updates
- Better state management for status changes
- Conversation state management

**Implementation:**
```typescript
// store/slices/appointmentsSlice.ts
- appointments list
- selected appointment
- filters (status, date, patient)
- conversations
- fetchAppointments thunk
- updateAppointmentStatus thunk
- addConversationMessage thunk
```

---

#### 5. **Fleet/Vehicle State** (`src/features/dashboard/components/LiveFleetTracking.tsx`)
**Why:**
- Real-time location tracking
- Shared across dashboard and fleet management
- Complex state (vehicles, drivers, locations)
- Needs frequent updates

**Redux Benefits:**
- WebSocket integration via middleware
- Real-time state updates
- Centralized vehicle status
- Better performance for map rendering

**Implementation:**
```typescript
// store/slices/fleetSlice.ts
- vehicles list
- active vehicles
- vehicle locations (real-time)
- vehicle health status
- fetchVehicles thunk
- updateVehicleLocation action (via WebSocket)
```

---

### 🟡 **MEDIUM PRIORITY** - Consider Redux Toolkit

#### 6. **Dashboard Stats** (`src/features/dashboard/`)
**Why:**
- Multiple components need same data
- Could benefit from caching
- Currently using mock data

**Redux Benefits:**
- Cache stats data
- Avoid duplicate API calls
- Centralized stats management

**Implementation:**
```typescript
// store/slices/dashboardSlice.ts
- stats (upcoming appointments, revenue, etc.)
- charts data
- fetchDashboardStats thunk
```

---

#### 7. **Employees Data** (`src/features/employees/`)
**Why:**
- Shared across multiple pages
- Needs filtering and sorting
- Approval workflows

**Redux Benefits:**
- Centralized employee management
- Approval state management
- Better state for complex workflows

---

#### 8. **Payments/Transactions** (`src/features/payments/`)
**Why:**
- Financial data needs careful state management
- Multiple filters and sorting
- Transaction history

**Redux Benefits:**
- Better state management for financial data
- Transaction history caching
- Filter state management

---

### 🟢 **LOW PRIORITY** - Keep Current Approach

#### 9. **UI State** (modals, dropdowns, forms)
**Why:**
- Local to components
- Doesn't need to be shared
- Current approach (useState) is fine

**Recommendation:** Keep using `useState` or local state

---

#### 10. **Theme** (`src/components/theme-provider.tsx`)
**Why:**
- Simple state
- Already works well with Context
- Not complex enough for Redux

**Recommendation:** Keep using Context API

---

#### 11. **Calendar View State** (`src/features/calendar/contexts/calendar-context.tsx`)
**Why:**
- Local to calendar feature
- Doesn't need to be shared widely
- Context API is sufficient

**Recommendation:** Keep using Context API or migrate to Redux if you need better DevTools

---

## Recommended Redux Toolkit Structure

```
src/
├── store/
│   ├── index.ts                 # Store configuration
│   ├── hooks.ts                 # Typed hooks (useAppDispatch, useAppSelector)
│   └── slices/
│       ├── authSlice.ts         # Authentication
│       ├── patientsSlice.ts     # Patient data
│       ├── tripsSlice.ts        # Trips data
│       ├── appointmentsSlice.ts # Appointments
│       ├── fleetSlice.ts        # Fleet/Vehicles
│       ├── dashboardSlice.ts    # Dashboard stats
│       ├── employeesSlice.ts    # Employees
│       └── paymentsSlice.ts     # Payments
└── features/
    └── [features use selectors and dispatch]
```

---

## Migration Strategy

### Phase 1: Foundation
1. Install Redux Toolkit
2. Set up store configuration
3. Create typed hooks

### Phase 2: Authentication (Easiest Migration)
1. Migrate `AuthContext` to `authSlice`
2. Update all `useAuth()` calls to use Redux selectors
3. Remove `AuthContext`

### Phase 3: Core Data (High Impact)
1. Migrate patient data
2. Migrate trips data
3. Migrate appointments

### Phase 4: Real-time Features
1. Set up WebSocket middleware for fleet tracking
2. Migrate fleet state

### Phase 5: Remaining Features
1. Dashboard stats
2. Employees
3. Payments

---

## Redux Toolkit vs React Query

**Use Redux Toolkit for:**
- Client-side state (UI state, filters, selections)
- Complex state logic
- State that needs to be shared across many components
- State that needs time-travel debugging
- State that needs middleware

**Keep React Query for:**
- Server state (API data)
- Caching and refetching
- Background updates
- Optimistic updates for server mutations

**Best Practice:** Use both together!
- Redux Toolkit for client state
- React Query for server state
- Redux Toolkit can dispatch actions that trigger React Query refetches

---

## Installation

```bash
npm install @reduxjs/toolkit react-redux
```

## Example Store Setup

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import patientsReducer from './slices/patientsSlice'
import tripsReducer from './slices/tripsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer,
    trips: tripsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

---

## Summary

**Start with Redux Toolkit for:**
1. ✅ Authentication (replace Context)
2. ✅ Patient Data (shared across pages)
3. ✅ Trips Data (real-time updates needed)
4. ✅ Appointments (complex state)
5. ✅ Fleet/Vehicle State (real-time tracking)

**Keep current approach for:**
- UI state (modals, dropdowns)
- Theme (simple Context is fine)
- Calendar view state (unless you need DevTools)

**Use React Query alongside Redux Toolkit:**
- React Query for server state (API calls)
- Redux Toolkit for client state (filters, selections, UI state)

