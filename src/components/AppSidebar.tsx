import logo from '../assets/logo.png'

interface SidebarItem {
  id: string
  label: string
}

interface AppSidebarProps {
  items: SidebarItem[]
  activeItemId?: string
  logoAlt?: string
  onItemClick?: (itemId: string) => void
}

export const AppSidebar = ({
  items,
  activeItemId,
  logoAlt = 'App logo',
  onItemClick,
}: AppSidebarProps) => {
  return (
    <aside className="student-sidebar" aria-label="Application sidebar">
      <div className="student-sidebar__logo-wrap">
        <img src={logo} alt={logoAlt} className="student-sidebar__logo" />
      </div>

      <nav className="student-sidebar__nav">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`student-sidebar__nav-item ${
              item.id === activeItemId ? 'is-active' : ''
            }`}
            onClick={() => onItemClick?.(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
