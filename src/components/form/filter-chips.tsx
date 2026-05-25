export type FilterChipOption<T extends string> = {
  id: T
  label: string
}

export type FilterChipGroupProps<T extends string> = {
  options: FilterChipOption<T>[]
  activeId: T
  onChange: (id: T) => void
  ariaLabel: string
  className?: string
  chipClassName?: string
  activeChipClassName?: string
}

export const FilterChipGroup = <T extends string>({
  options,
  activeId,
  onChange,
  ariaLabel,
  className = 'enrollment-filters',
  chipClassName = 'enrollment-filter',
  activeChipClassName = 'is-active',
}: FilterChipGroupProps<T>) => (
  <div className={className} role="tablist" aria-label={ariaLabel}>
    {options.map((option) => (
      <button
        key={option.id}
        type="button"
        role="tab"
        aria-selected={activeId === option.id}
        className={`${chipClassName} ${activeId === option.id ? activeChipClassName : ''}`}
        onClick={() => onChange(option.id)}
      >
        {option.label}
      </button>
    ))}
  </div>
)
