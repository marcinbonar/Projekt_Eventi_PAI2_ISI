export const baseUrl = 'http://localhost:4000/api';
export const USER = {
  GET_ALL_USER: '/user/all',
  GET_USER: (id: string) => `/user/${id}`,
  REGISTRATION: '/user/add',
  LOGIN: '/user/login',
  CHANGE_PASSWORD: (userId: string) => `/user/changePassword/${userId}`,
  BLOCK_USER: '/user/blockUser',
  UNBLOCK_USER: '/user/unblockUser',
  LOGIN_USER_BY_GOOGLE: '/user/login/google',
  USER_EVENTS: (userId: string) => `/event/userEvents/${userId}`,
  ALL_USERS_EVENTS: '/event/usersWithEvents',
};

export const EVENT = {
  GET_ALL_EVENTS: '/event/all',
  GET_ALL_ADMIN_EVENTS: '/event/all',
  GET_EVENT_BY_ID: '/event/{id}',
  ADD_EVENT: '/event/add-event',
  DELETE_EVENT: (eventId: string) => `/event/delete-event/${eventId}`,
  BUY_TICKET_OFFLINE: (eventId: string, userId: string) =>
    `/event/${eventId}/buy-ticket/offline/${userId}`,
  BUY_TICKET_STRIPE: (userId: string, eventId: string, stripeToken: string) =>
    `/event/${eventId}/buy-ticket/stripe/${userId}/${stripeToken}`,
  SIGN_UP_TO_EVENT: (userId: string, eventId: string) =>
    `event/signUp/${userId}/${eventId}`,
  GET_SOLID_TICKETS_FOR_EVENTS: '/event/solidTicketForEvents',
};
