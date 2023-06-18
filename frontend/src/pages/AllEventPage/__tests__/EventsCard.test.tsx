import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { EventCard } from '../components';
import { renderDOM } from '../../../utils/renderDOM';


describe('EventCard', () => {
  const mockEvent = {
    title: 'Test Event',
    description: 'This is a test event',
    image: 'http://example.com/test.jpg',
    startDate: '2023-05-30',
    endDate: '2023-05-31',
    location: 'Test Location',
    category: 'Test Category',
    ticketPrice: 50,
    eventId: '123',
    availableTickets: 5,
  };

  it('renders correctly', () => {
    renderDOM(<EventCard event={mockEvent} />);

    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('This is a test event')).toBeInTheDocument();
    expect(screen.getByText('Start: 2023-05-30')).toBeInTheDocument();
    expect(screen.getByText('Koniec: 2023-05-31')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('Cena biletu: 50 $')).toBeInTheDocument();
    expect(screen.getByText('Kup bilet teraz')).toBeInTheDocument();
    expect(screen.getByText('Zapisz się i zapłać na miejscu')).toBeInTheDocument();
  });

  it('displays "Brak biletów" when there are no available tickets', () => {
    const noTicketsEvent = { ...mockEvent, availableTickets: 0 };
    renderDOM(<EventCard event={noTicketsEvent} />);
    expect(screen.getByText('Brak biletów')).toBeInTheDocument();
  });


});
