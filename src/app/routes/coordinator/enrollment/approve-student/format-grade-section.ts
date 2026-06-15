import type { AddStudentFormValues } from '../add-student/types'

export const formatGradeSectionLabel = (
  values: AddStudentFormValues,
  section: string
) => {
  const strandLabels: Record<string, string> = {
    stem: 'STEM',
    abm: 'ABM',
    humss: 'HUMSS',
    gas: 'GAS',
    tvl: 'TVL',
  }
  const strand = strandLabels[values.seniorHighProgram] ?? values.seniorHighProgram
  const grade = values.grade || '11'

  return `${strand} ${grade} – ${section}`
}

export const formatApprovalDateTime = (date = new Date()) =>
  date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
