import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages = 1,
  setCurrentPage,
  limit,
  onLimitChange,
  limitOptions = [5, 10, 20, 50],
  totalItems = 0,
  filteredItems = 0,
  maxVisiblePages = 5,
}) {
  const next = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getPages = () => {
    let pages = [];
    let half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, maxVisiblePages);
    } else if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  const getItemClass = (page, isActive) =>
    `min-w-[36px] h-9 flex items-center justify-center rounded-md transition
     ${
       isActive
         ? 'bg-teal-600 text-white font-semibold shadow-md'
         : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-neutral-700'
     }`;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-3">
      {/* Items info */}
      <div className="text-gray-600 text-sm">
        Showing <span className="font-medium">{filteredItems}</span> of{' '}
        <span className="font-medium">{totalItems}</span> schedules
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={prev}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-2">
          {pages.map((page, index) =>
            page === '...' ? (
              <span key={`dots-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(Number(page))}
                className={getItemClass(page, page === currentPage)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={next}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
      {/* Limit selector */}
      <div className="flex items-center gap-2">
        <span className="text-gray-600 text-sm">Items per page:</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {limitOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
