import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { PageSpinner } from '@/components/PageSpinner'
import { RequireAuth } from '@/components/RequireAuth'
import { ChangePasswordPage } from '@/modules/auth/pages/ChangePasswordPage'
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { RegisterPage } from '@/modules/auth/pages/RegisterPage'
import { LandingPage } from '@/modules/landing/pages/LandingPage'

const DashboardPage = lazy(
  () => import('@/modules/dashboard/pages/DashboardPage'),
)

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/change-password" element={<ChangePasswordRoute />} />
      <Route path="/dashboard" element={<DashboardRoute />} />
    </Routes>
  )
}

function ChangePasswordRoute() {
  return (
    <RequireAuth>
      <ChangePasswordPage />
    </RequireAuth>
  )
}

function DashboardRoute() {
  return (
    <RequireAuth>
      <Suspense fallback={<PageSpinner />}>
        <DashboardPage />
      </Suspense>
    </RequireAuth>
  )
}
