import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useSession } from '../session-context'
import { getLandingPathForRole } from './role-landing'

type RoleGuardProps = PropsWithChildren<{
  allowedRole: string
}>

export const RoleGuard = ({ allowedRole, children }: RoleGuardProps) => {
  const { user, isLoading } = useSession()

  if (isLoading) {
    return null
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (user.role !== allowedRole) {
    return <Navigate to={getLandingPathForRole(user.role ?? '')} replace />
  }

  return children
}
