# Authentication System Guide

## Overview
The Healix Healthcare application now includes a complete authentication system that protects all routes and requires users to log in before accessing the dashboard.

## Features

✅ **Login Page** - Beautiful branded login interface with form validation
✅ **Protected Routes** - All dashboard routes require authentication
✅ **Persistent Sessions** - User sessions persist across page refreshes
✅ **User Profile Display** - Shows logged-in user info in sidebar
✅ **Logout Functionality** - Secure logout with redirect to login page
✅ **Static Credentials** - Demo credentials for testing

## Super User Credentials

### Admin Account
- **Email:** `admin@healix.com`
- **Password:** `admin123`
- **Role:** Admin
- **Name:** Dr. Admin

### Doctor Account
- **Email:** `doctor@healix.com`
- **Password:** `doctor123`
- **Role:** Doctor
- **Name:** Dr. Smith

## How It Works

### 1. Authentication Context (`src/contexts/AuthContext.tsx`)
Manages the authentication state throughout the application:
- Stores user data in React state
- Persists sessions in localStorage
- Provides login/logout functions
- Validates credentials against static user database

### 2. Login Page (`src/pages/Login.tsx`)
- Beautiful branded interface with Healix logo
- Email and password input fields
- Show/hide password toggle
- Quick-fill buttons for demo credentials
- Form validation and error handling
- Loading states during authentication

### 3. Protected Routes (`src/components/ProtectedRoute.tsx`)
- Wraps all authenticated routes
- Redirects unauthenticated users to login page
- Shows loading spinner while checking authentication
- Allows access only to authenticated users

### 4. App Routing (`src/App.tsx`)
- Public route: `/login` (redirects to dashboard if already logged in)
- All other routes are protected and require authentication
- Wraps the entire app with `AuthProvider`

### 5. Sidebar Integration
- Displays user info (avatar, name, email)
- Shows logout button with icon
- Logout redirects to login page
- Clears session data on logout

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication state management
├── pages/
│   └── Login.tsx               # Login page component
├── components/
│   ├── ProtectedRoute.tsx      # Route protection wrapper
│   └── shared/
│       └── sidebar/
│           └── index.tsx       # Sidebar with user info & logout
└── App.tsx                     # Main app with routing
```

## Usage Flow

### First Visit
1. User navigates to any route (e.g., `/`, `/dashboard`, `/payments`)
2. `ProtectedRoute` checks authentication status
3. User is redirected to `/login` if not authenticated
4. User enters credentials (or uses quick-fill buttons)
5. On successful login, user is redirected to originally requested route
6. Session is saved in localStorage

### Subsequent Visits
1. User opens the application
2. `AuthContext` checks localStorage for existing session
3. If valid session exists, user is automatically logged in
4. User can navigate freely to all protected routes
5. User can logout using the button in the sidebar

### Logout
1. User clicks "Logout" button in sidebar footer
2. User state is cleared from React context
3. Session is removed from localStorage
4. User is redirected to `/login`

## Security Notes

⚠️ **Important:** This is a demo implementation with static credentials stored in code. For production:

- **Never** store passwords in plain text
- Use a secure backend API for authentication
- Implement proper password hashing (bcrypt, argon2)
- Use JWT tokens or session cookies
- Implement refresh tokens
- Add HTTPS/TLS encryption
- Add rate limiting for login attempts
- Implement password reset functionality
- Add two-factor authentication (2FA)
- Use secure, httpOnly cookies for tokens

## Customization

### Adding More Users
Edit `src/contexts/AuthContext.tsx`:

```typescript
const STATIC_USERS = [
  {
    id: '3',
    email: 'nurse@healix.com',
    password: 'nurse123',
    name: 'Nurse Jane',
    role: 'staff',
  },
  // Add more users...
]
```

### Changing Session Storage
By default, sessions are stored in `localStorage`. To use `sessionStorage` instead (session expires when browser closes):

Replace all `localStorage` calls with `sessionStorage` in `AuthContext.tsx`.

### Adding Role-Based Access
You can implement role-based routing:

```typescript
// In ProtectedRoute.tsx
interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'doctor' | 'staff'
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />
  }
  
  return <>{children}</>
}
```

## Testing

### Test Scenarios

1. **Login with valid credentials**
   - Should redirect to dashboard
   - Should show user info in sidebar

2. **Login with invalid credentials**
   - Should show error message
   - Should not redirect

3. **Access protected route without login**
   - Should redirect to login page

4. **Logout**
   - Should clear session
   - Should redirect to login page

5. **Page refresh while logged in**
   - Should maintain session
   - Should not require re-login

6. **Direct URL access to /login when logged in**
   - Should redirect to dashboard

## UI Features

### Login Page
- Responsive design (mobile-friendly)
- Dark mode support
- Animated background gradients
- Quick-fill demo credentials
- Password visibility toggle
- Loading states
- Error messages
- Brand logo integration

### Sidebar Footer
- User avatar with initials
- User name and email display
- Gradient-styled logout button
- Hover effects and transitions

## Support

If you need to reset the demo:
1. Clear browser localStorage
2. Refresh the page
3. Use the provided credentials to log in again

For development, you can clear the session via browser DevTools:
```javascript
localStorage.removeItem('healix_user')
```

