/**
 * Logger Utility
 * Centralized logging system for the application
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  data?: unknown
  timestamp: string
}

class Logger {
  private isDevelopment = import.meta.env.DEV

  private formatMessage(level: LogLevel, message: string, data?: unknown): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
    }
  }

  private log(level: LogLevel, message: string, data?: unknown) {
    if (!this.isDevelopment && level === 'debug') {
      return // Don't log debug messages in production
    }

    const entry = this.formatMessage(level, message, data)

    switch (level) {
      case 'debug':
        console.debug(`[DEBUG] ${entry.timestamp} - ${message}`, data || '')
        break
      case 'info':
        console.info(`[INFO] ${entry.timestamp} - ${message}`, data || '')
        break
      case 'warn':
        console.warn(`[WARN] ${entry.timestamp} - ${message}`, data || '')
        break
      case 'error':
        console.error(`[ERROR] ${entry.timestamp} - ${message}`, data || '')
        break
    }

    // In production, you could send errors to a logging service
    // if (level === 'error' && !this.isDevelopment) {
    //   this.sendToLoggingService(entry)
    // }
  }

  debug(message: string, data?: unknown) {
    this.log('debug', message, data)
  }

  info(message: string, data?: unknown) {
    this.log('info', message, data)
  }

  warn(message: string, data?: unknown) {
    this.log('warn', message, data)
  }

  error(message: string, data?: unknown) {
    this.log('error', message, data)
  }
}

export const logger = new Logger()

