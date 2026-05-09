type SummaryCard = {
  label: string
  value: string
}

type DashboardSummaryCardsProps = {
  cards: SummaryCard[]
}

export const DashboardSummaryCards = ({ cards }: DashboardSummaryCardsProps) => {
  return (
    <section className="dashboard-summary-grid" aria-label="Dashboard summary cards">
      {cards.map((card) => (
        <article key={card.label} className="dashboard-summary-card">
          <p>{card.label}</p>
          <strong>{card.value}</strong>
        </article>
      ))}
    </section>
  )
}
