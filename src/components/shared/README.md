# Shared Components

This folder contains shared, reusable components organized by feature.

## Structure

### 📁 sidebar/
Sidebar navigation components with clean separation of concerns:

- **index.tsx** - Main AppSidebar component (entry point)
- **SidebarLogo.tsx** - Logo component with theme-aware sprite rendering
- **SidebarNavGroup.tsx** - Navigation section/group component
- **SidebarNavItem.tsx** - Individual navigation item component
- **navigationData.ts** - Navigation configuration data
- **types.ts** - TypeScript type definitions

**Usage:**
```tsx
import { AppSidebar } from '@/components/shared/sidebar'
// or import specific subcomponents
import { SidebarLogo, SidebarNavGroup } from '@/components/shared/sidebar'
```

### 📁 table/
Data table components built with TanStack Table:

- **index.tsx** - Main DataTable component (entry point)
- **TableSearch.tsx** - Search/filter input component
- **TableHeader.tsx** - Table header rendering component
- **TableBody.tsx** - Table body with rows rendering
- **TablePagination.tsx** - Pagination controls
- **SortableHeader.tsx** - Helper for sortable column headers
- **types.ts** - TypeScript type definitions

**Usage:**
```tsx
import { DataTable, SortableHeader } from '@/components/shared/table'

// Use in your page
<DataTable columns={columns} data={data} />
```

### 📁 stats/ ✨ NEW
Reusable statistics card components with colorful gradients:

- **index.tsx** - Barrel exports (entry point)
- **StatsCard.tsx** - Individual stat card component
- **StatsCardGrid.tsx** - Grid layout for multiple cards
- **types.ts** - TypeScript type definitions

**Features:**
- 🎨 8 color variants (primary, secondary, success, warning, danger, info, purple, orange)
- 📊 Optional trend indicators (up/down with percentage)
- 💫 Smooth animations and hover effects
- 🎭 Gradient backgrounds and icons
- 🔄 Loading skeleton state
- 📱 Responsive grid layouts
- ⚡ Icon support with Lucide icons

**Color Variants:**
- `primary` - Ambulance Red (#E52422 → #971F1E)
- `secondary` - Deep Red (#971F1E → #E52422)
- `success` - Emerald to Green
- `warning` - Amber to Orange
- `danger` - Rose to Red
- `info` - Sky to Blue
- `purple` - Purple to Violet
- `orange` - Orange to Red

**Usage:**
```tsx
import { StatsCard, StatsCardGrid } from '@/components/shared/stats'

// Single card
<StatsCard
  title="Total Users"
  value={1234}
  icon={Users}
  colorVariant="primary"
  trend={{ value: 12.5, label: 'vs last month', isPositive: true }}
/>

// Grid of cards
<StatsCardGrid 
  cards={[
    {
      title: 'Total Revenue',
      value: '$45,231',
      icon: DollarSign,
      colorVariant: 'success',
      trend: { value: 8.3, isPositive: true },
    },
    // ... more cards
  ]}
  columns={{ default: 1, md: 2, lg: 4 }}
/>
```

**Props:**
```typescript
interface StatsCardProps {
  title: string                    // Card title
  value: string | number           // Main value to display
  icon?: LucideIcon               // Optional icon
  colorVariant?: ColorVariant     // Color theme
  trend?: {                       // Optional trend indicator
    value: number                 // Percentage change
    label?: string               // Additional label
    isPositive?: boolean         // Trend direction
  }
  description?: string            // Optional description
  isLoading?: boolean            // Loading state
}
```

## Benefits

✅ **Modularity** - Each component has a single responsibility
✅ **Reusability** - Easy to import and use across the app
✅ **Maintainability** - Clear structure makes updates easier
✅ **Type Safety** - Dedicated type files for better IntelliSense
✅ **Testability** - Isolated components are easier to test
✅ **Scalability** - Easy to add new subcomponents
✅ **Consistency** - Shared components ensure UI consistency

## Adding New Shared Components

When adding a new shared component:

1. Create a new folder under `shared/`
2. Add an `index.tsx` as the main entry point
3. Break down into logical subcomponents
4. Add a `types.ts` for TypeScript definitions
5. Export all public APIs from `index.tsx`
6. Update this README with documentation

## Design System

All shared components follow these principles:
- **Gradient Colors:** Primary (#E52422 → #971F1E)
- **Typography:** Inter font family
- **Spacing:** Consistent padding and gaps (Tailwind scale)
- **Animations:** Smooth 300ms transitions
- **Shadows:** Subtle with color-matched tints
- **Accessibility:** Proper ARIA labels and semantic HTML
- **Responsive:** Mobile-first approach
- **Dark Mode:** Full theme support

