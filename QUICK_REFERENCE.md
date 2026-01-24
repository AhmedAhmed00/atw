# Quick Reference Guide - Working Hours Feature

## 🚀 Quick Start

### Import and Use
```typescript
import { DayScheduleRow } from '@/features/working-hours/components'

<DayScheduleRow
  daySchedule={schedule}
  onUpdate={handleUpdate}
  index={0}
/>
```

## 📚 Common Use Cases

### 1. Format Time Duration
```typescript
import { formatTimeDuration } from '@/lib/time-utils'

const duration = formatTimeDuration('09:00', '17:30')
// Returns: "8h 30m"
```

### 2. Calculate Duration Object
```typescript
import { calculateTimeDuration } from '@/lib/time-utils'

const duration = calculateTimeDuration('09:00', '17:30')
// Returns: { hours: 8, minutes: 30, totalMinutes: 510 }
```

### 3. Validate Time Format
```typescript
import { isValidTimeFormat } from '@/lib/time-utils'

isValidTimeFormat('09:00') // true
isValidTimeFormat('25:00') // false
isValidTimeFormat('9:00')  // false (must be HH:MM)
```

### 4. Get Day Color Scheme
```typescript
import { getDayColorScheme } from '@/features/working-hours/constants/day-colors'

const colors = getDayColorScheme(0) // Monday colors
// Returns: { from, to, bg, border, gradient }
```

### 5. Check if Weekday
```typescript
import { isWeekday } from '@/features/working-hours/utils'

isWeekday(0) // true (Monday)
isWeekday(5) // false (Saturday)
```

### 6. Get Day Icon Type
```typescript
import { getDayIconType } from '@/features/working-hours/utils'

getDayIconType(0) // 'sun' (weekday)
getDayIconType(6) // 'moon' (weekend)
```

## 🎨 Styling

### Color Scheme Structure
```typescript
interface DayColorScheme {
  from: string      // Gradient start
  to: string        // Gradient end
  bg: string        // Background color
  border: string    // Border color
  gradient: string  // Gradient direction
}
```

### Using Color Schemes
```typescript
const color = getDayColorScheme(index)

// In JSX
<div className={`${color.bg} ${color.border}`}>
  <div className={`bg-linear-to-br ${color.gradient}`}>
    {/* Content */}
  </div>
</div>
```

## 🔧 Utility Functions Reference

### Global Utils (`@/lib/time-utils`)

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `calculateTimeDuration` | `startTime: string, endTime: string` | `TimeDuration` | Calculate duration between times |
| `formatDuration` | `duration: TimeDuration` | `string` | Format duration object |
| `formatTimeDuration` | `startTime: string, endTime: string` | `string` | Calculate and format in one step |
| `isValidTimeFormat` | `time: string` | `boolean` | Validate HH:MM format |
| `minutesToHoursAndMinutes` | `totalMinutes: number` | `{ hours, minutes }` | Convert minutes |

### Feature Utils (`@/features/working-hours/utils`)

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `isWeekday` | `dayIndex: number` | `boolean` | Check if weekday (0-4) |
| `getDayIconType` | `dayIndex: number` | `'sun' \| 'moon'` | Get icon type |
| `getDayStatusLabel` | `enabled: boolean` | `string` | Get status label |

### Constants (`@/features/working-hours/constants/day-colors`)

| Export | Type | Description |
|--------|------|-------------|
| `DAY_COLOR_SCHEMES` | `DayColorScheme[]` | Array of 7 color schemes |
| `getDayColorScheme` | `(index: number) => DayColorScheme` | Get scheme by index |

## 📦 Component Props

### DayScheduleRow
```typescript
interface DayScheduleRowProps {
  daySchedule: DaySchedule  // Day schedule data
  onUpdate: (updated: DaySchedule) => void  // Update handler
  index: number  // Day index (0-6)
}
```

### DayHeader
```typescript
interface DayHeaderProps {
  day: string  // Day name
  statusLabel: string  // Status text
  iconType: 'sun' | 'moon'  // Icon type
  colorScheme: DayColorScheme  // Colors
}
```

### TimeDisplay
```typescript
interface TimeDisplayProps {
  time: string  // Time in HH:MM
  colorScheme: DayColorScheme  // Colors
}
```

### TimeSlotEditor
```typescript
interface TimeSlotEditorProps {
  dayName: string  // For field IDs
  control: Control<TimeSlotFormData>  // RHF control
  errors: FieldErrors<TimeSlotFormData>  // Form errors
  onSubmit: () => void  // Submit handler
  onCancel: () => void  // Cancel handler
}
```

### TimeSlotDisplay
```typescript
interface TimeSlotDisplayProps {
  startTime: string  // Start time
  endTime: string  // End time
  duration: string  // Formatted duration
  colorScheme: DayColorScheme  // Colors
  enabled: boolean  // Enable edit
  onEdit: () => void  // Edit handler
}
```

