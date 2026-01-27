import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '@/core/store/hooks'
import { loginUser, clearError } from '@/features/authentication/slices/authSlice'
import { loginSchema, type LoginFormValues } from '../schemas/login-schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { RootState } from '@/core/store'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const dispatch = useAppDispatch()
  const { isLoading, error, isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    // Check for success message from navigation state
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      // Clear the state to prevent showing the message again on refresh
      window.history.replaceState({}, document.title)
    }
  }, [location])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (values: LoginFormValues) => {
    dispatch(clearError())
    const result = await dispatch(loginUser({ email: values.email, password: values.password }))
    if (loginUser.fulfilled.match(result)) {
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
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
            <CardTitle className="text-3xl font-bold bg-linear-to-r from-[#09B0B6] to-[#05647A] bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Sign in to access your healthcare dashboard
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-1">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert className="animate-in fade-in slide-in-from-top-1 border-green-500 bg-green-50 dark:bg-green-950">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    {successMessage}
                  </AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@alltheway.com"
                        className="pl-10"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-medium">Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-[#09B0B6] hover:text-[#05647A] hover:underline transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          disabled={isLoading}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) hover:opacity-90 transition-opacity text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

