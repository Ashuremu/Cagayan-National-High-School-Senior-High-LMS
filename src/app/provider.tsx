import type { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const AppProvider = ({ children }: PropsWithChildren) => {
  return <BrowserRouter>{children}</BrowserRouter>
}
