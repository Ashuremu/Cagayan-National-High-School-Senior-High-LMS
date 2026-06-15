import { createRoot } from 'react-dom/client'
import { RegistrationFormTemplate } from './registration-form-template'
import type { RegistrationFormData } from './types'

const PRINT_ROOT_ID = 'registration-form-print-root'
const PRINT_BODY_CLASS = 'is-printing-registration-form'

const cleanupPrint = (root: ReturnType<typeof createRoot>, container: HTMLDivElement) => {
  root.unmount()
  container.remove()
  document.body.classList.remove(PRINT_BODY_CLASS)
}

export const printRegistrationForm = (data: RegistrationFormData) => {
  const existing = document.getElementById(PRINT_ROOT_ID)

  if (existing) {
    existing.remove()
  }

  const container = document.createElement('div')
  container.id = PRINT_ROOT_ID
  document.body.prepend(container)
  document.body.classList.add(PRINT_BODY_CLASS)

  const root = createRoot(container)
  root.render(RegistrationFormTemplate({ data }))

  const handleAfterPrint = () => {
    cleanupPrint(root, container)
    window.removeEventListener('afterprint', handleAfterPrint)
  }

  window.addEventListener('afterprint', handleAfterPrint)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.print()
    })
  })
}
