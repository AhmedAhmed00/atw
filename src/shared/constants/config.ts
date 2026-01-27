/**
 * Application Configuration
 * Centralized configuration constants
 */

export const APP_CONFIG = {
  NAME: 'All The Way',
  VERSION: '1.0.0',
  STORAGE_KEYS: {
    USER: 'All The way_user',
    THEME: 'vite-ui-theme',
    RESET_OTP: 'reset_otp',
    OTP_EXPIRES: 'otp_expires',
    RESET_EMAIL: 'reset_email',
    OTP_VERIFIED: 'otp_verified',
  },
  API: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    TIMEOUT: 30000,
  },
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },
  DATE_FORMATS: {
    DISPLAY: 'MMM dd, yyyy',
    DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
    INPUT: 'yyyy-MM-dd',
    TIME: 'HH:mm',
  },
  FILE_UPLOAD: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: {
      IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      SPREADSHEET: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    },
  },
} as const

