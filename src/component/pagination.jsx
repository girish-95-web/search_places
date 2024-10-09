import React from 'react';
/**
 * Pagination component for navigating between pages.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.totalPages - The total number of pages available.
 * @param {number} props.currentPage - The currently active page number.
 * @param {function} props.onPageChange - Callback function to handle page change, receiving the new page number.
 * @returns {JSX.Element} The rendered pagination component.
 */
const Pagination = React.memo(({ totalPages, currentPage, onPageChange }) => {
    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
});

export default Pagination;
