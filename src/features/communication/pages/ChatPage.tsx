/**
 * ChatPage Component
 * Communication and messaging interface
 */

import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { MessageSquare, Route, Headphones } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function ChatPage() {
  const navigate = useNavigate()

  const handleNavigateToChat = (chatType: 'trip' | 'support') => {
    navigate(`/communication/chat/${chatType}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Chat"
        description="Communicate with team members and clients"
        icon={MessageSquare}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Trip Chats */}
        <Card className="border-t-4 border-t-[#09B0B6] hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleNavigateToChat('trip')}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#09B0B6]/10">
                <Route className="w-6 h-6 text-[#09B0B6]" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl text-[#05647A] dark:text-[#09B0B6]">
                  Trip Chats
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  Real-time communication for trip coordination
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Communicate with drivers, dispatchers, and medical staff during active trips. 
              Share updates, coordinate logistics, and handle emergencies in real-time.
            </p>
            <Button
              onClick={() => handleNavigateToChat('trip')}
              className="w-full gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              Open Trip Chats
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Technical Support Chats */}
        <Card className="border-t-4 border-t-[#05647A] hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleNavigateToChat('support')}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#05647A]/10">
                <Headphones className="w-6 h-6 text-[#05647A]" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl text-[#05647A] dark:text-[#09B0B6]">
                  Technical Support Chats
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  Get help with technical issues and system support
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Connect with technical support team for system issues, troubleshooting, 
              feature requests, and general technical assistance.
            </p>
            <Button
              onClick={() => handleNavigateToChat('support')}
              className="w-full gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              Open Support Chats
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ChatPage
