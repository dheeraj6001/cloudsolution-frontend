import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex flex-wrap justify-between items-center text-sm text-gray-700 gap-4">
      <div>Page {currentPage} of {totalPages}</div>

      <div className="flex items-center gap-2">
        <label htmlFor="pageSize">Show:</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <span>items per page</span>
      </div>

      <div className="space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
