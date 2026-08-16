import type { TeacherSubject } from './types'

const subjects: TeacherSubject[] = [
  {
    id: 'oral-communication',
    name: 'Oral Communication',
    coverGradient: 'linear-gradient(135deg, #ffd6e8 0%, #ffb3d9 50%, #ff8cc8 100%)',
  },
  {
    id: 'earth-life-science',
    name: 'Earth and Life Science',
    coverGradient: 'linear-gradient(135deg, #c8f7dc 0%, #7ee8a8 50%, #3dd68c 100%)',
  },
  {
    id: 'general-mathematics',
    name: 'General Mathematics',
    coverGradient: 'linear-gradient(135deg, #ffe4b5 0%, #ffc966 50%, #f5a623 100%)',
  },
  {
    id: 'komunikasyon',
    name: 'Komunikasyon at Pananaliksik sa Wika at Kulturang Pilipino',
    coverGradient: 'linear-gradient(135deg, #ffd6a5 0%, #ffb347 50%, #ff922b 100%)',
  },
  {
    id: 'pe-health',
    name: 'Physical Education & Health 1',
    coverGradient: 'linear-gradient(135deg, #a8e6cf 0%, #56cfe1 50%, #4cc9f0 100%)',
  },
  {
    id: 'eapp',
    name: 'English for Academic and Professional Purposes',
    coverGradient: 'linear-gradient(135deg, #d4c4fb 0%, #b197fc 50%, #9775fa 100%)',
  },
  {
    id: 'empowerment-tech',
    name: 'Empowerment Technologies',
    coverGradient: 'linear-gradient(135deg, #bde0fe 0%, #89c2f8 50%, #4dabf7 100%)',
  },
  {
    id: 'pre-calculus',
    name: 'Pre-Calculus',
    coverGradient: 'linear-gradient(135deg, #ffc9c9 0%, #ff8787 50%, #fa5252 100%)',
  },
  {
    id: 'general-chemistry',
    name: 'General Chemistry',
    coverGradient: 'linear-gradient(135deg, #e9ecef 0%, #ced4da 50%, #adb5bd 100%)',
  },
  {
    id: 'general-biology',
    name: 'General Biology 1',
    coverGradient: 'linear-gradient(135deg, #d8f5a2 0%, #a9e34b 50%, #82c91e 100%)',
  },
]

export const SubjectsPage = () => {
  return (
    <section className="teacher-subjects-page">
      <div className="teacher-subjects-header">
        <h2>Subjects</h2>
      </div>

      <div className="teacher-subjects-toolbar">
        <button type="button" className="teacher-subjects-filter-btn">
          <span aria-hidden="true">☰</span>
          Filter
        </button>
      </div>

      <div className="teacher-subjects-grid" aria-label="Teacher subject list">
        {subjects.map((subject) => (
          <article key={subject.id} className="teacher-subject-card">
            <div
              className="teacher-subject-card__cover"
              style={{ background: subject.coverGradient }}
              aria-hidden="true"
            />
            <div className="teacher-subject-card__body">
              <h3>{subject.name}</h3>
              <div className="teacher-subject-card__actions">
                <button type="button">Upload Lessons</button>
                <button type="button">Post Activities</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
