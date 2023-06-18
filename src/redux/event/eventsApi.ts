import { EVENT } from '../../api/constants';
import { EventNameAndSoldTicketsCount } from '../../types/EventNameAndSoldTicketsCount';
import { PayWithStripePayload } from '../../types/PayWithStripePayload';
import { IEvent } from '../../types/event';
import { apiSlice } from '../api';

type TagType = 'Events';

export const eventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserEvents: builder.query<IEvent[], void>({
      query: () => EVENT.GET_ALL_EVENTS,
      providesTags: (result: IEvent[] | undefined) => [
        { type: 'Events' as TagType, id: 'LIST' },
        ...(result?.map((event) => ({
          type: 'Events' as TagType,
          id: event.eventId,
        })) ?? []),
      ],
    }),
    getAdminEvents: builder.query<IEvent[], void>({
      query: () => EVENT.GET_ALL_ADMIN_EVENTS,
      providesTags: (result: IEvent[] | undefined) => [
        { type: 'Events' as TagType, id: 'LIST' },
        ...(result?.map((event) => ({
          type: 'Events' as TagType,
          id: event.eventId,
        })) ?? []),
      ],
    }),
    addEvent: builder.mutation<IEvent, IEvent>({
      query: (initialData) => ({
        url: EVENT.ADD_EVENT,
        method: 'POST',
        body: initialData,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data: newEvent } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              'getAdminEvents',
              undefined,
              (draft: IEvent[]) => [...draft, newEvent]
            )
          );
        } catch (e) {
          console.warn(e);
        }
      },
    }),
    deleteEvent: builder.mutation<string, string>({
      query: (id: string) => ({
        url: EVENT.DELETE_EVENT(id),
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Events', id: 'LIST' }],
    }),
    signUpToEvent: builder.mutation({
      query: (payload: { eventId: string; userId: string }) => ({
        url: EVENT.SIGN_UP_TO_EVENT(payload.userId, payload.eventId),
        method: 'POST',
        body: payload,
      }),
    }),
    payWithStripe: builder.mutation<{ message: string }, PayWithStripePayload>({
      query: ({ userId, eventId, stripeToken }) => ({
        url: EVENT.BUY_TICKET_STRIPE(userId, eventId, stripeToken),
        method: 'POST',
      }),
    }),
    payOfflineTicket: builder.mutation({
      query: (payload: { eventId: string; userId: string }) => ({
        url: EVENT.BUY_TICKET_OFFLINE(payload.eventId, payload.userId),
        method: 'POST',
      }),
    }),
    getSolidTicketsForEvents: builder.query<
      EventNameAndSoldTicketsCount[],
      void
    >({
      query: () => EVENT.GET_SOLID_TICKETS_FOR_EVENTS,
      providesTags: ['Events'],
    }),
  }),
});
export const {
  useGetUserEventsQuery,
  useGetAdminEventsQuery,
  useAddEventMutation,
  useDeleteEventMutation,
  useSignUpToEventMutation,
  usePayWithStripeMutation,
  usePayOfflineTicketMutation,
  useGetSolidTicketsForEventsQuery,
} = eventsApi;
