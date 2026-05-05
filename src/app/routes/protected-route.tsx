import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { checkAuthenticated } from '../auth'

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<'loading' | 'allowed' | 'blocked'>('loading')

  useEffect(() => {
    let isMounted = true
    void checkAuthenticated().then((isAllowed) => {
      if (!isMounted) return
      setStatus(isAllowed ? 'allowed' : 'blocked')
    })

    return () => {
      isMounted = false
    }
  }, [])

  if (status === 'loading') {
    return null
  }

  if (status === 'blocked') {
    return <Navigate to="/" replace />
  }

  return children
}
