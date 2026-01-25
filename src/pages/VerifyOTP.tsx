import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, ArrowLeft, ShieldCheck } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { Link } from 'react-router-dom'

export default function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const navigate = useNavigate()
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Check if email exists in sessionStorage
    const email = sessionStorage.getItem('reset_email')
    if (!email) {
      navigate('/forgot-password')
      return
    }

    // Check if OTP has expired
    const expiresAt = sessionStorage.getItem('otp_expires')
    if (expiresAt) {
      const expires = parseInt(expiresAt)
      const remaining = Math.max(0, Math.floor((expires - Date.now()) / 1000))
      setTimeLeft(remaining)
    }
  }, [navigate])

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return // Only allow single digit
    
    const newOtp = [...otp]
    newOtp[index] = value.replace(/\D/g, '') // Only allow digits
    setOtp(newOtp)
    setError('')

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newOtp = [...otp]
    
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || ''
    }
    
    setOtp(newOtp)
    setError('')
    
    // Focus the last filled input or the last input
    const lastFilledIndex = Math.min(pastedData.length - 1, 5)
    inputRefs.current[lastFilledIndex]?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const otpString = otp.join('')
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP')
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))

      const storedOtp = sessionStorage.getItem('reset_otp')
      const expiresAt = sessionStorage.getItem('otp_expires')

      if (!storedOtp || !expiresAt) {
        setError('OTP session expired. Please request a new OTP.')
        setIsLoading(false)
        return
      }

      if (Date.now() > parseInt(expiresAt)) {
        setError('OTP has expired. Please request a new OTP.')
        sessionStorage.removeItem('reset_otp')
        sessionStorage.removeItem('otp_expires')
        setIsLoading(false)
        return
      }

      if (otpString !== storedOtp) {
        setError('Invalid OTP. Please try again.')
        setIsLoading(false)
        return
      }

      // OTP verified successfully - navigate to reset password page or back to login
      // For now, we'll just show success and redirect to login
      // In a real app, you'd navigate to a reset password page
      sessionStorage.removeItem('reset_otp')
      sessionStorage.removeItem('otp_expires')
      
      // Store verification success
      sessionStorage.setItem('otp_verified', 'true')
      
      // Navigate to login with success message
      navigate('/login', { state: { message: 'OTP verified successfully! You can now reset your password.' } })
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setError('')
    setIsLoading(true)

    try {
      const email = sessionStorage.getItem('reset_email')
      if (!email) {
        navigate('/forgot-password')
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Generate new OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
      sessionStorage.setItem('reset_otp', newOtp)
      sessionStorage.setItem('otp_expires', (Date.now() + 10 * 60 * 1000).toString())
      
      // For demo purposes - log OTP to console
      console.log('🔐 Demo OTP (for testing only):', newOtp)
      
      setTimeLeft(600)
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } catch (err) {
      setError('Failed to resend OTP. Please try again.')
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
              Verify OTP
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Enter the 6-digit code sent to your email
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

            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium text-center block">
                Verification Code
              </Label>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-14 text-center text-xl font-semibold"
                    disabled={isLoading}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {timeLeft > 0 ? (
                  <>Code expires in: <span className="font-semibold text-[#09B0B6]">{formatTime(timeLeft)}</span></>
                ) : (
                  <span className="text-destructive">Code expired</span>
                )}
              </span>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isLoading || timeLeft > 0}
                className="text-[#09B0B6] hover:text-[#05647A] hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Resend OTP
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) hover:opacity-90 transition-opacity text-white font-semibold"
              disabled={isLoading || otp.join('').length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Verify OTP
                </>
              )}
            </Button>
          </form>

          <div className="text-center">
            <Link
              to="/forgot-password"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to forgot password
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

