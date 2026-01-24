# Working Hours Feature

A modular and clean feature module for managing working hours and schedules.

## 📁 Structure

```
working-hours/
├── components/          # UI Components
│   ├── DayScheduleRow.tsx      # Main container component
│   ├── DayHeader.tsx           # Day name and icon display
│   ├── TimeDisplay.tsx         # Time slot display component
│   ├── TimeSlotEditor.tsx      # Time slot editing form
│   ├── TimeSlotDisplay.tsx     # Time slot read-only view
│   └── index.ts                # Component exports
├── constants/          # Feature constants
│   └── day-colors.ts           # Color scheme definitions
├── utils/              # Feature-specific utilities
│   └── index.ts                # Helper functions
└── types/              # TypeScript types
    └── validation.ts           # Form validation schemas
```

## 🧩 Components

### DayScheduleRow
Main container component that orchestrates the day schedule display and editing.

**Props:**
- `daySchedule: DaySchedule` - The day schedule data
- `onUpdate: (updated: DaySchedule) => void` - Update handler
- `index: number` - Day index for color scheme

### DayHeader
Displays the day name, status, and icon.

**Props:**
- `day: string` - Day name
- `statusLabel: string` - Status label (Working Day/Day Off)
- `iconType: 'sun' | 'moon'` - Icon type
- `colorScheme: DayColorScheme` - Color scheme

### TimeDisplay
Displays a single time value with clock icon.

**Props:**
- `time: string` - Time in HH:MM format
- `colorScheme: DayColorScheme` - Color scheme

### TimeSlotEditor
Form component for editing time slots.

**Props:**
- `dayName: string` - Day name for field IDs
- `control: Control<TimeSlotFormData>` - React Hook Form control
- `errors: FieldErrors<TimeSlotFormData>` - Form errors
- `onSubmit: () => void` - Submit handler
- `onCancel: () => void` - Cancel handler

### TimeSlotDisplay
Read-only view of time slots with edit button.

**Props:**
- `startTime: string` - Start time
- `endTime: string` - End time
- `duration: string` - Formatted duration
- `colorScheme: DayColorScheme` - Color scheme
- `enabled: boolean` - Whether editing is enabled
- `onEdit: () => void` - Edit button handler

## 🛠️ Utilities

### Time Utils (`src/lib/time-utils.ts`)
Global time utilities usable across the application.

```typescript
// Calculate duration between two times
calculateTimeDuration(startTime: string, endTime: string): TimeDuration

// Format duration object to string
formatDuration(duration: TimeDuration): string

// Format duration from time strings
formatTimeDuration(startTime: string, endTime: string): string

// Validate time format
isValidTimeFormat(time: string): boolean

// Convert minutes to hours and minutes
minutesToHoursAndMinutes(totalMinutes: number): { hours: number, minutes: number }
```

### Feature Utils (`src/features/working-hours/utils/index.ts`)
Feature-specific helper functions.

```typescript
// Check if day is a weekday
isWeekday(dayIndex: number): boolean

// Get icon type for day
getDayIconType(dayIndex: number): 'sun' | 'moon'

// Get day status label
getDayStatusLabel(enabled: boolean): string
```

## 🎨 Constants

### Day Color Schemes (`src/features/working-hours/constants/day-colors.ts`)

```typescript
// Array of color schemes for days
DAY_COLOR_SCHEMES: DayColorScheme[]

// Get color scheme for specific day index
getDayColorScheme(index: number): DayColorScheme
```

## 📦 Usage

```typescript
import { DayScheduleRow } from '@/features/working-hours/components'

// In your component
<DayScheduleRow
  daySchedule={schedule}
  onUpdate={handleUpdate}
  index={dayIndex}
/>
```

## 🎯 Benefits

- **Modularity**: Each component has a single responsibility
- **Reusability**: Utilities can be used across the application
- **Maintainability**: Clear separation of concerns
- **Type Safety**: Full TypeScript support
- **Testability**: Small, focused functions are easier to test
- **Documentation**: Self-documenting code structure

