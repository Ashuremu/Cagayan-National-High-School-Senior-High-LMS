export type PaginationControlsProps = {
  className?: string
  fieldClassName?: string
  itemsPerPage?: number
  itemsOptions?: number[]
  page?: number
  totalPages?: number
}

export const PaginationControls = ({
  className = 'enrollment-pagination',
  fieldClassName = 'enrollment-pagination__field',
  itemsPerPage = 10,
  itemsOptions = [10, 25, 50],
  page = 1,
  totalPages = 1,
}: PaginationControlsProps) => (
  <div className={className}>
    <label className={fieldClassName}>
      <span>Items</span>
      <select defaultValue={String(itemsPerPage)} aria-label="Items per page">
        {itemsOptions.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>

    <label className={fieldClassName}>
      <span>Page</span>
      <select defaultValue={String(page)} aria-label="Current page">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <option key={pageNumber} value={pageNumber}>
            {pageNumber}
          </option>
        ))}
      </select>
      <span>of {totalPages}</span>
    </label>
  </div>
)
