import type { RouteObject } from 'react-router-dom'
import { CoordinatorRoute } from './coordinator'
import { ItAdminRoute } from './it-admin'
import { LoginRoute } from './login'
import { ParentRoute } from './parent'
import { PrincipalRoute } from './principal'
import { ProtectedRoute } from './protected-route'
import { PublicOnlyRoute } from './public-only-route'
import { RoleGuard } from './role-guard'
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
        <RoleGuard allowedRole="Student">
          <StudentRoute />
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/teacher',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRole="Teacher">
          <TeacherRoute />
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/parent',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRole="Parent">
          <ParentRoute />
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/coordinator',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRole="Coordinator">
          <CoordinatorRoute />
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/it-admin',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRole="IT Admin">
          <ItAdminRoute />
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/principal',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRole="Principal">
          <PrincipalRoute />
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
]
