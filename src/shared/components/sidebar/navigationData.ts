import {
  Home,
  Users,
  Cog,
  Calendar,
  CheckSquare,
  Building2,
  UserCheck,
  Car,
  Route,
  Receipt,
  MessageSquare,
  CalendarCheck,
} from "lucide-react"
import type { NavSection } from "./types"

export const navigationSections: NavSection[] = [
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
      },
    ],
  },
  {
    label: "Human Resources",
    items: [
      {
        title: "Employees",
        url: "/employees",
        icon: Users,
      },
      {
        title: "Shifts",
        url: "/shifts",
        icon: Calendar,
      },
      {
        title: "Attendance",
        url: "/attendance",
        icon: CalendarCheck,
      },
      {
        title: "Tasks",
        url: "/tasks",
        icon: CheckSquare,
      },
    ],
  },
  {
    label: "Clients",
    items: [
      {
        title: "Institutions",
        url: "/clients/institutions",
        icon: Building2,
      },
      {
        title: "Patients",
        url: "/clients/patients",
        icon: UserCheck,
      },
    ],
  },
  {
    label: "Fleet",
    items: [
      {
        title: "Vehicles",
        url: "/fleet/vehicles",
        icon: Car,
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        title: "Trips",
        url: "/operations/trips",
        icon: Route,
      },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        title: "Invoices",
        url: "/finance/invoices",
        icon: Receipt,
      },
    ],
  },
  {
    label: "Communication",
    items: [
      {
        title: "Chat",
        url: "/communication/chat",
        icon: MessageSquare,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Settings",
        url: "/settings",
        icon: Cog,
      },
    ],
  },
]
