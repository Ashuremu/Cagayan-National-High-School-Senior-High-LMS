import logo from '../../../assets/logo.png'
import SDO from '../../../assets/SDO.png'
import { HighlightCard, HighlightGrid } from '../../../components'
import Modal from '../../../components/Modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginWithBackend } from '../../../api/login/login-api'
import { getLandingPathForRole } from '../role-landing'

const highlights = [
  { title: 'Easy Access to Learning Materials', icon: '📖' },
  { title: 'Track Progress and Performance', icon: '📈' },
  { title: 'Organized Schedules and Deadlines', icon: '📅' },
  { title: 'Secure and Reliable Access', icon: '🛡️' },
]

const mockCredentials = [
  {
    role: 'Student',
    email: 'student@cnhs-lms.test',
    password: 'Student123!',
  },
  {
    role: 'Parent',
    email: 'parent@cnhs-lms.test',
    password: 'Parent123!',
  },
  {
    role: 'Teacher',
    email: 'teacher@cnhs-lms.test',
    password: 'Teacher123!',
  },
  {
    role: 'Coordinator',
    email: 'coordinator@cnhs-lms.test',
    password: 'Coord123!',
  },
  {
    role: 'IT Admin',
    email: 'itadmin@cnhs-lms.test',
    password: 'ITAdmin123!',
  },
  {
    role: 'Principal',
    email: 'principal@cnhs-lms.test',
    password: 'Principal123!',
  },
]

export const LoginPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleUseMockCredentials = (mockEmail: string, mockPassword: string) => {
    setEmail(mockEmail)
    setPassword(mockPassword)
  }

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !password.trim()) return

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const result = await loginWithBackend({ email, password })
      if (!result.ok) {
        setErrorMessage((result as { error: { message: string } }).error.message)
        return
      }

      setIsLoginModalOpen(false)
      navigate(getLandingPathForRole(result.data.user.role ?? ''))
    } catch {
      setErrorMessage('Cannot connect to server. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="login-brand">
          <img src={logo} alt="CNHS logo" className="login-logo" />
          <h2>Cagayan National High School Senior High LMS</h2>
        </div>

        <nav className="login-nav" aria-label="Main navigation">
          <a href="/">About</a>
          <a href="/">Helpdesk</a>
          <a href="/">FAQs</a>
          <button
            type="button"
            className="login-btn"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Login
          </button>
        </nav>
      </header>

      <section className="login-hero">
        <img src={SDO} alt="School announcement banner" />
      </section>

      <main className="login-content">
        <HighlightGrid
          className="login-highlights"
          aria-label="Platform highlights"
        >
          {highlights.map((highlight) => (
            <HighlightCard
              key={highlight.title}
              title={highlight.title}
              icon={highlight.icon}
            />
          ))}
        </HighlightGrid>
      </main>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        size="lg"
        showCloseButton={false}
        className="login-modal"
      >
        <div className="login-modal-content">
          <button
            type="button"
            onClick={() => setIsLoginModalOpen(false)}
            className="login-modal-close"
            aria-label="Close login modal"
          >
            ×
          </button>

          <h2 className="login-modal-title">Welcome</h2>

          <form className="login-modal-form" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <label className="login-modal-forgot">
              <input type="checkbox" />
              <span>Forgot Password?</span>
            </label>

            <button type="submit" className="login-modal-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            {errorMessage ? (
              <p role="alert" style={{ color: '#b91c1c', margin: 0 }}>
                {errorMessage}
              </p>
            ) : null}
          </form>

          <section className="mock-credentials" aria-label="Mock login credentials">
            <h3>Mock Credentials For Testing</h3>
            <ul>
              {mockCredentials.map((credential) => (
                <li key={credential.role}>
                  <div>
                    <strong>{credential.role}</strong>
                    <span>{credential.email}</span>
                    <span>{credential.password}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleUseMockCredentials(credential.email, credential.password)
                    }
                  >
                    Use
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Modal>
    </div>
  )
}
