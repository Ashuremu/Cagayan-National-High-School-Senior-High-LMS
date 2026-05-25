import { TextField } from './text-field'

export type ContactPersonInfo = {
  firstName: string
  lastName: string
  middleInitial: string
  suffix: string
  mobile: string
  email: string
  occupation: string
  relationship: string
}

export type ContactPersonBlockProps = {
  title: string
  info: ContactPersonInfo
  onChange: (field: keyof ContactPersonInfo, value: string) => void
  requireOccupation?: boolean
  showRelationship?: boolean
  blockClassName?: string
}

export const ContactPersonBlock = ({
  title,
  info,
  onChange,
  requireOccupation,
  showRelationship,
  blockClassName = 'add-student-modal__parent-block',
}: ContactPersonBlockProps) => (
  <div className={blockClassName}>
    <h4 className="add-student-modal__subsection-title">{title}</h4>
    <div className="add-student-modal__grid add-student-modal__grid--4">
      <TextField
        label="First Name"
        required
        value={info.firstName}
        onChange={(value) => onChange('firstName', value)}
      />
      <TextField
        label="Last Name"
        required
        value={info.lastName}
        onChange={(value) => onChange('lastName', value)}
      />
      <TextField
        label="Middle Initial"
        value={info.middleInitial}
        onChange={(value) => onChange('middleInitial', value)}
      />
      <TextField
        label="Suffix"
        value={info.suffix}
        onChange={(value) => onChange('suffix', value)}
      />
    </div>
    <div
      className={`add-student-modal__grid ${
        showRelationship
          ? 'add-student-modal__grid--guardian-contact'
          : 'add-student-modal__grid--parent-contact'
      }`}
    >
      <TextField
        label="Mobile Number"
        required
        type="tel"
        value={info.mobile}
        onChange={(value) => onChange('mobile', value)}
      />
      <TextField
        label="Email"
        required
        type="email"
        value={info.email}
        onChange={(value) => onChange('email', value)}
      />
      <TextField
        label="Occupation"
        required={requireOccupation}
        value={info.occupation}
        onChange={(value) => onChange('occupation', value)}
      />
      {showRelationship && (
        <TextField
          label="Relationship"
          required
          value={info.relationship}
          onChange={(value) => onChange('relationship', value)}
        />
      )}
    </div>
  </div>
)
