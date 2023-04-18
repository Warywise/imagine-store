import React, { useState } from 'react';
import BsPagination from 'react-bootstrap/Pagination';
import PageItem, { First, Last, Next, Prev } from 'react-bootstrap/esm/PageItem';

import '../styles/App.scss';

const Pagination: React.FC<{ limit: number, total: number, setPage: (page: number) => void }> = (
  { limit, total, setPage }
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagesTotal = Math.fround(total / limit);

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= pagesTotal; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setPage(page);
  };

  return (
    <BsPagination className='pagination'>
      <First onClick={() => handleChangePage(1)} />
      <Prev
        onClick={() => (currentPage > 1) && handleChangePage(currentPage - 1)}
      />
      {getPages().map((page) => {
        return (
          <PageItem
            key={page}
            onClick={() => handleChangePage(page)}
            active={page === currentPage}
          >
            {page}
          </PageItem>
        );
      })}
      <Next
        onClick={() => (currentPage < getPages().length) && handleChangePage(currentPage + 1)}
      />
      <Last onClick={() => handleChangePage(getPages().length)} />
    </BsPagination>
  );
};

export default Pagination;
