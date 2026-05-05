export function getLandingPathForRole(role: string) {
  switch (role) {
    case 'Student':
      return '/student'
    case 'Teacher':
      return '/teacher'
    case 'Parent':
      return '/parent'
    case 'Coordinator':
      return '/coordinator'
    case 'IT Admin':
      return '/it-admin'
    case 'Principal':
      return '/principal'
    default:
      return '/student'
  }
}
