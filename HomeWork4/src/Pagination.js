import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
/*
This code defines a React component named Pagination that renders a 
pagination UI for displaying and navigating through a collection of items. 
The component imports a helper function usePagination from a separate file that 
calculates the pagination range based on the current page, total count of items, sibling count, and page size.*/

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  /*The Pagination component accepts several props including onPageChange (a callback function to handle page changes), 
  totalCount (the total count of items), siblingCount (the number of siblings to show on each side of the current page), 
  currentPage (the current page number), pageSize (the number of items to display on each page), and 
  className (an optional class name for styling the component). */

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  /*When a pagination item is clicked, it calls the onPageChange callback function with the corresponding page number. 
  The component also updates the class names of the selected and disabled items based on the current page and pagination range. 
  Finally, it exports the Pagination component as the default export of the module.*/

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
