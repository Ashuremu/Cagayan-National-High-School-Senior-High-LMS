import {
  ContactPersonBlock,
  DateField,
  SelectField,
  TextField,
} from '../../../../../components'
import type { ParentGuardianInfo, SchoolAttendedFields } from './types'
import {
  gradeOptions,
  schoolTypeOptions,
  schoolYearExtendedOptions,
  termOptions,
} from './form-options'

type AddStudentStepTwoProps = {
  schoolAttended: SchoolAttendedFields
  father: ParentGuardianInfo
  mother: ParentGuardianInfo
  guardian: ParentGuardianInfo
  onSchoolChange: (field: keyof SchoolAttendedFields, value: string) => void
  onParentChange: (
    role: 'father' | 'mother' | 'guardian',
    field: keyof ParentGuardianInfo,
    value: string
  ) => void
}

export const AddStudentStepTwo = ({
  schoolAttended,
  father,
  mother,
  guardian,
  onSchoolChange,
  onParentChange,
}: AddStudentStepTwoProps) => (
  <>
    <fieldset className="add-student-modal__section">
      <legend>Current or Last School Attended</legend>
      <div className="add-student-modal__grid add-student-modal__grid--school-top">
        <SelectField
          label="School Type"
          required
          value={schoolAttended.schoolType}
          onChange={(value) => onSchoolChange('schoolType', value)}
          options={schoolTypeOptions}
          placeholder="Select school type"
        />
        <TextField
          label="Name of School"
          required
          value={schoolAttended.schoolName}
          onChange={(value) => onSchoolChange('schoolName', value)}
        />
        <TextField
          label="Program / Track & Strand / Specialization"
          value={schoolAttended.program}
          onChange={(value) => onSchoolChange('program', value)}
        />
      </div>
      <div className="add-student-modal__grid add-student-modal__grid--4">
        <DateField
          label="Date of Graduation"
          value={schoolAttended.dateOfGraduation}
          onChange={(value) => onSchoolChange('dateOfGraduation', value)}
        />
        <SelectField
          label="School Year"
          required
          value={schoolAttended.schoolYear}
          onChange={(value) => onSchoolChange('schoolYear', value)}
          options={schoolYearExtendedOptions}
          placeholder="Select school year"
        />
        <SelectField
          label="Year Level / Grade"
          required
          value={schoolAttended.yearLevel}
          onChange={(value) => onSchoolChange('yearLevel', value)}
          options={gradeOptions}
          placeholder="Select year level"
        />
        <SelectField
          label="Term"
          value={schoolAttended.term}
          onChange={(value) => onSchoolChange('term', value)}
          options={termOptions}
          placeholder="Select term"
        />
      </div>
    </fieldset>

    <div className="add-student-modal__parents-group">
      <p className="add-student-modal__group-title">Parents / Guardian&apos;s Information</p>

      <ContactPersonBlock
        title="Father's Information"
        info={father}
        onChange={(field, value) => onParentChange('father', field, value)}
      />

      <ContactPersonBlock
        title="Mother's Information"
        info={mother}
        onChange={(field, value) => onParentChange('mother', field, value)}
      />

      <ContactPersonBlock
        title="Guardian's Information"
        info={guardian}
        onChange={(field, value) => onParentChange('guardian', field, value)}
        requireOccupation
        showRelationship
      />
    </div>
  </>
)
