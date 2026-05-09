import { useEffect, useRef, useState } from 'react'

type UserProfileMenuProps = {
  userName: string
  onProfileClick?: () => void
  onLogoutClick: () => void | Promise<void>
}

export const UserProfileMenu = ({
  userName,
  onProfileClick,
  onLogoutClick,
}: UserProfileMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!menuRef.current) return
      if (menuRef.current.contains(event.target as Node)) return
      setIsOpen(false)
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [])

  const handleProfileClick = () => {
    setIsOpen(false)
    onProfileClick?.()
  }

  const handleLogoutClick = async () => {
    setIsOpen(false)
    await onLogoutClick()
  }

  return (
    <div className="student-user-menu" ref={menuRef}>
      <span className="student-user-name">{userName}</span>
      <button
        type="button"
        className="student-avatar"
        aria-label="User profile"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => {
          setIsOpen((currentValue) => !currentValue)
        }}
      >
        👤
      </button>
      {isOpen ? (
        <div className="student-user-dropdown" role="menu">
          <button type="button" role="menuitem" onClick={handleProfileClick}>
            Profile
          </button>
          <button type="button" role="menuitem" onClick={() => void handleLogoutClick()}>
            Log out
          </button>
        </div>
      ) : null}
    </div>
  )
}
