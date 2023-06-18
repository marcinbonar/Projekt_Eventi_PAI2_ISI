export interface Event {
  eventId: string;
  title: string;
  paymentStatus: string;
}

export interface UserWithEvents {
  role: string;
  userId: string;
  email: string;
  events: Event[];
}
