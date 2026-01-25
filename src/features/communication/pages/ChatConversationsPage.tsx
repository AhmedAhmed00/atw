/**
 * ChatConversationsPage Component
 * Shows list of conversations and active chat
 */

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { MessageSquare, ArrowLeft, Search, Send, Paperclip, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { tripChats, supportChats, mockMessages, ChatConversation, ChatMessage } from '../data/mockChatData'
import { cn } from '@/lib/utils'

export function ChatConversationsPage() {
  const { chatType } = useParams<{ chatType: 'trip' | 'support' }>()
  const navigate = useNavigate()
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const conversations = chatType === 'trip' ? tripChats : supportChats
  const chatTitle = chatType === 'trip' ? 'Trip Chats' : 'Technical Support Chats'

  // Filter conversations by search query
  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participants.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Get selected conversation details
  const selectedConv = conversations.find((c) => c.id === selectedConversation)
  const messages = selectedConversation ? (mockMessages[selectedConversation] || []) : []

  // Auto-select first conversation if none selected
  if (!selectedConversation && filteredConversations.length > 0) {
    setSelectedConversation(filteredConversations[0].id)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#05647A] dark:text-[#09B0B6]">
                {chatTitle}
              </h2>
              <p className="text-sm text-muted-foreground">
                {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/communication/chat')}
              className="gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No conversations found
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={cn(
                    'p-3 rounded-lg cursor-pointer transition-colors',
                    selectedConversation === conversation.id
                      ? 'bg-[#09B0B6]/10 border border-[#09B0B6]'
                      : 'hover:bg-accent'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#09B0B6] text-white">
                        {conversation.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">{conversation.title}</h3>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-[#09B0B6] text-white text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      {conversation.lastMessage && (
                        <p className="text-xs text-muted-foreground truncate">
                          {conversation.lastMessage.senderName}: {conversation.lastMessage.content}
                        </p>
                      )}
                      {conversation.lastMessage && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-[#09B0B6] text-white">
                    {selectedConv.title.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedConv.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedConv.participants.map((p) => p.name).join(', ')}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                  <DropdownMenuItem>Mute</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3',
                      message.senderId === 'u2' || message.senderId === 'u8' ? 'justify-start' : 'justify-end'
                    )}
                  >
                    {message.senderId === 'u2' || message.senderId === 'u8' ? (
                      <>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-[#09B0B6] text-white text-xs">
                            {message.senderName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 max-w-[70%]">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium">{message.senderName}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          <div className="bg-muted rounded-lg p-3">
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 max-w-[70%] flex flex-col items-end">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">
                            {formatTime(message.timestamp)}
                          </span>
                          <span className="text-xs font-medium">{message.senderName}</span>
                        </div>
                        <div className="bg-[#09B0B6] text-white rounded-lg p-3">
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      // TODO: Send message
                    }
                  }}
                />
                <Button
                  size="sm"
                  className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-2">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatConversationsPage

