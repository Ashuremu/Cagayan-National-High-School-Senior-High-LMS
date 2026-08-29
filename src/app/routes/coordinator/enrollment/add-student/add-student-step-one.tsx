import {
  AddressFieldsSection,
  DateField,
  SelectField,
  TextField,
} from '../../../../../components'
import type { AddStudentFormValues, AddressFields } from './types'
import {
  admitTypeOptions,
  genderOptions,
  gradeOptions,
  programOptions,
  schoolYearOptions,
  statusOptions,
  studentTypeOptions,
  termOptions,
} from './form-options'

type AddressFieldKey = keyof AddressFields

type AddStudentStepOneProps = {
  form: AddStudentFormValues
  updateField: <K extends keyof AddStudentFormValues>(
    field: K,
    value: AddStudentFormValues[K]
  ) => void
  updateCurrentAddress: (field: AddressFieldKey, value: string) => void
  updatePermanentAddress: (field: AddressFieldKey, value: string) => void
  onSameAsCurrentChange: (checked: boolean) => void
}

export const AddStudentStepOne = ({
  form,
  updateField,
  updateCurrentAddress,
  updatePermanentAddress,
  onSameAsCurrentChange,
}: AddStudentStepOneProps) => (
  <>
    <div className="add-student-modal__grid add-student-modal__grid--2">
      <div className="add-student-modal__column">
        <SelectField
          label="Admit Type"
          required
          value={form.admitType}
          onChange={(value) => updateField('admitType', value)}
          options={admitTypeOptions}
          placeholder="Select admit type"
        />
        <SelectField
          label="School Year"
          required
          value={form.schoolYear}
          onChange={(value) => updateField('schoolYear', value)}
          options={schoolYearOptions}
          placeholder="Select school year"
        />
        <SelectField
          label="Term"
          required
          value={form.term}
          onChange={(value) => updateField('term', value)}
          options={termOptions}
          placeholder="Select term"
        />
      </div>

      <div className="add-student-modal__column">
        <SelectField
          label="Student Type"
          value={form.studentType}
          onChange={(value) => updateField('studentType', value)}
          options={studentTypeOptions}
          placeholder="Select student type"
        />
        <SelectField
          label="Grade"
          required
          value={form.grade}
          onChange={(value) => updateField('grade', value)}
          options={gradeOptions}
          placeholder="Select grade"
        />
        <SelectField
          label="Senior High Program"
          required
          value={form.seniorHighProgram}
          onChange={(value) => updateField('seniorHighProgram', value)}
          options={programOptions}
          placeholder="Select program"
        />
        <TextField
          label="Learners Reference Number"
          value={form.learnersReferenceNumber}
          onChange={(value) => updateField('learnersReferenceNumber', value)}
        />
      </div>
    </div>

    <fieldset className="add-student-modal__section">
      <legend>Student&apos;s Information</legend>
      <div className="add-student-modal__grid add-student-modal__grid--4">
        <TextField
          label="First Name"
          required
          value={form.firstName}
          onChange={(value) => updateField('firstName', value)}
        />
        <TextField
          label="Middle Name"
          value={form.middleName}
          onChange={(value) => updateField('middleName', value)}
        />
        <TextField
          label="Last Name"
          required
          value={form.lastName}
          onChange={(value) => updateField('lastName', value)}
        />
        <TextField
          label="Suffix Name"
          value={form.suffix}
          onChange={(value) => updateField('suffix', value)}
        />
      </div>

      <div className="add-student-modal__grid add-student-modal__grid--4">
        <SelectField
          label="Gender"
          required
          value={form.gender}
          onChange={(value) => updateField('gender', value)}
          options={genderOptions}
          placeholder="Select gender"
        />
        <SelectField
          label="Status"
          required
          value={form.status}
          onChange={(value) => updateField('status', value)}
          options={statusOptions}
          placeholder="Select status"
        />
        <TextField
          label="Citizenship"
          required
          value={form.citizenship}
          onChange={(value) => updateField('citizenship', value)}
        />
        <DateField
          label="Date of Birth"
          required
          value={form.dateOfBirth}
          onChange={(value) => updateField('dateOfBirth', value)}
        />
      </div>

      <div className="add-student-modal__grid add-student-modal__grid--birth">
        <TextField
          label="Birthplace"
          required
          value={form.birthplace}
          onChange={(value) => updateField('birthplace', value)}
        />
        <TextField
          label="Religion"
          required
          className="add-student-modal__field--wide"
          value={form.religion}
          onChange={(value) => updateField('religion', value)}
        />
      </div>
    </fieldset>

    <AddressFieldsSection
      title="Current Address"
      values={form.currentAddress}
      onChange={updateCurrentAddress}
    />

    <AddressFieldsSection
      title="Permanent Address"
      values={form.permanentAddress}
      onChange={updatePermanentAddress}
      showSameCheckbox
      sameAsCurrent={form.sameAsCurrentAddress}
      onSameAsCurrentChange={onSameAsCurrentChange}
    />

    <fieldset className="add-student-modal__section">
      <legend>Contact Details</legend>
      <div className="add-student-modal__grid add-student-modal__grid--3">
        <TextField
          label="Telephone No."
          type="tel"
          value={form.telephone}
          onChange={(value) => updateField('telephone', value)}
        />
        <TextField
          label="Mobile No."
          required
          type="tel"
          value={form.mobile}
          onChange={(value) => updateField('mobile', value)}
        />
        <TextField
          label="Email Address"
          required
          type="email"
          value={form.email}
          onChange={(value) => updateField('email', value)}
        />
      </div>
    </fieldset>
  </>
)
