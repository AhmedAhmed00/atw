import { Link } from "react-router"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import type { NavItem } from "./types"

interface SidebarNavItemProps {
  item: NavItem
  isActive: boolean
}

export function SidebarNavItem({ item, isActive }: SidebarNavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        asChild 
        isActive={isActive}
        className="rounded-lg transition-all duration-200"
      >
        <Link to={item.url} className="gap-2.5 items-center">
          <item.icon className="h-5 w-5 shrink-0 sidebar-icon" />
          <span className="text-[15px] tracking-wide group-data-[collapsible=icon]:hidden">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

