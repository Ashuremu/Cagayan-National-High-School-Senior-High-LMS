import type { ReactNode } from 'react'

export type HighlightGridProps = {
  children: ReactNode
  className?: string
  gridClassName?: string
  'aria-label'?: string
}

export const HighlightGrid = ({
  children,
  className,
  gridClassName,
  'aria-label': ariaLabel,
}: HighlightGridProps) => {
  const wrapClass = ['highlight-grid-wrap', className]
    .filter(Boolean)
    .join(' ')
  const gridClass = ['highlight-grid', gridClassName]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={wrapClass} aria-label={ariaLabel}>
      <div className={gridClass}>{children}</div>
    </section>
  )
}
