import type { ReviewSection } from '../../../../../components'
import type { AddStudentFormValues } from './types'

export type { ReviewSection } from '../../../../../components'

const display = (value: string) => value.trim() || '—'

const formatSelect = (value: string, labels: Record<string, string>) =>
  display(labels[value] ?? value)

const formatAddress = (address: AddStudentFormValues['currentAddress']) => {
  const parts = [
    [address.streetUnit, address.street].filter(Boolean).join(' '),
    address.subdivision,
    address.barangay,
    address.city,
    address.province,
    address.zipCode,
  ].filter(Boolean)

  return parts.length ? parts.join(', ') : '—'
}

const formatPerson = (
  person: AddStudentFormValues['father'],
  includeRelationship = false
) => {
  const name = [person.firstName, person.middleInitial, person.lastName, person.suffix]
    .filter(Boolean)
    .join(' ')

  const lines = [
    name || '—',
    person.mobile ? `Mobile: ${person.mobile}` : '',
    person.email ? `Email: ${person.email}` : '',
    person.occupation ? `Occupation: ${person.occupation}` : '',
    includeRelationship && person.relationship
      ? `Relationship: ${person.relationship}`
      : '',
  ].filter(Boolean)

  return lines.join(' · ') || '—'
}

const checkedLabels = (
  items: { id: string; label: string }[],
  values: Record<string, boolean>
) =>
  items
    .filter((item) => values[item.id])
    .map((item) => item.label)
    .join('; ') || 'None selected'

export const buildReviewSections = (form: AddStudentFormValues): ReviewSection[] => {
  const juniorSeniorLabels = [
    { id: 'form138', label: 'Form 138 / SF9-ES' },
    { id: 'form137', label: 'Form 137 / SF10-ES' },
    { id: 'birthCertificate', label: 'PSA Birth Certificate' },
    { id: 'goodMoral', label: 'Good Moral Certificate' },
  ]

  const transfereeLabels = [
    { id: 'transferCertificate', label: 'Certificate of Transfer' },
    { id: 'form138Shs', label: 'Form 138/SF9-SHS' },
    { id: 'form137Shs', label: 'Form 137/SF10-SHS' },
    { id: 'birthCertificate', label: 'PSA Birth Certificate' },
    { id: 'goodMoral', label: 'Good Moral Certificate' },
  ]

  return [
    {
      id: 'school',
      title: 'School Information',
      rows: [
        { label: 'Learners Reference Number', value: display(form.learnersReferenceNumber) },
        {
          label: 'Admit Type',
          value: formatSelect(form.admitType, {
            new: 'New',
            transferee: 'Transferee',
            returnee: 'Returnee',
          }),
        },
        {
          label: 'Grade Level',
          value: formatSelect(form.grade, { '11': 'Grade 11', '12': 'Grade 12' }),
        },
        {
          label: 'Strand',
          value: formatSelect(form.seniorHighProgram, {
            stem: 'STEM',
            abm: 'ABM',
            humss: 'HUMSS',
            gas: 'GAS',
            tvl: 'TVL',
          }),
        },
        { label: 'School Year', value: display(form.schoolYear) },
        {
          label: 'Term',
          value: formatSelect(form.term, { '1': '1st Semester', '2': '2nd Semester' }),
        },
        {
          label: 'Student Type',
          value: formatSelect(form.studentType, {
            regular: 'Regular',
            irregular: 'Irregular',
          }),
        },
      ],
    },
    {
      id: 'student',
      title: "Student's Information",
      rows: [
        {
          label: 'Full Name',
          value: display(
            [form.firstName, form.middleName, form.lastName, form.suffix]
              .filter(Boolean)
              .join(' ')
          ),
        },
        {
          label: 'Gender',
          value: formatSelect(form.gender, { male: 'Male', female: 'Female' }),
        },
        {
          label: 'Status',
          value: formatSelect(form.status, { single: 'Single', married: 'Married' }),
        },
        { label: 'Citizenship', value: display(form.citizenship) },
        { label: 'Date of Birth', value: display(form.dateOfBirth) },
        { label: 'Birthplace', value: display(form.birthplace) },
        { label: 'Religion', value: display(form.religion) },
        { label: 'Current Address', value: formatAddress(form.currentAddress) },
        {
          label: 'Permanent Address',
          value: form.sameAsCurrentAddress
            ? 'Same as current address'
            : formatAddress(form.permanentAddress),
        },
        { label: 'Telephone No.', value: display(form.telephone) },
        { label: 'Mobile No.', value: display(form.mobile) },
        { label: 'Email Address', value: display(form.email) },
      ],
    },
    {
      id: 'education',
      title: 'Educational Background',
      rows: [
        {
          label: 'School Type',
          value: formatSelect(form.schoolAttended.schoolType, {
            public: 'Public',
            private: 'Private',
          }),
        },
        { label: 'Name of School', value: display(form.schoolAttended.schoolName) },
        {
          label: 'Program / Track & Strand',
          value: display(form.schoolAttended.program),
        },
        {
          label: 'Date of Graduation',
          value: display(form.schoolAttended.dateOfGraduation),
        },
        { label: 'School Year', value: display(form.schoolAttended.schoolYear) },
        {
          label: 'Year Level / Grade',
          value: formatSelect(form.schoolAttended.yearLevel, {
            '11': 'Grade 11',
            '12': 'Grade 12',
          }),
        },
        {
          label: 'Term',
          value: formatSelect(form.schoolAttended.term, {
            '1': '1st Semester',
            '2': '2nd Semester',
          }),
        },
      ],
    },
    {
      id: 'parents',
      title: "Parents/Guardian's Information",
      rows: [
        { label: "Father's Information", value: formatPerson(form.father) },
        { label: "Mother's Information", value: formatPerson(form.mother) },
        {
          label: "Guardian's Information",
          value: formatPerson(form.guardian, true),
        },
      ],
    },
    {
      id: 'requirements',
      title: 'Student Requirements',
      rows: [
        {
          label: 'Junior/Senior High Requirements',
          value: checkedLabels(juniorSeniorLabels, form.documents.juniorSenior),
        },
        {
          label: 'Transferee Requirements',
          value: checkedLabels(transfereeLabels, form.documents.transferee),
        },
        {
          label: 'Files Uploaded',
          value:
            form.documents.uploadedFiles.length > 0
              ? form.documents.uploadedFiles.map((file) => file.name).join(', ')
              : '—',
        },
      ],
    },
  ]
}
