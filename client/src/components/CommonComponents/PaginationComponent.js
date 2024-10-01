import React, { useEffect, useState } from "react";

const PaginationComponent = ({
  totalPages,
  currentPage,
  itemsPerPage,
  onPageChange,
  setCurrentPage,
}) => {
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
  // const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    console.log(newPage, "newPagePaginationComponent");
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
      // setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);
  return (
    <div className="">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-300/80"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-3 py-1 mx-1 ${
            currentPage === index + 1
              ? "bg-teal-500 text-white rounded-md"
              : "bg-gray-300 text-gray-700 rounded-md hover:bg-gray-300/80"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 text-gray-700 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-300/80 "
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
