import { useTheme } from "@/components/theme-provider"
import { Ambulance } from "lucide-react"

export function SidebarLogo() {
  const { theme } = useTheme()
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'
  
  return (
    <div className="flex items-center gap-3 px-1.5 pt-4 pb-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
      {/* Ambulance Icon */}
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#09B0B6] to-[#05647A] flex items-center justify-center shadow-lg">
          <Ambulance className="h-6 w-6 text-white" strokeWidth={2.5} />
        </div>
        {/* Medical Cross Badge */}
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FE3533] flex items-center justify-center border-2 border-white dark:border-[#103454]">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-white">
            <path d="M4 1V7M1 4H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      
      {/* Company Name */}
      <div className="flex flex-col group-data-[collapsible=icon]:hidden">
        <span className={`text-lg font-bold leading-tight ${
          isDark ? 'text-white' : 'text-[#103454]'
        }`}>
          All The Way
        </span>
        <span className={`text-[10px] font-medium uppercase tracking-wider ${
          isDark ? 'text-[#86E2DD]' : 'text-[#05647A]'
        }`}>
          Medical Company
        </span>
      </div>
    </div>
  )
}

