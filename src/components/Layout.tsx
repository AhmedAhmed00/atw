import { ReactNode } from 'react'
import { useLocation } from 'react-router'
import { SidebarProvider, SidebarInset, SidebarTrigger } from './ui/sidebar'
import { AppSidebar } from './shared/sidebar'
import { Separator } from './ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { ModeToggle } from './mode-toggle'
import { NotificationPopover } from './shared/notifications'
import { Logo } from './shared/Logo'

interface LayoutProps {
  children: ReactNode
}

// Route to page title mapping
const getPageTitle = (pathname: string): string => {
  const routes: Record<string, string> = {
    '/': 'Overview',
    '/profile': 'Profile',
    '/working-hours': 'Working Hours',
    '/appointments': 'Appointments',
    '/payments': 'Payments',
    '/about': 'About',
    '/form': 'Form Example',
    '/users': 'Users Table',
    '/services': 'Services',
    '/support': 'Support',
    '/settings': 'Settings',
    '/employees': 'Employees',
    '/shifts': 'Shifts',
    '/shifts/new': 'Create Shift',
    '/shifts/swap-request/new': 'New Swap Request',
    '/attendance': 'Attendance',
    '/tasks': 'Tasks',
  }

  // Check for exact match first
  if (routes[pathname]) {
    return routes[pathname]
  }

  // Check for prefix match (for nested routes like /appointments/details/1)
  for (const [route, title] of Object.entries(routes)) {
    if (pathname.startsWith(route) && route !== '/') {
      return title
    }
  }

  return 'Page'
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const pageTitle = getPageTitle(location.pathname)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center  border-b border-sidebar py-10 px-8 ">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block text-[15px] font-semibold">
                <BreadcrumbLink href="/" className="flex items-center">
                  <span className="ml-2">All The Way</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <NotificationPopover />
            <ModeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4  px-8 py-5">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

