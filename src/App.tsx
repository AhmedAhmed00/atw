import { Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAppSelector } from '@/core/store/hooks'
import { PageLoader } from '@/components/shared/loading'
import { createPublicRoutes, protectedRoutes } from '@/core/router/routes'
import { ScrollRestoration } from './core/providers/ScrollRestoration'
import { logger } from './utils/logger'

function AppRoutes() {
  logger.info('AppRoutes')
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const publicRoutes = createPublicRoutes({ isAuthenticated })

  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollRestoration />
      <Routes>
        {publicRoutes}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>{protectedRoutes}</Routes>
                </Suspense>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  )
}

function App() {
  return <AppRoutes />
}

export default App

