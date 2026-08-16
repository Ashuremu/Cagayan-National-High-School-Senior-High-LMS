import { createContext, useContext } from 'react'
import type { SessionUser } from '../api/session/session-api'

export type SessionState = {
  user: SessionUser | null
  isLoading: boolean
  refresh: () => Promise<void>
}

export const SessionContext = createContext<SessionState | undefined>(undefined)

export const useSession = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
