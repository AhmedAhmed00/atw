# Authentication Feature

A comprehensive authentication feature module handling user login, password recovery, and OTP verification.

## 📁 Structure

```
authentication/
├── pages/
│   ├── LoginPage.tsx              # Main login page with form validation
│   ├── ForgotPasswordPage.tsx     # Password recovery page
│   └── VerifyOTPPage.tsx          # OTP verification page
├── schemas/
│   └── login-schema.ts            # Zod validation schema for login form
├── types/
│   └── index.ts                   # TypeScript type definitions
├── index.tsx                      # Barrel export
└── README.md                      # This file
```

## 🎯 Features

### Login Page
- ✅ Email and password authentication
- ✅ Form validation using Zod and React Hook Form
- ✅ Password visibility toggle
- ✅ Error handling and display
- ✅ Success message display
- ✅ Loading states
- ✅ Auto-redirect if already authenticated

### Forgot Password Page
- ✅ Email validation
- ✅ OTP generation and storage
- ✅ Session management
- ✅ Error handling

### Verify OTP Page
- ✅ 6-digit OTP input with auto-focus
- ✅ Paste support for OTP
- ✅ Timer countdown (10 minutes)
- ✅ Resend OTP functionality
- ✅ Session expiration handling

## 🛠️ Usage

### Import Pages

```typescript
import { LoginPage, ForgotPasswordPage, VerifyOTPPage } from '@/features/authentication'
```

### Use Login Schema

```typescript
import { loginSchema, type LoginFormValues } from '@/features/authentication/schemas/login-schema'

const form = useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: '',
    password: '',
  },
})
```

### Use Types

```typescript
import type { AuthUser, LoginCredentials } from '@/features/authentication/types'
```

## 🔐 Authentication Flow

1. **Login**: User enters email and password → Validates credentials → Stores user in localStorage
2. **Forgot Password**: User enters email → Generates OTP → Stores in sessionStorage → Redirects to OTP verification
3. **Verify OTP**: User enters 6-digit code → Validates against stored OTP → Redirects to login with success message

## 📝 Notes

- Authentication state is managed via Redux (`authSlice`)
- User data is persisted in localStorage
- OTP data is stored in sessionStorage (expires after 10 minutes)
- All forms use React Hook Form with Zod validation for type safety

## 🔄 Integration

The authentication feature integrates with:
- **Redux Store**: Uses `authSlice` for state management
- **React Router**: Handles navigation and route protection
- **UI Components**: Uses shadcn/ui components for consistent styling

