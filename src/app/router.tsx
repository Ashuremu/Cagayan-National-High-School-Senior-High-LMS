import { useRoutes } from 'react-router-dom'
import { appRoutes } from './routes'

export const AppRouter = () => {
  const element = useRoutes(appRoutes)
  return element
}
