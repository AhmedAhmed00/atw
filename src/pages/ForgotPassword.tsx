import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setIsLoading(true)

    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if email exists in static users
      const STATIC_USERS = [
        { email: 'admin@All The way.com' },
        { email: 'doctor@All The way.com' },
      ]
      
      const userExists = STATIC_USERS.some(u => u.email === email)
      
      if (!userExists) {
        setError('No account found with this email address')
        setIsLoading(false)
        return
      }

      // Store email in sessionStorage for OTP verification
      sessionStorage.setItem('reset_email', email)
      
      // Generate and store OTP (in real app, this would be sent via email)
      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      sessionStorage.setItem('reset_otp', otp)
      sessionStorage.setItem('otp_expires', (Date.now() + 10 * 60 * 1000).toString()) // 10 minutes
      
      // For demo purposes - log OTP to console
      console.log('🔐 Demo OTP (for testing only):', otp)
      
      setSuccess(true)
      
      // Navigate to verify OTP page after a brief delay
      setTimeout(() => {
        navigate('/verify-otp')
      }, 1500)
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#09B0B6]/10 dark:bg-[#09B0B6]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#05647A]/10 dark:bg-[#05647A]/5 rounded-full blur-3xl" />
      </div>

      <Card className="w-full pb-12 max-w-md relative z-10 shadow-2xl border-t-4 border-t-[#09B0B6]">
        <CardHeader className="space-y-4 text-center pb-6">
          {/* Logo */}
          <Logo variant="login" size="lg" className="justify-center" />
          
          <div>
            <CardTitle className="text-3xl font-bold bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Enter your email address and we'll send you an OTP to reset your password
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-1">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="animate-in fade-in slide-in-from-top-1 border-green-500 bg-green-50 dark:bg-green-950">
                <AlertDescription className="text-green-800 dark:text-green-200">
                  OTP has been sent to your email. Redirecting...
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@All The way.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading || success}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) hover:opacity-90 transition-opacity text-white font-semibold"
              disabled={isLoading || success}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : success ? (
                'OTP Sent!'
              ) : (
                'Send OTP'
              )}
            </Button>
          </form>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

