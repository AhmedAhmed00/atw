# 🏗️ Architecture & Structure Documentation

> **Project:** All The Way  
> **Version:** 1.0.0  
> **Last Updated:** January 27, 2026

---

## 📋 Overview

This is a **React + TypeScript** web application built with **Vite**, designed as a healthcare/fleet management admin dashboard. The project follows a **feature-based architecture** (also known as "Vertical Slice Architecture") combined with clean separation of concerns.

---

## 🎯 Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | React | 19.x |
| **Language** | TypeScript | ~5.6 |
| **Build Tool** | Vite | 6.x |
| **Styling** | Tailwind CSS | 4.x |
| **State Management** | Redux Toolkit | 2.x |
| **Server State** | TanStack React Query | 5.x |
| **Routing** | React Router | 7.x |
| **Form Handling** | React Hook Form | 7.x |
| **Validation** | Zod | 3.x |
| **UI Components** | Radix UI | Latest |
| **Data Tables** | TanStack React Table | 8.x |
| **Charts** | Recharts | 3.x |
| **Maps** | Leaflet + React Leaflet | 1.9 / 5.x |
| **Date Utilities** | date-fns | 3.x |
| **Icons** | Lucide React | Latest |

---

## 📁 Project Structure

```
all-the-way/
├── public/                    # Static assets
├── src/
│   ├── App.tsx                # Main app with routing logic
│   ├── main.tsx               # Entry point with providers
│   ├── index.css              # Global styles + Tailwind theme
│   ├── vite-env.d.ts          # Vite type declarations
│   │
│   ├── core/                  # 🏛️ App-wide infrastructure
│   │   ├── providers/         # Context providers
│   │   │   ├── index.tsx      # AppProviders composition
│   │   │   ├── theme-provider.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── ScrollRestoration.tsx
│   │   ├── router/            # Route definitions
│   │   │   ├── routes.tsx     # Route configuration
│   │   │   ├── lazyComponents.ts  # Lazy-loaded components
│   │   │   └── index.ts
│   │   ├── store/             # Redux store configuration
│   │   │   ├── index.ts       # Store setup
│   │   │   ├── hooks.ts       # Typed hooks
│   │   │   └── slices/        # Global Redux slices
│   │   └── query/             # React Query client
│   │       ├── client.ts
│   │       └── index.ts
│   │
│   ├── features/              # 📦 Feature modules (18 domains)
│   │   ├── README.md          # Feature guidelines
│   │   ├── authentication/    # Auth feature
│   │   ├── dashboard/         # Dashboard feature
│   │   ├── clients/           # Clients management
│   │   ├── employees/         # Employees management
│   │   ├── shifts/            # Shifts management
│   │   ├── attendance/        # Attendance tracking
│   │   ├── tasks/             # Task management
│   │   ├── fleet/             # Fleet/vehicles
│   │   ├── operations/        # Operations/trips
│   │   ├── finance/           # Financial management
│   │   ├── payments/          # Payment processing
│   │   ├── services/          # Services catalog
│   │   ├── support/           # Support tickets
│   │   ├── settings/          # App settings
│   │   ├── profile/           # User profile
│   │   ├── calendar/          # Calendar/scheduling
│   │   ├── communication/     # Chat/messaging
│   │   └── working-hours/     # Working hours config
│   │
│   ├── shared/                # 🔄 Shared resources
│   │   ├── components/        # Reusable complex components
│   │   │   ├── charts/        # Chart components
│   │   │   ├── loading/       # Loading states
│   │   │   ├── maps/          # Map components
│   │   │   ├── notifications/ # Notification system
│   │   │   ├── page-header/   # Page headers
│   │   │   ├── sidebar/       # Navigation sidebar
│   │   │   ├── stats/         # Statistics components
│   │   │   └── table/         # Table components
│   │   ├── ui/               # Primitive UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── select.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ... (39 components)
│   │   ├── constants/        # App-wide constants
│   │   │   ├── config.ts     # App configuration
│   │   │   ├── routes.ts     # Route constants
│   │   │   └── statuses.ts   # Status configurations
│   │   ├── Layout.tsx        # Main layout component
│   │   └── ProtectedRoute.tsx # Route protection HOC
│   │
│   ├── hooks/                 # 🪝 Custom React hooks
│   │   ├── use-disclosure.ts  # Modal/drawer state
│   │   ├── use-mobile.tsx     # Mobile detection
│   │   ├── useExport.ts       # Data export
│   │   ├── useFileUpload.ts   # File upload handling
│   │   ├── useMultiStepForm.ts # Multi-step forms
│   │   ├── usePagination.ts   # Pagination logic
│   │   ├── useScrollToTop.ts  # Scroll behavior
│   │   └── useTableFilters.ts # Table filtering
│   │
│   ├── services/              # 🌐 API client layer
│   │   └── api/
│   │       ├── client.ts      # HTTP client class
│   │       ├── index.ts       # Exports
│   │       ├── institutions.ts # Institutions API
│   │       └── patients.ts    # Patients API
│   │
│   ├── lib/                   # 📚 Utility libraries
│   │   ├── date-utils.ts      # Date formatting
│   │   ├── time-utils.ts      # Time utilities
│   │   ├── sort-utils.ts      # Sorting helpers
│   │   ├── scroll-utils.ts    # Scroll utilities
│   │   ├── gradients.ts       # Gradient definitions
│   │   ├── icons.ts           # Icon utilities
│   │   └── utils.ts           # General utilities
│   │
│   ├── utils/                 # 🛠️ Helper functions
│   │   ├── formatters.ts      # Data formatting
│   │   ├── helpers.ts         # General helpers
│   │   ├── validators.ts      # Validation functions
│   │   ├── logger.ts          # Logging utility
│   │   ├── statusConfigs.ts   # Status configurations
│   │   └── tableHelpers.ts    # Table utilities
│   │
│   └── types/                 # 📝 Global type definitions
│       └── user.ts            # User types
│
├── index.html                 # HTML entry point
├── package.json               # Dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite config
├── components.json           # Shadcn UI config
├── .eslintrc                 # ESLint config
├── .prettierrc               # Prettier config
└── vercel.json               # Vercel deployment config
```

