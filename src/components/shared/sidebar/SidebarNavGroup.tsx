import { useState, useEffect } from "react"
import { useLocation } from "react-router"
import { ChevronRight } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SidebarNavItem } from "./SidebarNavItem"
import type { NavSection } from "./types"
import { cn } from "@/lib/utils"

interface SidebarNavGroupProps {
  section: NavSection
}

export function SidebarNavGroup({ section }: SidebarNavGroupProps) {
  const location = useLocation()

  // Check if any item in this section is active
  const hasActiveItem = section.items.some(item => location.pathname === item.url)

  // All sections start open by default, but ensure active sections stay open
  const [isOpen, setIsOpen] = useState(true)

  // Ensure section with active item stays open
  useEffect(() => {
    if (hasActiveItem && !isOpen) {
      setIsOpen(true)
    }
  }, [hasActiveItem, isOpen])

  return (
    <SidebarGroup className="space-y-0.5">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-1 cursor-pointer hover:text-foreground transition-colors flex items-center justify-between group group-data-[collapsible=icon]:hidden">
            <span className="flex-1">{section.label}</span>
            <ChevronRight
              className={cn(
                "h-3 w-3 transition-transform duration-200 shrink-0",
                isOpen && "rotate-90"
              )}
            />
          </SidebarGroupLabel>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {section.items.map((item) => (
                <SidebarNavItem
                  key={item.title}
                  item={item}
                  isActive={location.pathname === item.url}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  )
}

