type SubjectSidebarOptionsProps = {
  onSeeAllClick?: () => void
}

const subjectGroups = [
  {
    title: 'Core Subjects',
    subjects: [
      'Oral Communication',
      'General Mathematics',
      'Earth and Life Science',
      'Physical Education & Health 1',
      'Komunikasyon at Pananaliksik sa Wika at Kulturang Pilipino',
    ],
  },
  {
    title: 'Applied Subjects',
    subjects: ['English for Academic and Professional Purposes', 'Empowerment Technologies'],
  },
  {
    title: 'Specialized',
    subjects: ['Pre-Calculus', 'General Biology 1', 'General Chemistry'],
  },
]

export const SubjectSidebarOptions = ({ onSeeAllClick }: SubjectSidebarOptionsProps) => {
  return (
    <section className="student-subject-sidebar-options" aria-label="Subject options">
      {subjectGroups.map((group) => (
        <div key={group.title} className="student-subject-sidebar-options__group">
          <h3>{group.title}</h3>
          <div className="student-subject-sidebar-options__list">
            {group.subjects.map((subject) => (
              <p key={subject}>{subject}</p>
            ))}
          </div>
        </div>
      ))}

      <div className="student-subject-sidebar-options__actions">
        <button type="button" onClick={onSeeAllClick}>
          See All
        </button>
      </div>
    </section>
  )
}
