import logo from '../../../assets/logo.png'
import hero from '../../../assets/hero.png'
import './dashboard-page.css'

const courses = [
  'Oral Communication',
  'Earth and Life Science',
  'General Mathematics',
  'Komunikasyon at Pananaliksik sa Wika at Kulturang Pilipino',
]

export const DashboardPage = () => {
  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo-wrap">
          <img src={logo} alt="CNHS Logo" className="dashboard-logo" />
        </div>

        <nav className="dashboard-side-nav">
          <button className="dashboard-nav-item dashboard-nav-item-active" type="button">
            Home
          </button>
          <button className="dashboard-nav-item" type="button">
            Subjects
          </button>
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-topbar">
          <h1>Cagayan National High School Senior High LMS</h1>
          <div className="dashboard-topbar-right">
            <input placeholder="Search" aria-label="Search" />
            <span>Teacher Park</span>
            <div className="dashboard-avatar">👤</div>
          </div>
        </header>

        <div className="dashboard-tabs">
          <button className="dashboard-tab dashboard-tab-active" type="button">
            Dashboard
          </button>
          <button className="dashboard-tab" type="button">
            News
          </button>
        </div>

        <section className="dashboard-hero-calendar">
          <img src={hero} alt="Announcement" className="dashboard-hero" />
          <div className="dashboard-calendar-card">
            <h3>Calendar</h3>
            <div className="dashboard-calendar-box">[ Calendar UI ]</div>
          </div>
        </section>

        <section className="dashboard-courses">
          <h2>Courses</h2>
          <div className="dashboard-course-grid">
            {courses.map((course) => (
              <article key={course} className="dashboard-course-card">
                <img src={hero} alt={course} />
                <div className="dashboard-course-title">{course}</div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
