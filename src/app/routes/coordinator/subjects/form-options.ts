export const teacherOptions = [
  { value: 'park-santos', label: 'Park Santos' },
  { value: 'maria-reyes', label: 'Maria Reyes' },
  { value: 'juan-cruz', label: 'Juan Cruz' },
]

export const subjectOptions = [
  { value: 'oral-communication', label: 'Oral Communication' },
  { value: 'stem-11', label: 'STEM 11' },
  { value: 'general-mathematics', label: 'General Mathematics' },
  { value: 'physical-science', label: 'Physical Science' },
]

export const gradeOptions = [
  { value: '11', label: '11' },
  { value: '12', label: '12' },
]

export const sectionOptions = [
  { value: 'einstein', label: 'Einstein' },
  { value: 'newton', label: 'Newton' },
  { value: 'darwin', label: 'Darwin' },
]

export const academicPeriodOptions = [
  { value: '1st-semester', label: '1st Semester' },
  { value: '2nd-semester', label: '2nd Semester' },
]

export const roomOptions = [
  { value: 'room-101', label: 'Room 101' },
  { value: 'room-102', label: 'Room 102' },
  { value: 'room-201', label: 'Room 201' },
]

export const scheduleDayOptions = [
  { value: 'mwf', label: 'MWF' },
  { value: 'tth', label: 'TTh' },
  { value: 'monday-friday', label: 'Monday/Friday' },
]

export const scheduleTimeOptions = [
  { value: '8:00 AM - 9:00 AM', label: '8:00 AM - 9:00 AM' },
  { value: '9:00 AM - 10:00 AM', label: '9:00 AM - 10:00 AM' },
  { value: '1:00 PM - 2:00 PM', label: '1:00 PM - 2:00 PM' },
]

export const getOptionLabel = (
  options: { value: string; label: string }[],
  value: string
) => options.find((option) => option.value === value)?.label ?? value
