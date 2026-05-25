import { TextField } from './text-field'

export type AddressFields = {
  streetUnit: string
  street: string
  subdivision: string
  barangay: string
  city: string
  province: string
  zipCode: string
}

export type AddressFieldsSectionProps = {
  title: string
  values: AddressFields
  onChange: (field: keyof AddressFields, value: string) => void
  showSameCheckbox?: boolean
  sameAsCurrent?: boolean
  onSameAsCurrentChange?: (checked: boolean) => void
  sectionClassName?: string
  gridClassName?: string
  bottomGridClassName?: string
}

export const AddressFieldsSection = ({
  title,
  values,
  onChange,
  showSameCheckbox,
  sameAsCurrent,
  onSameAsCurrentChange,
  sectionClassName = 'add-student-modal__section',
  gridClassName = 'add-student-modal__grid add-student-modal__grid--4',
  bottomGridClassName = 'add-student-modal__grid add-student-modal__grid--address-bottom',
}: AddressFieldsSectionProps) => (
  <fieldset className={sectionClassName}>
    <div className="add-student-modal__section-heading">
      <legend>{title}</legend>
      {showSameCheckbox && (
        <label className="add-student-modal__same-address">
          <input
            type="checkbox"
            checked={sameAsCurrent}
            onChange={(event) => onSameAsCurrentChange?.(event.target.checked)}
          />
          <span>Same As Current Address</span>
        </label>
      )}
    </div>

    <div className={gridClassName}>
      <TextField
        label="Street No. / Unit No."
        required
        disabled={sameAsCurrent}
        value={values.streetUnit}
        onChange={(value) => onChange('streetUnit', value)}
      />
      <TextField
        label="Street"
        required
        disabled={sameAsCurrent}
        value={values.street}
        onChange={(value) => onChange('street', value)}
      />
      <TextField
        label="Subdivision / Village / Bldg."
        disabled={sameAsCurrent}
        value={values.subdivision}
        onChange={(value) => onChange('subdivision', value)}
      />
      <TextField
        label="Barangay"
        disabled={sameAsCurrent}
        value={values.barangay}
        onChange={(value) => onChange('barangay', value)}
      />
    </div>

    <div className={bottomGridClassName}>
      <TextField
        label="City / Municipality"
        required
        disabled={sameAsCurrent}
        value={values.city}
        onChange={(value) => onChange('city', value)}
      />
      <TextField
        label="Province"
        disabled={sameAsCurrent}
        value={values.province}
        onChange={(value) => onChange('province', value)}
      />
      <TextField
        label="Zip Code"
        required
        disabled={sameAsCurrent}
        value={values.zipCode}
        onChange={(value) => onChange('zipCode', value)}
      />
      <span className="add-student-modal__grid-spacer" aria-hidden="true" />
    </div>
  </fieldset>
)
