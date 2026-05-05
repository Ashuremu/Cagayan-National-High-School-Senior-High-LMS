type RolePlaceholderPageProps = {
  role: string
}

export const RolePlaceholderPage = ({ role }: RolePlaceholderPageProps) => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{role} Dashboard</h1>
      <p>This dashboard is not implemented yet.</p>
    </div>
  )
}