---

## 🏛️ Core Concepts

### Feature Module Structure

Each feature follows this pattern:

```
feature-name/
├── index.tsx              # Main feature page/entry point
├── components/            # Feature-specific components
│   ├── Component1.tsx
│   ├── Component2.tsx
│   └── index.ts          # Barrel export
├── pages/                 # Route-level pages
│   └── FeaturePage.tsx
├── types/                 # TypeScript type definitions
│   └── index.ts
├── schemas/               # Zod validation schemas
│   └── featureSchema.ts
├── data/                  # Mock data, constants
│   ├── mockData.ts
│   └── utils.ts
├── slices/                # Redux slices (if needed)
│   └── featureSlice.ts
└── hooks/                 # Feature-specific hooks (optional)
    └── useFeature.ts
```

### Provider Composition

All app-wide providers are composed in `core/providers/index.tsx`:

```tsx
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>{children}</BrowserRouter>
          </QueryClientProvider>
        </ThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  )
}
```

### State Management Strategy

| State Type | Solution | Use Case |
|------------|----------|----------|
| **Server State** | React Query | API data, caching, sync |
| **Client State** | Redux Toolkit | Auth, UI state, complex forms |
| **Local State** | React useState | Component-specific UI |
| **Form State** | React Hook Form | Form inputs, validation |

### Routing Structure

Routes are organized by feature with lazy loading:

```tsx
// Protected routes example
<Route path="/clients/institutions" element={<InstitutionsPage />} />
<Route path="/clients/institutions/new" element={<AddInstitutionPage />} />
<Route path="/clients/institutions/:id" element={<InstitutionDetailPage />} />
```

---

## 🎨 Design System

### Color Palette

```css
/* Brand Colors - Primary (Cyan/Teal) */
--brand-500: 9 176 182;     /* #09B0B6 - Base/Primary */
--brand-700: 5 100 122;     /* #05647A - Dark teal */

/* Brand Gradient */
--brand-gradient-from: #09B0B6;
--brand-gradient-to: #05647A;

/* Status Colors */
--status-success: 16 185 129;   /* Green */
--status-warning: 245 158 11;   /* Amber */
--status-danger: 239 68 68;     /* Red */
--status-info: 14 165 233;      /* Blue */
```

### Typography

- **Primary Font:** Inter
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Theming

