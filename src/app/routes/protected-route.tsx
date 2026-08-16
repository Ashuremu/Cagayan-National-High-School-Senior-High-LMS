import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useSession } from '../session-context'

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user, isLoading } = useSession()

  if (isLoading) {
    return null
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}
