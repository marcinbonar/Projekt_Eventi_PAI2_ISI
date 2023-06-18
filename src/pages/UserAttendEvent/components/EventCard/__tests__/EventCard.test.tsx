import { render, screen } from '@testing-library/react';
import EventCard from '../EventCard';

test('renders EventCard component', () => {
  const mockEvent = {
    title: 'Test Event',
    description: 'This is a test event',
    startDate: '2023-06-01',
    endDate: '2023-06-02',
    location: 'Test Location',
    category: 'Test Category',
    paymentStatus: 'PAID_ONLINE',
    image: 'test-image-url',
  };

  // @ts-ignore
  render(<EventCard event={mockEvent} />);

  expect(screen.getByText('Test Event')).toBeInTheDocument();
});