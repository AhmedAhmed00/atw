import { Link } from "react-router"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { NavItem } from "./types"

interface SidebarNavItemProps {
  item: NavItem
  isActive: boolean
}

export function SidebarNavItem({ item, isActive }: SidebarNavItemProps) {
  return (
    <SidebarMenuItem>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SidebarMenuItem>
  )
}

