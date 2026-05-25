export type AddressFields = {
  streetUnit: string
  street: string
  subdivision: string
  barangay: string
  city: string
  province: string
  zipCode: string
}

export type ParentGuardianInfo = {
  firstName: string
  lastName: string
  middleInitial: string
  suffix: string
  mobile: string
  email: string
  occupation: string
  relationship: string
}

export type SchoolAttendedFields = {
  schoolType: string
  schoolName: string
  program: string
  dateOfGraduation: string
  schoolYear: string
  yearLevel: string
  term: string
}

export type JuniorSeniorRequirements = {
  form138: boolean
  form137: boolean
  birthCertificate: boolean
  goodMoral: boolean
}

export type TransfereeRequirements = {
  transferCertificate: boolean
  form138Shs: boolean
  form137Shs: boolean
  birthCertificate: boolean
  goodMoral: boolean
}

export type UploadedDocument = {
  id: string
  name: string
  size: number
}

export type DocumentFields = {
  juniorSenior: JuniorSeniorRequirements
  transferee: TransfereeRequirements
  uploadedFiles: UploadedDocument[]
}

export type AddStudentFormValues = {
  admitType: string
  schoolYear: string
  term: string
  studentType: string
  grade: string
  seniorHighProgram: string
  learnersReferenceNumber: string
  firstName: string
  middleName: string
  lastName: string
  suffix: string
  gender: string
  status: string
  citizenship: string
  dateOfBirth: string
  birthplace: string
  religion: string
  currentAddress: AddressFields
  permanentAddress: AddressFields
  sameAsCurrentAddress: boolean
  telephone: string
  mobile: string
  email: string
  schoolAttended: SchoolAttendedFields
  father: ParentGuardianInfo
  mother: ParentGuardianInfo
  guardian: ParentGuardianInfo
  documents: DocumentFields
}
