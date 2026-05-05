interface SegmentTabItem {
  id: string
  label: string
}

interface SegmentTabsProps {
  items: SegmentTabItem[]
  activeTabId: string
  ariaLabel?: string
}

export const SegmentTabs = ({
  items,
  activeTabId,
  ariaLabel = 'Segment tabs',
}: SegmentTabsProps) => {
  return (
    <div className="student-tabs" role="tablist" aria-label={ariaLabel}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={item.id === activeTabId}
          className={`student-tabs__item ${item.id === activeTabId ? 'is-active' : ''}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
