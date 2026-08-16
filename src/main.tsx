import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './app/global.css'
import { App } from './app/app'
import { AppProvider } from './app/provider'
import { SessionProvider } from './app/session-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </AppProvider>
  </StrictMode>,
)
