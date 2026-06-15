import type { RegistrationScheduleRow } from './types'

const scheduleByKeyword: { keyword: string; row: Omit<RegistrationScheduleRow, 'subject'> }[] = [
  {
    keyword: 'oral communication',
    row: {
      days: 'Monday/Friday',
      time: '8:00AM - 9:00AM',
      room: 'ROOM 101',
      instructor: 'Prof. Park Santos',
    },
  },
  {
    keyword: 'earth',
    row: {
      days: 'Monday/Thursday',
      time: '10:00AM - 11:00AM',
      room: 'ROOM 102',
      instructor: 'Prof. Anna Williams',
    },
  },
  {
    keyword: 'general mathematics',
    row: {
      days: 'Tuesday/Wednesday',
      time: '1:00PM - 3:00PM',
      room: 'COMLAB 1',
      instructor: 'Prof. Jack Wayne',
    },
  },
  {
    keyword: 'physical education',
    row: {
      days: 'Tuesday/Friday',
      time: '4:00PM - 5:00PM',
      room: 'ROOM 103',
      instructor: 'Prof. Luke Stan',
    },
  },
  {
    keyword: 'pre-calculus',
    row: {
      days: 'Wednesday/Thursday',
      time: '8:00AM - 9:00AM',
      room: 'ROOM 101',
      instructor: 'Prof. Gabriel Miranda',
    },
  },
]

export const getScheduleForSubject = (subject: string): RegistrationScheduleRow => {
  const normalized = subject.toLowerCase()
  const match = scheduleByKeyword.find((entry) => normalized.includes(entry.keyword))
  const displaySubject = normalized.includes('earth')
    ? 'Earth Life & Science'
    : normalized.includes('physical education')
      ? 'Physical Education 1'
      : subject

  if (match) {
    return {
      subject: displaySubject,
      ...match.row,
    }
  }

  return {
    subject: displaySubject,
    days: '',
    time: '',
    room: '',
    instructor: '',
  }
}

export const buildScheduleRows = (subjects: string[]): RegistrationScheduleRow[] =>
  subjects.map(getScheduleForSubject)
