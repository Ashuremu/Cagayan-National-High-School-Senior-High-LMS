export type ChecklistProps<T extends string> = {
  title: string
  items: { id: T; label: string }[]
  values: Record<string, boolean>
  onChange: (id: T, checked: boolean) => void
  className?: string
  titleClassName?: string
  listClassName?: string
  itemClassName?: string
}

export const Checklist = <T extends string>({
  title,
  items,
  values,
  onChange,
  className = 'add-student-modal__requirements',
  titleClassName = 'add-student-modal__requirements-title',
  listClassName = 'add-student-modal__requirements-list',
  itemClassName = 'add-student-modal__requirement-item',
}: ChecklistProps<T>) => (
  <section className={className}>
    <h3 className={titleClassName}>{title}</h3>
    <ul className={listClassName}>
      {items.map((item) => (
        <li key={item.id}>
          <label className={itemClassName}>
            <input
              type="checkbox"
              checked={values[item.id] ?? false}
              onChange={(event) => onChange(item.id, event.target.checked)}
            />
            <span>{item.label}</span>
          </label>
        </li>
      ))}
    </ul>
  </section>
)
