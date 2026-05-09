import { useState } from 'react'
import SDO from '../../../assets/SDO.png'
import { AppSidebar, CalendarCard, SegmentTabs, SubjectSidebarOptions } from '../../../components'
import { RouteNavbar } from '../navbar'

const sidebarItems = [
  { id: 'home', label: 'Home' },
  { id: 'subjects', label: 'Subjects' },
]

const topTabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'news', label: 'News' },
]

export const ParentPage = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState('home')

  return (
    <div className="student-layout">
      <AppSidebar
        items={sidebarItems}
        activeItemId={activeSidebarItem}
        logoAlt="CNHS logo"
        onItemClick={setActiveSidebarItem}
      />

      <div className="student-main">
        <RouteNavbar userName="Parent Dela Cruz" />

        <SegmentTabs items={topTabs} activeTabId="dashboard" ariaLabel="Parent top tabs" />

        <main className="student-content">
          <section className="student-content__main">
            {activeSidebarItem === 'subjects' ? <SubjectSidebarOptions /> : null}

            <div className="student-hero">
              <img src={SDO} alt="School announcement banner" />
            </div>

            <section className="student-subjects">
              <h2>Child Subjects</h2>
              <div className="student-subject-tabs">
                <button type="button" className="is-active">
                  Enrolled <span>10</span>
                </button>
                <button type="button">Completed 0</button>
              </div>

              <div className="student-subject-grid">
                <article>Oral Communication</article>
                <article>Earth and Life Science</article>
                <article>General Mathematics</article>
                <article>Komunikasyon at Pananaliksik</article>
              </div>
            </section>
          </section>

          <aside className="student-content__side">
            <CalendarCard title="Calendar" />

            <section className="student-info-card">
              <h3>To-Do</h3>
              <p>2 Assignments Due</p>
            </section>

            <section className="student-info-card">
              <h3>Announcement</h3>
              <p>Dear CNHS Community, Please be advised.</p>
            </section>

            <section className="student-info-card">
              <h3>Today</h3>
              <p>Oral Communication - 1 Assignment 02</p>
              <p>Oral Communication - 1 Quiz</p>
            </section>
          </aside>
        </main>
      </div>
    </div>
  )
}
