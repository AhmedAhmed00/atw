import {
  Home,
  Users,
  Briefcase,
  Clock,
  CreditCard,
  UserCircle,
  Cog,
  HeadsetIcon,
  Calendar,
  ClipboardCheck,
  CheckSquare,
  Building2,
  UserCheck,
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
        icon: ClipboardCheck,
      },
      {
        title: "Tasks",
        url: "/tasks",
        icon: CheckSquare,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        title: "Profile",
        url: "/profile",
        icon: UserCircle,
      },
      {
        title: "Services",
        url: "/services",
        icon: Briefcase,
      },
      {
        title: "Working Hours",
        url: "/working-hours",
        icon: Clock,
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
    label: "Operations",
    items: [
      {
        title: "Appointments",
        url: "/appointments",
        icon: Users,
      },
      {
        title: "Payments",
        url: "/payments",
        icon: CreditCard,
      },
      {
        title: "Support",
        url: "/support",
        icon: HeadsetIcon,
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
