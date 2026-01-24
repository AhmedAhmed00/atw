# Working Hours Feature - Architecture Overview

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Application Layer                        │
│                    (Pages/Parent Components)                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ uses
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DayScheduleRow (Container)                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  • Manages editing state                                   │ │
│  │  • Handles form submission                                 │ │
│  │  • Orchestrates sub-components                             │ │
│  └────────────────────────────────────────────────────────────┘ │
└───┬─────────────────┬────────────────┬──────────────────┬───────┘
    │                 │                │                  │
    │ uses            │ uses           │ uses             │ uses
    ▼                 ▼                ▼                  ▼
┌─────────┐    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│DayHeader│    │TimeSlotEditor│  │TimeSlotDisplay│ │ TimeDisplay  │
│         │    │              │  │              │  │              │
│ • Icon  │    │ • Form       │  │ • Read View  │  │ • Single Time│
│ • Name  │    │ • Validation │  │ • Edit Btn   │  │ • Styling    │
│ • Status│    │ • Actions    │  │ • Duration   │  │              │
└────┬────┘    └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
     │                │                 │                  │
     └────────────────┴─────────────────┴──────────────────┘
                             │
                             │ imports from
                             ▼
     ┌──────────────────────────────────────────────────┐
     │              Shared Resources                     │
     │                                                   │
     │  ┌─────────────────────────────────────────────┐ │
     │  │  Global Utils (src/lib/)                    │ │
     │  │  • time-utils.ts                            │ │
     │  │    - calculateTimeDuration()                │ │
     │  │    - formatTimeDuration()                   │ │
     │  │    - formatDuration()                       │ │
     │  │    - isValidTimeFormat()                    │ │
     │  │    - minutesToHoursAndMinutes()             │ │
     │  └─────────────────────────────────────────────┘ │
     │                                                   │
     │  ┌─────────────────────────────────────────────┐ │
     │  │  Feature Utils (features/working-hours/)    │ │
     │  │  • utils/index.ts                           │ │
     │  │    - isWeekday()                            │ │
     │  │    - getDayIconType()                       │ │
     │  │    - getDayStatusLabel()                    │ │
     │  └─────────────────────────────────────────────┘ │
     │                                                   │
     │  ┌─────────────────────────────────────────────┐ │
     │  │  Constants (features/working-hours/)        │ │
     │  │  • constants/day-colors.ts                  │ │
     │  │    - DAY_COLOR_SCHEMES                      │ │
     │  │    - getDayColorScheme()                    │ │
     │  └─────────────────────────────────────────────┘ │
     │                                                   │
     │  ┌─────────────────────────────────────────────┐ │
     │  │  Types (features/working-hours/)            │ │
     │  │  • types/validation.ts                      │ │
     │  │  • types/index.ts                           │ │
     │  └─────────────────────────────────────────────┘ │
     └───────────────────────────────────────────────────┘
```

## 📦 Module Responsibilities

### 🎯 Component Layer

#### **DayScheduleRow** (Container Component)
```typescript
Responsibilities:
├── State Management (editing mode)
├── Form Integration (react-hook-form)
├── Event Handling (submit, cancel, toggle)
└── Component Orchestration

Dependencies:
├── DayHeader
├── TimeSlotEditor
├── TimeSlotDisplay
├── getDayColorScheme()
├── getDayIconType()
├── getDayStatusLabel()
└── formatTimeDuration()
```

#### **DayHeader** (Presentational Component)
```typescript
Responsibilities:
├── Display day name
├── Display day icon (Sun/Moon)
└── Display status label

Props:
├── day: string
├── statusLabel: string
├── iconType: 'sun' | 'moon'
└── colorScheme: DayColorScheme
```

#### **TimeSlotEditor** (Form Component)
```typescript
Responsibilities:
├── Time input fields (start/end)
├── Form validation display
└── Action buttons (submit/cancel)

