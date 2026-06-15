import logo from '../../../../../assets/logo.png'
import type { RegistrationFormData } from './types'

type RegistrationFormTemplateProps = {
  data: RegistrationFormData
}

const FieldRow = ({ label, value }: { label: string; value: string }) => (
  <div className="registration-form__field-row">
    <span className="registration-form__field-label">{label}</span>
    <span className="registration-form__field-value">{value || '\u00A0'}</span>
  </div>
)

const ContactRow = ({
  left,
  right,
}: {
  left: { label: string; value: string }
  right?: { label: string; value: string }
}) => (
  <div className={`registration-form__contact-row ${right ? 'is-split' : ''}`}>
    <div className="registration-form__contact-item">
      <span className="registration-form__field-label">{left.label}</span>
      <span className="registration-form__field-value">{left.value || '\u00A0'}</span>
    </div>
    {right && (
      <div className="registration-form__contact-item">
        <span className="registration-form__field-label">{right.label}</span>
        <span className="registration-form__field-value">{right.value || '\u00A0'}</span>
      </div>
    )}
  </div>
)

export const RegistrationFormTemplate = ({ data }: RegistrationFormTemplateProps) => (
  <article className="registration-form" aria-label="Student registration form">
    <header className="registration-form__header">
      <img src={logo} alt="Cagayan National High School logo" className="registration-form__logo" />
      <div className="registration-form__header-text">
        <h1>CAGAYAN NATIONAL HIGH SCHOOL - SENIOR HIGH</h1>
        <p>Taft Street, Bagay Road, Tuguegarao City, Philippines</p>
        <p>cnhs.seniorhs@gmail.com</p>
      </div>
    </header>

    <div className="registration-form__body">
      <section className="registration-form__section">
        <h2 className="registration-form__section-title">STUDENT INFORMATION</h2>
        <div className="registration-form__section-content">
          <FieldRow label="Full Name:" value={data.fullName} />
          <FieldRow label="School Year:" value={data.schoolYear} />
          <FieldRow label="Program:" value={data.program} />
          <FieldRow label="Term:" value={data.term} />
          <FieldRow label="Student Type:" value={data.studentType} />
          <FieldRow label="Student Number:" value={data.studentNumber} />
        </div>
      </section>

      <section className="registration-form__section">
        <h2 className="registration-form__section-title">CONTACT INFORMATION</h2>
        <div className="registration-form__section-content">
          <ContactRow
            left={{ label: 'Parent/Guardian Name:', value: data.parentGuardianName }}
          />
          <ContactRow
            left={{ label: 'Telephone No.:', value: data.telephone }}
            right={{ label: 'Mobile No.:', value: data.mobile }}
          />
          <ContactRow
            left={{ label: 'Emergency Contact Name:', value: data.emergencyContactName }}
            right={{ label: 'Emergency Phone:', value: data.emergencyPhone }}
          />
          <ContactRow
            left={{ label: 'Relationship to Student:', value: data.relationshipToStudent }}
            right={{ label: 'Alternate Phone:', value: data.alternatePhone }}
          />
        </div>
      </section>

      <section className="registration-form__section">
        <h2 className="registration-form__section-title">ACADEMIC</h2>
        <div className="registration-form__section-content">
          <table className="registration-form__table">
            <thead>
              <tr>
                <th>Subjects</th>
                <th>Days</th>
                <th>Time</th>
                <th>Room</th>
                <th>Instructor</th>
              </tr>
            </thead>
            <tbody>
              {data.schedule.map((row) => (
                <tr key={row.subject}>
                  <td>{row.subject}</td>
                  <td>{row.days}</td>
                  <td>{row.time}</td>
                  <td>{row.room}</td>
                  <td>{row.instructor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="registration-form__section registration-form__section--credentials">
        <div className="registration-form__credentials">
          <p>
            You may access your student account after three (3) working days. Your account
            credentials are:
          </p>
          <p>
            <strong>Username:</strong> {data.username}
          </p>
          <p>{data.passwordHint}</p>
        </div>

        <div className="registration-form__footer">
          <div className="registration-form__signature">
            <span className="registration-form__signature-line" />
            <span>Student Signature</span>
          </div>
          <div className="registration-form__date">
            <span className="registration-form__date-value">{data.registrationDate.day}</span>
            <span>/</span>
            <span className="registration-form__date-value">{data.registrationDate.month}</span>
            <span>/</span>
            <span className="registration-form__date-value">{data.registrationDate.year}</span>
          </div>
        </div>
      </section>
    </div>
  </article>
)
