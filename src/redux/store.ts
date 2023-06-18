import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './api';
import eventsReducer from './event/eventsReducer';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    events: eventsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