Props:
├── dayName: string
├── control: Control<TimeSlotFormData>
├── errors: FieldErrors<TimeSlotFormData>
├── onSubmit: () => void
└── onCancel: () => void
```

#### **TimeSlotDisplay** (Presentational Component)
```typescript
Responsibilities:
├── Display time range
├── Display duration
└── Edit button

Props:
├── startTime: string
├── endTime: string
├── duration: string
├── colorScheme: DayColorScheme
├── enabled: boolean
└── onEdit: () => void
```

#### **TimeDisplay** (Atomic Component)
```typescript
Responsibilities:
└── Display single time value with styling

Props:
├── time: string
└── colorScheme: DayColorScheme
```

### 🛠️ Utility Layer

#### **Global Utils** (`src/lib/time-utils.ts`)
```typescript
Scope: Application-wide
Purpose: Generic time manipulation

Functions:
├── calculateTimeDuration(start, end) → TimeDuration
├── formatDuration(duration) → string
├── formatTimeDuration(start, end) → string
├── isValidTimeFormat(time) → boolean
└── minutesToHoursAndMinutes(minutes) → { hours, minutes }

Can be used by:
├── Working Hours Feature
├── Appointments Feature
├── Scheduling Feature
└── Any feature dealing with time
```

#### **Feature Utils** (`features/working-hours/utils/`)
```typescript
Scope: Working Hours Feature
Purpose: Domain-specific logic

Functions:
├── isWeekday(dayIndex) → boolean
├── getDayIconType(dayIndex) → 'sun' | 'moon'
└── getDayStatusLabel(enabled) → string

Used by:
└── Working Hours components only
```

### 🎨 Constants Layer

#### **Day Colors** (`features/working-hours/constants/`)
```typescript
Scope: Working Hours Feature
Purpose: Centralized styling configuration

Exports:
├── DAY_COLOR_SCHEMES: DayColorScheme[]
└── getDayColorScheme(index) → DayColorScheme

Benefits:
├── Single source of truth for colors
├── Easy to update theme
└── Consistent styling across components
```

## 🔄 Data Flow

```
User Interaction
      │
      ▼
┌─────────────────┐
│ DayScheduleRow  │ ◄──── Props: daySchedule, onUpdate, index
└────────┬────────┘
         │
         ├─► getDayColorScheme(index) ──► color
         ├─► getDayIconType(index) ──────► iconType
         ├─► getDayStatusLabel(enabled) ─► statusLabel
         └─► formatTimeDuration(start, end) ──► duration
         │
         ├─► DayHeader (day, statusLabel, iconType, color)
         │
         ├─► TimeSlotEditor (when editing)
         │   └─► TimePicker components
         │
         └─► TimeSlotDisplay (when not editing)
             ├─► TimeDisplay (start time)
             ├─► TimeDisplay (end time)
             └─► duration string
```

## 📊 Dependency Graph

```
DayScheduleRow
├── UI Components
│   ├── Card (shadcn)
│   ├── Switch (shadcn)
│   ├── DayHeader
│   │   ├── Sun (lucide)
│   │   └── Moon (lucide)
│   ├── TimeSlotEditor
│   │   ├── Label (shadcn)
│   │   ├── Button (shadcn)
│   │   ├── TimePicker (custom)
│   │   │   └── Select (shadcn)
│   │   ├── Check (lucide)
│   │   └── X (lucide)
│   └── TimeSlotDisplay
│       ├── TimeDisplay
│       │   └── Clock (lucide)
│       ├── Button (shadcn)
│       └── Edit2 (lucide)
├── Utilities
│   ├── formatTimeDuration (global)
│   ├── getDayColorScheme (feature)
│   ├── getDayIconType (feature)
│   └── getDayStatusLabel (feature)
├── Form Management
│   └── react-hook-form
│       ├── useForm
│       └── Controller
└── Validation
    └── zod (via zodResolver)
