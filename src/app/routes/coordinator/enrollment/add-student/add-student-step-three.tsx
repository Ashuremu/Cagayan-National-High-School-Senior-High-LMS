import { Checklist, FileUpload } from '../../../../../components'
import type {
  DocumentFields,
  JuniorSeniorRequirements,
  TransfereeRequirements,
} from './types'

const juniorSeniorItems: { id: keyof JuniorSeniorRequirements; label: string }[] = [
  {
    id: 'form138',
    label: "Original Form 138 / SF9-ES (Learner's Progress Report Card)",
  },
  {
    id: 'form137',
    label: "Original Form 137 / SF10-ES (Learner's Permanent Academic Record)",
  },
  { id: 'birthCertificate', label: 'PSA-issued Birth Certificate' },
  {
    id: 'goodMoral',
    label:
      'Original Copy of Certificate of Good Moral Character or Recommendation from the School Principal',
  },
]

const transfereeItems: { id: keyof TransfereeRequirements; label: string }[] = [
  { id: 'transferCertificate', label: 'Certificate of Transfer (Honorable Dismissal)' },
  { id: 'form138Shs', label: 'Original Form 138/SF9-SHS' },
  { id: 'form137Shs', label: 'Original Form 137/SF10-SHS (Copy for STI)' },
  { id: 'birthCertificate', label: 'PSA-issued Birth Certificate' },
  {
    id: 'goodMoral',
    label:
      'Original Copy of Certificate of Good Moral Character or Recommendation from the School Principal',
  },
]

type AddStudentStepThreeProps = {
  documents: DocumentFields
  onJuniorSeniorChange: (id: keyof JuniorSeniorRequirements, checked: boolean) => void
  onTransfereeChange: (id: keyof TransfereeRequirements, checked: boolean) => void
  onFilesAdd: (files: FileList | File[]) => void
  onFileRemove: (id: string) => void
}

export const AddStudentStepThree = ({
  documents,
  onJuniorSeniorChange,
  onTransfereeChange,
  onFilesAdd,
  onFileRemove,
}: AddStudentStepThreeProps) => (
  <>
    <Checklist
      title="Junior/Senior High School Requirements"
      items={juniorSeniorItems}
      values={documents.juniorSenior}
      onChange={onJuniorSeniorChange}
    />

    <Checklist
      title="Senior High School Transferees Requirements"
      items={transfereeItems}
      values={documents.transferee}
      onChange={onTransfereeChange}
    />

    <FileUpload
      files={documents.uploadedFiles}
      onFilesAdd={onFilesAdd}
      onFileRemove={onFileRemove}
    />
  </>
)
