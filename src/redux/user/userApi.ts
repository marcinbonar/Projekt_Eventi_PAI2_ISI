import { USER } from '../../api/constants';
import { UserWithEvents } from '../../types/UserWithEventsResponse';
import { IEvent } from '../../types/event';
import { User } from '../../types/user';
import { apiSlice } from '../api';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id: string) => USER.GET_USER(id),
    }),
    getUserSignedUpEvents: builder.query<IEvent[], string>({
      query: (userId: string) => `${USER.USER_EVENTS(userId)}`,
    }),
    changePassword: builder.mutation<
      void,
      { oldPassword: string; newPassword: string; userId: string }
    >({
      query: ({ oldPassword, newPassword, userId }) => ({
        url: USER.CHANGE_PASSWORD(userId),
        method: 'PUT',
        data: { oldPassword, newPassword },
      }),
    }),
    loginUser: builder.mutation<User, { email: string; password: string }>({
      query: (credentials) => ({
        url: USER.LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<
      User,
      Pick<User, 'name' | 'surname' | 'email' | 'password'>
    >({
      query: (data) => ({
        url: USER.REGISTRATION,
        method: 'POST',
        body: data,
      }),
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => USER.GET_ALL_USER,
    }),
    blockUser: builder.mutation<void, string>({
      query: (email) => ({
        url: USER.BLOCK_USER,
        method: 'POST',
        body: { email },
      }),
    }),
    unblockUser: builder.mutation<void, string>({
      query: (email) => ({
        url: USER.UNBLOCK_USER,
        method: 'POST',
        body: { email },
      }),
    }),
    getAllUsersEvents: builder.query<UserWithEvents[], void>({
      query: () => USER.ALL_USERS_EVENTS,
    }),
    loginUserByGoogle: builder.mutation<User, { idToken: string }>({
      query: (data) => ({
        url: USER.LOGIN_USER_BY_GOOGLE,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useChangePasswordMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserSignedUpEventsQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetAllUsersEventsQuery,
  useLoginUserByGoogleMutation,
} = userApi;
