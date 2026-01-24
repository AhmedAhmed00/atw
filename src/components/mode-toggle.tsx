import { Moon, Sun, Sparkles } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) rounded-full opacity-20 blur-xl" />
      
      <div className="relative flex items-center gap-1 p-1 rounded-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 
      dark:border-2  dark:border-[rgb(var(--bg-primary)]/30 dark:border-[rgb(var(--brand-primary))]/30 shadow-lg shadow-[rgb(var(--brand-primary))]/20 dark:shadow-[rgb(var(--brand-primary))]/30">
        <button
          onClick={() => setTheme('light')}
          className={`relative group flex items-center justify-center w-7 h-7 rounded-full transition-all duration-500 ease-out ${
            theme === 'light' 
              ? 'bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) shadow-lg shadow-[rgb(var(--brand-primary))]/40 scale-110' 
              : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105'
          }`}
          aria-label="Light mode"
        >
          <Sun className={`w-4 h-4 transition-all duration-500 ${
            theme === 'light' 
              ? 'text-white rotate-0 scale-100' 
              : 'text-[rgb(var(--brand-secondary))] dark:text-slate-400 rotate-90 scale-90 group-hover:rotate-180 group-hover:scale-100'
          }`} />
          {theme === 'light' && (
            <span className="absolute inset-0 rounded-full">
              {[...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 h-1 bg-[rgb(var(--brand-primary))]"
                  style={{
                    animation: `pulse 2s ease-in-out ${i * 0.2}s infinite`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </span>
          )}
        </button>

        <button
          onClick={() => setTheme('system')}
          className={`relative group flex items-center justify-center w-7 h-7 rounded-full transition-all duration-500 ease-out ${
            theme === 'system' 
              ? 'bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) shadow-lg shadow-[rgb(var(--brand-primary))]/40 scale-110' 
              : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105'
          }`}
          aria-label="System theme"
        >
          <Sparkles className={`w-4 h-4 transition-all duration-500 ${
            theme === 'system' 
              ? 'text-white scale-100' 
              : 'text-[rgb(var(--brand-secondary))] dark:text-slate-400 scale-90 group-hover:scale-100'
          }`} />
        </button>

        <button
          onClick={() => setTheme('dark')}
          className={`relative group flex items-center justify-center w-7 h-7 rounded-full transition-all duration-500 ease-out overflow-hidden ${
            theme === 'dark' 
              ? 'bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) shadow-lg shadow-[rgb(var(--brand-primary))]/40 scale-110' 
              : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105'
          }`}
          aria-label="Dark mode"
        >
          <Moon className={`w-4 h-4 transition-all duration-500 ${
            theme === 'dark' 
              ? 'text-white -rotate-12 scale-100' 
              : 'text-[rgb(var(--brand-secondary))] dark:text-slate-400 rotate-90 scale-90 group-hover:-rotate-12 group-hover:scale-100'
          }`} />
          {theme === 'dark' && (
            <>
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  style={{
                    top: `${20 + i * 20}%`,
                    left: `${15 + i * 25}%`,
                    animation: `twinkle 3s ease-in-out ${i * 0.5}s infinite`,
                  }}
                />
              ))}
            </>
          )}
        </button>
      </div>
    </div>
  )
}

