export interface IEvent {
  eventId?: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  location: string;
  category: string;
  availableTickets: number;
  soldTickets?: number;
  ticketPrice: number;
  paymentStatus?: string;
}
