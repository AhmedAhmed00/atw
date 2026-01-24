/**
 * ConversationTab Component
 * Internal chat/conversation for appointment discussions
 */

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, User, Stethoscope, Shield, MessageSquare } from 'lucide-react'
import type { ConversationMessage } from '../types'

interface ConversationTabProps {
  messages: ConversationMessage[]
  onSendMessage: (message: string) => void
}

const ROLE_CONFIG = {
  doctor: {
    icon: Stethoscope,
    color: 'bg-[rgb(var(--brand-primary))]',
    label: 'Doctor',
  },
  staff: {
    icon: User,
    color: 'bg-[rgb(var(--brand-secondary))]',
    label: 'Staff',
  },
  admin: {
    icon: Shield,
    color: 'bg-[rgb(var(--status-warning))]',
    label: 'Admin',
  },
}

export function ConversationTab({ messages, onSendMessage }: ConversationTabProps) {
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!newMessage.trim()) return

    setIsSending(true)
    // Simulate sending delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    onSendMessage(newMessage.trim())
    setNewMessage('')
    setIsSending(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()
    
    if (isToday) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="flex flex-col h-[500px] border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <MessageSquare className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
          Internal Conversation
        </h3>
        <span className="ml-auto text-sm text-slate-500">
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <MessageSquare className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              No messages yet
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              Start the conversation about this appointment
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const roleConfig = ROLE_CONFIG[message.senderRole]
              const RoleIcon = roleConfig.icon

              return (
                <div key={message.id} className="flex gap-3">
                  <Avatar className="w-9 h-9 flex-shrink-0">
                    <AvatarFallback className={`${roleConfig.color} text-white text-xs`}>
                      {getInitials(message.senderName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {message.senderName}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        <RoleIcon className="w-3 h-3" />
                        {roleConfig.label}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {formatTime(message.timestamp)}
                      </span>
                      {!message.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[rgb(var(--brand-primary))]" />
                      )}
                    </div>
                    <p className="mt-1 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      {message.message}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[80px] resize-none bg-white dark:bg-slate-900"
            disabled={isSending}
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || isSending}
            className="h-auto px-4 bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}

