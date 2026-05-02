import type { RouteObject } from 'react-router-dom'
import { HomeRoute } from './home'

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeRoute />,
  },
]
