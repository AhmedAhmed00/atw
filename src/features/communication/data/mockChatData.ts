/**
 * Mock Chat Data
 */

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: string
  type: 'text' | 'system' | 'file'
  isRead: boolean
}

export interface ChatConversation {
  id: string
  title: string
  type: 'trip' | 'support'
  participants: Array<{
    id: string
    name: string
    avatar?: string
    role?: string
  }>
  lastMessage?: ChatMessage
  unreadCount: number
  status: 'active' | 'archived' | 'resolved'
  createdAt: string
}

// Mock Trip Chats
export const tripChats: ChatConversation[] = [
  {
    id: 'trip-chat-1',
    title: 'TRP-001 - Cairo to Alexandria',
    type: 'trip',
    participants: [
      { id: 'u1', name: 'John Smith', role: 'Driver' },
      { id: 'u2', name: 'Sarah Johnson', role: 'Dispatcher' },
      { id: 'u3', name: 'Dr. Ahmed', role: 'Medical Staff' },
    ],
    lastMessage: {
      id: 'm1',
      senderId: 'u1',
      senderName: 'John Smith',
      content: 'Arrived at pickup location. Patient is ready.',
      timestamp: '2024-01-20T10:30:00',
      type: 'text',
      isRead: false,
    },
    unreadCount: 2,
    status: 'active',
    createdAt: '2024-01-20T08:00:00',
  },
  {
    id: 'trip-chat-2',
    title: 'TRP-002 - Mansoura to Cairo',
    type: 'trip',
    participants: [
      { id: 'u4', name: 'Michael Brown', role: 'Driver' },
      { id: 'u2', name: 'Sarah Johnson', role: 'Dispatcher' },
    ],
    lastMessage: {
      id: 'm2',
      senderId: 'u2',
      senderName: 'Sarah Johnson',
      content: 'Route updated. Please take the alternative route due to traffic.',
      timestamp: '2024-01-20T14:15:00',
      type: 'text',
      isRead: true,
    },
    unreadCount: 0,
    status: 'active',
    createdAt: '2024-01-20T14:00:00',
  },
  {
    id: 'trip-chat-3',
    title: 'TRP-003 - Emergency Response',
    type: 'trip',
    participants: [
      { id: 'u5', name: 'Emily Davis', role: 'Driver' },
      { id: 'u2', name: 'Sarah Johnson', role: 'Dispatcher' },
      { id: 'u6', name: 'Dr. Mohamed', role: 'Medical Staff' },
    ],
    lastMessage: {
      id: 'm3',
      senderId: 'u6',
      senderName: 'Dr. Mohamed',
      content: 'Patient condition stable. Proceeding to hospital.',
      timestamp: '2024-01-20T16:45:00',
      type: 'text',
      isRead: false,
    },
    unreadCount: 1,
    status: 'active',
    createdAt: '2024-01-20T16:00:00',
  },
]

// Mock Technical Support Chats
export const supportChats: ChatConversation[] = [
  {
    id: 'support-chat-1',
    title: 'System Login Issue',
    type: 'support',
    participants: [
      { id: 'u7', name: 'David Wilson', role: 'User' },
      { id: 'u8', name: 'Support Agent', role: 'Support' },
    ],
    lastMessage: {
      id: 'm4',
      senderId: 'u8',
      senderName: 'Support Agent',
      content: 'I\'ve reset your password. Please try logging in again.',
      timestamp: '2024-01-20T09:20:00',
      type: 'text',
      isRead: false,
    },
    unreadCount: 1,
    status: 'active',
    createdAt: '2024-01-20T09:00:00',
  },
  {
    id: 'support-chat-2',
    title: 'Vehicle Tracking Not Working',
    type: 'support',
    participants: [
      { id: 'u9', name: 'Lisa Anderson', role: 'User' },
      { id: 'u8', name: 'Support Agent', role: 'Support' },
    ],
    lastMessage: {
      id: 'm5',
      senderId: 'u9',
      senderName: 'Lisa Anderson',
      content: 'The tracking is working now. Thank you!',
      timestamp: '2024-01-20T11:30:00',
      type: 'text',
      isRead: true,
    },
    unreadCount: 0,
    status: 'resolved',
    createdAt: '2024-01-20T10:00:00',
  },
  {
    id: 'support-chat-3',
    title: 'Invoice Generation Error',
    type: 'support',
    participants: [
      { id: 'u10', name: 'Robert Taylor', role: 'User' },
      { id: 'u8', name: 'Support Agent', role: 'Support' },
    ],
    lastMessage: {
      id: 'm6',
      senderId: 'u8',
      senderName: 'Support Agent',
      content: 'We\'ve identified the issue. A fix will be deployed today.',
      timestamp: '2024-01-20T15:00:00',
      type: 'text',
      isRead: false,
    },
    unreadCount: 1,
    status: 'active',
    createdAt: '2024-01-20T14:00:00',
  },
]

// Mock messages for a conversation
export const mockMessages: Record<string, ChatMessage[]> = {
  'trip-chat-1': [
    {
      id: 'm1',
      senderId: 'u2',
      senderName: 'Sarah Johnson',
      content: 'Trip TRP-001 assigned. Please proceed to Cairo University Hospital.',
      timestamp: '2024-01-20T08:00:00',
      type: 'text',
      isRead: true,
    },
    {
      id: 'm2',
      senderId: 'u1',
      senderName: 'John Smith',
      content: 'On my way. ETA 15 minutes.',
      timestamp: '2024-01-20T08:05:00',
      type: 'text',
      isRead: true,
    },
    {
      id: 'm3',
      senderId: 'u1',
      senderName: 'John Smith',
      content: 'Arrived at pickup location. Patient is ready.',
      timestamp: '2024-01-20T10:30:00',
      type: 'text',
      isRead: false,
    },
  ],
  'support-chat-1': [
    {
      id: 'm1',
      senderId: 'u7',
      senderName: 'David Wilson',
      content: 'I cannot log into the system. Getting an error message.',
      timestamp: '2024-01-20T09:00:00',
      type: 'text',
      isRead: true,
    },
    {
      id: 'm2',
      senderId: 'u8',
      senderName: 'Support Agent',
      content: 'Hello David, I can help you with that. What error message are you seeing?',
      timestamp: '2024-01-20T09:05:00',
      type: 'text',
      isRead: true,
    },
    {
      id: 'm3',
      senderId: 'u7',
      senderName: 'David Wilson',
      content: 'It says "Invalid credentials" but I\'m sure my password is correct.',
      timestamp: '2024-01-20T09:10:00',
      type: 'text',
      isRead: true,
    },
    {
      id: 'm4',
      senderId: 'u8',
      senderName: 'Support Agent',
      content: 'I\'ve reset your password. Please try logging in again.',
      timestamp: '2024-01-20T09:20:00',
      type: 'text',
      isRead: false,
    },
  ],
}

