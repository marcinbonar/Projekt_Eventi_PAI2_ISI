import { Container, SimpleGrid } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { FC, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import SideBar from '../../components/SideBar/SideBar';
import usePagination from '../../hooks/usePagination';
import { useGetUserEventsQuery } from '../../redux/event/eventsApi';
import { IEvent } from '../../types/event';
import EventCard from './components/EventCard/EventCard';


const PaginationWrapper = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    padding-top: 2rem;
    list-style: none;
    margin: 0;
  }

  .page,
  .break-me,
  .previous,
  .next {
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }

  .active {
    border-color: teal;
    color: white;
    background-color: teal;
  }

  .previous.disabled,
  .next.disabled {
    border-color: #ccc;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const EventsList: FC = () => {
  const { data: eventsData, isLoading, refetch } = useGetUserEventsQuery();
  const { currentRecords, onNextPage } = usePagination<IEvent>(eventsData);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  if (isLoading) return <div>Is Loading</div>;

  return (
    <SideBar>
      <Container maxW='container.xl' p={4} aria-label='Table'>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {currentRecords?.map((event) => (
            <EventCard key={event.eventId} event={event} />
          ))}
        </SimpleGrid>
        <PaginationWrapper>
          <ReactPaginate
            previousLabel={'Poprzednia'}
            nextLabel={'Następna'}
            breakLabel={'...'}
            pageCount={Math.ceil(currentRecords?.length ?? 0 / 6)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={onNextPage}
            containerClassName={'pagination'}
            activeClassName={'active'}
            breakClassName={'break-me'}
            pageClassName={'page'}
            previousClassName={'previous'}
            nextClassName={'next'}
          />
        </PaginationWrapper>
      </Container>
    </SideBar>
  );
};

export default EventsList;
