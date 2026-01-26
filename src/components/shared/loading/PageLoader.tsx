/**
 * Page Loader Component
 * Full-page loading indicator
 */

import { Loader2 } from 'lucide-react'

interface PageLoaderProps {
  message?: string
}

export function PageLoader({ message = 'Loading...' }: PageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#09B0B6]" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

