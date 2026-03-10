/**
 * Pagination - Componente de paginação para navegar entre páginas do blog
 * Exibe botões anterior/próximo e números de página com ellipsis quando necessário
 */
export type PaginationDict = {
  prevAriaLabel: string;
  nextAriaLabel: string;
  goToPageAriaLabel: string; // use "{page}"
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  t: PaginationDict;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  t,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  // Gerar array de páginas para exibir
  const getPageNumbers = () => {
    const pages: Array<number | "..."> = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) endPage = 4;
      else if (currentPage >= totalPages - 1) startPage = totalPages - 3;

      if (startPage > 2) pages.push("...");

      for (let i = startPage; i <= endPage; i++) pages.push(i);

      if (endPage < totalPages - 1) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-4 py-12 px-6 bg-[#05294F]">
      {/* Botão anterior */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-8 h-8 text-[#FFFFFF] hover:opacity-80 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        aria-label={t.prevAriaLabel}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M15 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Números de página */}
      <div className="flex items-center gap-4">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 text-[#FFFFFF] text-sm opacity-60"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`text-[#FFFFFF] text-sm font-medium transition cursor-pointer ${isActive
                ? "w-8 h-8 rounded border-[0.5px] border-[#A2A2A2]/50 bg-[#A2A2A2]/20 flex items-center justify-center"
                : "hover:opacity-80"
                }`}
              aria-label={t.goToPageAriaLabel.replace("{page}", String(pageNum))}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Botão próximo */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-8 h-8 text-[#FFFFFF] hover:opacity-80 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        aria-label={t.nextAriaLabel}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
