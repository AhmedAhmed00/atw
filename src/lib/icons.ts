/**
 * Centralized icon imports for better tree-shaking
 * Import icons from this file instead of directly from lucide-react
 * This helps Vite optimize and tree-shake unused icons
 */

// Common icons used across the app
export {
  Home,
  Users,
  Calendar,
  Clock,
  CreditCard,
  UserCircle,
  Cog,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Edit,
  Trash,
  Search,
  Filter,
  Download,
  Upload,
  FileDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Check,
  X as XIcon,
  AlertCircle,
  Info,
  Loader2,
  MoreVertical,
  Eye,
  EyeOff,
  Settings,
  Bell,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  ClipboardCheck,
  CheckSquare,
  HeadsetIcon,
  UserCheck,
  Ambulance,
  Table2,
  CalendarDays,
  ArrowLeftRight,
} from 'lucide-react'

// Re-export all icons for convenience (Vite will tree-shake unused ones)
export * from 'lucide-react'

