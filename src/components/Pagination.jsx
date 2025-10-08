import React from "react";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

export default function Pagination({
  currentPage,
  totalResults,
  resultsPerPage,
  onPageChange, 
}) {
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="w-full bg-white border-t border-gray-200 py-4 px-6 mt-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          You have
          <span className="font-semibold text-gray-900">{totalResults}</span>{" "}
          appointments
          <span className="text-gray-400">
            (Displaying {resultsPerPage} per page)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <GrLinkPrevious className="w-4 h-4" />
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`min-w-[32px] h-8 px-3 text-sm rounded transition-colors ${
                  currentPage === page
                    ? "bg-[#1E318A] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <GrLinkNext className="w-4 h-4" />
          </button>
        </div>
        
      </div> 
    </div>
  );
}
