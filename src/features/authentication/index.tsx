/**
 * Authentication Feature
 * 
 * This feature handles all authentication-related pages and logic:
 * - Login
 * - Forgot Password
 * - OTP Verification
 */

export { default as LoginPage } from './pages/LoginPage'
export { default as ForgotPasswordPage } from './pages/ForgotPasswordPage'
export { default as VerifyOTPPage } from './pages/VerifyOTPPage'

// Re-export schemas and types for convenience
export * from './schemas/login-schema'
export * from './types'

