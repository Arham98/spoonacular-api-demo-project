import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

function CustomPagination({ meta }) {
  const setPage = (pageNo) => {
    const linkUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(linkUrl.search);
    if (queryParams.has('page')) {
      queryParams.set('page', pageNo);
    } else {
      queryParams.append('page', pageNo);
    }
    linkUrl.search = queryParams;
    const newUrl = linkUrl.toString();
    window.location.replace(newUrl);
  };

  const metaData = JSON.parse(meta);

  // Calculating total number of pages using the provided metadata
  const totalPages = Math.ceil(metaData.total / metaData.per_page);

  // Calculating the first pagination page using the provided metadata
  const firstPaginationPage = (3 * (Math.ceil(metaData.page / 3) - 1)) + 1;
  const pageNumber = metaData.page;
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === totalPages;
  const prevPage = isFirstPage ? 1 : pageNumber - 1;
  const nextPage = isLastPage ? 1 : pageNumber + 1;

  return (
    <Pagination className="justify-content-center pagination">
      <Pagination.First disabled={isFirstPage} onClick={() => setPage(1)} />
      <Pagination.Prev disabled={isFirstPage} onClick={() => setPage(prevPage)} />

      <Pagination.Item
        active={firstPaginationPage === pageNumber}
        onClick={() => setPage(firstPaginationPage)}
      >
        {firstPaginationPage}
      </Pagination.Item>
      <Pagination.Item
        disabled={firstPaginationPage + 1 > totalPages}
        active={firstPaginationPage + 1 === pageNumber}
        onClick={() => setPage(firstPaginationPage + 1)}
      >
        {firstPaginationPage + 1}
      </Pagination.Item>
      <Pagination.Item
        disabled={firstPaginationPage + 2 > totalPages}
        active={firstPaginationPage + 2 === pageNumber}
        onClick={() => setPage(firstPaginationPage + 2)}
      >
        {firstPaginationPage + 2}
      </Pagination.Item>

      {firstPaginationPage <= totalPages - 7
        && (
        <Pagination.Ellipsis disabled />
        )}
      {firstPaginationPage <= totalPages - 7
        && (
          <Pagination.Item
            onClick={() => setPage(firstPaginationPage + 7)}
          >
            {firstPaginationPage + 7}
          </Pagination.Item>
        )}

      <Pagination.Next disabled={isLastPage} onClick={() => setPage(nextPage)} />
      <Pagination.Last disabled={isLastPage} onClick={() => setPage(totalPages)} />
    </Pagination>
  );
}

CustomPagination.propTypes = {
  meta: PropTypes.string.isRequired,
};

export default CustomPagination;
