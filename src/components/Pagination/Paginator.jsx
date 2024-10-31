import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const Paginator = ({
  handlePrev,
  handleNext,
  handlePageClick,
  currentPage,
  totalPages,
}) => {
  // Create an array for pages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Function to render page items
  const renderPages = () => {
    const firstPages = pages.slice(0, 4)
    const lastPages = pages.slice(-4)

    if (totalPages <= 8) {
      // If total pages are less than or equal to 8, show all pages
      return pages.map((page) => (
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            isActive={page === currentPage}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ))
    }

    // Render first 4 pages, ellipsis, and last 4 pages
    return (
      <>
        {firstPages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Show ellipsis if necessary */}
        {totalPages > 8 && <PaginationEllipsis />}

        {lastPages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </>
    )
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrev}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* Render page links */}
        {renderPages()}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default Paginator
