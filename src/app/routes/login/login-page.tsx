import logo from '../../../assets/logo.png'
import SDO from '../../../assets/SDO.png'
import { HighlightCard, HighlightGrid } from '../../../components'

const highlights = [
  { title: 'Easy Access to Learning Materials', icon: '📖' },
  { title: 'Track Progress and Performance', icon: '📈' },
  { title: 'Organized Schedules and Deadlines', icon: '📅' },
  { title: 'Secure and Reliable Access', icon: '🛡️' },
]

export const LoginPage = () => {
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
          <button type="button" className="login-btn">
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
    </div>
  )
}
