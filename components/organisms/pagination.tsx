const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setPagination,
}: {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  setPagination: React.Dispatch<
    React.SetStateAction<{
      currentPage: number
      itemsPerPage: number
      count: number
    }>
  >
}) => {
  const pageCount = Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => i + 1)

  const onPageChange = (page: number) => {
    setPagination((prevState) => ({ ...prevState, currentPage: page }))
  }

  const onClickPrev = () => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: prevState.currentPage === 1 ? 1 : prevState.currentPage - 1,
    }))
  }

  const onClickNext = () => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: prevState.currentPage === pageCount.length ? pageCount.length : prevState.currentPage + 1,
    }))
  }

  const startIndex = Math.floor((currentPage - 1) / itemsPerPage) * itemsPerPage

  const visiblePages = Array.from(new Set([
    pageCount.length === 1 ? null : currentPage === pageCount.length ? 1 : null,
    ...pageCount.slice(startIndex, startIndex + itemsPerPage),
    pageCount.length === 1 ? null : currentPage !== pageCount.length ? pageCount.length : null,
  ])).filter((page) => page !== null)

  return (
    <>
      <ol className="flex justify-center gap-1 text-xs font-medium my-2">
        <li>
          <a
            onClick={onClickPrev}
            className="inline-flex size-8 items-center justify-center rounded-sm rtl:rotate-180 cursor-pointer"
          >
            <span className="sr-only">Prev Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>

        {visiblePages.map((page, index) => (
          <li key={index}>
            <a
              onClick={() => onPageChange(page)}
              className={`block size-8 min-w-8 w-auto rounded-sm text-center cursor-pointer leading-8 ${
                currentPage === page ? 'border-primary-500 bg-primary-500 text-gray-800' : 'hover:bg-primary-500/50'
              }`}
            >
              {page}
            </a>
          </li>
        ))}

        <li>
          <a
            onClick={onClickNext}
            className="inline-flex size-8 items-center justify-center rounded-sm rtl:rotate-180 cursor-pointer"
          >
            <span className="sr-only">Next Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ol>
    </>
  )
}

export default Pagination
