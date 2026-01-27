import { Button } from '@/components/ui/button'
import type { PageHeaderProps } from './types'

export function PageHeader({ title, description, icon: Icon, action, children }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 ">
          {/* {Icon && (
            <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) shadow-lg shadow-[rgb(var(--brand-primary))]/30 flex items-center justify-center group">
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Icon className="w-7 h-7 text-white relative z-10" />
            </div>
          )} */}
          <div>
            <h1 className="text-4xl mb-2 font-bold text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))]">
              {title}
            </h1>
            {description && (
              <p className="text-slate-600 text-[16px] dark:text-slate-400 ">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {action && (
        <Button
          onClick={action.onClick}
          className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) 
          hover:opacity-90 text-white shadow-lg shadow-[rgb(var(--brand-primary))]/30 group text-[16px]"
        >

          {action.label}
        </Button>
      )}

      {children}
    </div>
  )
}

