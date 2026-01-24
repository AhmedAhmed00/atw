import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plus,
  Calendar,
  FileText,
  Users,
  Settings,
  BarChart3,
} from 'lucide-react'

export function QuickActions() {
  const actions = [
    {
      title: 'New Appointment',
      description: 'Schedule a new appointment',
      icon: Plus,
      color: 'from-[#09B0B6] to-[#05647A]',
    },
    {
      title: 'View Calendar',
      description: 'Check your schedule',
      icon: Calendar,
      color: 'from-[#05647A] to-[#09B0B6]',
    },
    {
      title: 'Patient Records',
      description: 'Access patient files',
      icon: Users,
      color: 'from-[#09B0B6] to-[#05647A]',
    },
    {
      title: 'Reports',
      description: 'View analytics',
      icon: BarChart3,
      color: 'from-[#05647A] to-[#09B0B6]',
    },
    {
      title: 'Generate Invoice',
      description: 'Create new invoice',
      icon: FileText,
      color: 'from-[#09B0B6] to-[#05647A]',
    },
    {
      title: 'Settings',
      description: 'Configure system',
      icon: Settings,
      color: 'from-[#05647A] to-[#09B0B6]',
    },
  ]

  return (
    <Card className="border-t-4 border-t-[rgb(var(--brand-secondary))] dark:border-t-[rgb(var(--brand-primary))]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))]">
          Quick Actions
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Common tasks and shortcuts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto flex flex-col items-center justify-center p-3 md:p-4 
                  hover:shadow-lg hover:shadow-[rgb(var(--brand-primary))]/10 
                  dark:hover:shadow-[rgb(var(--brand-primary))]/20
                  hover:border-[rgb(var(--brand-primary))]/50
                  dark:hover:border-[rgb(var(--brand-primary))]/60
                  dark:bg-slate-900/30
                  transition-all duration-300 group"
              >
                <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg md:rounded-xl bg-linear-to-br ${action.color} 
                  mb-1.5 md:mb-2 group-hover:scale-110 
                  shadow-lg shadow-black/10 dark:shadow-black/30
                  transition-transform duration-300`}>
                  <Icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-xs sm:text-sm text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))]">
                    {action.title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 md:mt-1 hidden sm:block">
                    {action.description}
                  </p>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

