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
        <Link to={item.url} className=" items-center">
          <item.icon className=" shrink-0 sidebar-icon" />
          <span className=" text-[17px] font-semibold tracking-wide group-data-[collapsible=icon]:hidden">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

