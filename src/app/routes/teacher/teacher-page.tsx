import { useState } from 'react'
import SDO from '../../../assets/SDO.png'
import { AppSidebar, CalendarCard, SegmentTabs, SubjectSidebarOptions } from '../../../components'
import { RouteNavbar } from '../navbar'
import { ToGradePage } from './to-grade'

const sidebarItems = [
  { id: 'home', label: 'Home' },
  { id: 'subjects', label: 'Subjects' },
]

const topTabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'news', label: 'News' },
]

export const TeacherPage = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState('home')
  const [homeView, setHomeView] = useState<'dashboard' | 'to-grade'>('dashboard')

  const handleSidebarClick = (itemId: string) => {
    setActiveSidebarItem(itemId)

    if (itemId === 'home') {
      setHomeView('dashboard')
    }
  }

  const showToGradeView = activeSidebarItem === 'home' && homeView === 'to-grade'

  return (
    <div className="student-layout">
      <AppSidebar
        items={sidebarItems}
        activeItemId={activeSidebarItem}
        logoAlt="CNHS logo"
        onItemClick={handleSidebarClick}
      />

      <div className="student-main">
        <RouteNavbar userName="Teacher Park" />

        {activeSidebarItem === 'home' && homeView === 'dashboard' && (
          <SegmentTabs items={topTabs} activeTabId="dashboard" ariaLabel="Teacher top tabs" />
        )}

        <main className="student-content">
          <section className="student-content__main">
            {activeSidebarItem === 'subjects' ? <SubjectSidebarOptions /> : null}

            {showToGradeView ? (
              <ToGradePage />
            ) : (
              <>
                <div className="student-hero">
                  <img src={SDO} alt="School announcement banner" />
                </div>

                <section className="student-subjects">
                  <h2>Courses</h2>
                  <div className="student-subject-grid">
                    <article>Oral Communication</article>
                    <article>Earth and Life Science</article>
                    <article>General Mathematics</article>
                    <article>Komunikasyon at Pananaliksik</article>
                  </div>
                </section>
              </>
            )}
          </section>

          <aside className="student-content__side">
            <CalendarCard
              title="Calendar"
              month={showToGradeView ? 1 : undefined}
              year={showToGradeView ? 2026 : undefined}
              activeDay={showToGradeView ? 14 : undefined}
            />

            <section className="student-info-card">
              <h3>Active Activities</h3>
              <p>
                1 Assignment 02{' '}
                <span className="teacher-status-pill teacher-status-pill--green">2 Submitted</span>
              </p>
              <p className="teacher-card-subtext">
                Oral Communication Nature & Elements of Communication
              </p>
            </section>

            <section className="student-info-card">
              <h3>To Grade</h3>
              <button
                type="button"
                className="teacher-sidebar-link"
                onClick={() => {
                  setActiveSidebarItem('home')
                  setHomeView('to-grade')
                }}
              >
                Pending Submissions{' '}
                <span className="teacher-status-pill teacher-status-pill--amber">10 Pending</span>
              </button>
            </section>

            <section className="student-info-card">
              <h3>Announcement</h3>
              <p>Dear CNHS Community, Please be advised.</p>
            </section>
          </aside>
        </main>
      </div>
    </div>
  )
}
