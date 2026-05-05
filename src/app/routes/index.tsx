import type { RouteObject } from 'react-router-dom'
import { LoginRoute } from './login'
import { StudentRoute } from './student'

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LoginRoute />,
  },
  {
    path: '/student',
    element: <StudentRoute />,
  },
]
