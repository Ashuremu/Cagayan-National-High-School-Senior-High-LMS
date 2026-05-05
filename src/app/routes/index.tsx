import type { RouteObject } from 'react-router-dom'
import { LoginRoute } from './login'
import { ProtectedRoute } from './protected-route'
import { PublicOnlyRoute } from './public-only-route'
import { RolePlaceholderPage } from './role-placeholder-page'
import { StudentRoute } from './student'

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <PublicOnlyRoute>
        <LoginRoute />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/student',
    element: (
      <ProtectedRoute>
        <StudentRoute />
      </ProtectedRoute>
    ),
  },
  {
    path: '/teacher',
    element: (
      <ProtectedRoute>
        <RolePlaceholderPage role="Teacher" />
      </ProtectedRoute>
    ),
  },
  {
    path: '/parent',
    element: (
      <ProtectedRoute>
        <RolePlaceholderPage role="Parent" />
      </ProtectedRoute>
    ),
  },
  {
    path: '/coordinator',
    element: (
      <ProtectedRoute>
        <RolePlaceholderPage role="Coordinator" />
      </ProtectedRoute>
    ),
  },
  {
    path: '/it-admin',
    element: (
      <ProtectedRoute>
        <RolePlaceholderPage role="IT Admin" />
      </ProtectedRoute>
    ),
  },
  {
    path: '/principal',
    element: (
      <ProtectedRoute>
        <RolePlaceholderPage role="Principal" />
      </ProtectedRoute>
    ),
  },
]
