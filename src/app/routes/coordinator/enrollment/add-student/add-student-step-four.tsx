import { ReviewAccordion } from '../../../../../components'
import type { AddStudentFormValues } from './types'
import { buildReviewSections } from './build-review-sections'

type AddStudentStepFourProps = {
  form: AddStudentFormValues
}

export const AddStudentStepFour = ({ form }: AddStudentStepFourProps) => (
  <ReviewAccordion sections={buildReviewSections(form)} defaultOpenId="school" />
)
