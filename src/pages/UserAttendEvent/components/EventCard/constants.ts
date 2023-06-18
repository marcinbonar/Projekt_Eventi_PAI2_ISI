export type STATUS_TYPE = 'PAID_ONLINE' | 'PAID_OFFLINE' | 'PENDING_OFFLINE_PAYMENT'

export const statuses = {
  'PAID_ONLINE': {
    paymentStatusText: 'Zapłacono online',
    paymentStatusColor: 'green',
  },
  'PAID_OFFLINE': {
    paymentStatusText: 'Zapłacono offline',
    paymentStatusColor: 'green',
  },
  'PENDING_OFFLINE_PAYMENT': {
    paymentStatusText: 'Nie zapłacono',
    paymentStatusColor: 'red',
  },
};
