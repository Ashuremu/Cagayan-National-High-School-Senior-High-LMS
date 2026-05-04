import type { RouteObject } from 'react-router-dom'
import { LoginRoute } from './login'

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LoginRoute />,
  },
]