## 🎯 Common Patterns

### Pattern 1: Display Time Range
```typescript
import { TimeDisplay } from '@/features/working-hours/components'
import { getDayColorScheme } from '@/features/working-hours/constants/day-colors'

const color = getDayColorScheme(0)

<TimeDisplay time="09:00" colorScheme={color} />
<span>—</span>
<TimeDisplay time="17:30" colorScheme={color} />
```

### Pattern 2: Calculate Work Hours
```typescript
import { calculateTimeDuration } from '@/lib/time-utils'

const schedule = {
  start: '09:00',
  end: '17:30'
}

const { hours, minutes, totalMinutes } = calculateTimeDuration(
  schedule.start,
  schedule.end
)

console.log(`Work hours: ${hours}h ${minutes}m`)
console.log(`Total minutes: ${totalMinutes}`)
```

### Pattern 3: Validate Schedule
```typescript
import { isValidTimeFormat } from '@/lib/time-utils'

function validateSchedule(start: string, end: string): boolean {
  if (!isValidTimeFormat(start) || !isValidTimeFormat(end)) {
    return false
  }
  
  const duration = calculateTimeDuration(start, end)
  return duration.totalMinutes > 0
}
```

### Pattern 4: Custom Day Header
```typescript
import { DayHeader } from '@/features/working-hours/components'
import { getDayColorScheme, getDayIconType, getDayStatusLabel } from '@/features/working-hours'

const MySchedule = ({ day, enabled, index }) => {
  const color = getDayColorScheme(index)
  const iconType = getDayIconType(index)
  const statusLabel = getDayStatusLabel(enabled)
  
  return (
    <DayHeader
      day={day}
      statusLabel={statusLabel}
      iconType={iconType}
      colorScheme={color}
    />
  )
}
```

## 🐛 Troubleshooting

### Issue: Time calculation returns negative duration
```typescript
// ❌ Wrong order
calculateTimeDuration('17:30', '09:00')

// ✅ Correct order (start before end)
calculateTimeDuration('09:00', '17:30')
```

### Issue: Invalid time format
```typescript
// ❌ Wrong formats
'9:00'    // Missing leading zero
'09:0'    // Missing trailing zero
'25:00'   // Invalid hour
'09:60'   // Invalid minute

// ✅ Correct format
'09:00'   // HH:MM with leading zeros
```

### Issue: Color scheme not applying
```typescript
// ❌ Wrong usage
<div className={color.bg}>  // Missing template literal

// ✅ Correct usage
<div className={`${color.bg}`}>  // With template literal
```

## 📝 Type Definitions

### TimeDuration
```typescript
interface TimeDuration {
  hours: number        // Hours (0-23)
  minutes: number      // Minutes (0-59)
  totalMinutes: number // Total minutes
}
```

### DayColorScheme
```typescript
interface DayColorScheme {
  from: string      // Tailwind gradient from class
  to: string        // Tailwind gradient to class
  bg: string        // Background color class
  border: string    // Border color class
  gradient: string  // Gradient color values
}
```

### TimeSlotFormData
```typescript
interface TimeSlotFormData {
  start: string  // Start time HH:MM
  end: string    // End time HH:MM
}
```

## 🔗 File Locations

```
src/
├── lib/
│   └── time-utils.ts                    # Global time utilities
├── features/working-hours/
│   ├── components/
│   │   ├── DayScheduleRow.tsx          # Main component
│   │   ├── DayHeader.tsx               # Day header
│   │   ├── TimeDisplay.tsx             # Time display
│   │   ├── TimeSlotEditor.tsx          # Editor form
│   │   ├── TimeSlotDisplay.tsx         # Display view
│   │   └── index.ts                    # Exports
│   ├── constants/
│   │   └── day-colors.ts               # Color schemes
│   ├── utils/
│   │   └── index.ts                    # Feature utils
│   └── types/
│       ├── index.ts                    # Type definitions
│       └── validation.ts               # Zod schemas
```

## 💡 Best Practices

1. **Always validate time formats** before calculations
2. **Use utility functions** instead of inline calculations
3. **Import from index files** for cleaner imports
4. **Use TypeScript types** for better type safety
5. **Keep components small** and focused
6. **Extract reusable logic** to utilities
7. **Document complex logic** with comments
8. **Test utility functions** independently

## 🎓 Examples

See the following files for complete examples:
- `DayScheduleRow.tsx` - Full component integration
- `time-utils.ts` - Utility function examples
- `day-colors.ts` - Constants pattern
- `TimeSlotEditor.tsx` - Form handling

---

**Need Help?** Check the full documentation in `README.md` or `ARCHITECTURE_OVERVIEW.md`

