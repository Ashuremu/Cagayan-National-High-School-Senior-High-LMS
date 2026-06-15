export type SubjectOption = {
  id: string
  label: string
}

export const defaultStemSubjects: SubjectOption[] = [
  { id: 'oral-communication', label: 'Oral Communication' },
  { id: 'earth-life-science', label: 'Earth and Life Science' },
  { id: 'general-mathematics', label: 'General Mathematics' },
  {
    id: 'komunikasyon',
    label: 'Komunikasyon at Pananaliksik sa Wika at Kulturang Pilipino',
  },
  { id: 'pe-health-1', label: 'Physical Education & Health 1' },
  {
    id: 'english-academic',
    label: 'English for Academic and Professional Purposes',
  },
  { id: 'empowerment-tech', label: 'Empowerment Technologies' },
  { id: 'pre-calculus', label: 'Pre-Calculus' },
  { id: 'general-chemistry', label: 'General Chemistry' },
  { id: 'general-biology', label: 'General Biology 1' },
]

export const defaultSelectedSubjectIds = defaultStemSubjects.map((subject) => subject.id)
