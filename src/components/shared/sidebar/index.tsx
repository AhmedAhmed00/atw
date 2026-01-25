import type { ComponentProps } from "react"
import { useNavigate } from 'react-router-dom'
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { SidebarLogo } from "./SidebarLogo"
import { SidebarNavGroup } from "./SidebarNavGroup"
import { navigationSections } from "./navigationData"
import { useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarHeader className="px-4 pt-4 pb-3 border-b border-sidebar-border/50">
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent className="px-3 py-2 ">
        {navigationSections.map((section, index) => (
          <div key={section.label}>
            <SidebarNavGroup section={section} />
            
          </div>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border/50 bg-sidebar/50">
        <SidebarMenu>
          <SidebarMenuItem>
         

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 dark:hover:bg-destructive/20 dark:hover:border-destructive/40 transition-all group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

// Re-export subcomponents
export { SidebarLogo } from "./SidebarLogo"
export { SidebarNavGroup } from "./SidebarNavGroup"
export { SidebarNavItem } from "./SidebarNavItem"
export { navigationSections } from "./navigationData"
export type { NavItem, NavSection } from "./types"

