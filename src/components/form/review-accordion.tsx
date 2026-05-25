import { useState } from 'react'

export type ReviewRow = {
  label: string
  value: string
}

export type ReviewSection = {
  id: string
  title: string
  rows: ReviewRow[]
}

export type ReviewAccordionProps = {
  sections: ReviewSection[]
  intro?: string
  defaultOpenId?: string
  className?: string
}

export const ReviewAccordion = ({
  sections,
  intro = 'Please review the details below to ensure that all the information provided is correct. You can click on the "Previous" button to edit the details you provided.',
  defaultOpenId,
  className = 'add-student-modal__review',
}: ReviewAccordionProps) => {
  const [openSectionId, setOpenSectionId] = useState(
    defaultOpenId ?? sections[0]?.id ?? ''
  )

  const toggleSection = (id: string) => {
    setOpenSectionId((current) => (current === id ? '' : id))
  }

  return (
    <div className={className}>
      <p className="add-student-modal__review-intro">{intro}</p>

      <div className="add-student-modal__review-sections">
        {sections.map((section) => {
          const isOpen = openSectionId === section.id

          return (
            <section key={section.id} className="add-student-modal__review-accordion">
              <button
                type="button"
                className="add-student-modal__review-accordion-header"
                aria-expanded={isOpen}
                onClick={() => toggleSection(section.id)}
              >
                <span>{section.title}</span>
                <span
                  className={`add-student-modal__review-chevron ${
                    isOpen ? 'is-open' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div className="add-student-modal__review-table">
                  {section.rows.map((row) => (
                    <div key={row.label} className="add-student-modal__review-row">
                      <div className="add-student-modal__review-label">{row.label}</div>
                      <div className="add-student-modal__review-value">{row.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
