import { useState } from 'react';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 6;
const usePagination = <T>(data: T[] = [], pageSize = DEFAULT_PAGE_SIZE) => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

  const indexOfLastEvent = currentPage * pageSize;
  const indexOfFirstEvent = indexOfLastEvent - pageSize;
  const currentRecords = data
    ? data.slice(indexOfFirstEvent, indexOfLastEvent)
    : [];

  const onNextPage = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  return { currentRecords, onNextPage };
};

export default usePagination;
