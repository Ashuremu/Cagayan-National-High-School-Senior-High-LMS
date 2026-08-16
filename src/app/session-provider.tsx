import { useEffect, useState, type PropsWithChildren } from 'react'
import { getSessionUser } from '../api/session/session-api'
import { SessionContext, type SessionState } from './session-context'

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<SessionState['user']>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    void getSessionUser().then((sessionUser) => {
      if (!isMounted) return
      setUser(sessionUser)
      setIsLoading(false)
    })
    return () => {
      isMounted = false
    }
  }, [])

  const refresh = async () => {
    setIsLoading(true)
    const sessionUser = await getSessionUser()
    setUser(sessionUser)
    setIsLoading(false)
  }

  return (
    <SessionContext.Provider value={{ user, isLoading, refresh }}>
      {children}
    </SessionContext.Provider>
  )
}
