import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'

import { ProtectedRoute } from './components/ProtectedRoute'
import { GuestRoute } from './components/GuestRoute'
import { AppLayout } from './components/layout/AppLayout'

import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'
import TwoFactorPage from './pages/auth/two-factor'
import ForgotPasswordPage from './pages/auth/forgot-password'
import ResetPasswordPage from './pages/auth/reset-password'
import VerifyEmailPage from './pages/auth/verify-email'

import DashboardPage from './pages/dashboard'
import SettingsPage from './pages/settings'
import NotFoundPage from './pages/not-found'

function App() {
  const initAuth = useAuthStore((s) => s.initAuth)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  return (
    <Routes>
      {/* Root redirect */}
      <Route path='/' element={<Navigate to='/dashboard' replace />} />

      {/* Guest-only auth pages */}
      <Route
        path='/login'
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path='/register'
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />
      <Route path='/2fa' element={<TwoFactorPage />} />
      <Route
        path='/forgot-password'
        element={
          <GuestRoute>
            <ForgotPasswordPage />
          </GuestRoute>
        }
      />
      <Route path='/reset-password' element={<ResetPasswordPage />} />
      <Route path='/verify-email' element={<VerifyEmailPage />} />

      {/* Protected app pages */}
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/settings'
        element={
          <ProtectedRoute>
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
