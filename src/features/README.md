# Features

This folder contains feature-based modules, organized by domain/feature rather than by technical concern. Each feature is self-contained with its own components, types, data, and logic.

## Structure

Each feature follows this clean architecture pattern:

```
feature-name/
├── index.tsx              # Main feature page/entry point
├── components/            # Feature-specific components
│   ├── Component1.tsx
│   ├── Component2.tsx
│   └── index.ts          # Barrel export
├── types/                 # TypeScript type definitions
│   └── index.ts
├── data/                  # Mock data, API calls, utilities
│   ├── mockData.ts
│   └── utils.ts
└── hooks/                 # Feature-specific custom hooks (optional)
    └── useFeature.ts
```

## Current Features

### 📋 Services
**Path:** `/services`

Healthcare services management with comprehensive CRUD operations.

**Components:**
- `ServiceStatsCards.tsx` - Statistics dashboard cards
- `ServiceTableColumns.tsx` - Table column definitions

**Features:**
- ✅ Stats cards showing key metrics
- ✅ Search functionality
- ✅ Sortable data table
- ✅ Pagination
- ✅ Status badges
- ✅ Action menu (view, edit, delete)
- ✅ Gradient-themed UI

**Data:**
- 15 mock services
- Categories: Consultation, Dental, Therapy, Laboratory, etc.
- Fields: name, category, provider, price, duration, bookings, status

## Benefits of Feature-Based Structure

### ✅ Advantages

1. **Domain-Driven** - Organized by business logic, not technical layers
2. **Encapsulation** - Each feature is self-contained and independent
3. **Scalability** - Easy to add new features without affecting existing ones
4. **Maintainability** - Changes are localized to specific features
5. **Team Collaboration** - Different teams can work on different features
6. **Code Reusability** - Shared components go in `/components/shared`
7. **Clear Boundaries** - Easy to understand feature scope and dependencies

### 📦 When to Create a New Feature

Create a new feature module when:
- It represents a distinct business domain
- It has its own set of pages/routes
- It has domain-specific components
- It requires isolated state management
- It has unique business logic

### 🔄 When to Use Shared Components

Use `/components/shared` when:
- Component is used across multiple features
- Component is generic and reusable
- Component is a common UI pattern

## Adding a New Feature

1. **Create the folder structure:**
```bash
src/features/
└── my-feature/
    ├── index.tsx
    ├── components/
    ├── types/
    └── data/
```

2. **Define types:**
```typescript
// types/index.ts
export interface MyFeatureData {
  id: string
  name: string
  // ... other fields
}
```

3. **Create mock data or API calls:**
```typescript
// data/mockData.ts
export const mockData: MyFeatureData[] = [...]
```

4. **Build feature components:**
```typescript
// components/MyComponent.tsx
export function MyComponent() {
  // Component logic
}
```

5. **Create the main page:**
```typescript
// index.tsx
export function MyFeaturePage() {
  return (
    <div>
      {/* Feature UI */}
    </div>
  )
}
```

6. **Add route in App.tsx:**
```typescript
import MyFeaturePage from './features/my-feature'

<Route path="/my-feature" element={<MyFeaturePage />} />
```

7. **Update navigation** in `src/components/shared/sidebar/navigationData.ts`

## Best Practices

1. **Keep features independent** - Minimize cross-feature dependencies
2. **Use TypeScript** - Define proper types for all data structures
3. **Follow naming conventions** - Use clear, descriptive names
4. **Document complex logic** - Add comments for business rules
5. **Create reusable components** - Extract common patterns
6. **Use the design system** - Leverage Shadcn UI components
7. **Apply theme colors** - Use the gradient variables consistently
8. **Handle loading states** - Show skeletons/loaders
9. **Add error handling** - Gracefully handle failures
10. **Write clean code** - Follow React and TypeScript best practices

## Design Guidelines

The Services feature demonstrates our design principles:
- **Gradient Colors:** #E52422 (ambulance red) → #971F1E (deep red)
- **Typography:** Inter font family
- **Spacing:** Consistent padding and gaps
- **Animations:** Smooth transitions on hover
- **Accessibility:** Proper labels and ARIA attributes
- **Responsive:** Mobile-first design approach

## Testing

When testing features:
- Test components in isolation
- Test data calculations/utilities
- Test user interactions
- Test edge cases (empty states, errors)
- Test responsive behavior

## Future Features

Consider adding:
- Appointments management
- Patient records
- Calendar scheduling
- Payment processing
- Reports and analytics
- User management
- Settings and configuration

