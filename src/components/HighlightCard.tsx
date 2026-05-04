import type { ReactNode } from 'react'

export type HighlightCardProps = {
  title: string
  icon: ReactNode
  className?: string
}

export const HighlightCard = ({
  title,
  icon,
  className,
}: HighlightCardProps) => {
  const rootClass = ['highlight-card', className].filter(Boolean).join(' ')

  return (
    <article className={rootClass}>
      <div className="highlight-card__icon" aria-hidden="true">
        {icon}
      </div>
      <p className="highlight-card__title">{title}</p>
    </article>
  )
}