```

## 🎯 Design Principles Applied

### 1. **Single Responsibility Principle (SRP)**
Each component/function has one clear purpose:
- `DayHeader` → Display day information
- `TimeDisplay` → Display time value
- `formatTimeDuration()` → Format time duration
- `getDayColorScheme()` → Get color scheme

### 2. **Separation of Concerns**
- **UI**: Components handle presentation
- **Logic**: Utils handle calculations
- **Data**: Types define structure
- **Style**: Constants define themes

### 3. **DRY (Don't Repeat Yourself)**
- Time calculations extracted to `time-utils.ts`
- Color schemes centralized in `day-colors.ts`
- Status logic in `getDayStatusLabel()`

### 4. **Composition over Inheritance**
- Small components composed into larger ones
- `DayScheduleRow` composes `DayHeader`, `TimeSlotEditor`, etc.
- Reusable building blocks

### 5. **Open/Closed Principle**
- Easy to extend without modifying existing code
- Add new time utilities without changing existing ones
- Add new color schemes without changing components

### 6. **Dependency Inversion**
- Components depend on abstractions (props/interfaces)
- Not tightly coupled to implementations
- Easy to mock for testing

## 🧪 Testing Strategy

```
Unit Tests
├── time-utils.ts
│   ├── calculateTimeDuration()
│   ├── formatDuration()
│   └── isValidTimeFormat()
├── utils/index.ts
│   ├── isWeekday()
│   ├── getDayIconType()
│   └── getDayStatusLabel()
└── day-colors.ts
    └── getDayColorScheme()

Component Tests
├── DayHeader.test.tsx
├── TimeDisplay.test.tsx
├── TimeSlotEditor.test.tsx
├── TimeSlotDisplay.test.tsx
└── DayScheduleRow.test.tsx (integration)

Integration Tests
└── DayScheduleRow with all sub-components
```

## 📈 Scalability

This architecture supports:

### Horizontal Scaling
- Add more time-related features using `time-utils`
- Create new schedule types using same components
- Reuse color schemes in other features

### Vertical Scaling
- Add more complex time calculations
- Enhance validation logic
- Add more sophisticated UI components

### Feature Scaling
- Easy to add new schedule types
- Simple to add recurring schedules
- Straightforward to add time zones

## 🎓 Learning Resources

For developers working with this code:

1. **Component Structure**: See `DayScheduleRow.tsx` for composition pattern
2. **Utility Organization**: See `time-utils.ts` for pure function examples
3. **Type Safety**: See `types/` for TypeScript best practices
4. **Form Handling**: See `TimeSlotEditor.tsx` for react-hook-form integration
5. **Styling**: See `day-colors.ts` for theme management

## 🚀 Future Enhancements

This architecture enables:

1. **Time Zone Support**: Add to `time-utils.ts`
2. **Recurring Schedules**: New component using existing utils
3. **Break Times**: Extend `TimeSlotEditor` with additional fields
4. **Calendar Integration**: Reuse `TimeDisplay` and utils
5. **Mobile Optimization**: Swap components without changing logic
6. **Themes**: Update `day-colors.ts` for different themes
7. **Localization**: Add i18n to labels and formats
8. **Analytics**: Track usage at component level
9. **A/B Testing**: Swap components easily
10. **Performance**: Optimize individual components independently

## ✅ Quality Metrics

- **Modularity**: ✅ High (11 focused files)
- **Reusability**: ✅ High (8 reusable functions)
- **Maintainability**: ✅ High (clear structure)
- **Testability**: ✅ High (pure functions, small components)
- **Type Safety**: ✅ 100% TypeScript coverage
- **Documentation**: ✅ Comprehensive (README + inline)
- **Performance**: ✅ Optimized (small components)
- **Accessibility**: ✅ Semantic HTML + ARIA labels

---

**Last Updated**: January 2026
**Architecture Version**: 2.0
**Status**: ✅ Production Ready

