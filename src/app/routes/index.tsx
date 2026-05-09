import type { RouteObject } from 'react-router-dom'
import { CoordinatorRoute } from './coordinator'
import { ItAdminRoute } from './it-admin'
import { LoginRoute } from './login'
import { ParentRoute } from './parent'
import { PrincipalRoute } from './principal'
import { ProtectedRoute } from './protected-route'
import { PublicOnlyRoute } from './public-only-route'
import { StudentRoute } from './student'
import { TeacherRoute } from './teacher'

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
        <TeacherRoute />
      </ProtectedRoute>
    ),
  },
  {
    path: '/parent',
    element: (
      <ProtectedRoute>
        <ParentRoute />
      </ProtectedRoute>
    ),
  },
  {
    path: '/coordinator',
    element: (
      <ProtectedRoute>
        <CoordinatorRoute />
      </ProtectedRoute>
    ),
  },
  {
    path: '/it-admin',
    element: (
      <ProtectedRoute>
        <ItAdminRoute />
      </ProtectedRoute>
    ),
  },
  {
    path: '/principal',
    element: (
      <ProtectedRoute>
        <PrincipalRoute />
      </ProtectedRoute>
    ),
  },
]
