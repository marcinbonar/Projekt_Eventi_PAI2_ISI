import React from 'react';
import EventRow from '../EventRow';
import { Table } from "@chakra-ui/react";
import { renderDOM } from '../../../../utils/renderDOM';
import { fireEvent } from '@testing-library/react';

describe('EventRow', () => {
  const mockDelete = jest.fn();
  const mockEvent = {
    eventId: '1',
    title: 'Test Event',
    description: 'Test Description',
    image: 'Test Image',
    startDate: '2023-06-17',
    endDate: '2023-06-18',
    location: 'Test Location',
    category: 'Test Category',
    availableTickets: 100,
    ticketPrice: 50,
  };

  it('should render without crashing', () => {
    renderDOM(<Table><EventRow event={mockEvent} onDelete={mockDelete} /></Table>);
  });

  it('should trigger onDelete function when the delete button is clicked', () => {
    const { getByText } = renderDOM(<Table><EventRow event={mockEvent} onDelete={mockDelete} /></Table>);

    fireEvent.click(getByText('Usuń'));
    expect(mockDelete).toHaveBeenCalled();
  });
});
