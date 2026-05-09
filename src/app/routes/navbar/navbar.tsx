import { useNavigate } from 'react-router-dom'
import { UserProfileMenu } from '../../../components'
import { logoutWithBackend } from './server/logout-api'

type RouteNavbarProps = {
  userName: string
}

export const RouteNavbar = ({ userName }: RouteNavbarProps) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutWithBackend()
    navigate('/', { replace: true })
  }

  return (
    <header className="app-topbar">
      <h1>Cagayan National High School Senior High LMS</h1>

      <div className="app-topbar__actions">
        <label className="app-search">
          <input type="text" placeholder="Search" aria-label="Search" />
        </label>
        <button type="button" className="app-icon-btn" aria-label="Notifications">
          🔔
        </button>
        <button type="button" className="app-icon-btn" aria-label="Messages">
          ✉
        </button>
        <UserProfileMenu userName={userName} onLogoutClick={handleLogout} />
      </div>
    </header>
  )
}