The app supports **light** and **dark** modes via CSS custom properties and the `ThemeProvider`.

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         main.tsx                            │
│                    (Entry + AppProviders)                   │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                      core/providers                          │
│  ┌─────────┐ ┌────────────┐ ┌────────────┐ ┌─────────────┐  │
│  │ Redux   │ │ ReactQuery │ │   Theme    │ │   Router    │  │
│  │ Store   │ │   Client   │ │  Provider  │ │  (Browser)  │  │
│  └─────────┘ └────────────┘ └────────────┘ └─────────────┘  │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                        App.tsx                              │
│              (Route Protection + Layout)                     │
└────────────┬────────────────────────┬───────────────────────┘
             │                        │
    ┌────────▼────────┐      ┌────────▼────────┐
    │  Public Routes  │      │ Protected Routes│
    │  (Login, etc)   │      │    + Layout     │
    └─────────────────┘      └────────┬────────┘
                                      │
    ┌─────────────────────────────────▼─────────────────────────┐
    │                     features/                              │
    │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
    │  │Authentication│  │  Dashboard   │  │   Clients    │     │
    │  │  ├─ pages/   │  │  ├─ pages/   │  │  ├─ pages/   │     │
    │  │  ├─ slices/  │  │  ├─ slices/  │  │  ├─ schemas/ │     │
    │  │  ├─ types/   │  │  ├─ types/   │  │  ├─ data/    │     │
    │  │  └─ schemas/ │  │  └─ components│ │  └─ components│    │
    │  └──────────────┘  └──────────────┘  └──────────────┘     │
    │         ...and 15 more feature modules                     │
    └────────────────────────────────────────────────────────────┘
                      │
    ┌─────────────────▼─────────────────────────────────────────┐
    │                      shared/                               │
    │  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
    │  │     ui/    │  │ components/│  │ constants/ │           │
    │  │ (primitives)│ │ (complex)  │  │ (config)   │           │
    │  └────────────┘  └────────────┘  └────────────┘           │
    └────────────────────────────────────────────────────────────┘
                      │
    ┌─────────────────▼─────────────────────────────────────────┐
    │                   services/api/                            │
    │         (HTTP Client + Domain Services)                    │
    └────────────────────────────────────────────────────────────┘
```

---

## 📦 Feature Modules

| Feature | Path | Description |
|---------|------|-------------|
| `authentication` | `/login`, `/forgot-password` | User auth flows |
| `dashboard` | `/` | Main dashboard with stats |
| `clients` | `/clients/*` | Institutions & patients |
| `employees` | `/employees/*` | Employee management |
| `shifts` | `/shifts/*` | Shift scheduling |
| `attendance` | `/attendance/*` | Attendance tracking |
| `tasks` | `/tasks/*` | Task management |
| `fleet` | `/fleet/*` | Vehicle management |
| `operations` | `/operations/*` | Trip operations |
| `finance` | `/finance/*` | Invoices & billing |
| `payments` | `/payments` | Payment processing |
| `services` | `/services` | Services catalog |
| `support` | `/support/*` | Support tickets |
| `settings` | `/settings/*` | App configuration |
| `profile` | `/profile` | User profile |
| `calendar` | `/appointments/*` | Scheduling |
| `communication` | `/communication/*` | Chat & messaging |
| `working-hours` | `/working-hours` | Work hours config |

---

## 🔌 API Integration

### API Client

The centralized API client (`services/api/client.ts`) provides:

```typescript
class ApiClient {
  async get<T>(endpoint: string): Promise<ApiResponse<T>>
  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>>
  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>>
  async patch<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>>
  async delete<T>(endpoint: string): Promise<ApiResponse<T>>
}
```

**Features:**
- Automatic auth token injection from localStorage
- Request timeout handling (30s default)
- Error standardization
- TypeScript generics for type safety

### Configuration

```typescript
// shared/constants/config.ts
export const APP_CONFIG = {
  API: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    TIMEOUT: 30000,
  },
  // ...
}
```

---

## 🛡️ Best Practices

### Code Organization
1. **Keep features independent** - Minimize cross-feature dependencies
2. **Use TypeScript** - Define proper types for all data structures
3. **Follow naming conventions** - Use clear, descriptive names
4. **Create barrel exports** - Use `index.ts` files for cleaner imports

### Component Guidelines
1. **Use the design system** - Leverage shared UI components
2. **Apply theme colors** - Use CSS variables consistently
3. **Handle loading states** - Show skeletons/loaders
4. **Add error handling** - Gracefully handle failures

### State Management
1. Use **React Query** for server state (API data)
2. Use **Redux** for global client state (auth, UI)
3. Use **local state** for component-specific UI
4. Use **React Hook Form** for all forms

### Performance
1. **Lazy load routes** - All pages use `React.lazy()`
2. **Memoize expensive computations** - Use `useMemo`, `useCallback`
3. **Avoid prop drilling** - Use context or state management

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=https://api.example.com
```

---

## 📝 Adding a New Feature

1. **Create the folder structure:**
```bash
src/features/my-feature/
├── index.tsx
├── components/
├── pages/
├── types/
├── schemas/
└── data/
```

2. **Define types** in `types/index.ts`

3. **Create validation schemas** in `schemas/`

4. **Build components** in `components/`

5. **Create pages** in `pages/`

6. **Add routes** in `core/router/routes.tsx`

7. **Add lazy imports** in `core/router/lazyComponents.ts`

8. **Update navigation** in `shared/components/sidebar/`

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build configuration |
| `tsconfig.json` | TypeScript compiler options |
| `components.json` | Shadcn UI configuration |
| `.eslintrc` | ESLint rules |
| `.prettierrc` | Code formatting rules |
| `vercel.json` | Vercel deployment config |

---

## 📄 License

Private - All rights reserved.

---

*Documentation generated on January 27, 2026*
