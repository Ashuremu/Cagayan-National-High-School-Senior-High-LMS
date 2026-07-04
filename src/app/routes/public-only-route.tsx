import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getSessionUser } from '../../api/session/session-api'
import { getLandingPathForRole } from './role-landing'

export const PublicOnlyRoute = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<'loading' | 'allow-public' | 'redirect-private'>('loading')
  const [redirectPath, setRedirectPath] = useState('/student')

  useEffect(() => {
    let isMounted = true
    void getSessionUser().then((user) => {
      if (!isMounted) return
      if (!user) {
        setStatus('allow-public')
        return
      }

      setRedirectPath(getLandingPathForRole(user.role ?? ''))
      setStatus('redirect-private')
    })

    return () => {
      isMounted = false
    }
  }, [])

  if (status === 'loading') {
    return null
  }

  if (status === 'redirect-private') {
    return <Navigate to={redirectPath} replace />
  }

  return children
}
